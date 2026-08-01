# Setting up GitHub login for Decap CMS

Decap CMS commits your content to the Git repository on your behalf, so it must be able
to authenticate as you. The recommended approach for a team is a **GitHub OAuth App**
(or GitHub App). This guide walks through the once-only setup.

> This page is a developer/admin task. Editors don't need to do any of it.

---

## What you need

- Admin access to the GitHub account or organization that owns this repository.
- Admin access to your Cloudflare Pages project.

---

## Step 1 — Create a GitHub OAuth App

1. Log in to GitHub and open **Settings → Developer settings → OAuth Apps → New OAuth App**.
2. Fill in:
   - **Application name:** e.g. `kantan-hp CMS`
   - **Homepage URL:** `https://<your-site>.pages.dev`
   - **Authorization callback URL:** `https://<your-site>.pages.dev/admin/`
3. Click **Register application**.
4. On the app's page, copy the **Client ID** and the **Client secret** (click "Generate a
   new client secret" if needed). Keep the secret private.

> The callback URL must match exactly, including the trailing slash. If your site uses a
> custom domain, use that domain in the callback URL.

## Step 2 — Add the credentials to Cloudflare Pages

1. In the Cloudflare Dashboard, open your Pages project →
   **Settings → Environment variables** (or **Variables and secrets**).
2. Add two variables:
   - `OAUTH_GITHUB_CLIENT_ID` = your client ID
   - `OAUTH_GITHUB_CLIENT_SECRET` = your client secret
3. Mark the secret as a **secret** so it is hidden from build logs.
4. Save and redeploy your site so the new variables take effect.

## Step 3 — Point Decap at GitHub

The `public/admin/config.yml` already configures the GitHub backend. You may need to set:

```yaml
backend:
  name: github
  repo: <your-github-user>/kantan-hp
  branch: main
```

If you used a GitHub App (not a classic OAuth App), you may also want
`use_graphql: true` and the correct `base_url` for your GitHub App's homepage. For the
simplest case (classic OAuth App + public repository), the default settings work.

---

## Troubleshooting

- **"Login failed" / 404 on callback:** the callback URL in GitHub doesn't match your
  site exactly. Re-check step 1.
- **Login works but nothing saves:** the repository isn't selected, or the person's
  GitHub account lacks write access to the repository. Grant them write access.
- **Blank `/admin`:** the `OAUTH_GITHUB_CLIENT_*` environment variables aren't set or
  the site wasn't redeployed after adding them (step 2).
