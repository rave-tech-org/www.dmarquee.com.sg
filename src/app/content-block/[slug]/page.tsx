import { useContentBlocks } from '@/hooks/local/use-content-blocks';
import { useEntries } from '@/hooks/local/use-entries';
import { sanityFetch } from '@/sanity/lib/client';
import { GetContentBlockBySlug } from '@/sanity/lib/queries/cms';
import type { GetContentBlockResult } from '@/sanity/sanity.types';
import '@/styles/tailwind.css';

export default async function ContentBlockPage({ params }: { params: { slug: string } }) {
  const block = await sanityFetch<GetContentBlockResult>({
    query: GetContentBlockBySlug,
    isDraft: true,
    tags: ['contentBlock'],
    qParams: { slug: params?.slug || 'home-banner' },
  });

  const [entries, contentBlock] = await Promise.all([useEntries(), useContentBlocks()]);

  const Component = contentBlock.get(block?.slug?.current || '');
  return Component ? <Component entries={entries} block={block} /> : null;
}
