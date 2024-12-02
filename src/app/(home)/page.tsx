import { useContentBlocks } from '@/hooks/local/use-content-blocks';
import { useEntries } from '@/hooks/local/use-entries';
import { sanityFetch } from '@/sanity/lib/client';
import { GetPage, GetPageMeta } from '@/sanity/lib/queries/cms';
import type { GetPageResult, Page } from '@/sanity/sanity.types';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const homePage = await sanityFetch<Pick<Page, 'metaTitle' | 'metaDescription' | 'metaKeywords'>>({
    query: GetPageMeta,
    tags: ['page'],
    qParams: { name: 'home-page' },
  });

  return {
    title: homePage?.metaTitle || 'D’Marquee',
    description: homePage?.metaDescription || 'D’Marquee',
  };
}

export default async function Home() {
  const homePage = await sanityFetch<GetPageResult>({
    query: GetPage,
    tags: ['page', 'contentBlock'],
    qParams: { name: 'home-page' },
  });

  const [entries, contentBlock] = await Promise.all([useEntries(), useContentBlocks()]);

  return homePage?.layout?.map((block) => {
    const Component = contentBlock.get(block.slug?.current || '');
    return Component ? <Component key={block._id} block={block} entries={entries} /> : null;
  });
}
