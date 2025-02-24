import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { PortableText } from 'next-sanity';

export default function PageTitleBanner({ block }: ContentBlockRegistry) {
  if (!block) return null;

  return (
    <article id={block.slug?.current}>
      <figure className="relative">
        <NextImage src={block.imageUrl} className="object-center object-cover size-full" />
        <figcaption className="text-white component-wrapper absolute centered text-center">
          <PortableText value={block.description ?? []} />
        </figcaption>
      </figure>
    </article>
  );
}
