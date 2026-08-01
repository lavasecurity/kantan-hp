# 設定 Decap CMS 的 GitHub 登入

**以此語言閱讀：** [English](github-oauth-setup.md) · [日本語](github-oauth-setup.ja.md) · [繁體中文](github-oauth-setup.zh-Hant.md) · [简体中文](github-oauth-setup.zh-Hans.md)

Decap CMS 會代表你將內容提交到 Git 儲存庫，因此它需要能以你的身分登入。本指南說明僅需一次的設定。

> 這是開發者／管理員的工作。編輯者不需要做任何事。

認證由本儲存庫內附的 **Cloudflare Pages Functions**（`functions/api/auth.js` 與
`functions/api/callback.js`）處理，因此不需要外部伺服器 — 它會隨網站一起自動部署。

設定方式有兩種：
- **[A. 一次性設定 Action（建議）](#a-一次性設定-action建議)** — 本儲存庫內附的 GitHub Actions
  工作流程會幫你把認證資訊寫入 Cloudflare。
- **[B. Cloudflare 手動設定](#b-cloudflare-手動設定)** — 如果你想自己點選 Cloudflare 儀表板。

兩者都從相同的一步開始：建立 GitHub OAuth App。

---

## 步驟 1 — 建立 GitHub OAuth App（兩種方式皆同）

1. 登入 GitHub，開啟 **Settings → Developer settings → OAuth Apps → New OAuth App**。
2. 填入：
   - **Application name:** 例如 `kantan-hp CMS`
   - **Homepage URL:** `https://<your-site>.pages.dev`
   - **Authorization callback URL:** `https://<your-site>.pages.dev/api/callback`
3. 按 **Register application**。
4. 在應用程式頁面複製 **Client ID** 與 **Client secret**（需要的話按 "Generate a new client secret"）。請將 secret 保密。

> 若使用自訂網域，請在上述所有欄位（Homepage URL 與 callback URL 兩者）都使用該網域。

---

## A. 一次性設定 Action（建議）

本儲存庫內附一個工作流程（`.github/workflows/decap-oauth-setup.yml`），會把兩個認證資訊
寫入你的 Cloudflare Pages 專案並重新部署。認證資訊會以**儲存庫密鑰**儲存（不會出現在日誌中），
只需新增一次：

1. 取得 **Cloudflare API 令牌**（Cloudflare 儀表板 → My Profile → **API Tokens** →
   **Create Token**），權限選 **"Cloudflare Pages: Edit"**，並取得 **Account ID**（儀表板右側）。
2. 在 GitHub 儲存庫中，前往 **Settings → Secrets and variables → Actions** 新增：
   - `GH_OAUTH_CLIENT_ID` = GitHub OAuth App 的 Client ID（步驟 1 的）
   - `GH_OAUTH_CLIENT_SECRET` = GitHub OAuth App 的 Client secret（步驟 1 的）
   - `CF_API_TOKEN` = 上述令牌
   - `CF_ACCOUNT_ID` = 你的 Cloudflare 帳戶 ID
   - `CF_DEPLOY_HOOK`（選填）= Cloudflare 的 deploy hook URL（見下方）。若要工作流程
     自動重新部署，請設定此密鑰
3. 前往 **Actions → "Setup Decap CMS login" → Run workflow**，只輸入 **Project name**
   （`*.pages.dev` URL 中的專案名稱）。

工作流程會把認證資訊寫入 Cloudflare Pages（按鍵合併，因此其他環境變數會被保留），並透過
deploy hook 重新部署你的網站。這樣就完成了 — 開啟 `/admin`，用 GitHub 登入即可。

**選填的 deploy hook：** 若要工作流程自行觸發重新部署，請先在 Cloudflare 的 Pages 專案 →
**Settings → Builds → Add deploy hook** 建立，並將其 URL 設為 `CF_DEPLOY_HOOK` 密鑰。
若不設定，新的環境變數會在你下次 git push 時生效。

---

## B. Cloudflare 手動設定

1. 在 Cloudflare 儀表板開啟你的 Pages 專案 →
   **Settings → Environment variables**（或 **Variables and secrets**）。
2. 新增兩個變數：
   - `OAUTH_GITHUB_CLIENT_ID` = 你的 Client ID
   - `OAUTH_GITHUB_CLIENT_SECRET` = 你的 Client secret
3. 將 secret 標記為**密鑰**，以免出現在建置日誌。
4. 儲存並重新部署網站，讓新變數生效。

---

## 將 Decap 指向你的 Fork（兩種方式皆同）

`public/admin/config.yml` 中唯一要改的是 `repo` — 設為**你的 fork**，而非上游：

```yaml
backend:
  name: github
  repo: <your-github-user>/kantan-hp
  branch: main
```

不需要設定 `base_url` 或 `auth_endpoint` — `public/admin/index.html` 會自動注入
（使用網站自身的 origin），因此在任何 fork 或自訂網域上 `/admin` 都能無需額外設定直接運作。

---

## 運作原理

1. 編輯者開啟 `/admin` 並按 **Login with GitHub**。
2. Decap 開啟 `<your-site>/api/auth` 的彈出視窗，導向 GitHub 的 OAuth 頁面。
3. 使用者授權後，GitHub 導向 `<your-site>/api/callback`，將 code 換成 access token 並交回給
   Decap 視窗。
4. Decap 用該 token 將內容提交到 `config.yml` 中指定的儲存庫。

## 疑難排解

- **"Login failed" / callback 404：** GitHub 中的 Authorization callback URL 與你的網站不符。
  必須是 `https://<your-site>.pages.dev/api/callback`。請重查步驟 1。
- **`Missing OAUTH_GITHUB_CLIENT_ID...` 錯誤：** 環境變數未設定，或新增後未重新部署網站
  （重新執行設定 Action，或重查區段 B）。
- **登入成功但無法儲存：** 該 GitHub 帳號對 `config.yml` 中的儲存庫沒有寫入權限。
  請授予寫入權限（或將 `repo` 指向可以寫入的儲存庫）。
