# 簡單網站（Kantan HP）— 免費、幾分鐘就能發布的部落格

[![Astro](https://img.shields.io/badge/Astro-7-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Decap CMS](https://img.shields.io/badge/Decap%20CMS-3-1f7a6b?logo=decap&logoColor=white)](https://decapcms.org)
[![Hosting: Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-free-F38020?logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Kantan（かんたん）** 日文意為**簡單**，而這就是整個重點。

簡單網站是一套**現成的部落格**，**免費**運行、透過友善的網頁界面**輕鬆編輯**，
不需要寫程式、不需要伺服器、也不需要管理資料庫。

**以此語言閱讀：** [English](README.md) · [日本語](README.ja.md) · [繁體中文](README.zh-Hant.md) · [简体中文](README.zh-Hans.md)

---

## 你可以獲得

- 一個**免費運行的現成部落格**（架設於 Cloudflare Pages）
- 位於 `your-site.com/admin` 的**網頁編輯器** — 寫文章、加圖片、按發布
- 編輯者不需要碰程式碼或 git，只需要瀏覽器。

---

## 如何開始

1. **複製一份**這個專案 — [**Fork 此儲存庫**](https://github.com/lavasecurity/kantan-hp/fork)。
2. **連接到 Cloudflare Pages** 並發布。Cloudflare 會給你一個免費的網址。
3. 在 **`your-site.com/admin`** 開始寫文章。

### 步驟 1 — 複製一份
按 **[Fork](https://github.com/lavasecurity/kantan-hp/fork)**（或此頁上方的 **Fork** 按鈕），在 GitHub 帳號中建立一份自己的副本。
如果還沒有 GitHub 帳號，可到 [github.com](https://github.com) 免費建立。

### 步驟 2 — 發布（僅需一次）
前往 [Cloudflare](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**，選擇你複製的專案，然後：
- Build command: `npm run build`
- Output directory: `dist`

Cloudflare 會自動建置並發布。你會得到一個免費網址，例如 `your-site.pages.dev`（之後可加自己的網域）。

### 步驟 3 — 寫第一篇文章
開啟 `your-site.pages.dev/admin`，接受登入提示 → 按 **Blog → New Blog** → 輸入標題和內文、上傳圖片，再按 **Publish**。約一分鐘後就會發布到你的網站。

就是這樣。其他一切都是選配。

---

## 想改外觀？

網站本身是一般的 **Astro** 專案。如果想調整顏色、版面或新增頁面，編輯 `src/` 中的檔案即可，網站會自動重新建置。

詳細的設定與客製說明請見 **〔開發者指南〕(docs/developer-guide.md)**；如果發布時要求設定
GitHub 登入，請見 **〔GitHub 登入設定指南〕(docs/github-oauth-setup.md)**。

---

## 授權

MIT © 2026 Lava Security
