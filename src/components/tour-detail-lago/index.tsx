'use client';

import AspectRatioImage from '@/elements/aspect-ratio-image';
import RatingStar from '@/elements/icons/rating-star';
import RightChevron from '@/elements/icons/right-chevron';
import NextImage from '@/elements/next-image';
import SkeletonLoader from '@/elements/skeleton-loader';
import useViewport from '@/hooks/client/use-viewport';
import { client, useSanityQuery } from '@/sanity/lib/client';
import { GetProductBySlug } from '@/sanity/lib/queries/cms';
import { formatCurrency, transformObject } from '@/utils';
import { CaretRightOutlined } from '@ant-design/icons';
import type { CustomCategoryAttributes, CustomFeatures, CustomPrices } from '@components/hot-deals-card/type';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { Anchor, Collapse, type CollapseProps, Image } from 'antd';
import { PortableText } from 'next-sanity';
import { useNextSanityImage } from 'next-sanity-image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperOptions } from 'swiper/types';
import type { TourDetailProduct } from './type';

type SanityImageProps = {
  value: SanityImageSource & {
    alt?: string;
  };
};

const SanityImage: React.FC<SanityImageProps> = ({ value }) => {
  const imageProps = useNextSanityImage(client, value);
  const [visible, setVisible] = useState(false);

  if (!imageProps) return null;

  return (
    <div className="tour-detail-image-wrapper">
      <Image
        width={200}
        style={{ display: 'none' }}
        src={imageProps.src}
        preview={{
          visible,
          src: imageProps.src,
          onVisibleChange: (value) => {
            setVisible(value);
          },
        }}
        alt={value.alt || ''}
      />
      <AspectRatioImage
        onClick={() => setVisible(true)}
        src={imageProps.src}
        alt={value.alt || ''}
        aspectRatio="2/1"
        priority
      />
    </div>
  );
};

const TourDetailLago = ({ slug }: { slug: string }) => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter((segment) => segment);
  const [visible, setVisible] = useState(false);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const { isMobile, isTablet, isMdScreen, isXlScreen, isXxlScreen } = useViewport();

  const { data: product, isLoading } = useSanityQuery<TourDetailProduct>({
    query: GetProductBySlug,
    tags: ['product'],
    qParams: { slug, type: 'tour' },
  });

  if (!product || isLoading) {
    return <SkeletonLoader />;
  }

  const screenWidths = new Map([
    ['6/1', isMobile],
    ['5/2', isTablet],
    ['4/2', isMdScreen],
    ['4/3', isXlScreen],
    ['3/2', isXxlScreen],
  ]);

  const ratio = Array.from(screenWidths.entries()).find(([, cond]) => cond)?.[0] || '2/1';

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const text = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    return { text, link: href };
  });
  breadcrumbs.unshift({ text: 'Home', link: '/' });

  const buttons = [
    {
      key: 'BOOK NOW',
      value: product.bookingUrl || '',
    },
    {
      key: 'ENQUIRE',
      value: '/',
    },
    {
      key: 'SHARE',
      value: '/',
    },
  ];

  const components = {
    types: {
      image: SanityImage,
    },
  };

  const tourItinerarySwiperSettingconst: SwiperOptions = {
    modules: [Navigation],
    navigation: true,
    loop: true,
    slidesPerView: 1,
  };

  const items: CollapseProps['items'] =
    product.itinerary
      ?.filter((it) => it.imageUrls != null && it.imageUrls?.length > 0)
      .map((it, key) => {
        return {
          key,
          label: it.title,
          children: it.description && (
            <div className="itinerary-item">
              <Swiper {...tourItinerarySwiperSettingconst}>
                {it.imageUrls?.map((imageUrl, index) => (
                  <SwiperSlide key={index}>
                    <AspectRatioImage src={imageUrl} alt={product?.name || ''} aspectRatio="7/4" priority />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="itinerary-content">
                <PortableText value={it.description} />
              </div>
            </div>
          ),
        };
      }) || [];

  const allPanelKeys = items.map((item) => item.key as string);

  const toggleExpandAll = () => {
    setActiveKeys(activeKeys.length === allPanelKeys.length ? [] : allPanelKeys);
  };

  const itineraryWithoutPhotos = product?.itinerary?.filter((it) => !it.imageUrls);

  const customFeature = transformObject<CustomFeatures>(product?.features);
  const customPrices = transformObject<CustomPrices>(product?.customPrices);

  const categories = product.categories?.filter((category) => category.slug.current !== 'tour');

  return (
    <div className="tour-detail-lago">
      <div
        style={{
          backgroundImage: `url('/assets/images/home/bg-topo-print.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'left top',
          width: '100%',
        }}
      >
        <div className="wrapper">
          <div className="breadcrumbs-group">
            {breadcrumbs.map((breadcrumb, key) => (
              <div key={`breadcrumb-${key}`} className="breadcrumbs-item">
                <Link href={breadcrumb.link}>{breadcrumb.text}</Link>
                <RightChevron width={16} height={16} />
              </div>
            ))}
          </div>
        </div>

        <div className="tour-detail-banner">
          <div className="tour-detail-main-info">
            <div className="tour-detail-image-wrapper">
              <Image
                width={200}
                style={{ display: 'none' }}
                src={product?.imageUrl}
                preview={{
                  visible,
                  src: product?.imageUrl,
                  onVisibleChange: (value) => {
                    setVisible(value);
                  },
                }}
                alt={product?.name || ''}
              />
              <section style={{ display: 'relative' }}>
                <AspectRatioImage
                  src={product?.imageUrl}
                  alt={product?.name || ''}
                  aspectRatio={isMobile ? '21/9' : ratio}
                  priority
                />
                <NextImage
                  onClick={() => setVisible(true)}
                  src="/assets/images/tour/icon-zoom.svg"
                  width={48}
                  height={48}
                  alt="icon zoom"
                />
              </section>
            </div>
            <div className="tour-detail-book-now">
              <div className="wrapper">
                {customFeature.rating && (
                  <div className="rating">
                    <RatingStar percentage={(Number.parseInt(customFeature.rating) / 5) * 100} />
                    <p>{customFeature.rating}</p> <span>(Based on 3 reviews)</span>
                  </div>
                )}
                <div className="location-label">
                  <NextImage
                    src="/assets/images/tour/icon-location.svg"
                    width={24}
                    height={24}
                    alt={customFeature?.['pin-location']}
                  />
                  <span>{customFeature?.['pin-location']}</span>
                </div>
                <h4 className="text-ellipsis">{product?.name}</h4>
                <span className="travel-code">Tour Code: {customFeature?.['tour-code']}</span>

                <div className="tags">
                  {categories?.map((category, key) => {
                    const custom = transformObject<CustomCategoryAttributes>(category?.customAttributes);
                    return (
                      <span key={`hot-deals-tag-${key}`} className={custom.className}>
                        {category.name}
                      </span>
                    );
                  })}
                </div>

                <div className="pricing">
                  <span>From</span>
                  <h4 className="price">
                    {formatCurrency(+customPrices['discount-price'])} <sup>{formatCurrency(product.price)}</sup>
                  </h4>
                  <p className="option">
                    <strong>Twin-sharing</strong> (excludes processing fees & taxes if any)
                  </p>
                  {customFeature?.['save-info'] && (
                    <p className="book-now-info">
                      SAVE S${customPrices?.['discount-price']} <sup>Important note</sup>
                    </p>
                  )}
                </div>

                <div className="cta-group">
                  <div className="button-group">
                    {buttons.map((button, index) => (
                      <button type="button" key={`button-${index}`} className="primary-button outline">
                        <Link href={button.value} target="_blank">
                          {button.key}
                        </Link>
                      </button>
                    ))}
                  </div>
                  <div className="printout">
                    <div>
                      <span>Get a printout</span>
                    </div>
                    <div>
                      <span>Save a copy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-y-6 lg:grid-cols-6 tour-detail-additional-info wrapper">
            {product?.tourSummary?.map((summary, key) => (
              <div key={`summary-${key}`} className={`additional-item ${summary.isActive ? '' : 'not-active'}`}>
                <div className="icon-wrapper">
                  <NextImage src={summary.imageUrl} width={40} height={40} />
                </div>
                <p>{summary?.title}</p>
                <span>{summary?.description && <PortableText value={summary?.description} />}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="tour-detail-extra wrapper">
        {isTablet ? null : (
          <Anchor
            offsetTop={200}
            affix={!isMdScreen}
            showInkInFixed
            items={[
              product?.overview ? { key: '1', href: '#overview', title: 'Overview' } : null,
              product?.itinerary ? { key: '2', href: '#itinerary', title: 'Itinerary' } : null,
              product?.transportation ? { key: '3', href: '#transportation', title: 'Transportation' } : null,
              product?.accommodation ? { key: '4', href: '#accommodation', title: 'Accommodation' } : null,
              product?.reviews ? { key: '5', href: '#reviews', title: 'Reviews' } : null,
              product?.thingsToNote ? { key: '6', href: '#things-to-note', title: 'Things to Note' } : null,
            ].filter((item) => item !== null)}
          />
        )}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {product?.overview && (
            <div id="overview">
              <PortableText value={product?.overview} components={components} />
            </div>
          )}
          {product?.itinerary && (
            <div id="itinerary">
              <div className="itinerary-title">
                <h5>Day-by-day Details</h5>
                <button type="button" onClick={toggleExpandAll} className="primary-button outline">
                  {activeKeys.length === allPanelKeys.length ? 'COLLAPSE ALL' : 'EXPAND ALL +'}
                </button>
              </div>
              <Collapse
                activeKey={activeKeys}
                items={items}
                onChange={(keys: string[]) => setActiveKeys(keys)}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 270 : 90} />}
              />
              {itineraryWithoutPhotos?.map((it, key) => (
                <div key={`itinerary-n-${key}`} className="important-note">
                  {it.description && <PortableText value={it.description} />}
                </div>
              ))}
            </div>
          )}
          {product?.accommodation && (
            <div id="accommodation">
              <h5>Accommodation Info</h5>
              {product?.accommodation && <PortableText value={product?.accommodation} components={components} />}
            </div>
          )}
          {product?.thingsToNote && (
            <div id="things-to-note">
              <h5>Important Notes</h5>
              <div className="important-note">
                {product?.thingsToNote && <PortableText value={product?.thingsToNote} components={components} />}
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          backgroundImage: `url('/assets/images/home/bg-malaysia-flags.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          width: '100%',
          height: 'clamp(300px, 40vw, 600px)',
          position: 'absolute',
          bottom: 0,
          zIndex: -1,
        }}
      />
    </div>
  );
};

export default TourDetailLago;
