import { buttonVariants } from '@/elements/button';
import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { cn } from '@/lib/utils';
import { transformObject } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import type { EventTypeCustomAttribute } from './type';

export default function EventType({ block, entries }: ContentBlockRegistry) {
  const custom = block?.customAttributes && transformObject<EventTypeCustomAttribute>(block?.customAttributes);

  const btnText = custom?.['btn-text'];
  const btnHref = custom?.['btn-href'] ?? '/';

  return (
    <article className="bg-muted-light main-padding-x py-16 lg:py-24">
      <div className="wrapper space-y-12">
        <header className="space-text text-center">
          <PortableText value={block?.description ?? []} />
        </header>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-20">
          {block?.listItems?.map((e) => {
            return (
              <li key={e.title} className="space-text">
                {e.imageUrl ? (
                  <section className="aspect-square bg-primary w-16 md:w-20 flex items-center justify-center">
                    <NextImage src={e.imageUrl} className="w-8 md:w-12" />
                  </section>
                ) : null}

                <header className="space-y-2">
                  <PortableText value={e?.description ?? []} />
                </header>
              </li>
            );
          })}
        </ul>

        <Link href={btnHref} className={cn(buttonVariants({ className: 'mx-auto' }))}>
          {btnText}
        </Link>
      </div>
    </article>
  );
}
