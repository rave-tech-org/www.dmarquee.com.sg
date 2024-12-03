'use client';

import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperOptions } from 'swiper/types';

const swiperConfig: SwiperOptions = {
  spaceBetween: 16,
  slidesPerView: 1.5,
  modules: [Mousewheel],
  mousewheel: { forceToAxis: true },
  initialSlide: 3,
  centeredSlides: true,
  loop: true,
  breakpoints: { 768: { slidesPerView: 2.5, spaceBetween: 24 }, 1024: { slidesPerView: 3.5, spaceBetween: 24 } },
};

export default function Carousel({ block }: { block: ContentBlockRegistry['block'] }) {
  if (!block?.listItems?.length) return null;

  return (
    <Swiper className="w-full px-4" {...swiperConfig}>
      {block?.listItems?.map((e, i) => {
        if (!e.imageUrl) return null;

        return (
          <SwiperSlide key={i} className="w-full aspect-[4/3]">
            <NextImage src={e.imageUrl} className="object-center object-cover size-full" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
