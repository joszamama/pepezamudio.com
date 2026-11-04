const modules = import.meta.glob('../content/posts/*.md', { eager: true });

export const posts = Object.entries(modules)
  .map(([path, module]) => ({
    slug: path.split('/').pop().replace(/\.md$/, ''),
    ...module.frontmatter,
    Content: module.Content,
  }))
  .sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug) => posts.find((post) => post.slug === slug);

export const postUrl = (post) => `/blog/${post.slug}/`;
