import { useContentBlocks } from '@/hooks/local/use-content-blocks';
import { useEntries } from '@/hooks/local/use-entries';
import { sanityFetch } from '@/sanity/lib/client';
import { GetPage, GetPageMeta } from '@/sanity/lib/queries/cms';
import type { GetPageMetaResult, GetPageResult } from '@/sanity/sanity.types';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '@/styles/tailwind.css';

type Props = { params: { page: string } };

const getData = async (name: string) => {
  const data = await sanityFetch<GetPageResult>({
    query: GetPage,
    qParams: { name },
    tags: ['page'],
  });
  return data;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const homePage = await sanityFetch<GetPageMetaResult>({
    query: GetPageMeta,
    tags: ['page'],
    qParams: { name: params.page },
  });
  return {
    title: homePage?.metaTitle || "D'Marquee",
    description: homePage?.metaDescription || "D'Marquee",
  };
}

// SINGLE PAGE RENDERING
export default async function PageByPage({ params }: Props) {
  const { page } = params;
  const data = await getData(page);

  console.log(data);
  const [entries, contentBlock] = await Promise.all([useEntries(), useContentBlocks()]);

  // Multiple page redirect handler
  if (!data) notFound();

  return data?.layout?.map((block) => {
    if (!block?.slug?.current) return null;
    const Component = contentBlock.get(block.slug.current);
    return Component ? <Component key={block._id} block={block} entries={entries} /> : null;
  });
}
