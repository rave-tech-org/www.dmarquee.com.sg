'use client';

import Button from '@/elements/button';
import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { transformObject } from '@/utils';
import dayjs from 'dayjs';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import { useState } from 'react';

export default function NewsAndBlogBanner({ block, entries }: ContentBlockRegistry) {
  const [viewAll, setViewAll] = useState(false);

  if (!block) return null;

  const custom =
    block?.customAttributes && transformObject<{ 'btn-text': string; 'btn-href': string }>(block?.customAttributes);

  const btnText = custom?.['btn-text'];

  const posts = viewAll ? entries.posts : entries.posts?.slice(0, 1);

  return (
    <article id={block?.slug?.current} className="main-padding-x main-padding-y-longer">
      <div className="component-wrapper space-padding">
        <header className="space-y-4">
          <PortableText value={block.description ?? []} />
        </header>
        <div className="border-t w-full" />

        <ul className="space-padding">
          {posts?.map((e) => {
            const path = e.type === 'blog' ? `/blog/${e.slug?.current}` : `/news/${e.slug?.current}`;
            return (
              <li key={e._id}>
                <Link href={path}>
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

        {!viewAll && entries.posts?.length > 1 ? (
          <Button onClick={() => setViewAll(true)} className="mx-auto">
            {btnText}
          </Button>
        ) : null}
      </div>
    </article>
  );
}
