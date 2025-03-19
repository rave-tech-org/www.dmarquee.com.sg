import { PATHS } from '@/app/urls';
import { buttonVariants } from '@/elements/button';
import PortableSanityText from '@/elements/portable-sanity-text';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { cn } from '@/lib/utils';
import { transformObject } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';

export default function PlanYourNextEvent({ block }: ContentBlockRegistry) {
  if (!block) return null;

  const custom =
    block?.customAttributes && transformObject<{ 'btn-text': string; 'btn-href': string }>(block?.customAttributes);

  const btnText = custom?.['btn-text'];
  const btnHref = custom?.['btn-href'] ?? PATHS.main;

  const isPrimaryColor = !!block.customAttributes?.find((e) => e.key === 'is-primary-color');

  return (
    <article
      id={block.slug?.current}
      className={cn('main-padding-x main-padding-y-longer bg-black', { 'bg-primary': isPrimaryColor })}
    >
      <div className="componnent-wrapper space-padding">
        <header className="text-center text-white space-y-4 lg:space-y-6 max-w-[42rem] mx-auto">
          <h2>{block.title}</h2>
          <PortableSanityText className="lg:space-y-6" value={block.description ?? []} />
        </header>

        <Link
          target="_blank"
          className={buttonVariants({ className: 'mx-auto', color: isPrimaryColor ? 'white' : undefined })}
          href={btnHref}
        >
          {btnText}
        </Link>
      </div>
    </article>
  );
}
