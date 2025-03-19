'use client';

import { PATHS } from '@/app/urls';
import { buttonVariants } from '@/elements/button';
import NextImage from '@/elements/next-image';
import PortableSanityText from '@/elements/portable-sanity-text';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { transformObject } from '@/utils';
import dayjs from 'dayjs';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import type { CustomisedPackagesCustomAttribute } from './type';

export default function CustomisedPackages({ block, entries }: ContentBlockRegistry) {
  const custom = block?.customAttributes && transformObject<CustomisedPackagesCustomAttribute>(block?.customAttributes);

  const btnText = custom?.['btn-text'];
  const btnHref = custom?.['btn-href'] ?? PATHS.main;

  return (
    <article id={block?.slug?.current} className="main-padding-x main-padding-y-longer customised-packages-wrapper">
      <div className="component-wrapper space-padding">
        <PortableSanityText
          className="space-text text-center [&_strong]:text-primary [&_strong]:font-medium"
          value={block?.description ?? []}
        />

        <ul className="grid md:grid-cols-1 max-w-xl mx-auto">
          {entries.posts?.slice(0, 1)?.map((e) => {
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
        <Link
          target={btnHref.startsWith('/asset') ? '_blank' : undefined}
          className={buttonVariants({ className: 'mx-auto' })}
          href={btnHref}
        >
          {btnText}
        </Link>
      </div>
    </article>
  );
}
