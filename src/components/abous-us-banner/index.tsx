import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { PortableText } from 'next-sanity';

export default function AboutUsBanner({ block }: ContentBlockRegistry) {
  if (!block) return null;
  return (
    <article id={block.slug?.current} className="main-padding">
      <div className="component-wrapper">
        <figure className="relative">
          <section className="absolute centered text-white space-y-6 text-center">
            <PortableText value={block.description ?? []} />
          </section>
          <NextImage src={block.imageUrl} className="aspect-auto w-full" />
        </figure>
      </div>
    </article>
  );
}
