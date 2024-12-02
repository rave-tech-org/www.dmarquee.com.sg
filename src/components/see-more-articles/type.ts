import { Post } from '@/sanity/sanity.types';

export type PostType = Post & { imageUrl: string };

export type CustomSeeMoreAttributes = {
  className: string;
};
