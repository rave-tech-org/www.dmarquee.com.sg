import { PATHS } from '@/app/urls';

const pageRegistry = new Map([
  ['home', PATHS.main],
  [PATHS.news.replace('/', ''), PATHS.newsBlogIndex],
  [PATHS.blog.replace('/', ''), PATHS.newsBlogIndex],
]);

export default pageRegistry;
