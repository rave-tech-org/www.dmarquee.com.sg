import { sanityFetch } from '@/sanity/lib/client';
import { GetContentBlocks } from '@/sanity/lib/queries/cms';
import type { GetContentBlockResult, GetContentBlocksResult } from '@/sanity/sanity.types';
import type { Entries } from './use-entries';

export const slugToComponentMap: Record<string, string> = {
  // It allows multiple slugs to reuse the same component by mapping them to a common component slug or path.
  // Example: 'tour-experience' and 'tour-search-banner' both map to 'content-background' component.
  'tour-experience': 'content-background',
  'tour-search-banner': 'content-background',

  // Very special case
  'social-link': 'layout/navigation-menu',
  'navigation-menu': 'layout/navigation-menu',
  'footer-menu': 'layout/footer',
};

export const loadComponent = async (slug: string) => {
  const mappedSlug = slugToComponentMap[slug] || slug; // Resolve to actual slug if mapped
  try {
    const Component = (await import(`@/components/${mappedSlug}/index.tsx`)).default;
    return Component;
  } catch (error) {
    return null;
  }
};

const slugsToSkip: string[] = [];

export const useContentBlocks = async () => {
  const contentBlocks = await sanityFetch<GetContentBlocksResult>({
    query: GetContentBlocks,
    tags: ['contentBlock'],
  });

  const skippedSlugs: string[] = [];
  const notFoundComponentsSlugs: string[] = [];
  const foundComponentsSlugs: string[] = [];

  const filteredContentBlocks = contentBlocks.filter((e) => {
    if (!e.slug?.current) return false;
    const isRemoved = slugsToSkip.some((removeSlug) => e.slug?.current?.includes(removeSlug));
    if (isRemoved) skippedSlugs.push(e.slug.current);
    return !isRemoved;
  });

  const registry = new Map<
    string,
    ({ block, entries }: ContentBlockRegistry) => Promise<React.JSX.Element> | React.JSX.Element
  >();

  await Promise.all(
    filteredContentBlocks.map(async ({ slug }) => {
      if (slug?.current) {
        const Component = await loadComponent(slug.current);

        if (Component) {
          registry.set(slug.current, Component);
          foundComponentsSlugs.push(slug.current);
        } else notFoundComponentsSlugs.push(slug.current);
      }
    })
  );

  console.info('Skipped content-blocks:', skippedSlugs);
  console.log('Components found for these content-blocks:', foundComponentsSlugs);
  console.warn('Components not found for these content-blocks:', notFoundComponentsSlugs);

  return registry;
};

export type ContentBlockRegistry = { block: GetContentBlockResult; entries: Entries };
