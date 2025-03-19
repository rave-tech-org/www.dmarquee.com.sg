import PortableSanityText from '@/elements/portable-sanity-text';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { createMenuFromDescription } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import { Fragment } from 'react';

export default function FooterDmq({ block }: ContentBlockRegistry) {
  if (!block) return null;

  const menus = createMenuFromDescription({
    description: block?.listItems?.find((e) => e.slug?.current === 'menus')?.description,
  });

  const desc = block?.listItems?.find((e) => e.slug?.current === 'title');

  return (
    <article id={block.slug?.current}>
      <div className="main-padding">
        <div className="component-wrapper">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <PortableSanityText
              className="space-y-2 max-md:text-center"
              value={desc?.customAttributes?.find((e) => e.key === 'header')?.description ?? []}
            />
            <PortableSanityText className="md:col-span-2 max-md:text-center" value={desc?.description ?? []} />
          </section>
        </div>
      </div>

      <footer className="bg-black text-white">
        <div className="main-padding-x py-6">
          <div className="component-wrapper flex justify-between flex-wrap gap-4 md:gap-6 max-md:items-center max-md:justify-center">
            <PortableSanityText value={block.description ?? []} className="md:space-y-6" />
            <ul className="flex">
              {menus?.map((e, i) => {
                const lastIndex = i === menus?.length - 1;
                return (
                  <Fragment key={e.label}>
                    <li>
                      <Link href={e.href} className="hover:underline">
                        {e.label}
                      </Link>
                    </li>
                    {lastIndex ? null : <li className="px-2 md:px-4">|</li>}
                  </Fragment>
                );
              })}
            </ul>
          </div>
        </div>
      </footer>
    </article>
  );
}
