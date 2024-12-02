import { ContentBlock, Page } from '@/sanity/sanity.types';
import { ReactNode } from 'react';

type MainLayoutProps = {
  children: ReactNode;
};

export type PageType = Omit<Page, 'layout'> & { layout: ContentBlock[] } & { imageUrl: string };

export default MainLayoutProps;
