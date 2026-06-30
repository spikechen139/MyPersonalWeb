# 个人网站 0 成本线上部署计划

## 目标

将当前个人网站以 0 成本部署到线上，并保持可迭代、可更新、可回滚。

当前项目是纯静态网站：

- `index.html`
- `styles.css`
- `script.js`
- `profile-photo.jpg`

因此不需要购买云服务器，不需要配置 Nginx，不需要开放 80/443 端口，也不需要自建防火墙。

## 最终架构

```text
本地网站文件
  -> GitHub 免费仓库
  -> Cloudflare Pages 免费构建与托管
  -> Cloudflare 免费 CDN / HTTPS / DDoS 基础防护
  -> 免费 pages.dev 二级域名
```

## 0 成本原则

本计划默认不购买任何付费资源：

- 域名：使用 Cloudflare Pages 自动生成的 `*.pages.dev` 免费域名。
- 服务器：不购买服务器，使用 Cloudflare Pages 静态托管。
- 防火墙：不购买独立防火墙，使用 Cloudflare 免费计划的基础安全能力。
- 构建：当前项目不需要构建命令，减少失败点。
- 自动更新：通过 GitHub push 触发 Cloudflare Pages 自动部署。

## 为什么选择 Cloudflare Pages

Cloudflare Pages 免费计划适合当前项目：

- 免费价格为 `$0`。
- 支持 GitHub/GitLab 仓库集成。
- 每次推送代码后自动部署。
- 支持免费 HTTPS。
- 支持 CDN 和基础 DDoS 防护。
- 官方页面显示免费计划包含 500 次构建/月、无限静态请求、无限带宽、无限站点、每项目 100 个自定义域名。

## 需要的账号

1. GitHub 账号
   - 用于保存网站源代码。
   - GitHub Free 支持无限 public/private repositories。

2. Cloudflare 账号
   - 用于部署 Cloudflare Pages。
   - 用于提供免费 `*.pages.dev` 域名、CDN、HTTPS 和基础安全能力。

## 推荐仓库设置

仓库名建议：

```text
personal-website
```

可选：

```text
chenyapeng-portfolio
ai-native-portfolio
```

仓库可见性建议：

- `Public`：更适合作为个人作品展示，也方便招聘方查看代码。
- `Private`：也可以使用，但招聘展示价值较弱。

## 当前本地 Git 注意事项

当前目录检测到的 Git 顶层目录是：

```text
C:/Users/21055
```

这说明现有 Git 仓库范围过大，已经覆盖到用户主目录。不要直接在这个仓库中执行 `git add .` 或提交，否则可能把桌面、配置文件、缓存、个人目录等无关内容纳入版本控制。

正式部署前应采用以下安全方案之一：

1. 在 GitHub 新建空仓库后，将当前网站文件复制到一个全新的干净目录，再初始化 Git。
2. 或者移除/隔离当前错误的上级 Git 仓库影响，再让 `C:\Users\21055\Desktop\个人网站` 成为独立仓库。

推荐使用方案 1，风险最低。

## 部署步骤

### 阶段 1：本地项目整理

检查网站文件：

```text
index.html
styles.css
script.js
profile-photo.jpg
```

建议补充文件：

```text
README.md
.gitignore
```

README 需要包含：

- 网站介绍
- 技术栈
- 本地预览方式
- 线上地址
- 更新方式

### 阶段 2：初始化 Git

在当前目录执行：

```bash
git init
git add index.html styles.css script.js profile-photo.jpg README.md .gitignore DEPLOYMENT_PLAN.md
git commit -m "Initial portfolio website"
```

如果当前目录已经有 Git 仓库，则只需要检查状态并提交改动。

### 阶段 3：创建 GitHub 仓库

在 GitHub 创建仓库：

```text
personal-website
```

然后连接远程仓库：

```bash
git branch -M main
git remote add origin https://github.com/<your-github-username>/personal-website.git
git push -u origin main
```

### 阶段 4：Cloudflare Pages 部署

1. 登录 Cloudflare。
2. 进入 Workers & Pages。
3. 选择 Create application。
4. 选择 Pages。
5. 选择 Connect to Git。
6. 授权 Cloudflare 访问 GitHub 仓库。
7. 选择 `personal-website` 仓库。
8. 设置：

```text
Project name: personal-website
Production branch: main
Framework preset: None
Build command: 留空
Build output directory: /
Root directory: /
```

9. 点击 Deploy。

部署成功后会得到一个免费地址：

```text
https://personal-website.pages.dev
```

如果项目名被占用，Cloudflare 会生成或要求换一个项目名。

### 阶段 5：自动更新机制

以后更新网站只需要：

```bash
git add .
git commit -m "Update portfolio content"
git push
```

Cloudflare Pages 会自动从 GitHub 拉取最新代码并重新部署。

## 迭代策略

### 主分支

```text
main
```

用途：

- 永远保持可上线状态。
- Cloudflare Pages production deployment 绑定此分支。

### 功能分支

命名建议：

```text
feature/update-profile
feature/project-gallery
feature/mobile-polish
feature/add-analytics
```

用途：

- 每次较大修改先在功能分支完成。
- 确认无误后合并到 `main`。

### 发布节奏

建议：

- 小文案修改：直接提交到 main。
- 页面布局、视觉风格、交互修改：使用 feature 分支。
- 每次上线前检查移动端、桌面端和主要链接。

## 回滚方案

如果某次部署出问题：

1. 在 Cloudflare Pages 后台找到上一次成功部署。
2. 使用 Rollback / Redeploy previous deployment。
3. 或者在 Git 中回退：

```bash
git revert <commit-hash>
git push
```

Cloudflare Pages 会自动部署回退后的版本。

## 防火墙与安全规划

当前项目是静态页面，不暴露后端接口，安全风险较低。

Cloudflare 免费层建议开启或保持：

- HTTPS 自动证书
- Always Use HTTPS
- Automatic HTTPS Rewrites
- Brotli compression
- 基础 DDoS protection
- CDN cache

暂时不需要：

- 云服务器防火墙
- Nginx 配置
- 端口开放
- WAF 自定义复杂规则
- Rate limiting

未来如果加入后端 API 或 AI 聊天功能，再考虑：

- Cloudflare Workers 免费层
- Turnstile 免费人机验证
- API rate limit
- KV / D1 / R2 的免费额度

## 域名规划

0 成本阶段：

```text
https://personal-website.pages.dev
```

这已经可以放进简历、GitHub Profile、LinkedIn、邮件签名。

未来可选升级：

```text
chenyapeng.com
yapengchen.dev
spikechen.dev
chenyapeng.ai
```

注意：正式独立域名通常不可能长期 0 成本。如果坚持 0 成本，就使用 `pages.dev`。

## 后续可加的免费能力

1. GitHub Profile 入口
   - 在 GitHub profile README 中放网站链接。

2. 免费访问统计
   - Cloudflare Web Analytics。
   - 不需要前端埋复杂 SDK。

3. 免费表单方案
   - 先使用 mailto。
   - 后续可接 Formspree 免费层或 Cloudflare Workers 自建轻量表单。

4. SEO
   - 添加 `robots.txt`。
   - 添加 `sitemap.xml`。
   - 完善 Open Graph meta。

5. 性能优化
   - 压缩图片。
   - 增加 favicon。
   - 检查移动端布局。

## 执行权限边界

我可以直接完成：

- 整理本地项目文件。
- 初始化 Git。
- 创建 README、`.gitignore`、`robots.txt`、`sitemap.xml`。
- 提交本地 commit。
- 准备 Cloudflare Pages 部署配置说明。

需要你参与授权的步骤：

- 登录或创建 GitHub 账号。
- 创建 GitHub 远程仓库，或提供已有仓库地址。
- 登录 Cloudflare。
- 授权 Cloudflare 访问 GitHub 仓库。
- 点击 Cloudflare Pages 的首次部署按钮。

这些账号授权操作通常需要你在浏览器里完成，我可以在你授权后继续推进后续配置。

## 完成标准

部署完成后应满足：

- 网站可通过 `https://*.pages.dev` 访问。
- 每次 `git push` 后自动部署。
- HTTPS 正常。
- 桌面端和移动端布局正常。
- GitHub 仓库中有完整源代码和部署说明。
- 简历中可以加入线上网站地址。
