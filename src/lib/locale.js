export const localizedHref = (path, locale) => {
  if (locale !== 'es' || !path.startsWith('/')) return path;
  return `/es${path}`;
};

export const englishPath = (path) => path.replace(/^\/es(?=\/|$)/, '') || '/';
export const spanishPath = (path) => `/es${englishPath(path)}`;
