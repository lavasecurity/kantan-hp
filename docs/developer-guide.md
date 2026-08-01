# Developer guide

This is the technical companion to the layman-facing [README](../README.md). It covers
local setup, customization, and the internals of the starter.

## Stack

- **[Astro](https://astro.build)** — static site generator (Node.js/npm, version 20+).
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

## Where things live

| Area | File |
| --- | --- |
| Site title & description | [`src/config.ts`](../src/config.ts) |
| Theme / colors / layout | [`src/styles/global.css`](../src/styles/global.css) |
| Pages (home, blog list) | [`src/pages/`](../src/pages) |
| Blog post schema | [`src/content/config.ts`](../src/content/config.ts) |
| Decap editor fields | [`public/admin/config.yml`](../public/admin/config.yml) |
| Post content | [`src/content/blog/`](../src/content/blog) (Markdown) |
| Static assets / images | [`public/`](../public) |
| CI (typecheck + build) | [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) |

## Folder layout

```
kantan-hp/
├── public/          # static assets copied to the built site
│   ├── admin/       # Decap CMS dashboard (config.yml, index.html)
│   └── images/      # images uploaded via the editor
├── src/
│   ├── content/blog # blog posts (Markdown files)
│   ├── layouts/     # BaseLayout.astro (shared header/footer)
│   ├── pages/       # home, /blog, /blog/[slug], /rss.xml
│   ├── styles/      # global.css
│   └── config.ts    # site metadata
├── astro.config.mjs
└── package.json
```

## Editor login (one time)

To publish from `/admin`, Decap must authenticate to GitHub on your behalf. Follow
[`docs/github-oauth-setup.md`](github-oauth-setup.md). For quick local editing without
OAuth, run `npm run decap` and use the local backend in `/admin`.

## Contributing

```bash
npm run check && npm run build
```

Then open a PR. See [`CONTRIBUTING.md`](../CONTRIBUTING.md).
