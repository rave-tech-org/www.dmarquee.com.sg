'use client';

import { buttonVariants } from '@/elements/button';
import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { transformObject } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import type { EnquireIntroductionCustomAttribute } from './type';

export default function EnquireIntroduction({ block, entries }: ContentBlockRegistry) {
  const custom =
    block?.customAttributes && transformObject<EnquireIntroductionCustomAttribute>(block?.customAttributes);

  const btnText = custom?.['btn-text'];
  const btnHref = custom?.['btn-href'] ?? '/';

  return (
    <article className="main-padding enquire-introduction-wrapper">
      <div className="component-wrapper">
        <section className="flex flex-col gap-6 md:flex-row md:justify-between items-center main-padding !pb-24 bg-muted-light">
          <header className="space-text max-md:text-center">
            <PortableText
              components={{
                block: {
                  h2: ({ children }) => <h2 className="max-md:text-[20px]">{children}</h2>,
                },
              }}
              value={block?.description ?? []}
            />
          </header>
          <Link
            target={btnHref.startsWith('/asset') ? '_blank' : undefined}
            className={buttonVariants()}
            href={btnHref}
          >
            {btnText}
          </Link>
        </section>

        {block?.imageUrl ? (
          <NextImage
            src={block?.imageUrl}
            className="w-full max-md:aspect-video md:h-[20rem] object-[80%_top] md:object-right-top -mt-16 object-cover"
          />
        ) : null}
      </div>
    </article>
  );
}
