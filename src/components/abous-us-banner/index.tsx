import NextImage from '@/elements/next-image';
import PortableSanityText from '@/elements/portable-sanity-text';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { PortableText } from 'next-sanity';

export default function AboutUsBanner({ block }: ContentBlockRegistry) {
  if (!block) return null;
  return (
    <article id={block.slug?.current} className="main-padding">
      <div className="component-wrapper">
        <figure className="relative">
          <PortableSanityText
            value={block.description}
            className="absolute centered text-white space-y-6 text-center"
          />
          <NextImage src={block.imageUrl} className="aspect-auto w-full" />
        </figure>
      </div>
    </article>
  );
}
