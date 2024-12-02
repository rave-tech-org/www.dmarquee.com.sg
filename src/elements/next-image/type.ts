import type { StaticImageData } from 'next/image';

export type NextImageProps = {
  alt?: string;
  src: StaticImageData | string;
  className?: string;
  priority?: boolean;
  style?: React.CSSProperties;
};
