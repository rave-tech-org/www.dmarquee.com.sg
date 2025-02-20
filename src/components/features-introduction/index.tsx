'use client';
import { buttonVariants } from '@/elements/button';
import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { cn } from '@/lib/utils';
import { transformObject } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import type { FeaturesIntroductionCustomAttribute } from './type';

export default function FeaturesIntroduction({ entries, block }: ContentBlockRegistry) {
  const custom =
    block?.customAttributes && transformObject<FeaturesIntroductionCustomAttribute>(block?.customAttributes);

  const btnText = custom?.['btn-text'];
  const btnHref = custom?.['btn-href'] ?? '/';

  return (
    <article id={block?.slug?.current} className="main-padding">
      <div className="component-wrapper space-padding">
        <section className="flex justify-between items-center flex-wrap gap-6">
          <header className="[&_strong]:font-medium [&_strong]:text-primary max-w-[44rem] space-y-4">
            <PortableText value={block?.description ?? []} />
          </header>

          <Link
            target={btnHref.startsWith('/asset') ? '_blank' : undefined}
            href={btnHref}
            className={cn(buttonVariants({ className: 'h-fit max-sm:mx-auto' }))}
          >
            {btnText}
          </Link>
        </section>

        <ul className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
          {block?.listItems?.map((e) => {
            return (
              <li key={e.title} className="space-y-4 max-md:flex items-center flex-col max-md:text-center">
                {e.imageUrl ? (
                  <section className="aspect-square bg-primary w-16 md:w-20 flex items-center justify-center">
                    <NextImage src={e.imageUrl} className="w-10 md:w-12" />
                  </section>
                ) : null}
                <header className="space-y-2">
                  <h6>{e.title}</h6>
                  <PortableText value={e.description ?? []} />
                </header>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
