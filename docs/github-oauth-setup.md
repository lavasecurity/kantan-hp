# Setting up GitHub login for Decap CMS

Decap CMS commits your content to the Git repository on your behalf, so it must be able
to authenticate as you. This guide walks through the once-only setup.

> This page is a developer/admin task. Editors don't need to do any of it.

The authentication is handled by **Cloudflare Pages Functions** included in this repo
(`functions/api/auth.js` and `functions/api/callback.js`), so there is no external server
to run — it deploys together with your site.

---

## What you need

- Admin access to the GitHub account or organization that owns your fork of this repository.
- Admin access to your Cloudflare Pages project.
- A **classic GitHub OAuth App** (not a GitHub App).

---

## Step 1 — Create a GitHub OAuth App

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

## Step 2 — Add the credentials to Cloudflare Pages

1. In the Cloudflare Dashboard, open your Pages project →
   **Settings → Environment variables** (or **Variables and secrets**).
2. Add two variables:
   - `OAUTH_GITHUB_CLIENT_ID` = your client ID
   - `OAUTH_GITHUB_CLIENT_SECRET` = your client secret
3. Mark the secret as a **secret** so it is hidden from build logs.
4. Save and redeploy your site so the new variables take effect.

## Step 3 — Point Decap at your fork

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
  the site wasn't redeployed after adding them (step 2).
- **Login works but nothing saves:** the person's GitHub account lacks write access to the
  repository named in `config.yml`. Grant them write access (or point `repo` at a repo they
  can write to).
