import { PATHS } from '@/app/urls';
import { sanityFetch } from '@/sanity/lib/client';
import { GetCategories, GetPosts, GetProducts, GetTestimonials } from '@/sanity/lib/queries/cms';
import type {
  GetCategoriesResult,
  GetPostsResult,
  GetProductsResult,
  GetTestimonialsResult,
} from '@/sanity/sanity.types';
import { headers } from 'next/headers';

export const useEntries = async () => {
  const categories = await sanityFetch<GetCategoriesResult>({
    query: GetCategories,
    tags: ['category'],
  });

  const products = await sanityFetch<GetProductsResult>({
    query: GetProducts,
    tags: ['prouct'],
  });

  const testimonials = await sanityFetch<GetTestimonialsResult>({
    query: GetTestimonials,
    tags: ['testimonial'],
  });

  const posts = await sanityFetch<GetPostsResult>({
    query: GetPosts,
    tags: ['post'],
  });

  const currentPath = headers().get('path') || '';
  const [_, page, slug] = currentPath.split('/');

  const updatedPosts = posts?.map((e) => {
    return { ...e, path: `${e.type === 'blog' ? PATHS.blog : PATHS.news}/${e.slug?.current}` };
  });

  return {
    categories,
    products,
    testimonials,
    posts: updatedPosts,
    route: {
      currentPath,
      page,
      slug,
    },
    foundedDataBySlug: {
      product: products.find((e) => e.slug?.current === slug),
      testimonial: testimonials.find((e) => e.slug?.current === slug),
      post: updatedPosts.find((e) => e.slug?.current === slug),
    },
  };
};

export type Entries = Awaited<ReturnType<typeof useEntries>>;
