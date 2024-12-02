import { Entries } from '@/hooks/local/use-entries';
import type { GetContentBlockResult } from '@/sanity/sanity.types';

export interface ResearchZeroZeroOneBannerProps<B = GetContentBlockResult, E = Entries> {
  block: B;
  entries: E;
}

export type ResearchZeroZeroOneBannerCustomAttributesProps = {
  'cta-text': string;
};
