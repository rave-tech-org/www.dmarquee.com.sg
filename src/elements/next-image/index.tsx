import Image, { ImageProps } from 'next/image';

interface NextImageProps extends Omit<ImageProps, 'width' | 'height' | 'alt' | 'src'> {
  width?: number;
  height?: number;
  alt?: string;
  src?: string | null;
}

const NextImage: React.FC<NextImageProps> = ({ width, height, alt, src, ...props }) => {
  return (
    <Image
      src={src || ''}
      width={0}
      height={0}
      style={{ width, height }}
      alt={alt || 'default lago image'}
      {...props}
    />
  );
};

export default NextImage;
