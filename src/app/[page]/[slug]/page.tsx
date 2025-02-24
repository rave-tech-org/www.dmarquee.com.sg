import { useContentBlocks } from '@/hooks/local/use-content-blocks';
import { useEntries } from '@/hooks/local/use-entries';
import { sanityFetch } from '@/sanity/lib/client';
import { GetPage } from '@/sanity/lib/queries/cms';
import type { GetPageResult } from '@/sanity/sanity.types';
import { notFound } from 'next/navigation';
import '@/styles/tailwind.css';

// MULTIPLE PAGE RENDERING
export default async function PageSlugPage() {
  const [entries, contentBlock] = await Promise.all([useEntries(), useContentBlocks()]);
  const { page, slug } = entries.route;

  const data = await sanityFetch<GetPageResult>({
    query: GetPage,
    qParams: { name: page },
    tags: ['page', 'contentBlock'],
  });

  if (!page || !slug || !data?.layout?.length) notFound();

  return data?.layout?.map((block) => {
    if (!block?.slug?.current) return null;

    const Component = contentBlock.get(block.slug.current);
    return Component ? <Component key={block._id} block={block} entries={entries} /> : null;
  });
}
