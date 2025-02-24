import type { ContentBlock, Page } from '@/sanity/sanity.types';

export type PageType = Omit<Page, 'layout'> & { layout: ContentBlock[] } & { imageUrl: string };