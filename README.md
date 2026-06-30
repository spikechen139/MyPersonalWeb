# 陈亚鹏个人网站

这是陈亚鹏的 AI Developer Portfolio，用于展示个人介绍、教育背景、AI 技能与项目经历。

## 技术栈

- HTML
- CSS
- JavaScript
- Cloudflare Pages 目标部署

## 本地预览

直接打开：

```text
index.html
```

当前项目是纯静态网站，不需要安装依赖或启动开发服务器。

## 文件结构

```text
index.html
styles.css
script.js
profile-photo.jpg
DEPLOYMENT_PLAN.md
```

## 部署方式

推荐使用 0 成本方案：

```text
GitHub 免费仓库 -> Cloudflare Pages 免费部署 -> pages.dev 免费域名
```

当前 GitHub 仓库：

```text
https://github.com/spikechen139/MyPersonalWeb.git
```

Cloudflare Pages 推荐设置：

```text
Project name: mypersonalweb
Production branch: main
Framework preset: None
Build command: 留空
Build output directory: /
Root directory: /
```

详细步骤见：

```text
DEPLOYMENT_PLAN.md
```

## 更新方式

后续网站更新流程：

```bash
git add .
git commit -m "Update portfolio"
git push
```

Cloudflare Pages 会在收到 GitHub 更新后自动重新部署。
