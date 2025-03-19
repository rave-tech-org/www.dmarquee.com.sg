import NextImage from '@/elements/next-image';
import PortableSanityText from '@/elements/portable-sanity-text';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { PortableText } from 'next-sanity';

export default function CreatingUnforgettableMoments({ block }: ContentBlockRegistry) {
  if (!block) return null;
  return (
    <article id={block.slug?.current} className="main-padding">
      <div className="component-wrapper grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 bg-[#EEE] main-padding">
        <NextImage src={block.imageUrl} className="h-full object-cover object-top" />
        <PortableSanityText
          className="[&_strong]:text-primary [&_strong]:font-medium [&_h2]:font-medium [&_h2]:xl:leading-[3.75rem] space-y-6"
          value={block.description ?? []}
        />
      </div>
    </article>
  );
}
