'use client';

import HotDealsCard from '@/components/hot-deals-card';
import SkeletonLoader from '@/elements/skeleton-loader';
import { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { useProducts } from '@/hooks/local/use-products';
import ViewIn from '@elements/view-in';
import { PortableText } from 'next-sanity';
import React from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';

const hotDealsSwiperSetting: SwiperOptions = {
  modules: [Pagination],
  pagination: {
    clickable: true,
  },
  centeredSlides: false,
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
  },
  spaceBetween: 30,
};

const HotDeals = ({ block, entries }: ContentBlockRegistry) => {
  const categories = block?.categories;
  const title = block?.title;
  const description = block?.description;

  const products = useProducts({ entries, categories });

  if (!products) {
    return <SkeletonLoader />;
  }

  return (
    <ViewIn variant="slideUp" delay={200}>
      <div className="lago-hot-deals-carousel-wrapper">
        <div className="wrapper">
          {description && <PortableText value={description} />}
          <h3>{title}</h3>
          <Swiper {...hotDealsSwiperSetting}>
            {products.map((product, index) => (
              <SwiperSlide key={index}>
                <HotDealsCard {...product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </ViewIn>
  );
};

export default HotDeals;
