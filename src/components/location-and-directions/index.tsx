import { buttonVariants } from '@/elements/button';
import NextImage from '@/elements/next-image';
import PortableSanityText from '@/elements/portable-sanity-text';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { transformObject } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';

export default function LocationAndDirections({ block }: ContentBlockRegistry) {
  if (!block) return null;

  const custom =
    block?.customAttributes && transformObject<{ 'btn-text': string; 'btn-href': string }>(block?.customAttributes);

  const btnText = custom?.['btn-text'];
  const btnHref = custom?.['btn-href'] || '/';

  return (
    <article id={block.slug?.current} className="main-padding-x space-y-8 main-padding-b-longer">
      <div className="component-wrapper grid lg:grid-cols-2">
        <div className="space-y-6">
          <h2>{block.title}</h2>
          <section className="space-y-6">
            {block?.listItems?.map((e) => {
              return (
                <header key={e._key} className="space-y-1 [&_a]:text-primary [&_a]:underline">
                  <h6 className="text-primary">{e.title}</h6>
                  <PortableSanityText className="[&_ul]:!list-disc [&_ul]:ml-8" value={e.description ?? []} />
                </header>
              );
            })}
          </section>

          <Link href={btnHref} className={buttonVariants()}>
            {btnText ?? 'GET DIRECTIONS'}
          </Link>
        </div>
        <div />
      </div>

      <div className="component-wrapper">
        <NextImage src={block.imageUrl} className="size-full" preview />
      </div>
    </article>
  );
}
