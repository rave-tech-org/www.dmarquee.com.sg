import { PATHS } from '@/app/urls';
import { buttonVariants } from '@/elements/button';
import NextImage from '@/elements/next-image';
import PortableSanityText from '@/elements/portable-sanity-text';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { transformObject } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';

export default function CustomisedEventSolutionsBanner({ block }: ContentBlockRegistry) {
  if (!block) return null;
  const custom =
    block?.customAttributes &&
    transformObject<{ 'btn-text': string; 'btn-href': string; title: string }>(block?.customAttributes);

  const btnText = custom?.['btn-text'];
  const btnHref = custom?.['btn-href'] ?? PATHS.main;

  const title = block?.customAttributes?.find((e) => e.key === 'title');

  return (
    <article id={block.slug?.current}>
      <NextImage src={block.imageUrl} className="w-full" />

      <section className="main-padding-x main-padding-y-longer">
        <div className="grid grid-cols-1 lg:grid-cols-2 component-wrapper gap-6 lg:gap-12">
          <header className="space-y-2 [&_strong]:text-primary [&_strong]:font-medium">
            {block.slug?.current === 'the-d-marquee-experience' ? null : (
              <h4 className="text-primary">{block.title}</h4>
            )}
            <PortableSanityText
              className="space-y-2 [&_strong]:text-primary [&_strong]:font-medium"
              value={title?.description ?? []}
            />
          </header>

          <section className="space-y-4 lg:space-y-6">
            <PortableSanityText className="space-y-4 lg:space-y-6" value={block.description ?? []} />
            <Link
              target={btnHref.startsWith('/asset') ? '_blank' : undefined}
              className={buttonVariants()}
              href={btnHref}
            >
              {btnText}
            </Link>
          </section>
        </div>
      </section>
    </article>
  );
}
