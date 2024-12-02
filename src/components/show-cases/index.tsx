'use client';

import { buttonVariants } from '@/elements/button';
import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { cn } from '@/lib/utils';
import { transformObject } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import { useState } from 'react';
import type { ShowCasesCustomAttribute } from './type';

export default function ShowCases({ block, entries }: ContentBlockRegistry) {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const custom = block?.customAttributes && transformObject<ShowCasesCustomAttribute>(block?.customAttributes);

  const btnText = custom?.['btn-text'];
  const btnHref = custom?.['btn-href'] ?? '/';

  return (
    <article className="main-padding">
      <div className="wrapper space-padding">
        <section className="space-text">
          <PortableText value={block?.description ?? []} />

          <ul className="flex lg:flex-row flex-col gap-4">
            {block?.listItems?.map((e, i) => {
              const selected = selectedIndex === i;
              return (
                <li
                  onMouseEnter={() => setSelectedIndex(i)}
                  className={cn(
                    'animate relative lg:h-[55vh] max-lg:!w-full',

                    { 'h-[50vh]': selected, 'max-lg:h-[20vh]': !selected }
                  )}
                  key={e.title}
                  style={{
                    width: selected
                      ? '35%'
                      : `${65 / ((block?.listItems?.length ? block?.listItems?.length : 0) - 1)}%`,
                  }}
                >
                  {e.imageUrl ? <NextImage src={e.imageUrl} className="object-cover object-center h-full" /> : null}

                  <div
                    className={cn(
                      'text-white animate flex items-end absolute top-0 left-0 size-full opacity-0 bg-gradient-to-b from-transparent to-black/70',
                      { 'opacity-100': selected }
                    )}
                  >
                    <header className="space-y-1.5 main-padding">
                      <PortableText value={e.description ?? []} />
                    </header>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <Link href={btnHref} className={cn(buttonVariants({ className: 'mx-auto' }))}>
          {btnText}
        </Link>
      </div>
    </article>
  );
}
