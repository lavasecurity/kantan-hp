# かんたんHP — 無料ですぐ始められるブログ

[![Astro](https://img.shields.io/badge/Astro-7-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Decap CMS](https://img.shields.io/badge/Decap%20CMS-3-1f7a6b?logo=decap&logoColor=white)](https://decapcms.org)
[![Hosting: Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-free-F38020?logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**かんたん** という名前の通り、**シンプル** が一番のコンセプトです。

かんたんHPは、**無料で動く** すぐ使える**ブログ**です。分かりやすいウェブ画面から
**簡単に編集** でき、サーバーもデータベースも管理も不要です。

**他の言語で読む：** [English](README.md) · [日本語](README.ja.md) · [繁體中文](README.zh-Hant.md) · [简体中文](README.zh-Hans.md)

---

## できること

- **ブログが無料**で公開できます（Cloudflare Pages でのホスティング）
- **ウェブ編集画面**（`your-site.com/admin`）で、記事の執筆・画像追加・公開ができます
- 編集者はコードやgitに触れる必要はありません。ブラウザだけです。

---

## 始め方

1. **このプロジェクトのコピー**を作ります — [**このリポジトリをFork**](https://github.com/lavasecurity/kantan-hp/fork)。
2. **Cloudflare Pages に接続**して公開します。無料のウェブアドレスがもらえます。
3. **`your-site.com/admin`** で記事を書き始めます。

### 手順1 — コピーを作る
**[Fork](https://github.com/lavasecurity/kantan-hp/fork)**（またはこのページ上部の **Fork** ボタン）を
クリックして、GitHubの自分のアカウントにコピーを作成します。GitHubアカウントがまだ無ければ、[github.com](https://github.com)
で無料で作れます。

### 手順2 — 公開する（一度だけ）
[Cloudflare](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** →
**Connect to Git** を開き、先ほど作ったコピーを選びます。あとは：
- Build command: `npm run build`
- Output directory: `dist`

Cloudflareが自動でビルド・公開してくれます。`your-site.pages.dev` のような無料アドレスが
もらえます（あとで独自ドメインも設定できます）。

### 手順3 — 最初の記事を書く
`your-site.pages.dev/admin` を開き、ログインを承認 → **Blog → New Blog** をクリック →
タイトルと本文を書き、画像をアップロードして **Publish** を押すだけ。約1分でサイトに公開されます。

以上です。それ以外はすべてオプションです。

---

## 見た目を変えたいですか？

サイト本体は通常の **Astro** プロジェクトです。色・レイアウト・ページ追加などを変更したい場合は、
`src/` 内のファイルを編集すれば自動で再ビルドされます。

セットアップやカスタマイズの詳細は **[開発者ガイド](docs/developer-guide.md)** を、
エディターからの公開時にGitHubログインの設定を求められた場合は
**[GitHubログイン設定ガイド](docs/github-oauth-setup.md)** を参照してください。

---

## ライセンス

MIT © 2026 Lava Security
