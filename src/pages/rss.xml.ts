import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../config';

const posts = (await getCollection('blog')).filter((post) => !post.data.draft);

export const GET = () =>
  rss({
    title: site.title,
    description: site.description,
    site: new URL('/', import.meta.env.SITE),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
    })),
  });
