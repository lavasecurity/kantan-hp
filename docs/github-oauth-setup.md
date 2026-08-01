# Setting up GitHub login for Decap CMS

**Read this in:** [English](github-oauth-setup.md) · [日本語](github-oauth-setup.ja.md) · [繁體中文](github-oauth-setup.zh-Hant.md) · [简体中文](github-oauth-setup.zh-Hans.md)

Decap CMS commits your content to the Git repository on your behalf, so it must be able
to authenticate as you. This guide walks through the once-only setup.

> This page is a developer/admin task. Editors don't need to do any of it.

The authentication is handled by **Cloudflare Pages Functions** included in this repo
(`functions/api/auth.js` and `functions/api/callback.js`), so there is no external server
to run — it deploys together with your site.

There are two ways to finish the setup:
- **[A. One-time setup Action](#a-one-time-setup-action-recommended)** — a GitHub Actions
  workflow in this repo that writes the credentials into Cloudflare for you.
- **[B. Manual Cloudflare setup](#b-manual-cloudflare-setup)** — if you'd rather click
  through the Cloudflare dashboard yourself.

Both start the same way: create a GitHub OAuth App.

---

## Step 1 — Create a GitHub OAuth App (both paths)

1. Log in to GitHub and open **Settings → Developer settings → OAuth Apps → New OAuth App**.
2. Fill in:
   - **Application name:** e.g. `kantan-hp CMS`
   - **Homepage URL:** `https://<your-site>.pages.dev`
   - **Authorization callback URL:** `https://<your-site>.pages.dev/api/callback`
3. Click **Register application**.
4. On the app's page, copy the **Client ID** and the **Client secret** (click "Generate a
   new client secret" if needed). Keep the secret private.

> If your site uses a custom domain, use that domain everywhere above (both the homepage
> URL and the callback URL).

---

## A. One-time setup Action (recommended)

This repo ships a workflow (`.github/workflows/decap-oauth-setup.yml`) that pushes the
two credentials into your Cloudflare Pages project and redeploys. The credentials are
stored as **repository secrets** (so they're never logged), added once:

1. Get a **Cloudflare API token** (Cloudflare Dashboard → My Profile → **API Tokens** →
   **Create Token**) with the **"Cloudflare Pages: Edit"** permission, and your
   **Account ID** (Dashboard → right-hand sidebar).
2. In your GitHub repo, go to **Settings → Secrets and variables → Actions** and add:
   - `GH_OAUTH_CLIENT_ID` = your GitHub OAuth App client ID (from Step 1)
   - `GH_OAUTH_CLIENT_SECRET` = your GitHub OAuth App client secret (from Step 1)
   - `CF_API_TOKEN` = the token above
   - `CF_ACCOUNT_ID` = your Cloudflare account ID
   - `CF_DEPLOY_HOOK` (optional) = a Cloudflare deploy hook URL (see below), to have
     the workflow redeploy the site for you
3. Go to **Actions → "Setup Decap CMS login" → Run workflow** and enter only your
   **Project name** — the name in your `*.pages.dev` URL.

The workflow writes the credentials into Cloudflare Pages (per-key, so your other
environment variables are preserved) and redeploys your site via the deploy hook.
That's it — open `/admin` and log in with GitHub.

**Optional deploy hook:** to have the workflow trigger the redeploy itself, create one in
Cloudflare first: your Pages project → **Settings → Builds → Add deploy hook**, then set
its URL as the `CF_DEPLOY_HOOK` secret. Without it, the new env vars take effect on your
next git push.

---

## B. Manual Cloudflare setup

1. In the Cloudflare Dashboard, open your Pages project →
   **Settings → Environment variables** (or **Variables and secrets**).
2. Add two variables:
   - `OAUTH_GITHUB_CLIENT_ID` = your client ID
   - `OAUTH_GITHUB_CLIENT_SECRET` = your client secret
3. Mark the secret as a **secret** so it is hidden from build logs.
4. Save and redeploy your site so the new variables take effect.

---

## Point Decap at your fork (both paths)

The only thing to update in `public/admin/config.yml` is the `repo` — set it to **your
fork**, not the upstream:

```yaml
backend:
  name: github
  repo: <your-github-user>/kantan-hp
  branch: main
```

You don't need to set `base_url` or `auth_endpoint` — `public/admin/index.html` injects
them automatically (using your site's own origin), so `/admin` works on any fork or
custom domain without further configuration.

---

## How it works

1. The editor opens `/admin` and clicks **Login with GitHub**.
2. Decap opens a popup to `<your-site>/api/auth`, which redirects to GitHub's OAuth page.
3. After the user approves, GitHub redirects to `<your-site>/api/callback`, which exchanges
   the code for an access token and hands it back to the Decap window.
4. Decap uses that token to commit content to the repository in `config.yml`.

## Troubleshooting

- **"Login failed" / 404 on callback:** the authorization callback URL in GitHub doesn't
  match your site. It must be `https://<your-site>.pages.dev/api/callback`. Re-check step 1.
- **`Missing OAUTH_GITHUB_CLIENT_ID...` error:** the environment variables aren't set, or
  the site wasn't redeployed after adding them (run the setup Action again, or re-check
  section B).
- **Login works but nothing saves:** the person's GitHub account lacks write access to the
  repository named in `config.yml`. Grant them write access (or point `repo` at a repo they
  can write to).
