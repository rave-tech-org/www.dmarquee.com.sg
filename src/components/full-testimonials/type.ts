import { Testimonial } from '@/sanity/sanity.types';

export type TestimonialType = Testimonial & { imageUrl: string; product: { name: string } };
