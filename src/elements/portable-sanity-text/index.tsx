import { cn } from '@/lib/utils';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from 'next-sanity';
import React from 'react';
import type { TypedObject } from 'sanity';
import NextImage from '../next-image';
import './styles.css';
import Link from 'next/link';

type Props = { value: TypedObject | TypedObject[] | undefined | null; className?: string };

export default function PortableSanityText({ value, className }: Props) {
  return (
    <section className={cn('space-y-4 portable-sanity-text', className)}>
      <PortableText
        components={{
          marks: {
            link: ({ value, children }) => {
              const path = value?.href as string;
              if (!path) return null;

              const newTab = path.startsWith('http') || path.startsWith('mailto') || path.startsWith('tel');

              return (
                <Link
                  target={newTab ? '_blank' : undefined}
                  href={path as string}
                  className="text-primary hover:underline"
                >
                  {children}
                </Link>
              );
            },
          },

          types: {
            image: ({ value }) => {
              if (!value?.asset?._ref) return null;
              return <NextImage className="size-full" preview alt={value.alt} src={urlFor(value).url()} />;
            },
          },
        }}
        value={value ?? []}
      />
    </section>
  );
}
