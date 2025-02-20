'use client';

import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { PortableText } from 'next-sanity';
import Carousel from './carousel';

export default function EventType({ block }: ContentBlockRegistry) {
  return (
    <article id={block?.slug?.current} className="bg-[#EEE] main-padding-x main-padding-y-longer">
      <div className="component-wrapper space-padding">
        <header className="mx-auto text-center max-w-xl space-y-4 [&_strong]:text-primary [&_strong]:font-medium">
          <PortableText value={block?.description ?? []} />
        </header>
        <Carousel block={block} />
      </div>
    </article>
  );
}
