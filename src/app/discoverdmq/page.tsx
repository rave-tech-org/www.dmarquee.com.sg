import SkeletonLoader from '@/elements/skeleton-loader';
import { useContentBlocks } from '@/hooks/local/use-content-blocks';
import { useEntries } from '@/hooks/local/use-entries';
import { sanityFetch } from '@/sanity/lib/client';
import { GetPage, GetPageMeta } from '@/sanity/lib/queries/cms';
import type { GetPageResult, Page } from '@/sanity/sanity.types';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import '@/styles/tailwind.css';

export async function generateMetadata(): Promise<Metadata> {
  const homePage = await sanityFetch<Pick<Page, 'metaTitle' | 'metaDescription' | 'metaKeywords'>>({
    query: GetPageMeta,
    tags: ['page'],
    qParams: { name: 'discover-dmq' },
  });
  return {
    title: homePage?.metaTitle || 'Dmarquee',
    description: homePage?.metaDescription || 'Dmarquee',
    robots: 'noindex, nofollow',
  };
}
export default async function Home() {
  const homePage = await sanityFetch<GetPageResult>({
    query: GetPage,
    tags: ['page', 'contentBlock'],
    qParams: { name: 'discover-dmq' },
  });
  const [entries, contentBlock] = await Promise.all([useEntries(), useContentBlocks()]);

  return homePage?.layout?.map((block, index) => {
    const Component = contentBlock.get(block.slug?.current || '');
    return (
      <Suspense key={`home-page-${index}`} fallback={<SkeletonLoader />}>
        {Component ? <Component block={block} entries={entries} /> : null}
      </Suspense>
    );
  });
}
