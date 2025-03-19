'use client';

import { PATHS } from '@/app/urls';
import { buttonVariants } from '@/elements/button';
import NextImage from '@/elements/next-image';
import PortableSanityText from '@/elements/portable-sanity-text';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { cn } from '@/lib/utils';
import { transformObject } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import { Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function InAction({ block }: ContentBlockRegistry) {
  if (!block) return null;

  const custom =
    block?.customAttributes && transformObject<{ 'btn-text': string; 'btn-href': string }>(block?.customAttributes);

  const btnText = custom?.['btn-text'];
  const btnHref = custom?.['btn-href'] ?? PATHS.main;

  return (
    <article id={block?.slug?.current} className="main-padding-y-longer space-padding">
      <div className="main-padding-x">
        <PortableSanityText
          className="mx-auto max-w-[44rem] text-center space-y-4 md:space-y-6 [&_strong]:font-medium [&_strong]:text-primary"
          value={block?.description ?? []}
        />
      </div>

      <Swiper
        slidesPerView={1.25}
        spaceBetween={16}
        centeredSlides
        modules={[Mousewheel]}
        mousewheel={{ forceToAxis: true }}
        loop
        breakpoints={{
          768: { slidesPerView: 3.25, spaceBetween: 24 },
          1024: { slidesPerView: 4.25, spaceBetween: 24, centeredSlides: false },
        }}
      >
        {block?.listItems?.map((e, i) => {
          if (!e.imageUrl) return null;
          return (
            <SwiperSlide key={i}>
              <NextImage src={e.imageUrl} className="aspect-[4/3] object-center object-cover" preview />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Link
        target={btnHref.startsWith('/asset') ? '_blank' : undefined}
        href={btnHref}
        className={cn(buttonVariants({ className: 'mx-auto' }))}
      >
        {btnText}
      </Link>
    </article>
  );
}
