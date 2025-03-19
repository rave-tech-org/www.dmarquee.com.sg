import { PATHS } from '@/app/urls';
import { buttonVariants } from '@/elements/button';
import PortableSanityText from '@/elements/portable-sanity-text';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { sanityFetch } from '@/sanity/lib/client';
import { GetContentBlockBySlug } from '@/sanity/lib/queries/cms';
import type { GetContentBlockBySlugResult } from '@/sanity/sanity.types';
import { transformObject } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import React from 'react';
import Carousel from './carousel';

export default async function CraftingMoments({ block }: ContentBlockRegistry) {
  if (!block) return null;

  const custom =
    block?.customAttributes && transformObject<{ 'btn-text': string; 'btn-href': string }>(block?.customAttributes);

  const btnText = custom?.['btn-text'];
  const btnHref = custom?.['btn-href'] ?? PATHS.main;

  const carouselData = await sanityFetch<GetContentBlockBySlugResult>({
    query: GetContentBlockBySlug,
    qParams: { slug: 'event-type' },
    tags: ['contentBlock'],
  });

  return (
    <article id={block?.slug?.current} className="bg-[#EEE] main-padding-x main-padding-y-longer">
      <div className="component-wrapper space-padding">
        <section className="grid grid-cols-2">
          <PortableSanityText
            className="[&_strong]:font-medium [&_strong]:text-primary"
            value={block.customAttributes?.find((e) => e.key === 'title')?.description ?? []}
          />
          <header className="space-y-6">
            <PortableSanityText className="space-y-6" value={block.description ?? []} />
            <Link
              target={btnHref.startsWith('/asset') ? '_blank' : undefined}
              href={btnHref}
              className={buttonVariants({ className: 'max-lg:mx-auto' })}
            >
              {btnText}
            </Link>
          </header>
        </section>

        <Carousel block={carouselData} />
      </div>
    </article>
  );
}
