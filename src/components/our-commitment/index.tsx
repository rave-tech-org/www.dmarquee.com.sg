import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { PortableText } from 'next-sanity';

export default function OurCommitment({ block }: ContentBlockRegistry) {
  if (!block) return null;
  return (
    <article id={block.slug?.current} className="bg-primary main-padding-x main-padding-y-longer">
      <section className="component-wrapper xl:max-w-[48rem] mx-auto space-y-6 text-center text-white">
        <PortableText value={block?.description ?? []} />
      </section>
    </article>
  );
}
