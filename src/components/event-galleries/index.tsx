'use client';
import { buttonVariants } from '@/elements/button';
import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { transformObject } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import Carousel from './carousel';
import type { EventGalleriesCustomAttribute } from './type';

export default function EventGalleries({ block, entries }: ContentBlockRegistry) {
  const custom = block?.customAttributes && transformObject<EventGalleriesCustomAttribute>(block?.customAttributes);

  const bookVisit = { label: custom?.['book-visit-text'], href: custom?.['book-visit-href'] ?? '/' };
  const contactUs = { label: custom?.['contact-us-text'], href: custom?.['contact-us-href'] ?? '/' };

  return (
    <article className="main-padding-y event-galleries-wrapper">
      <div className="space-padding">
        <header className="component-wrapper text-center">
          <h2 className="main-padding-x">{block?.title}</h2>
        </header>
        <Carousel block={block} />

        <section className="main-padding-x">
          <div className="component-wrapper relative">
            {block?.imageUrl ? (
              <NextImage
                src={block.imageUrl}
                className="max-md:h-[32rem] md:aspect-[21/9] xl:aspect-[25/9] w-full object-center object-cover"
              />
            ) : null}

            <section className="flex flex-col gap-y-10 justify-between size-full absolute left-0 top-0 main-padding">
              <div className="space-text text-white">
                <PortableText value={block?.description ?? []} />
              </div>

              <nav className="flex flex-wrap gap-4">
                <Link href={bookVisit.href} className={buttonVariants()}>
                  {bookVisit.label}
                </Link>
                <Link href={contactUs.href} className={buttonVariants({ color: 'white' })}>
                  {contactUs.label}
                </Link>
              </nav>
            </section>
          </div>
        </section>
      </div>
    </article>
  );
}
