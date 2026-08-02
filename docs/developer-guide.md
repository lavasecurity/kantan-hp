# Developer guide

This is the technical companion to the layman-facing [README](../README.md). It covers
local setup, customization, and the internals of the starter.

## Stack

- **[Astro](https://astro.build)** — static site generator (Node.js/npm, version 22+).
- **[Decap CMS](https://decapcms.org)** — web editor at `/admin` that commits Markdown
  to your Git repo.
- **Cloudflare Pages** — free hosting; rebuilds on every push.

## Run locally

```bash
git clone https://github.com/lavasecurity/kantan-hp.git
cd kantan-hp
npm install
npm run dev          # http://localhost:4321
```

```bash
npm run build        # static site -> dist/
npm run preview      # serve the built site locally
npm run check        # typecheck (Astro/TS)
```

## Deploy

Build command `npm run build`, output directory `dist`. Deploy the `dist/` folder
anywhere (Cloudflare Pages, Netlify, Vercel, S3, ...). See the README for the
Cloudflare Pages "Connect to Git" steps.

> Change `site` in [`astro.config.mjs`](../astro.config.mjs) from the placeholder
> `https://your-site.example.com` to your real domain so the RSS feed and sitemap point
> to the right URLs.
>
> The build reads the site URL from, in priority order: the `PUBLIC_SITE_URL`
> environment variable (set it in the Cloudflare Pages project or the deploy
> workflow), the `site.url` field in `src/config.json`, or the placeholder.

## Where things live

| Area | File |
| --- | --- |
| Site title, tagline, theme, nav | [`src/config.json`](../src/config.json) (edited by the editor's **Settings** tab) |
| Theme presets (AstroPaper color schemes) | [`src/styles/themes.css`](../src/styles/themes.css) |
| Layout / component styles | [`src/styles/global.css`](../src/styles/global.css) |
| Shared components | [`src/components/`](../src/components) (Header, Footer, Card, ...) |
| Pages (home, blog list, about) | [`src/pages/`](../src/pages) |
| Layouts (head, header/footer) | [`src/layouts/`](../src/layouts) |
| Blog post schema | [`src/content.config.ts`](../src/content.config.ts) |
| Decap editor fields | [`public/admin/config.yml`](../public/admin/config.yml) |
| Post content | [`src/content/blog/`](../src/content/blog) (Markdown) |
| Standalone pages (About) | [`src/content/pages/`](../src/content/pages) (Markdown) |
| Static assets / images | [`public/`](../public) |
| CI (typecheck + build) | [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) |

## Folder layout

```
kantan-hp/
├── public/          # static assets copied to the built site
│   ├── admin/       # Decap CMS dashboard (config.yml, index.html)
│   └── images/      # images uploaded via the editor
├── src/
│   ├── components/  # Header, Footer, Card, Datetime, Tag, Socials, Pagination
│   ├── content/
│   │   ├── blog/    # blog posts (Markdown files)
│   │   └── pages/   # standalone pages, e.g. about.md
│   ├── layouts/     # BaseLayout.astro, PostLayout.astro
│   ├── pages/       # home, /blog, /blog/[slug], /about, /rss.xml, /404
│   ├── scripts/     # theme toggle
│   ├── styles/      # global.css, themes.css
│   ├── config.json  # site settings (edited via the Settings tab)
│   └── config.ts    # typed accessors for config.json
├── astro.config.mjs
└── package.json
```

## Settings tab and theme presets

The editor's **Settings** tab edits `src/config.json` (title, tagline, author, theme
preset, nav, socials) and commits it like a post, so changes deploy automatically. The
theme preset selects an **AstroPaper color scheme** — the palettes live in
`src/styles/themes.css` and are keyed off `data-preset` on `<html>`. Light/dark mode is
toggled per visitor and stored in `localStorage`; the `data-theme` attribute is set
before paint to avoid a flash of the wrong theme.

To add a new preset: add its light/dark variable block to `themes.css` and its option to
the `theme.preset` select in `public/admin/config.yml`.

## Content contract

Blog posts live in `src/content/blog/` with frontmatter `title`, `description`,
`pubDate`, `updatedDate`, `heroImage`, `tags`, `draft` — matching the Decap **Blog**
collection. Drafts are visible in the editor but never built, so the editor and the
site agree on what is published. Standalone pages (the **Pages** tab) live in
`src/content/pages/` with `title`, `description` and a Markdown body.

## Editor login (one time)

To publish from `/admin`, Decap must authenticate to GitHub on your behalf. Follow
[`docs/github-oauth-setup.md`](github-oauth-setup.md).

## Contributing

```bash
npm run check && npm run build
```

Then open a PR. See [`CONTRIBUTING.md`](../CONTRIBUTING.md).
