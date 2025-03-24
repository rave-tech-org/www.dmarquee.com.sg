import { PATHS } from '@/app/urls';
import NextImage from '@/elements/next-image';
import PortableSanityText from '@/elements/portable-sanity-text';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { cn } from '@/lib/utils';
import { buildMenu, createMenuFromDescription } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import { Fragment } from 'react';

export default function Footer({ block }: ContentBlockRegistry) {
  if (!block) return null;

  const leftSide = block.listItems?.find((e) => e.slug?.current === 'description-left-side');
  const additionalMenus = block.listItems?.find((e) => e.slug?.current === 'additional-menus');
  const mainMenus = block.listItems?.find((e) => e.slug?.current === 'main-menus');
  const linkedin = additionalMenus?.customAttributes?.find((e) => e.key === 'linkedin');

  const additionalMenuMenus = createMenuFromDescription({ description: additionalMenus?.description });
  const menusBottomSide = createMenuFromDescription({
    description: block.listItems?.find((e) => e.slug?.current === 'menus-bottom-side')?.description,
  });

  const menus = buildMenu(mainMenus?.description) || [];

  return (
    <footer id={block.slug?.current} className="main-padding-x bg-[#EEE]">
      <div className="component-wrapper">
        <section className="main-padding-y grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
          <section className="space-y-2">
            <NextImage src={block.imageUrl} className="w-56" />
            <PortableSanityText
              className="[&_*]:whitespace-pre-line [&_a:hover]:underline space-y-0"
              value={leftSide?.description ?? []}
            />
          </section>

          <ul className="flex flex-col gap-3">
            {menus.slice(0, 5).map((item) => {
              if (item.subMenu?.length) {
                return item.subMenu.map((subItem, i) => {
                  const subItemHref = subItem.marks?.href || PATHS.main;
                  if (!subItemHref) return null;
                  return (
                    <li key={subItemHref || `${item.id}-${i}`}>
                      <Link
                        href={subItemHref}
                        className={cn('hover:underline', { 'text-[#666666]': i !== 0, 'font-medium': i === 0 })}
                      >
                        {subItem.text}
                      </Link>
                    </li>
                  );
                });
              }

              const href = item.marks?.href || PATHS.main;
              if (!href) return null;
              return (
                <li key={href || item.id}>
                  <Link href={href} className="font-medium hover:underline">
                    {item.text}
                  </Link>
                </li>
              );
            })}
          </ul>

          <ul className="flex flex-col gap-3">
            {additionalMenuMenus?.map((e, i) => {
              return (
                <li key={i}>
                  <Link href={e.href} className="font-medium hover:underline">
                    {e.label}
                  </Link>
                </li>
              );
            })}

            <li className="mt-4">
              <Link
                target="_blank"
                href={linkedin?.value || PATHS.main}
                className="hover:underline flex gap-2 items-center"
              >
                <PortableSanityText value={linkedin?.description ?? []} />
                <NextImage src={linkedin?.imageUrl} className="w-5" />
              </Link>
            </li>
          </ul>
        </section>

        <section className="border-t border-black py-6 flex justify-between flex-wrap gap-4 md:gap-6 items-center">
          <PortableSanityText className="md:space-y-6" value={block.description ?? []} />

          <ul className="flex md:items-center flex-wrap max-md:flex-col">
            {menusBottomSide?.map((e, i) => {
              if (!e.href) return null;
              const isLastIndex = i === menusBottomSide?.length - 1;
              return (
                <Fragment key={i}>
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
