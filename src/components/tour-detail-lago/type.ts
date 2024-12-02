import { ModifiedProduct } from '@/components/hot-deals/type';
import { Product } from '@/sanity/sanity.types';

export type TourDetailItineraryProduct = Omit<ModifiedProduct, 'itinerary'> & {
  itinerary?: { imageUrls: string[]; title: string; description: Product['description'] }[];
};

export type TourDetailProduct = Omit<TourDetailItineraryProduct, 'tourSummary'> & {
  tourSummary?: { isActive: boolean; imageUrl: string; title: string; description: Product['description'] }[];
};
