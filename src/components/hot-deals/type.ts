import { ContentBlock, Product } from '@/sanity/sanity.types';

export type CategoryBlock = ContentBlock & {
  categories?: {
    slug: {
      current: string;
    };
  }[];
  imageUrl?: string;
};

export type ModifiedProduct = Omit<Product, 'categories'> & {
  categories?:
    | {
        slug: {
          current: string;
        };
        customAttributes:
          | {
              key?: string;
              value?: string;
              _type: 'attribute';
              _key: string;
            }[]
          | undefined;
        name: string;
        description: string;
      }[]
    | null;
  imageUrl: string;
};
