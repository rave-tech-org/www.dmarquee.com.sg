import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { PortableText } from 'next-sanity';

export default function PageTitleBanner({ block }: ContentBlockRegistry) {
  if (!block) return null;

  return (
    <article id={block.slug?.current}>
      <figure className="relative">
        <NextImage src={block.imageUrl} className="max-md:aspect-video object-center object-cover size-full" />
        <div className="main-padding-x absolute centered w-full">
          <figcaption className="text-white component-wrapper text-center space-y-4">
            <PortableText value={block.description ?? []} />
          </figcaption>
        </div>
      </figure>
    </article>
  );
}
