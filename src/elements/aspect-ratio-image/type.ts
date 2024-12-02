import { ImageProps } from 'next/image';
import { ReactNode } from 'react';

export interface AspectRatioImageProps extends Omit<ImageProps, 'width' | 'height' | 'style'> {
  aspectRatio?: string;
  priority?: boolean;
  objFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  hasBlackOpacityBackground?: boolean;
  children?: ReactNode;
}
