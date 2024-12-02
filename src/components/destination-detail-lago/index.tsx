import AspectRatioImage from '@/elements/aspect-ratio-image';
import RightChevron from '@/elements/icons/right-chevron';
import SkeletonLoader from '@/elements/skeleton-loader';
import { PostType } from '@components/see-more-articles/type';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import TravelInterestCard from '../travel-interest-card';

import { ModifiedProduct } from '@/components/product-carousel/type';
import { CustomFeatures, DestinationProduct, DestinationRelatedProduct } from './type';

import { transformObject } from '@/utils';
import Image from 'next/image';
import ProductCarousel from '../product-carousel';

const DestinationDetailLago = ({
  product,
  relatedProducts,
  breadcrumbs,
  posts,
}: {
  product: DestinationProduct;
  relatedProducts: ModifiedProduct[];
  breadcrumbs?: { text: string; link: string }[];
  posts?: PostType[];
}) => {
  if (!product) {
    return <SkeletonLoader />;
  }

  const buttons = [
    {
      key: 'CUSTOMISE A TOUR',
      value: '/',
    },
    {
      key: 'EXPLORE OTHER DESTINATION',
      value: '/',
    },
  ];

  const customFeature = transformObject<CustomFeatures>(product?.features);

  const cards = [
    {
      title: 'Land Area',
      desc: product?.landArea,
      imageUrl: '',
    },
    {
      title: 'Average Climate',
      desc: product?.averageClimate,
      imageUrl: '',
    },
    {
      title: 'Good Travel Duration',
      desc: product?.travelDuration,
      imageUrl: '',
    },
    {
      title: 'Peak Season',
      desc: product?.peakSeason,
      imageUrl: '',
    },
    {
      title: 'Mid Season',
      desc: product?.midSeason,
      imageUrl: '',
    },
    {
      title: 'Monsoon Season',
      desc: product?.monsoonSeason,
      imageUrl: '',
    },
  ];

  return (
    <div className="destination-detail-lago">
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
            {breadcrumbs?.map((breadcrumb, key) => (
              <div key={`breadcrumb-${key}`} className="breadcrumbs-item">
                <Link href={breadcrumb.link}>{breadcrumb.text}</Link>
                {key !== breadcrumbs?.length - 1 && <RightChevron width={16} height={16} />}
              </div>
            ))}
          </div>
        </div>

        <div className="lago-content-background">
          <AspectRatioImage src={product.imageUrl} alt={product.name || ''} aspectRatio="3/1" priority />
          {product.description && (
            <div className="content">
              <div className="destination-slogan">{customFeature.slogan}</div>
              <div className="destination-title">{customFeature.title}</div>
              <div className="destination-description">
                <PortableText value={product.description} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="wrapper">
        <div className="lago-travel-interest-group wrapper">
          <div className="interest-cards-wrapper">
            {cards?.map((card, key) => <TravelInterestCard key={`lago-travel-card-${key}`} {...card} />)}
          </div>
        </div>
      </div>
      <div className="destination-related-products-group">
        <ProductCarousel title="Explore Our Tour Packages" products={relatedProducts} />
      </div>
      <div
        className="destination-help-group"
        style={{
          backgroundImage: `url('/assets/images/home/bg-topo-print.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'left top',
          width: '100%',
        }}
      >
        <div className="destination-help-group-content wrapper">
          <div className="flex max-md:flex-col max-md:gap-y-4 mx-auto w-full justify-center items-center">
            <div className="image-wrapper">
              <Image
                src={product.helpIconImageUrl || '/assets/images/destination/bear.png'}
                alt={product.name || ''}
                width={256}
                height={256}
              />
            </div>
            <div className="text-wrapper">
              <div className="upper-content">
                <h5>Can&apos;t find what you are looking for?</h5>
                <h3>I&apos;m here to help!</h3>
              </div>
              <div className="lower-content flex gap-x-4 max-md:flex-col max-md:gap-y-4">
                {buttons.map((button, index) => (
                  <button type="button" key={`button-${index}`} className="primary-button outline">
                    <Link href={button.value} target="_blank">
                      {button.key}
                    </Link>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div className="lago-see-more-articles">
          <div className="travel-guide-title">{product.name && <h3>{product.name} Travel Guide</h3>}</div>
          <div className="travel-guide">{product.travelGuide && <PortableText value={product.travelGuide} />}</div>
          <div className="group max-md:!grid max-md:!grid-cols-2">
            {posts?.map((post, key) => (
              <div key={`post-${key}`} className="item">
                <div
                  style={{
                    backgroundImage: `url(${post.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: 'clamp(200px, 20vw, 500px)',
                    borderRadius: '10px',
                  }}
                />
                <div className="excerpt">
                  <h6>{post.excerpt}</h6>
                  <span>{new Date(post.publishedDate || '').toDateString()}</span>
                  <Link key={`post-${key}`} href={`/post/${post.slug?.current}`}>
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DestinationDetailLago;
