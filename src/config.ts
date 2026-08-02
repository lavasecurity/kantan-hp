// Site-wide settings for the blog.
//
// This is the JSON file the Decap CMS **Settings** tab edits (see
// public/admin/config.yml). It is a plain JSON object whose keys match the
// collection's fields. You can also edit this file by hand; the site rebuilds
// on the next deploy.

import userConfig from './config.json';

// The JSON type is inferred from the file's current content (via
// resolveJsonModule), so an editor removing an optional key (e.g. clearing
// Author) would change the inferred type and break `npm run check`. Cast to an
// explicit interface whose CMS-optional fields are optional instead.
export interface NavItem {
  label: string;
  url: string;
}

export interface SocialItem {
  name: string;
  url: string;
}

export interface SiteSettings {
  site?: {
    title?: string;
    description?: string;
    author?: string;
    url?: string;
  };
  theme?: {
    preset?: string;
  };
  nav?: NavItem[];
  socials?: SocialItem[];
}

const settings = (userConfig as SiteSettings) ?? {};

export const site = {
  title: settings.site?.title ?? 'Kantan HP',
  description:
    settings.site?.description ??
    'A free, simple blog you can publish in minutes — no server, no database, no code.',
  author: settings.site?.author ?? 'Kantan HP',
};

export const theme = {
  // Theme presets map to the AstroPaper color schemes in src/styles/themes.css
  // (paper, kha-yan, nila, jadeite, pyit-tine-htaung, deep-purple, ember, espresso).
  preset: settings.theme?.preset ?? 'paper',
};

export const nav: NavItem[] = settings.nav ?? [];

export const socials: SocialItem[] = settings.socials ?? [];
