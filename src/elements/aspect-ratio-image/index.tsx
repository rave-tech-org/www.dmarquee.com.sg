import Image from 'next/image';
import { AspectRatioImageProps } from './type';

const AspectRatioImage: React.FC<AspectRatioImageProps> = ({
  src,
  alt,
  aspectRatio = '16/9',
  priority = false,
  objFit = 'cover',
  sizes = '(max-width: 768px) 100vw, 50vw',
  hasBlackOpacityBackground = false,
  children,
  ...props
}) => {
  const [width, height] = aspectRatio.split('/').map(Number);
  const paddingPercentage = (height / width) * 100;

  return (
    <div
      className={`aspect-ratio-container ${hasBlackOpacityBackground ? 'black-opacity-background' : ''}`}
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: `${paddingPercentage}%`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="aspect-ratio-img"
        style={{ objectFit: objFit }}
        {...props}
      />
      {children}
    </div>
  );
};

export default AspectRatioImage;
