'use client';

import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { PortableText } from 'next-sanity';
import { Mousewheel, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function OurTeam({ block }: ContentBlockRegistry) {
  if (!block) return null;
  return (
    <article id={block?.slug?.current} className="main-padding-x main-padding-y-longer bg-[#EEE]">
      <div className="component-wrapper space-y-6">
        <h2 className="text-center">{block.title}</h2>

        <Swiper
          modules={[Mousewheel, Scrollbar]}
          mousewheel={{ forceToAxis: true }}
          scrollbar={{ draggable: true, el: '.swiper-scrollbar' }}
          className="w-full relative !pb-6"
          spaceBetween={16}
          slidesPerView={1}
          simulateTouch={false}
          breakpoints={{ 768: { slidesPerView: 3, spaceBetween: 16 }, 1280: { slidesPerView: 4, spaceBetween: 24 } }}
        >
          {block?.listItems?.map((e) => {
            return (
              <SwiperSlide key={e.title}>
                <figure className="flex flex-col justify-center items-center gap-4">
                  <NextImage src={e.imageUrl} className="aspect-[3.5/3] object-center object-cover" />
                  <figcaption className="text-center space-y-2">
                    <h6>{e.title}</h6>
                    <PortableText value={e.description ?? []} />
                  </figcaption>
                </figure>
              </SwiperSlide>
            );
          })}
          <div className="swiper-scrollbar" />
        </Swiper>
      </div>
    </article>
  );
}
