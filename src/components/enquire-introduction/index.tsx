'use client';

import NextImage from '@/elements/next-image';
import PortableSanityText from '@/elements/portable-sanity-text';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { PortableText } from 'next-sanity';

export default function EnquireIntroduction({ block }: ContentBlockRegistry) {
  return (
    <article id={block?.slug?.current} className="main-padding enquire-introduction-wrapper">
      <div className="component-wrapper">
        <PortableSanityText
          className="main-padding bg-[#F2F2F2] space-text max-md:text-center !pb-24 [&_strong]:text-primary [&_strong]:font-medium w-full"
          value={block?.description ?? []}
        />

        {block?.imageUrl ? (
          <NextImage
            src={block?.imageUrl}
            className="w-full max-md:aspect-video md:h-[20rem] object-[80%_top] md:object-right-top -mt-16 object-cover"
          />
        ) : null}
      </div>
    </article>
  );
}
