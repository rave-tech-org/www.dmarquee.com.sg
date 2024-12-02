import SkeletonLoader from '@/elements/skeleton-loader';
import { useContentBlocks } from '@/hooks/local/use-content-blocks';
import { useEntries } from '@/hooks/local/use-entries';
import { sanityFetch } from '@/sanity/lib/client';
import { GetPage, GetPageMeta } from '@/sanity/lib/queries/cms';
import type { GetPageResult, Page } from '@/sanity/sanity.types';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  const homePage = await sanityFetch<Pick<Page, 'metaTitle' | 'metaDescription' | 'metaKeywords'>>({
    query: GetPageMeta,
    tags: ['page'],
    qParams: { name: 'tour-search-page' },
  });

  return {
    title: homePage?.metaTitle || 'Lago Travel',
    description: homePage?.metaDescription || 'Lago Travel',
  };
}

export default async function Home() {
  const homePage = await sanityFetch<GetPageResult>({
    query: GetPage,
    tags: ['page', 'contentBlock'],
    qParams: { name: 'tour-search-page' },
  });

  const [entries, contentBlock] = await Promise.all([useEntries(), useContentBlocks()]);

  return (
    <main>
      {homePage?.layout?.map((block, index) => {
        const Component = contentBlock.get(block.slug?.current || '');

        return (
          <Suspense key={`home-page-${index}`} fallback={<SkeletonLoader />}>
            {Component ? <Component block={block} entries={entries} /> : null}
          </Suspense>
        );
      })}
    </main>
  );
}
