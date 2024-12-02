'use client';

import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import TestimonialCard from '@components/testimonial-card';
import SkeletonLoader from '@elements/skeleton-loader';
import ViewIn from '@elements/view-in';
import { PortableText } from 'next-sanity';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperOptions } from 'swiper/types';

const testimonialSwiperSetting: SwiperOptions = {
  slidesPerView: 1.4,
  loopAdditionalSlides: 1,
  initialSlide: 2,
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 1.1,
    },
    480: {
      slidesPerView: 1.1,
    },
    768: {
      slidesPerView: 1.8,
    },
    1200: {
      slidesPerView: 2.8,
    },
  },
  spaceBetween: 8,
};

const FullTestimonials = ({ block, entries }: ContentBlockRegistry) => {
  const title = block?.title;
  const description = block?.description;
  const testimonialEntries = entries?.testimonials;

  if (!testimonialEntries) {
    return <SkeletonLoader />;
  }

  return (
    <ViewIn variant="slideUp" delay={200}>
      <div className="lago-testimonial-carousel-wrapper">
        {description && <PortableText value={description} />}
        <Swiper {...testimonialSwiperSetting}>
          {testimonialEntries.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <TestimonialCard
                imageUrl={testimonial.imageUrl}
                author={testimonial.name}
                productName={testimonial.product?.name}
                desc={testimonial.testimonialText}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="button-wrapper">
          <button className="primary-button outline">
            <p>{title}</p>
          </button>
        </div>
      </div>
    </ViewIn>
  );
};

export default FullTestimonials;
