'use client';

import { PATHS } from '@/app/urls';
import { buttonVariants } from '@/elements/button';
import NextImage from '@/elements/next-image';
import PortableSanityText from '@/elements/portable-sanity-text';
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
  const btnHref = custom?.['btn-href'] ?? PATHS.main;

  return (
    <article id={block?.slug?.current} className="main-padding-x main-padding-y-longer">
      <div className="component-wrapper space-padding">
        <PortableSanityText
          className="space-text max-lg:text-center max-lg:main-padding-x text-center"
          value={block?.description ?? []}
        />

        {block?.listItems?.length ? (
          <section className="hidden lg:grid grid-cols-6 gap-4">
            <ul className="flex flex-col col-span-2">
              {block?.listItems?.map((e, i) => {
                const isActive = i === selected;
                return (
                  <li key={e.title}>
                    <button type="button" onClick={() => setSelected(i)} className="flex gap-2 md:gap-4 items-center">
                      <div
                        className={cn('animate bg-muted-light h-[40px] md:h-[50px] w-[3px]', {
                          'bg-primary': isActive,
                        })}
                      />
                      <h4 className={cn('text-[#B1B0B0] text-left', { 'text-black': isActive })}>{e.title}</h4>
                    </button>
                  </li>
                );
              })}
            </ul>

            <section className="col-span-4 space-text">
              <figure className="space-y-6">
                <NextImage
                  preview
                  src={block?.listItems[selected].imageUrl ?? ''}
                  alt={block?.listItems[selected].title}
                />
                <figcaption className="space-y-4">
                  <PortableSanityText className="space-y-4" value={block?.listItems[selected].description ?? []} />
                </figcaption>
              </figure>
            </section>
          </section>
        ) : null}

        {block?.listItems?.length ? (
          <ul className="flex flex-col lg:hidden">
            {block.listItems.map((e, i) => {
              const isActive = i === selected;
              return (
                <li key={e.title} className="flex flex-col">
                  <button type="button" onClick={() => setSelected(i)} className="grid items-center grid-cols-12">
                    <div
                      className={cn('ml-3 md:ml-12 animate bg-muted-light h-[40px] w-[3px]', {
                        'bg-primary': isActive,
                      })}
                    />
                    <h5
                      className={cn('text-left text-[#B1B0B0] col-span-11', {
                        'text-black': isActive,
                      })}
                    >
                      {e.title}
                    </h5>
                  </button>

                  <div className="grid grid-cols-12">
                    <div className="ml-3 md:ml-12 animate bg-muted-light h-full w-[3px]" />

                    <figure className={cn('space-y-6 col-span-11 py-4', { hidden: !isActive })}>
                      <NextImage
                        preview
                        src={block?.listItems?.[selected].imageUrl ?? ''}
                        alt={block?.listItems?.[selected].title}
                      />
                      <figcaption className="space-y-4">
                        <PortableSanityText
                          className="space-y-4"
                          value={block?.listItems?.[selected].description ?? []}
                        />
                      </figcaption>
                    </figure>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : null}

        <Link
          href={btnHref}
          target={btnHref.startsWith('/asset') ? '_blank' : undefined}
          className={cn(buttonVariants({ className: 'mx-auto' }))}
        >
          {btnText}
        </Link>
      </div>
    </article>
  );
}
