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
- **设置（Settings）选项卡** — 无需代码即可修改站点标题、标语和主题
- 一篇已发布的欢迎文章，首次部署后网站就是"活的"
- 编辑者不需要碰代码或 git，只需要浏览器。

---

## 如何开始

1. **复制一份**这个项目 — [**Fork 此存储库**](https://github.com/lavasecurity/kantan-hp/fork)。
2. **连接到 Cloudflare Pages** 并发布。Cloudflare 会给你一个免费的网址。
3. 在 **`your-site.com/admin`** 开始写文章。

### 步骤 1 — 复制一份
按 **[Fork](https://github.com/lavasecurity/kantan-hp/fork)**（或此页上方的 **Fork** 按钮），在 GitHub 账号中建立一份自己的副本。
如果还没有 GitHub 账号，可到 [github.com](https://github.com) 免费建立。

### 步骤 2 — 发布（仅需一次）
前往 [Cloudflare](https://dash.cloudflare.com) → **Workers & Pages** → **Create application**。
在 **Create a Worker** 页面底部有一行小字 **"Looking to deploy Pages? Get started"**，点击它。
这会带你到会显示框架 preset 与输出文件夹的 Pages 设置。接着：

1. **Select a method** — 选择 **GitHub**（如有提示请登录／授权）。
2. **Select a repository** — 选择你刚刚复制的项目。
3. **Create and deploy** — 在构建设置中：
   - **Framework preset:** **Astro**
   - **Project name:** 任你命名（默认为 repo 名称，这将成为你的 `*.pages.dev` 网址）
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   
   Cloudflare 会检测为 Astro 项目，preset 可能已自动填入。

> 捷径：也可以从 **Workers & Pages → Create application → Pages 选项卡 → Connect to Git** 直接进入
> Pages 设置 — 字段相同，只是可能不显示 preset 选择器。

接着点击 **Save and Deploy**。Cloudflare 会自动构建并发布。你会得到一个免费网址，例如 `your-site.pages.dev`（之后可加自己的域名）。

### 步骤 3 — 写第一篇文章
发布文章前，需要先设置一次 **GitHub 登录**（编辑器保存文章时会用到）。请按照简短的
**《GitHub 登录设置指南》**（[docs/github-oauth-setup.zh-Hans.md](docs/github-oauth-setup.zh-Hans.md)）操作（仅需一次，约 5 分钟）。

然后打开 `your-site.pages.dev/admin` → 按 **Blog → New Blog** → 输入标题和正文、上传图片，再按 **Publish**。约一分钟后就会发布到你的网站。
（一篇欢迎文章已经发布，所以博客不会空空如也。）

就是这样。其他一切都是选配。

---

## 修改标题、标语和主题

在编辑器中，**设置（Settings）** 选项卡会编辑 `src/config.json`：可修改站点**标题**、**标语**、
**作者**、**主题**（从内置的 AstroPaper 配色方案中选择），以及**导航**链接。按 **Publish** 即可自动更新到线上网站 — 无需写代码。

编辑**关于（About）**页面，请使用编辑器中的 **页面（Pages）** 选项卡。

---

## 想改外观？

最快捷的改版方式是使用编辑器中的 **设置 → 主题（Settings → Theme）** 选择器。
网站本身也是一般的 **Astro** 项目：如果想调整颜色、布局或新增页面，编辑 `src/` 中的文件即可，网站会自动重新构建。

详细的设置与定制说明请见 **《开发者指南》(docs/developer-guide.md)**；如果发布时要求设置
GitHub 登录，请见 **《GitHub 登录设置指南》**（[docs/github-oauth-setup.zh-Hans.md](docs/github-oauth-setup.zh-Hans.md)）。

---

## 许可

MIT © 2026 Lava Security
