'use client';

import Button from '@/elements/button';
import NextImage from '@/elements/next-image';
import PortableSanityText from '@/elements/portable-sanity-text';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState } from 'react';

export default function NewsDetailPlaceholder({ entries, block }: ContentBlockRegistry) {
  if (!entries.foundedDataBySlug.post) notFound();

  const [viewAll, setViewAll] = useState(false);

  const data = entries.foundedDataBySlug.post;

  const relatedData = entries.posts.filter((e) => e.slug?.current !== data.slug?.current);

  return (
    <article id={block?.slug?.current} className="main-padding-y-longer md:main-padding-x">
      <div className="component-wrapper">
        <header className="main-padding-x">
          <Link href="/news-and-blog" className="hover:underline">
            Back to News & Blogs
          </Link>

          <h2 className="py-12 text-center">{data.title}</h2>
        </header>

        <ul>
          {data.contents?.map((e) => {
            return (
              <li
                key={e._key}
                className={cn('main-padding', {
                  'grid grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-16 gap-y-6': !!e.imageUrl,
                  'bg-[#eee]': e.isGrayBackground,
                })}
              >
                <PortableSanityText
                  className={cn(
                    'space-y-4 [&_h1]:text-primary [&_h2]:text-primary [&_h3]:text-primary [&_h4]:text-primary [&_h5]:text-primary [&_h6]:text-primary [&_strong]:font-semibold'
                  )}
                  value={e.description ?? []}
                />
                {e.imageUrl ? (
                  <figure className={cn({ 'row-start-1': e.leftImage })}>
                    <NextImage src={e.imageUrl} />
                    {e.image?.alt ? (
                      <figcaption className="mt-2">
                        <small className="italic">{e.image?.alt}</small>
                      </figcaption>
                    ) : null}
                  </figure>
                ) : null}
              </li>
            );
          })}
        </ul>

        {viewAll ? (
          <ul className="space-padding">
            {relatedData?.map((e) => {
              return (
                <li key={e._id}>
                  <Link href={e.path}>
                    <NextImage
                      src={e.imageUrl}
                      className="w-full aspect-vidoe xl:aspect-[31/9] object-top object-cover"
                    />
                    <header className="p-6 space-y-2 bg-black text-white">
                      <small className="uppercase">{e.type}</small>
                      <h5>{e.title}</h5>
                    </header>

                    <section className="h-40 flex flex-col p-6 justify-between bg-[#EEE]">
                      <p className="line-clamp-2">{e.summary}</p>
                      <p>{dayjs(e.publishedDate || new Date()).format('D MMM YYYY')}</p>
                    </section>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : null}
        {viewAll && entries.posts.length > 1 ? null : (
          <Button onClick={() => setViewAll(true)} className="mx-auto">
            More News & Blog
          </Button>
        )}
      </div>
    </article>
  );
}
