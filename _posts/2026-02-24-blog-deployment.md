---
title: "博客部署"
date: 2026-02-24 14:00:00 +0800
categories: [Blog]
tags: [Blog, Deployment]

---

## 安装必要工具

``` bash
sudo apt update
sudo apt install -y build-essential zlib1g-dev libssl-dev libffi-dev libxml2-dev libxslt1-dev libreadline-dev libsqlite3-dev libyaml-dev
```

## 安装Ruby

``` bash
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init - bash)"

rbenv install -l
rbenv install 3.3.0
rbenv global 3.3.0

# 验证安装
ruby -v
gem -v
```

## 安装Bundler与Jekyll

``` bash
gem install bundler

# 可选
gem install jekyll
```

## 创建并部署

``` bash
# 克隆 Chirpy Starter 模板
git clone https://github.com/cotes2020/chirpy-starter.git blog
cd blog

# 清理 Git 历史（避免冲突）
rm -rf .git
git init

# 安装 Ruby 依赖
bundle config set --local path 'vendor/bundle'
bundle install

# 本地预览
bundle exec jekyll serve --host=0.0.0.0 --port=4000

# 推送
git add .
git commit -m "Initial: Chirpy blog"
git remote add origin https://github.com/$GITHUB_NAME/$GITHUB_NAME.github.io.git
git push -u origin main
```

## 常见问题

### 编译失败，缺少文件

考虑安装Ruby编译常见依赖
``` bash
sudo apt install -y build-essential libssl-dev libreadline-dev zlib1g-dev libyaml-dev libffi-dev libgdbm-dev libncurses5-dev
```

### Git推送失败，报错Password authentication is not supported for Git operations.

GitHub 已禁用密码登录 Git 操作（自 2021 年 8 月起），必须使用 Personal Access Token (PAT) 或 SSH 密钥 进行身份验证。

解决方案：

1. 使用 Personal Access Token (PAT)
   1. GitHub → 点右上角头像 → Settings
   2. 左侧菜单 → Developer settings → Personal access tokens → Tokens (classic)
   3. 点击 Generate new token → Generate new token (classic)
   4. 填写：
      1. Note: token名
      2. Expiration: 有效期
      3. Select scopes: 需勾选`repo`
      4. Generate token
      5. 使用 Token 代替密码推送
2. 改用 SSH
   1. `ssh-keygen -t ed25519 -C "your_email@example.com"`
   2. `cat ~/.ssh/id_ed25519.pub`
   3. 将cat的输出添加到github
      1. GitHub → Settings → SSH and GPG keys → New SSH key
      2. Add SSH key
   4. `git remote set-url origin git@github.com:$GITHUB_NAME/$GITHUB_NAME.github.io.git`