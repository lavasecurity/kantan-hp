import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Resolve the real site URL so RSS/sitemap point at the live domain.
// Priority: build-time env var (set by the kantan panel or deploy.yml) >
// `site.url` in src/config.json > the placeholder below.
function resolveSite() {
  if (process.env.PUBLIC_SITE_URL) return process.env.PUBLIC_SITE_URL;
  try {
    const raw = JSON.parse(
      readFileSync(fileURLToPath(new URL('./src/config.json', import.meta.url)), 'utf8'),
    );
    const settings = Array.isArray(raw) ? raw[0] : raw;
    if (settings?.site?.url) return settings.site.url;
  } catch {
    /* fall through to the placeholder */
  }  return 'https://your-site.example.com';
}

// https://astro.build/config
export default defineConfig({
  site: resolveSite(),
  integrations: [sitemap()],
  output: 'static',
  server: {
    port: 4321,
  },
});
