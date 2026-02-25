---
title: "Slurm集群增加新计算节点"
data: 2026-02-25 17:17:00 +0800
categories: [Slurm]
tags: [Slurm, Depolyment]

---

*使用系统：Ubuntu22.04*

## 系统初始化

### 系统重命名

要求：只能使用小写字母，数字，连字符。

### 安装nvidia驱动

## slurmd安装

查看管理节点slurm版本(`slurmctld -V`)

- 若为21.08.5:
  - 通过apt源直接安装:
    ``` bash
    apt update
    apt install slurmd
    apt install slurm-client
    ```
- 若为22.05.8:
  - 在网站`https://pkgs.org/`搜索包进行下载，选择`Debian 12 (Bookworm)`，所需包：
    - libhwloc15_2.9.0-1_amd64.deb
    - slurm-client_22.05.8-4+deb12u2_amd64.deb
    - slurmd_22.05.8-4+deb12u2_amd64.deb
    - slurm-wlm-basic-plugins_22.05.8-4+deb12u2_amd64.deb
  - 安装：
    ``` bash
    apt update
    apt install ./libhwloc15_2.9.0-1_amd64.deb
    apt install ./slurm-wlm-basic-plugins_22.05.8-4+deb12u2_amd64.deb
    apt install ./slurm-client_22.05.8-4+deb12u2_amd64.deb
    apt install ./slurmd_22.05.8-4+deb12u2_amd64.deb
    ```

## munge配置

1. 从管理节点中下载munge.key到本地
   ``` bash
    scp root@manager:/etc/munge/munge.key /etc/munge/
   ```
2. 设置文件权限
    ``` bash
    chown munge:munge /etc/munge
    chown munge:munge /var/run/munge
    chown munge:munge /var/lib/munge
    chown munge:munge /var/log/munge
    chown munge:munge /etc/munge/munge.key
    ```
3. 启动munge并设置开机自启
    ``` bash
    # 开机自启
    systemctl enable munge
    # 启动munge
    systemctl start munge
    ```

## 安装mpi2（可选）

若软件需要mpi，则需要安装mpi2

安装
``` bash
apt install libpmi2-0
```

若要使用，则需要启动软件前，执行:
``` bash
export I_MPI_PMI_LIBRARY=/usr/lib/x86_64-linux-gnu/libpmi2.so.0
export I_MPI_DEBUG=30
export I_MPI_HYDRA_RMK=slurm
export I_MPI_HYDRA_BOOTSTRAP=slurm
export I_MPI_HYDRA_BOOTSTRAP=ssh
export I_MPI_FABRICS=shm:ofi
export FI_PROVIDER=tcp
```

## 配置Slurm

### 更新slurm.conf

在管理节点的slurm.conf中加入新计算节点。
管理节点上运行`systemctl restart slurmctld.service`重启slurmctld服务。

### 同步slurm.conf

若使用共享挂载，则已自动同步。
若未使用共享挂载，则使用scp将slurm.conf拷贝到每个计算节点上一份。

### 配置gres.conf

若需使用GPU资源，则计算节点需在`/etc/slurm/`中新增`gres.conf`，文件内容可参考:
```
Name=gpu Type=NVIDIA_RTX4070S File=/dev/nvidia[0-1]
```

### 配置cgroup.conf

若需使用cgroup进行资源隔离，则计算节点需在`/etc/slurm/`中新增`cgroup.conf`，文件内容可参考：
```
CgroupAutomount=yes
CgroupPlugin=autodetect

ConstrainCores=yes
ConstrainRAMSpace=yes
```

## 启动Slurm

执行命令`mkdir /var/spool/slurm` (确保`/var/spool/slurm`存在， slurmd需要该路径)

计算节点中运行`systemctl restart slurmd.service`启动服务。

## 常用知识点

- 管理节点需放开6817端口，slurmctld会监听该端口，端口号在在slurm.conf中可配。
- 计算节点需放开6818端口，slurmd会监听该端口，端口号在在slurm.conf中可配。
- `slurmctld -D`和`slurmd -D`可以使服务前台运行，可以即时查看输出，便于定位问题。


## 常见问题

### 服务启动失败，报错找不到cgroup namespace 'freezer'(大抵是，具体的报错没有保留下来)

原因：Ubuntu22.04默认使用cgroup/v2, 而Slurm21.08.5不支持使用cgroup/v2, 从22.05.8才开始支持的。
解决方案：
  - 方案1：启动cgroup/v1
    - 编辑文件`/etc/default/grub`, 在`GRUB_CMDLINE_LINUX_DEFAULT`后追加`systemd.unified_cgroup_hierarchy=0`
        ``` bash
        #GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
        GRUB_CMDLINE_LINUX_DEFAULT="quiet splash systemd.unified_cgroup_hierarchy=0"
        ```
    - 更新GRUB并重启
        ``` bash
        sudo update-grub
        sudo reboot
        ```
    - 验证
        运行命令`mount | grep cgroup` 应存在多个`cgroup on ***` 项
    - 尝试启动服务
  - 方案2：更换为Slurm22.05.8版本

### 服务启动后，sinfo始终报错slurm_load_partitions: Insane message length

运行`strace -e trace=sendto,recvfrom sinfo`查看是否有HTTP字样，若有，进一步运行`echo "TEST" | nc -v ${manager_ip} 6817`,查看是否有`HTTP/1.1 400 Bad Request` 字样。

若有， 则说明是网络中间有设备（如安全组、iptables、代理、云平台 ACL）将 6817 转发到了 Web 服务。

解决方案：检查管理节点，查看是否云平台或防火墙做了端口转发。检查安全组规则，云平台网络ACL等。