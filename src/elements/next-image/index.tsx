'use client';

import { cn } from '@/lib/utils';
import { Image as AntdImage } from 'antd';
import { ZoomIn } from 'lucide-react';
import Image, { type StaticImageData } from 'next/image';
import { useState } from 'react';

type Props = {
  preview?: boolean;
  src: StaticImageData | string | undefined | null;
  className?: string;
  priority?: boolean;
  style?: React.CSSProperties;

  // captions
  alt?: string | null | undefined;
};

export default function NextImage({ alt, src, preview, className, priority, style }: Props) {
  const [visible, setVisible] = useState(false);

  if (!src) return null;

  const Base = () => {
    return (
      <Image
        id="base-image"
        style={style}
        alt={alt || 'DMarquee'}
        width={1000}
        height={1000}
        src={src}
        priority={priority}
        className={cn(className)}
      />
    );
  };

  if (preview && typeof src === 'string') {
    return (
      <section id="base-image-with-preview" className="relative">
        <Base />
        <button
          type="button"
          onClick={() => setVisible(true)}
          className="size-8 z-40 rounded-full aspect-square absolute right-4 bottom-4 flex items-center justify-center bg-primary hover:bg-primary-disabled text-white"
        >
          <ZoomIn className="size-[65%]" />
        </button>

        <AntdImage
          preview={{ visible, src, onVisibleChange: (value) => setVisible(value) }}
          src={src}
          alt={alt || ''}
        />
      </section>
    );
  }

  return <Base />;
}
