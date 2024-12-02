'use client';

import { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { useProducts } from '@/hooks/local/use-products';
import AspectRatioImage from '@elements/aspect-ratio-image';
import SkeletonLoader from '@elements/skeleton-loader';
import ViewIn from '@elements/view-in';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';

const destinationSwiperSetting: SwiperOptions = {
  modules: [Navigation],
  navigation: true,
  slidesPerView: 4.6,
  centeredSlides: true,
  loop: true,
  breakpoints: {
    200: {
      slidesPerView: 1.6,
    },
    320: {
      slidesPerView: 1.6,
    },
    480: {
      slidesPerView: 2.6,
    },
    720: {
      slidesPerView: 3.6,
    },
    1024: {
      slidesPerView: 4.6,
    },
  },
  spaceBetween: 30,
};

const ExploreDestination = ({ block, entries }: ContentBlockRegistry) => {
  const categories = block?.categories;
  const imageUrl = block?.imageUrl;
  const description = block?.description;

  const products = useProducts({ entries, categories });

  if (!products) {
    return <SkeletonLoader />;
  }

  return (
    <ViewIn variant="slideUp" delay={200}>
      <div className="lago-destination-carousel-wrapper">
        <div
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            width: '100%',
            height: 'clamp(300px, 40vw, 600px)',
          }}
        >
          <div className="content-group">
            {description && <PortableText value={description} />}
            <Swiper {...destinationSwiperSetting}>
              {products.map((product, index) => (
                <SwiperSlide key={index}>
                  <Link href={`/destination/${product?.slug?.current}`}>
                    <div
                      style={{
                        backgroundImage: `url(${product.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: 'clamp(200px, 20vw, 500px)',
                        borderRadius: '10px',
                        border: '1px solid #fff',
                      }}
                    />
                    <div className="content">
                      <p>{product.name}</p>
                    </div>
                    <div className="image">
                      <AspectRatioImage
                        src="/assets/images/home/label-destination.webp"
                        alt="Default Destination Image"
                        aspectRatio="1/1"
                        priority
                        objFit="contain"
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </ViewIn>
  );
};

export default ExploreDestination;
