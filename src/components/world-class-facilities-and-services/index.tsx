import { PATHS } from '@/app/urls';
import { buttonVariants } from '@/elements/button';
import NextImage from '@/elements/next-image';
import PortableSanityText from '@/elements/portable-sanity-text';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { transformObject } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';

export default function WorldClass({ block }: ContentBlockRegistry) {
  if (!block) return null;

  const custom =
    block?.customAttributes && transformObject<{ 'btn-text': string; 'btn-href': string }>(block?.customAttributes);

  const btnText = custom?.['btn-text'];
  const btnHref = custom?.['btn-href'] ?? PATHS.main;
  return (
    <article id={block.slug?.current} className="main-padding-x main-padding-y-longer">
      <div className="space-padding xl:space-y-16 component-wrapper">
        <PortableSanityText
          className="[&_strong]:font-medium [&_strong]:text-primary"
          value={block?.description ?? []}
        />

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
                  <h5>{e.title}</h5>
                  <PortableSanityText className="space-y-2" value={e.description ?? []} />
                </header>
              </li>
            );
          })}
        </ul>
        <Link
          target={btnHref.startsWith('/asset') ? '_blank' : undefined}
          href={btnHref}
          className={buttonVariants({ className: 'max-lg:mx-auto' })}
        >
          {btnText}
        </Link>
      </div>
    </article>
  );
}
