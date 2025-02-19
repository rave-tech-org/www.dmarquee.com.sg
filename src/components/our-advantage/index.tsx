'use client';

import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { cn } from '@/lib/utils';
import { PortableText } from 'next-sanity';
import { parseAsString, useQueryState } from 'nuqs';

export default function OurAdvantage({ block }: ContentBlockRegistry) {
  if (!block?.listItems?.[0]?.title) return null;

  const [advantage, setAdvantage] = useQueryState('advantage', parseAsString.withDefault(block.listItems[0].title));

  const data = block?.listItems?.find((e) => e.title === advantage);

  if (!data) return null;

  return (
    <article id={block.slug?.current} className="main-padding-x main-padding-y-longer">
      <div className="component-wrapper lg:space-y-12 space-y-6">
        <h2 className="text-center">{block?.title}</h2>

        <section className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24">
          <NextImage src={data?.imageUrl} className="aspect-[4/3] object-center object-cover" />
          <ul className="space-y-6">
            {block.listItems?.map((e) => {
              if (!e.title) return null;
              const isActive = e.title === advantage;
              return (
                <li key={e._key} className="flex gap-6 items-center group">
                  <div className={cn('h-0 bg-primary w-[2px] animate', { 'h-24': isActive })} />
                  <button
                    type="button"
                    className="text-left space-y-2"
                    onClick={() => e.title && setAdvantage(e.title)}
                  >
                    <h4 className="group-hover:underline">{e.title}</h4>
                    <PortableText value={e.description ?? []} />
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <ul className="flex flex-col lg:hidden">
          {block.listItems?.map((e) => {
            if (!e.title) return null;
            const isActive = e.title === advantage;
            return (
              <li key={e._key} className="flex flex-col">
                <button
                  type="button"
                  onClick={() => e.title && setAdvantage(e.title)}
                  className="grid items-center grid-cols-12"
                >
                  <div
                    className={cn('ml-3 md:ml-12 animate bg-muted-light h-[40px] w-[3px]', {
                      'bg-primary': isActive,
                    })}
                  />
                  <h6
                    className={cn('text-left text-[#B1B0B0] col-span-11', {
                      'text-black': isActive,
                    })}
                  >
                    {e.title}
                  </h6>
                </button>

                <div className="grid grid-cols-12">
                  <div className="ml-3 md:ml-12 animate bg-muted-light h-full w-[3px]" />

                  <figure className={cn('space-y-6 col-span-11 py-4', { hidden: !isActive })}>
                    <NextImage preview src={data.imageUrl} alt={data.title} />
                    <figcaption className="space-y-4">
                      <PortableText value={data.description ?? []} />
                    </figcaption>
                  </figure>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
