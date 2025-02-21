'use client';
import { PATHS } from '@/app/urls';
import { buttonVariants } from '@/elements/button';
import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { transformObject } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import type { CustomisedPackagesCustomAttribute } from './type';

export default function CustomisedPackages({ block }: ContentBlockRegistry) {
  const custom = block?.customAttributes && transformObject<CustomisedPackagesCustomAttribute>(block?.customAttributes);

  const btnText = custom?.['btn-text'];
  const btnHref = custom?.['btn-href'] ?? PATHS.main;

  return (
    <article id={block?.slug?.current} className="main-padding-x main-padding-y-longer customised-packages-wrapper">
      <div className="component-wrapper space-padding">
        <header className="space-text text-center [&_strong]:text-primary [&_strong]:font-medium">
          <PortableText value={block?.description ?? []} />
        </header>

        <ul className="grid md:grid-cols-2 gap-6">
          {block?.listItems?.map((e) => {
            return (
              <li key={e.title}>
                {e?.imageUrl ? (
                  <NextImage src={e.imageUrl} className="object-center object-cover aspect-video md:aspect-[21/9]" />
                ) : null}
                <h3 className="p-5 md:px-8 text-white bg-black md:line-clamp-1">{e.title}</h3>

                <div className="flex flex-col gap-2 overflow-y-scroll items-center p-5 md:px-8 md:h-[6.5rem] bg-muted-light line-clamp-5">
                  <PortableText value={e.description ?? []} />
                </div>
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
