const addPath = (path: string) => (path === PATHS.main ? '' : path);
const getUrl = ({ path, type = 'production' }: { path: string; type?: keyof typeof BASE_URL }) =>
  `${BASE_URL[type]}${addPath(path)}`;
const isExternalLink = (href: string) => href.startsWith('http');

const getBaseUrl = () => {
  if (IS_CLIENT) return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

const createUrl = (path: string, params: Record<string, string | string[]>) => {
  const queryString = Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`;
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');
  return `${path}${queryString ? `?${queryString}` : ''}`;
};

const IS_CLIENT = typeof window !== 'undefined';
const BASE_URL = {
  development: getBaseUrl(),
  production: process.env.NEXT_PUBLIC_URL,
};
const ENDPOINTS = {
  ogImage: '/assets/opengraph.png',
  sitemap: '/sitemap.xml',
};

const PATHS = {
  main: '/',
  blog: '/blog',
  news: '/news',
  newsBlogIndex: '/news-and-blog',
};
const ALL_PATHS = Object.values(PATHS).flat();
const URLS = {
  ogImage: getUrl({ path: ENDPOINTS.ogImage }),
  sitemap: getUrl({ path: ENDPOINTS.sitemap }),
};

const HEADERS = { path: 'path', isDraft: 'isDraft' };

export {
  addPath,
  getBaseUrl,
  getUrl,
  isExternalLink,
  createUrl,
  URLS,
  BASE_URL,
  ENDPOINTS,
  ALL_PATHS,
  PATHS,
  IS_CLIENT,
  HEADERS,
};
