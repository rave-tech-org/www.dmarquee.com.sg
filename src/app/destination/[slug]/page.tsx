import DestinationDetailLago from '@/components/destination-detail-lago';
import { DestinationProduct } from '@/components/destination-detail-lago/type';
import { ModifiedProduct } from '@/components/product-carousel/type';
import { PostType } from '@/components/see-more-articles/type';
import { sanityFetch } from '@/sanity/lib/client';
import { GetPosts, GetProductBySlug, GetProductsByCategory } from '@/sanity/lib/queries/cms';
// import { Product } from '@/sanity/sanity.types';

export default async function DestinationPage({ params }: { params: { slug: string } }) {
  const slug = params?.slug as string;
  const pathname = `/destination/${slug}`;
  const pathSegments = pathname.split('/').filter((segment) => segment);
  const product = await sanityFetch<DestinationProduct>({
    query: GetProductBySlug,
    tags: ['product'],
    qParams: { slug, type: 'destination' },
  });

  const posts = await sanityFetch<PostType[]>({
    query: GetPosts,
    tags: ['post'],
  });

  const relatedProducts = await sanityFetch<ModifiedProduct[]>({
    query: GetProductsByCategory,
    tags: ['product'],
    qParams: { categorySlug: 'penang' },
  });

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const text = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    return { text, link: href };
  });
  breadcrumbs.unshift({ text: 'Home', link: '/' });
  return (
    <DestinationDetailLago
      product={product}
      relatedProducts={relatedProducts}
      breadcrumbs={breadcrumbs}
      posts={posts}
    />
  );
}
