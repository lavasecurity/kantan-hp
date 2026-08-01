# Decap CMS の GitHub ログイン設定

**他の言語で読む：** [English](github-oauth-setup.md) · [日本語](github-oauth-setup.ja.md) · [繁體中文](github-oauth-setup.zh-Hant.md) · [简体中文](github-oauth-setup.zh-Hans.md)

Decap CMS はあなたの代わりに Git リポジトリへコンテンツをコミットするため、あなたとして
ログインできる必要があります。このガイドでは一度だけ行う設定を説明します。

> これは開発者／管理者向けの作業です。編集者は何もする必要はありません。

認証はこのリポジトリに同梱された **Cloudflare Pages Functions**
（`functions/api/auth.js` と `functions/api/callback.js`）が処理するため、外部サーバーは
不要です。サイトと一緒に自動的にデプロイされます。

設定の方法は2つあります：
- **[A. ワンタイム設定アクション（推奨）](#a-ワンタイム設定アクション推奨)** — このリポジトリに
  同梱の GitHub Actions ワークフローが、認証情報を Cloudflare に書き込んでくれます。
- **[B. Cloudflare での手動設定](#b-cloudflare-での手動設定)** — 自分でダッシュボードを操作したい場合。

どちらも最初は同じ：GitHub OAuth App を作成します。

---

## 手順1 — GitHub OAuth App を作成する（両方共通）

1. GitHub にログインし、**Settings → Developer settings → OAuth Apps → New OAuth App** を開く。
2. 次の項目を入力：
   - **Application name:** 例 `kantan-hp CMS`
   - **Homepage URL:** `https://<your-site>.pages.dev`
   - **Authorization callback URL:** `https://<your-site>.pages.dev/api/callback`
3. **Register application** をクリック。
4. アプリのページで **Client ID** と **Client secret** をコピー（必要なら **Generate a
   new client secret** をクリック）。secret は秘密に保管すること。

> 独自ドメインを使う場合は、上記すべて（Homepage URL と callback URL の両方）でその
> ドメインを使うこと。

---

## A. ワンタイム設定アクション（推奨）

このリポジトリには、認証情報を Cloudflare Pages プロジェクトに書き込み、再デプロイする
ワークフロー（`.github/workflows/decap-oauth-setup.yml`）が含まれています。認証情報は
**リポジトリシークレット**として保存するため（ログに漏れません）、一度だけ追加します：

1. **Cloudflare API トークン**（Cloudflare ダッシュボード → My Profile → **API Tokens** →
   **Create Token**）を **"Cloudflare Pages: Edit"** 権限付きで作成し、**Account ID**
   （ダッシュボード右側のサイドバー）も取得する。
2. GitHub リポジトリで **Settings → Secrets and variables → Actions** に追加：
   - `GH_OAUTH_CLIENT_ID` = GitHub OAuth App の Client ID（手順1 のもの）
   - `GH_OAUTH_CLIENT_SECRET` = GitHub OAuth App の Client secret（手順1 のもの）
   - `CF_API_TOKEN` = 上記のトークン
   - `CF_ACCOUNT_ID` = お使いの Cloudflare アカウント ID
   - `CF_DEPLOY_HOOK`（任意）= Cloudflare のデプロイフック URL（下記参照）。ワークフローに
     再デプロイも任せる場合に設定
3. **Actions → "Setup Decap CMS login" → Run workflow** を開き、**Project name**
   （`*.pages.dev` URL のプロジェクト名）だけを入力。

ワークフローが認証情報を Cloudflare Pages に書き込み（キー単位マージなので、他の
環境変数は保持されます）、デプロイフックでサイトを再デプロイします。
これで完了 — `/admin` を開いて GitHub でログインしてください。

**任意のデプロイフック：** ワークフローに再デプロイも任せる場合、先に Cloudflare の
Pages プロジェクト → **Settings → Builds → Add deploy hook** で作成し、その URL を
`CF_DEPLOY_HOOK` シークレットに設定。設定しない場合、新しい環境変数は次回の
git push で反映されます。

---

## B. Cloudflare での手動設定

1. Cloudflare ダッシュボードで Pages プロジェクトを開き、
   **Settings → Environment variables**（または **Variables and secrets**）。
2. 2つの変数を追加：
   - `OAUTH_GITHUB_CLIENT_ID` = お使いの Client ID
   - `OAUTH_GITHUB_CLIENT_SECRET` = お使いの Client secret
3. secret は**秘密**に設定してビルドログから隠す。
4. 保存してサイトを再デプロイ（新しい変数が反映される）。

---

## Decap を自分のフォークに向ける（両方共通）

`public/admin/config.yml` で更新するのは `repo` だけ — **自分のフォーク**（上流ではなく）に設定：

```yaml
backend:
  name: github
  repo: <your-github-user>/kantan-hp
  branch: main
```

`base_url` や `auth_endpoint` を設定する必要はありません。`public/admin/index.html` が自動で
注入する（サイト自身の origin を使用）ため、どのフォーク／独自ドメインでも `/admin` が
追加設定なしで動作します。

---

## 仕組み

1. 編集者が `/admin` を開き、**Login with GitHub** をクリック。
2. Decap が `<your-site>/api/auth` へのポップアップを開き、GitHub の OAuth ページにリダイレクト。
3. 承認後、GitHub が `<your-site>/api/callback` にリダイレクトし、コードをアクセストークンに
   交換して Decap のウィンドウに返す。
4. Decap はそのトークンで `config.yml` のリポジトリにコンテンツをコミットする。

## トラブルシューティング

- **"Login failed" / callback で 404：** GitHub の Authorization callback URL がサイトと一致
  していない。`https://<your-site>.pages.dev/api/callback` にすること。手順1 を確認。
- **`Missing OAUTH_GITHUB_CLIENT_ID...` エラー：** 環境変数が未設定、または追加後にサイトを
  再デプロイしていない（設定アクションを再実行するか、セクションB を確認）。
- **ログインできるが保存できない：** `config.yml` に指定したリポジトリへの書き込み権限が
  ない。書き込み権限を付与する（または書き込めるリポジトリを `repo` に指定）。
