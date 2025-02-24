import { PATHS } from '@/app/urls';

const pageRegistry = new Map([
  ['discoverdmq', PATHS.main],
  [PATHS.news.replace('/', ''), PATHS.newsBlogIndex],
  [PATHS.blog.replace('/', ''), PATHS.newsBlogIndex],
]);

export default pageRegistry;
