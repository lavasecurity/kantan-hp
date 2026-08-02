# Kantan HP — a free, easy blog you can publish in minutes

[![Astro](https://img.shields.io/badge/Astro-7-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Decap CMS](https://img.shields.io/badge/Decap%20CMS-3-1f7a6b?logo=decap&logoColor=white)](https://decapcms.org)
[![Hosting: Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-free-F38020?logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Kantan** (かんたん) means **simple** — and that's the whole idea.

Kantan HP is a **ready-made blog** that costs **nothing** to run and is **easy to edit**
through a friendly web dashboard — no coding, no server, no database to manage.

**Read this in:** [English](README.md) · [日本語](README.ja.md) · [繁體中文](README.zh-Hant.md) · [简体中文](README.zh-Hans.md)

---

## What you get

- A **working blog** for free (hosted on Cloudflare Pages)
- A **web editor** at `your-site.com/admin` — write posts, add pictures, hit publish
- A **Settings** tab to change the site title, tagline, and theme — no code
- A welcome post already published, so your site is alive from the first deploy
- Editors don't need to touch code or git. Just a browser.

---

## How to get started

1. **Make your own copy** — [**Fork this repo**](https://github.com/lavasecurity/kantan-hp/fork).
2. **Connect it to Cloudflare Pages** so it goes live. Cloudflare gives you a free website address.
3. **Start writing** at `your-site.com/admin`.

### Step 1 — Make a copy
Click **[Fork](https://github.com/lavasecurity/kantan-hp/fork)** (or press the **Fork** button at the top of this page) to create your own copy in your GitHub account. If you don't have a GitHub account yet, it's free to create one at [github.com](https://github.com).

### Step 2 — Publish it (one time)
Go to [Cloudflare](https://dash.cloudflare.com) → **Workers & Pages** → **Create application**. On the **Create a Worker** page there's a small link at the bottom: **"Looking to deploy Pages? Get started"** — click it. It leads to the Pages setup that shows the framework preset and output directory. Then:

1. **Select a method** — choose **GitHub** (sign in / authorize if asked).
2. **Select a repository** — pick the copy you just forked.
3. **Create and deploy** — in the build settings:
   - **Framework preset:** **Astro**
   - **Project name:** anything you like (defaults to your repo name — this becomes your `*.pages.dev` address)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   
   Cloudflare detects it's an Astro project, so the preset may already fill these in.

> Prefer a shortcut? You can also go straight to the Pages flow via **Workers & Pages → Create application → Pages tab → Connect to Git** — the fields are the same, though the preset picker may not be shown there.

Then click **Save and Deploy**. Cloudflare does the rest — it installs, builds, and publishes automatically. You'll get a free address like `your-site.pages.dev` (you can add your own domain later).

### Step 3 — Write your first post
Before you can publish, you'll log in to GitHub once (the editor uses it to save your
posts). Follow the short **[GitHub login guide](docs/github-oauth-setup.md)** — about 5
minutes, one time.

Then open `your-site.pages.dev/admin`, click **Blog → New Blog**, write your title and
text, upload a picture, and press **Publish**. It goes live on your site within about a
minute. (A short welcome post is already published, so the blog is never empty.)

That's it. Everything else is optional.

---

## Change the title, tagline, and theme

In the editor, the **Settings** tab edits `src/config.json`: change the site **title**,
**tagline**, **author**, the **theme** (choose from the built-in AstroPaper color schemes),
or the **navigation** links. Press **Publish** and the live site updates automatically —
no code required.

To edit the **About** page, use the editor's **Pages** tab.

---

## Want to change how it looks?

The quickest way to restyle the site is the **Settings → Theme** picker in the editor.
The site itself is also a normal **Astro** project: if you (or someone technical) want to
tweak colors, layout, or add pages, edit the files in `src/` and the site rebuilds
automatically.

See **the [Developer guide](docs/developer-guide.md)** for setup and customization details,
and **the [GitHub login guide](docs/github-oauth-setup.md)** if publishing from the editor
asks you to set up a GitHub login.

---

## License

MIT © 2026 Lava Security
