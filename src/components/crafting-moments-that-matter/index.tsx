import { buttonVariants } from '@/elements/button';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { transformObject } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import React from 'react';
import Carousel from './carousel';

export default function CraftingMoments({ block }: ContentBlockRegistry) {
  if (!block) return null;

  const custom =
    block?.customAttributes && transformObject<{ 'btn-text': string; 'btn-href': string }>(block?.customAttributes);

  const btnText = custom?.['btn-text'];
  const btnHref = custom?.['btn-href'] ?? '/';
  return (
    <article id={block?.slug?.current} className="bg-[#EEE] main-padding-x main-padding-y-longer">
      <div className="component-wrapper space-padding">
        <section className="grid grid-cols-2">
          <section className="[&_strong]:font-medium [&_strong]:text-primary">
            <PortableText value={block.customAttributes?.find((e) => e.key === 'title')?.description ?? []} />
          </section>
          <header className="space-y-6">
            <PortableText value={block.description ?? []} />
            <Link
              target={btnHref.startsWith('/asset') ? '_blank' : undefined}
              href={btnHref}
              className={buttonVariants({ className: 'max-lg:mx-auto' })}
            >
              {btnText}
            </Link>
          </header>
        </section>

        <Carousel block={block} />
      </div>
    </article>
  );
}
