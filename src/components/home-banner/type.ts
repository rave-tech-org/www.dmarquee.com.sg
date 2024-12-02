import { ContentBlock } from '@/sanity/sanity.types';

export type ListItemType = NonNullable<ContentBlock['listItems']>[number];

export type ListItemBlock = Omit<ContentBlock, 'listItems'> & {
  listItems: Array<ListItemType & { imageUrl: string }>;
};

export type CustomBannerAttribute = {
  'button-redirect-link': string;
  'button-text': string;
  'is-button-redirect-new-window': string;
};
