import { PATHS } from '@/app/urls';
import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { cn } from '@/lib/utils';
import { createMenuFromDescription } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import { Fragment } from 'react';

export default function Footer({ block, entries }: ContentBlockRegistry) {
  if (!block) return null;

  const leftSide = block.listItems?.find((e) => e.slug?.current === 'description-left-side');
  const additionalMenus = block.listItems?.find((e) => e.slug?.current === 'additional-menus');
  const linkedin = additionalMenus?.customAttributes?.find((e) => e.key === 'linkedin');

  const additionalMenuMenus = createMenuFromDescription({ description: additionalMenus?.description });
  const menusBottomSide = createMenuFromDescription({
    description: block.listItems?.find((e) => e.slug?.current === 'menus-bottom-side')?.description,
  });

  const { menus } = entries;

  return (
    <footer id={block.slug?.current} className="main-padding-x bg-[#EEE]">
      <div className="component-wrapper">
        <section className="main-padding-y grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
          <section className="space-y-2">
            <NextImage src={block.imageUrl} className="w-56" />
            <header className="[&_*]:whitespace-pre-line [&_a:hover]:underline">
              <PortableText value={leftSide?.description ?? []} />
            </header>
          </section>

          <ul className="flex flex-col gap-3">
            {menus.slice(0, 5).map((e) => {
              if (e.children?.length) {
                return e.children.map((l, i) => {
                  if (!l.href) return null;
                  return (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className={cn('hover:underline', { 'text-[#666666]': i !== 0, 'font-medium': i === 0 })}
                      >
                        {l.label}
                      </Link>
                    </li>
                  );
                });
              }

              if (!e.href) return null;
              return (
                <li key={e.href}>
                  <Link href={e.href} className="font-medium hover:underline">
                    {e.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <ul className="flex flex-col gap-3">
            {menus?.slice(5, undefined).map((e, i) => {
              if (e.children?.length) {
                return e.children.map((l, i) => {
                  if (!l.href) return null;
                  return (
                    <li key={i}>
                      <Link
                        href={l.href}
                        className={cn('hover:underline', { 'text-[#666666]': i !== 0, 'font-medium': i === 0 })}
                      >
                        {l.label}
                      </Link>
                    </li>
                  );
                });
              }

              if (!e.href) return null;
              return (
                <li key={i}>
                  <Link href={e.href} className="font-medium hover:underline">
                    {e.label}
                  </Link>
                </li>
              );
            })}
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
                <PortableText value={linkedin?.description ?? []} />
                <NextImage src={linkedin?.imageUrl} className="w-5" />
              </Link>
            </li>
          </ul>
        </section>

        <section className="border-t border-black py-6 flex justify-between flex-wrap gap-4 md:gap-6 items-center">
          <PortableText value={block.description ?? []} />

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
