# 简单网站（Kantan HP）— 免费、几分钟就能发布的博客

[![Astro](https://img.shields.io/badge/Astro-7-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Decap CMS](https://img.shields.io/badge/Decap%20CMS-3-1f7a6b?logo=decap&logoColor=white)](https://decapcms.org)
[![Hosting: Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-free-F38020?logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Kantan（かんたん）** 日文意为**简单**，而这正是全部重点。

简单网站是一套**现成的博客**，**免费**运行、通过友好的网页界面**轻松编辑**，
不需要写代码、不需要服务器、也不需要管理数据库。

**以此语言阅读：** [English](README.md) · [日本語](README.ja.md) · [繁體中文](README.zh-Hant.md) · [简体中文](README.zh-Hans.md)

---

## 你可以获得

- 一个**免费运行的现成博客**（架设于 Cloudflare Pages）
- 位于 `your-site.com/admin` 的**网页编辑器** — 写文章、加图片、按发布
- 编辑者不需要碰代码或 git，只需要浏览器。

---

## 如何开始

1. **复制一份**这个项目（按上方 **Fork** 或 **Use this template** 按钮）。
2. **连接到 Cloudflare Pages** 并发布。Cloudflare 会给你一个免费的网址。
3. 在 **`your-site.com/admin`** 开始写文章。

### 步骤 1 — 复制一份
按此页上方的 **Fork**（或 **Use this template**），在 GitHub 账号中建立一份自己的副本。
如果还没有 GitHub 账号，可到 [github.com](https://github.com) 免费建立。

### 步骤 2 — 发布（仅需一次）
前往 [Cloudflare](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**，选择你复制的项目，然后：
- Build command: `npm run build`
- Output directory: `dist`

Cloudflare 会自动构建并发布。你会得到一个免费网址，例如 `your-site.pages.dev`（之后可加自己的域名）。

### 步骤 3 — 写第一篇文章
打开 `your-site.pages.dev/admin`，接受登录提示 → 按 **Blog → New Blog** → 输入标题和正文、上传图片，再按 **Publish**。约一分钟后就会发布到你的网站。

就是这样。其他一切都是选配。

---

## 想改外观？

网站本身是一般的 **Astro** 项目。如果想调整颜色、布局或新增页面，编辑 `src/` 中的文件即可，网站会自动重新构建。

详细的设置与定制说明请见 **《开发者指南》(docs/developer-guide.md)**；如果发布时要求设置
GitHub 登录，请见 **《GitHub 登录设置指南》(docs/github-oauth-setup.md)**。

---

## 许可

MIT © 2026 Lava Security
