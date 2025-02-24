import { PATHS } from '@/app/urls';
import { sanityFetch } from '@/sanity/lib/client';
import { GetCategories, GetContentBlockBySlug, GetPosts, GetProducts, GetTestimonials } from '@/sanity/lib/queries/cms';
import type {
  GetCategoriesResult,
  GetContentBlockBySlugResult,
  GetPostsResult,
  GetProductsResult,
  GetTestimonialsResult,
} from '@/sanity/sanity.types';
import { createMenuFromDescription } from '@/utils';
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

  const header = await sanityFetch<GetContentBlockBySlugResult>({
    query: GetContentBlockBySlug,
    tags: ['contentBlock'],
    qParams: { slug: 'header' },
  });

  const experience = header?.customAttributes?.find((e) => e.key === 'experience-dropdown');

  const experienceMenu = {
    label: experience?.value || 'Unlabeled',
    href: '',
    children: experience?.description?.map((e) => {
      return {
        label: e.children?.[0]?.text || 'Unlabeled',
        href: e.markDefs?.[0]?.href || PATHS.main,
      };
    }),
  };

  const restMenu = createMenuFromDescription({ description: header?.description }) || [];

  const currentPath = headers().get('path') || '';
  const [_, page, slug] = currentPath.split('/');

  const updatedPosts = posts?.map((e) => {
    return { ...e, path: `${e.type === 'blog' ? PATHS.blog : PATHS.news}/${e.slug?.current}` };
  });

  return {
    menus: [experienceMenu, ...restMenu],
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
