import type { Slug } from '@/sanity/sanity.types';
import { Entries } from './use-entries';

type Props = {
  entries: Entries;
  categories:
    | {
        _id: string;
        slug: Slug | null;
      }[]
    | null
    | undefined;
  slice?: number;
};

export const useProducts = ({ entries, categories, slice }: Props) => {
  const categorySlug = categories?.map((category) => category?.slug?.current);

  const products = entries?.products
    ?.filter((product) =>
      categorySlug?.some((categorySlug) =>
        product.categories?.some((category) => category.slug?.current === categorySlug)
      )
    )
    .map((product) => ({
      ...product,
      categories:
        product.categories?.filter((category) => !categorySlug?.includes(category?.slug?.current || '')) || null,
    }))
    ?.slice(0, slice);

  return products;
};
