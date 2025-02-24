import { PATHS, getUrl } from '@/app/urls';
import { useEntries } from '@/hooks/local/use-entries';
import pageRegistry from '@/resources/page-registry';
import { sanityFetch } from '@/sanity/lib/client';
import { GetPages } from '@/sanity/lib/queries/cms';
import type { GetPagesResult } from '@/sanity/sanity.types';
import type { MetadataRoute } from 'next';

const getEntry = (path: string) => ({ url: getUrl({ path }), lastModified: new Date() });

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const ALL_PATHS = await sanityFetch<GetPagesResult>({ query: GetPages, tags: ['page'] });

  const definedAllPaths = ALL_PATHS.map((e) => e.slug?.current)
    .filter((e) => e && !pageRegistry.has(e))
    .map((e) => `/${e}`);

  const entries = await useEntries();

  const posts = entries.posts;

  const postsPath = posts.map((e) => e.path) || [];

  return [...[PATHS.main, ...definedAllPaths], ...postsPath].map(getEntry);
}
