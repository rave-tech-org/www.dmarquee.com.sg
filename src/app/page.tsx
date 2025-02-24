import { useContentBlocks } from '@/hooks/local/use-content-blocks';
import { useEntries } from '@/hooks/local/use-entries';
import { sanityFetch } from '@/sanity/lib/client';
import { GetPage } from '@/sanity/lib/queries/cms';
import type { GetPageResult } from '@/sanity/sanity.types';
import { notFound } from 'next/navigation';

const getData = async (name: string) => {
  const data = await sanityFetch<GetPageResult>({
    query: GetPage,
    qParams: { name },
    tags: ['page', 'contentBlock'],
  });
  return data;
};

// SINGLE PAGE RENDERING
export default async function PageByPage() {
  const data = await getData('home');

  const [entries, contentBlock] = await Promise.all([useEntries(), useContentBlocks()]);

  // Multiple page redirect handler
  if ((data?.pageType === 'multiple' && !entries.route.slug) || (data?.pageType !== 'multiple' && !data)) notFound();

  return data?.layout?.map((block) => {
    if (!block?.slug?.current) return null;
    const Component = contentBlock.get(block.slug.current);
    return Component ? <Component key={block._id} block={block} entries={entries} /> : null;
  });
}
