---
title: "挂载问题汇总"
data: 2026-02-26 11:22:00 +0800
categories: [Ubuntu]
tags: [Ubuntu]
---

## 1. 挂载目录后，root用户可以访问到，但是普通用户无法访问

#### 情况1: 运行命令`grep workingdir /proc/mounts`后，发现`sec=krb5`，而普通用户运行`klist`，输出为没有凭据。

解决方案1：将NFS共享的Security从`krb5`修改为`sys`(标准UNIX权限)，而后重新挂载。

解决方案2：安装`Kerberos`客户端