'use client';

import { buttonVariants } from '@/elements/button';
import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { cn } from '@/lib/utils';
import { transformObject } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import { parseAsInteger, useQueryState } from 'nuqs';
import type { FloorPlansCustomAttribute } from './type';

export default function FloorPlans({ block }: ContentBlockRegistry) {
  const [selected, setSelected] = useQueryState('floor-plan', parseAsInteger.withDefault(0));

  const custom = block?.customAttributes && transformObject<FloorPlansCustomAttribute>(block?.customAttributes);

  const btnText = custom?.['btn-text'];
  const btnHref = custom?.['btn-href'] ?? '/';

  return (
    <article className="main-padding space-padding">
      <header className="space-text component-wrapper max-lg:text-center max-lg:main-padding-x text-center">
        <PortableText value={block?.description ?? []} />
      </header>

      {block?.listItems?.length ? (
        <section className="grid grid-cols-3 gap-2 component-wrapper-small">
          <ul className="flex flex-col">
            {block?.listItems?.map((e, i) => {
              const isActive = i === selected;
              return (
                <li key={e.title}>
                  <button type="button" onClick={() => setSelected(i)} className="flex gap-2 md:gap-4 items-center">
                    <div
                      className={cn('animate bg-muted-light h-[40px] md:h-[50px] w-[3px]', { 'bg-primary': isActive })}
                    />
                    <h6 className={cn('text-[#B1B0B0]', { 'text-black': isActive })}>{e.title}</h6>
                  </button>
                </li>
              );
            })}
          </ul>

          <section className="col-span-2 space-text">
            <figure className="space-y-6">
              <NextImage
                preview
                src={block?.listItems[selected].imageUrl ?? ''}
                alt={block?.listItems[selected].title}
              />
              <figcaption className="space-y-4">
                <PortableText value={block?.listItems[selected].description ?? []} />
              </figcaption>
            </figure>
            <Link href={btnHref} className={cn(buttonVariants({ className: 'md:flex hidden' }))}>
              {btnText}
            </Link>
          </section>
        </section>
      ) : null}

      <Link href={btnHref} className={cn(buttonVariants({ className: 'mx-auto md:hidden' }))}>
        {btnText}
      </Link>
    </article>
  );
}
