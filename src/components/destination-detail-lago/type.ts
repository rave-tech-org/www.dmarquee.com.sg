import { ModifiedProduct } from '@/components/product-carousel/type';
import { Product } from '@/sanity/sanity.types';

export type DestinationProduct = Omit<ModifiedProduct, 'tourSummary'> & {
  // tourSummary?: { isActive: boolean; imageUrl: string; title: string; description: Product['description'] }[];
};

export type DestinationRelatedProduct = Omit<Product, 'categories'>;

export type CustomFeatures = {
  slogan: string;
  title: string;
};
