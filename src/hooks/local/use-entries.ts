import { sanityFetch } from '@/sanity/lib/client';
import { GetCategories, GetPosts, GetProducts, GetTestimonials } from '@/sanity/lib/queries/cms';
import type {
  GetCategoriesResult,
  GetPostsResult,
  GetProductsResult,
  GetTestimonialsResult,
} from '@/sanity/sanity.types';

export const useEntries = async () => {
  const categories = await sanityFetch<GetCategoriesResult>({
    query: GetCategories,
    tags: ['categories'],
  });

  const products = await sanityFetch<GetProductsResult>({
    query: GetProducts,
    tags: ['products'],
  });

  const testimonials = await sanityFetch<GetTestimonialsResult>({
    query: GetTestimonials,
    tags: ['testimonials'],
  });

  const posts = await sanityFetch<GetPostsResult>({
    query: GetPosts,
    tags: ['posts'],
  });

  return {
    categories,
    products,
    testimonials,
    posts,
  };
};

export type Entries = {
  categories: GetCategoriesResult;
  products: GetProductsResult;
  testimonials: GetTestimonialsResult;
  posts: GetPostsResult;
};
