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
- Editors don't need to touch code or git. Just a browser.

---

## How to get started

1. **Make your own copy** of this project (press the "Fork" button above, or "Use this template").
2. **Connect it to Cloudflare Pages** so it goes live. Cloudflare gives you a free website address.
3. **Start writing** at `your-site.com/admin`.

### Step 1 — Make a copy
Click **Fork** (or **Use this template**) at the top of this page to create your own copy in your GitHub account. If you don't have a GitHub account yet, it's free to create one at [github.com](https://github.com).

### Step 2 — Publish it (one time)
Go to [Cloudflare](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**. Choose your copy of this project, then:
- Build command: `npm run build`
- Output directory: `dist`

Cloudflare does the rest — it builds and publishes automatically. You'll get a free address like `your-site.pages.dev` (you can add your own domain later).

### Step 3 — Write your first post
Open `your-site.pages.dev/admin`, accept the "login" prompt, click **Blog → New Blog**, write your title and text, upload a picture, and press **Publish**. It goes live on your site within about a minute.

That's it. Everything else is optional.

---

## Want to change how it looks?

The site itself is a normal **Astro** project. If you (or someone technical) want to
tweak colors, layout, or add pages, edit the files in `src/` and the site rebuilds
automatically.

See **the [Developer guide](docs/developer-guide.md)** for setup and customization details,
and **the [GitHub login guide](docs/github-oauth-setup.md)** if publishing from the editor
asks you to set up a GitHub login.

---

## License

MIT © 2026 Lava Security
