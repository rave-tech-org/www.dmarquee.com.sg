'use client';

import { buttonVariants } from '@/elements/button';

import NextImage from '@/elements/next-image';

import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';

import { cn } from '@/lib/utils';

import { transformObject } from '@/utils';

import { PortableText } from 'next-sanity';

import Link from 'next/link';

import PortableSanityText from '@/elements/portable-sanity-text';
import type { EventTypeCustomAttribute } from './type';

export default function EventType({ block, entries }: ContentBlockRegistry) {
  const custom = block?.customAttributes && transformObject<EventTypeCustomAttribute>(block?.customAttributes);

  const btnText = custom?.['btn-text'];

  const btnHref = custom?.['btn-href'] ?? '/';

  return (
    <article className="lg:bg-muted-light main-padding discover-event-type-wrapper">
      <div className="component-wrapper main-padding-y space-padding lg:space-y-12">
        <PortableSanityText
          className="space-text text-center event-type-header-wrapper"
          value={block?.description ?? []}
        />
        <ul
          className="grid max-md:!grid-cols-1 max-lg:!grid-cols-2 gap-6 lg:gap-20"
          style={{ gridTemplateColumns: `repeat(${block?.listItems?.length}, minmax(0, 1fr))` }}
        >
          {block?.listItems?.map((e) => {
            return (
              <li key={e.title} className="space-text max-lg:flex flex-col max-lg:p-6 max-lg:bg-muted-light">
                {e.imageUrl ? (
                  <section className="aspect-square bg-primary w-16 md:w-20 flex items-center justify-center">
                    <NextImage src={e.imageUrl} className="w-10 md:w-12" />
                  </section>
                ) : null}
                <PortableSanityText className="space-y-2" value={e?.description ?? []} />
              </li>
            );
          })}
        </ul>
        <Link
          href={btnHref}
          target={btnHref.startsWith('/asset') ? '_blank' : undefined}
          className={cn(buttonVariants({ className: 'mx-auto' }))}
        >
          {btnText}
        </Link>
      </div>
    </article>
  );
}
