const modules = import.meta.glob('../content/posts/*.md', { eager: true });
const spanishModules = import.meta.glob('../content/posts-es/*.md', { eager: true });

const parsePosts = (entries) => Object.entries(entries)
  .map(([path, module]) => ({
    slug: path.split('/').pop().replace(/\.md$/, ''),
    ...module.frontmatter,
    Content: module.Content,
  }))
  .sort((a, b) => b.date.localeCompare(a.date));
export const posts = parsePosts(modules);
export const postsEs = parsePosts(spanishModules);

export const getPost = (slug) => posts.find((post) => post.slug === slug);

export const postUrl = (post, locale = 'en') => `${locale === 'es' ? '/es' : ''}/blog/${post.slug}/`;
