'use client';

import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { PortableText } from 'next-sanity';
import { Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function InAction({ block }: ContentBlockRegistry) {
  if (!block) return null;
  return (
    <article id={block?.slug?.current} className="main-padding-y-longer space-padding">
      <div className="main-padding-x">
        <header className="mx-auto max-w-[44rem] text-center space-y-4 md:space-y-6 [&_strong]:font-medium [&_strong]:text-primary">
          <PortableText value={block?.description ?? []} />
        </header>
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
    </article>
  );
}
