import { ContentBlock, Product } from '@/sanity/sanity.types';

export type CategoryBlock = ContentBlock & {
  categories?: {
    slug: {
      current: string;
    };
  }[];
  imageUrl?: string;
};

export type ModifiedProductDestination = Product & { imageUrl: string };

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
  helpIconImageUrl?: string;
  imageUrl: string;
};

export type DestinationProduct = Omit<ModifiedProductDestination, 'tourSummary'> & {
  tourSummary?: { isActive: boolean; imageUrl: string; title: string; description: Product['description'] }[];
};
