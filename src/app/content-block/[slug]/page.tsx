import { useContentBlocks } from '@/hooks/local/use-content-blocks';
import { useEntries } from '@/hooks/local/use-entries';
import { sanityFetch } from '@/sanity/lib/client';
import { GetContentBlockBySlug } from '@/sanity/lib/queries/cms';
import type { GetContentBlockResult } from '@/sanity/sanity.types';

export default async function ContentBlockPage({ params }: { params: { slug: string } }) {
  const block = await sanityFetch<GetContentBlockResult>({
    query: GetContentBlockBySlug,
    tags: ['contentBlock'],
    qParams: { slug: params?.slug || 'home-banner' },
  });

  const [entries, contentBlock] = await Promise.all([useEntries(), useContentBlocks()]);

  const Component = contentBlock.get(block?.slug?.current || '');
  return <main className="block-wrapper">{Component ? <Component entries={entries} block={block} /> : null}</main>;
}
