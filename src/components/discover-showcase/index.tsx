'use client';

import { PATHS } from '@/app/urls';
import { buttonVariants } from '@/elements/button';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { cn } from '@/lib/utils';
import { transformObject } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import Carousel from './carousel';

export default function EventType({ block }: ContentBlockRegistry) {
  const custom =
    block?.customAttributes && transformObject<{ 'btn-text': string; 'btn-href': string }>(block?.customAttributes);

  const btnText = custom?.['btn-text'];
  const btnHref = custom?.['btn-href'] ?? PATHS.main;

  return (
    <article id={block?.slug?.current} className="bg-[#EEE] main-padding-x main-padding-y-longer">
      <div className="component-wrapper space-padding">
        <header className="mx-auto space-y-4 [&_strong]:text-primary [&_strong]:font-medium">
          <PortableText value={block?.description ?? []} />
        </header>
        <Carousel block={block} />

        <Link
          target={btnHref.startsWith('/asset') ? '_blank' : undefined}
          href={btnHref}
          className={cn(buttonVariants({ className: 'mx-auto' }))}
        >
          {btnText}
        </Link>
      </div>
    </article>
  );
}
