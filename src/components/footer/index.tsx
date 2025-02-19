import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import { Fragment } from 'react';

export default function Footer({ block }: ContentBlockRegistry) {
  if (!block) return null;

  const leftSide = block.listItems?.find((e) => e.slug?.current === 'description-left-side');

  const menusBottomSide = block.listItems
    ?.find((e) => e.slug?.current === 'menus-bottom-side')
    ?.description?.map((e) => {
      const doesntHaveHref = !e.markDefs?.length;

      return {
        label: e.children?.[0]?.text || 'Unlabeled',
        href: e.markDefs?.[0]?.href || '/',
        children: doesntHaveHref ? [] : null,
      };
    });

  return (
    <footer id={block.slug?.current} className="main-padding-x bg-[#EEE]">
      <div className="component-wrapper">
        <section className="main-padding-y grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
          <section className="space-y-2">
            <NextImage src={block.imageUrl} className="w-56" />
            <header className="[&_*]:whitespace-pre-line">
              <PortableText value={leftSide?.description ?? []} />
            </header>
          </section>

          <section></section>
          <section></section>
        </section>

        <section className="border-t border-black py-6 flex justify-between flex-wrap gap-4 md:gap-6 items-center">
          <PortableText value={block.description ?? []} />

          <ul className="flex md:items-center flex-wrap max-md:flex-col">
            {menusBottomSide?.map((e, i) => {
              if (!e.href) return null;
              const isLastIndex = i === menusBottomSide?.length - 1;
              return (
                <Fragment key={e.label}>
                  <li>
                    <Link href={e.href} className="hover:underline">
                      {e.label}
                    </Link>
                  </li>
                  {isLastIndex ? null : <li className="h-5 w-[1px] bg-black mx-4 max-md:hidden" />}
                </Fragment>
              );
            })}
          </ul>
        </section>
      </div>
    </footer>
  );
}
