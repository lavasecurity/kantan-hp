# 设置 Decap CMS 的 GitHub 登录

**以此语言阅读：** [English](github-oauth-setup.md) · [日本語](github-oauth-setup.ja.md) · [繁體中文](github-oauth-setup.zh-Hant.md) · [简体中文](github-oauth-setup.zh-Hans.md)

Decap CMS 会代表你将内容提交到 Git 存储库，因此它需要能以你的身份登录。本指南说明仅需一次的设置。

> 这是开发者／管理员的工作。编辑者不需要做任何事。

认证由本存储库内附的 **Cloudflare Pages Functions**（`functions/api/auth.js` 与
`functions/api/callback.js`）处理，因此不需要外部服务器 — 它会随网站一起自动部署。

设置方式有两种：
- **[A. 一次性设置 Action（推荐）](#a-一次性设置-action推荐)** — 本存储库内附的 GitHub Actions
  工作流程会帮你把认证信息写入 Cloudflare。
- **[B. Cloudflare 手动设置](#b-cloudflare-手动设置)** — 如果你想自己点击 Cloudflare 仪表盘。

两者都从相同的步骤开始：创建 GitHub OAuth App。

---

## 步骤 1 — 创建 GitHub OAuth App（两种方式相同）

1. 登录 GitHub，打开 **Settings → Developer settings → OAuth Apps → New OAuth App**。
2. 填入：
   - **Application name:** 例如 `kantan-hp CMS`
   - **Homepage URL:** `https://<your-site>.pages.dev`
   - **Authorization callback URL:** `https://<your-site>.pages.dev/api/callback`
3. 点击 **Register application**。
4. 在应用程序页面复制 **Client ID** 与 **Client secret**（需要的话点击 "Generate a new client secret"）。请对 secret 保密。

> 若使用自定义域名，请在上述所有字段（Homepage URL 与 callback URL 两者）都使用该域名。

---

## A. 一次性设置 Action（推荐）

本存储库内附一个工作流程（`.github/workflows/decap-oauth-setup.yml`），会把两个认证信息
写入你的 Cloudflare Pages 项目并重新部署。认证信息会以**存储库密钥**存储（不会出现在日志中），
只需添加一次：

1. 获取 **Cloudflare API 令牌**（Cloudflare 仪表盘 → My Profile → **API Tokens** →
   **Create Token**），权限选 **"Cloudflare Pages: Edit"**，并获取 **Account ID**（仪表盘右侧）。
2. 在 GitHub 存储库中，前往 **Settings → Secrets and variables → Actions** 添加：
   - `GH_OAUTH_CLIENT_ID` = GitHub OAuth App 的 Client ID（步骤 1 的）
   - `GH_OAUTH_CLIENT_SECRET` = GitHub OAuth App 的 Client secret（步骤 1 的）
   - `CF_API_TOKEN` = 上述令牌
   - `CF_ACCOUNT_ID` = 你的 Cloudflare 账户 ID
   - `CF_DEPLOY_HOOK`（可选）= Cloudflare 的 deploy hook URL（见下方）。若要工作流程
     自动重新部署，请设置此密钥
3. 前往 **Actions → "Setup Decap CMS login" → Run workflow**，只输入 **Project name**
   （`*.pages.dev` URL 中的项目名称）。

工作流程会把认证信息写入 Cloudflare Pages（按键合并，因此其他环境变量会被保留），并通过
deploy hook 重新部署你的网站。这样就完成了 — 打开 `/admin`，用 GitHub 登录即可。

**可选的 deploy hook：** 若要工作流程自行触发重新部署，请先在 Cloudflare 的 Pages 项目 →
**Settings → Builds → Add deploy hook** 创建，并将其 URL 设为 `CF_DEPLOY_HOOK` 密钥。
若不设置，新的环境变量会在你下次 git push 时生效。

---

## B. Cloudflare 手动设置

1. 在 Cloudflare 仪表盘打开你的 Pages 项目 →
   **Settings → Environment variables**（或 **Variables and secrets**）。
2. 添加两个变量：
   - `OAUTH_GITHUB_CLIENT_ID` = 你的 Client ID
   - `OAUTH_GITHUB_CLIENT_SECRET` = 你的 Client secret
3. 将 secret 标记为**密钥**，以免出现在构建日志。
4. 保存并重新部署网站，让新变量生效。

---

## 将 Decap 指向你的 Fork（两种方式相同）

`public/admin/config.yml` 中唯一要改的是 `repo` — 设为**你的 fork**，而非上游：

```yaml
backend:
  name: github
  repo: <your-github-user>/kantan-hp
  branch: main
```

不需要设置 `base_url` 或 `auth_endpoint` — `public/admin/index.html` 会自动注入
（使用网站自身的 origin），因此在任何 fork 或自定义域名上 `/admin` 都能无需额外设置直接运行。

---

## 工作原理

1. 编辑者打开 `/admin` 并点击 **Login with GitHub**。
2. Decap 打开 `<your-site>/api/auth` 的弹出窗口，跳转到 GitHub 的 OAuth 页面。
3. 用户授权后，GitHub 跳转到 `<your-site>/api/callback`，将 code 换成 access token 并交回给
   Decap 窗口。
4. Decap 用该 token 将内容提交到 `config.yml` 中指定的存储库。

## 疑难解答

- **"Login failed" / callback 404：** GitHub 中的 Authorization callback URL 与你的网站不符。
  必须是 `https://<your-site>.pages.dev/api/callback`。请重查步骤 1。
- **`Missing OAUTH_GITHUB_CLIENT_ID...` 错误：** 环境变量未设置，或添加后未重新部署网站
  （重新运行设置 Action，或重查 B 区）。
- **登录成功但无法保存：** 该 GitHub 账号对 `config.yml` 中的存储库没有写入权限。
  请授予写入权限（或将 `repo` 指向可以写入的存储库）。
