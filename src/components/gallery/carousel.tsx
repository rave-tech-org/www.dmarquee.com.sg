'use client';

import NextImage from '@/elements/next-image';
import PortableSanityText from '@/elements/portable-sanity-text';
import { cn } from '@/lib/utils';
import type { SanityImageCrop, SanityImageHotspot, Slug, internalGroqTypeReferenceTo } from '@/sanity/sanity.types';
import { PortableText } from 'next-sanity';
import { Fragment, useState } from 'react';
import { Mousewheel, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperOptions } from 'swiper/types';

const swiperConfig: SwiperOptions = {
  spaceBetween: 16,
  slidesPerView: 1.2,
  modules: [Mousewheel, Pagination],
  pagination: { clickable: true },
  mousewheel: { forceToAxis: true },
  centeredSlides: true,
  loop: true,
  breakpoints: { 768: { slidesPerView: 2.5, spaceBetween: 24, centeredSlides: false } },
};

type Props = {
  listItems: Array<{
    title?: string;
    slug?: Slug;
    description?: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: 'span';
        _key: string;
      }>;
      style?: 'blockquote' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'normal';
      listItem?: 'bullet' | 'number';
      markDefs?: Array<{
        href?: string;
        _type: 'link';
        _key: string;
      }>;
      level?: number;
      _type: 'block';
      _key: string;
    }>;
    image?: {
      asset?: {
        _ref: string;
        _type: 'reference';
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: 'image';
    };
    customAttributes: Array<{
      key?: string;
      image?: {
        asset?: {
          _ref: string;
          _type: 'reference';
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        _type: 'image';
      };
      value?: string;
      description?: Array<{
        children?: Array<{
          marks?: Array<string>;
          text?: string;
          _type: 'span';
          _key: string;
        }>;
        style?: 'blockquote' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'normal';
        listItem?: 'bullet' | 'number';
        markDefs?: Array<{
          href?: string;
          _type: 'link';
          _key: string;
        }>;
        level?: number;
        _type: 'block';
        _key: string;
      }>;
      _type: 'attribute';
      _key: string;
      imageUrl: string | null;
    }> | null;
    _key: string;
    imageUrl: string | null;
  }> | null;
};

export default function Carousel({ listItems }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(1);
  if (!listItems?.length) return null;

  return (
    <Fragment>
      <ul className="hidden lg:flex lg:flex-row flex-col gap-4">
        {listItems?.map((e, i) => {
          const selected = selectedIndex === i;
          return (
            <li
              onMouseEnter={() => setSelectedIndex(i)}
              className={cn('animate-longer-2 relative h-[40rem] max-lg:!w-full group', {
                'max-lg:h-[16rem]': !selected,
                'max-lg:h-[27rem]': selected,
              })}
              key={e.title}
              style={{
                width: selected ? '40%' : `${60 / ((listItems?.length ? listItems?.length : 0) - 1)}%`,
              }}
            >
              {e.imageUrl ? <NextImage src={e.imageUrl} className="object-cover object-center h-full" /> : null}

              <div
                className={cn(
                  'text-white animate flex items-end absolute top-0 left-0 size-full opacity-0 bg-gradient-to-b from-transparent to-black/70',
                  { 'opacity-100': selected }
                )}
              >
                <header
                  className={cn('animate-longer-3 space-y-1.5 p-6 xl:main-padding', { 'translate-y-12': !selected })}
                >
                  <h4>{e.title}</h4>
                  <PortableSanityText className="space-y-1.5" value={e.description ?? []} />
                </header>
              </div>
            </li>
          );
        })}
      </ul>

      <Swiper className="lg:hidden w-full pb-14 show-cases-carousel-wrapper" {...swiperConfig}>
        {listItems?.map((e, i) => {
          if (!e.imageUrl) return null;

          return (
            <SwiperSlide key={i} className="w-full aspect-[3/3.5] relative">
              {e.imageUrl ? (
                <NextImage src={e.imageUrl} className="size-full aspect-auto object-cover object-center" />
              ) : null}

              <div className="text-white flex items-end absolute top-0 left-0 size-full bg-gradient-to-b from-transparent to-black/70">
                <header className="main-padding space-y-1.5">
                  <h4>{e.title}</h4>
                  <PortableSanityText className="space-y-1.5" value={e.description ?? []} />
                </header>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Fragment>
  );
}
