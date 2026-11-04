import rss from '@astrojs/rss';
import { posts, postUrl } from '../lib/posts.js';

export function GET(context) {
  return rss({
    title: 'Pepe Zamudio — Blog',
    description: 'Research notes, project stories, and field notes from Pepe Zamudio.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      pubDate: new Date(`${post.date}T12:00:00Z`),
      link: postUrl(post),
    })),
  });
}
