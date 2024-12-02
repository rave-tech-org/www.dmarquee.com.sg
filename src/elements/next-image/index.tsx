import Image from 'next/image';
import type { NextImageProps } from './type';

export default function NextImage({ alt, src, className, priority, style }: NextImageProps) {
  return (
    <Image
      style={style}
      alt={alt ?? 'Travel Star'}
      width={1000}
      height={1000}
      src={src}
      priority={priority}
      className={className}
    />
  );
}
