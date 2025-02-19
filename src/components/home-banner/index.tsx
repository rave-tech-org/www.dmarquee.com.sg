'use client';

import { buttonVariants } from '@/elements/button';
import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { transformObject } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import type { HomeBannerCustomAttribute } from './type';

export default function HomeBanner({ block }: ContentBlockRegistry) {
  const custom = block?.customAttributes && transformObject<HomeBannerCustomAttribute>(block?.customAttributes);

  const btnText = custom?.['btn-text'];
  const btnHref = custom?.['btn-href'] ?? '/';

  return (
    <article
      id={block?.slug?.current}
      className="main-padding home-banner-wrapper flex items-center justify-center min-h-[90vh]"
    >
      <div className="component-wrapper grid lg:grid-cols-2 gap-10 items-center lg:gap-24">
        <section className="flex flex-col">
          <section className="space-y-6 lg:space-y-10">
            <header className="space-text max-lg:text-center [&_h3]:text-primary">
              <PortableText value={block?.description ?? []} />
            </header>
            <Link
              target={btnHref.startsWith('/asset') ? '_blank' : undefined}
              href={btnHref}
              className={buttonVariants({ className: 'max-lg:mx-auto' })}
            >
              {btnText}
            </Link>
          </section>

          <div />
        </section>

        {block?.imageUrl ? (
          <section className="relative group max-lg:w-[90%] max-lg:mx-auto max-lg:mt-6 max-lg:translate-x-2">
            <NextImage
              src={block.imageUrl}
              className="aspect-square object-cover z-10 
              group-hover:lg:-translate-x-6 group-hover:lg:translate-y-6
              group-hover:-translate-x-4 group-hover:-translate-y-4
              animate"
            />
            <div
              className="bg-black absolute size-full aspect-square animate top-0 left-0 -z-10
              -translate-x-4 -translate-y-4
              lg:-translate-x-6 lg:translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0"
            />
          </section>
        ) : null}
      </div>
    </article>
  );
}
