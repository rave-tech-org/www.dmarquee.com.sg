import { sanityFetch } from '@/sanity/lib/client';
import { GetContentBlocks } from '@/sanity/lib/queries/cms';
import type { GetContentBlockResult, GetContentBlocksResult } from '@/sanity/sanity.types';
import type { Entries } from './use-entries';

export const slugToComponentMap: Record<string, string> = {
  'plan-without-limits': 'plan-your-next-event-with-us',
  'loyalty-programme': 'plan-your-next-event-with-us',
  'plan-your-next-event-with-us-gallery': 'plan-your-next-event-with-us',

  'the-d-marquee-experience': 'customised-event-solutions-banner',
  'occasions-at-d-marquee': 'customised-event-solutions-banner',
  'corporate-and-business-events': 'occasions-banner',
  'social-and-celebratory-events': 'occasions-banner',
  'private-gatherings-and-family-events': 'occasions-banner',
  'concerts-and-live-performances': 'occasions-banner',
};

export const loadComponent = async (slug: string) => {
  const mappedSlug = slugToComponentMap[slug] || slug;
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
    isDraft: true,
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
