import { buttonVariants } from '@/elements/button';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { transformObject } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';

export default function PlanYourNextEvent({ block }: ContentBlockRegistry) {
  if (!block) return null;

  const custom =
    block?.customAttributes && transformObject<{ 'btn-text': string; 'btn-href': string }>(block?.customAttributes);

  const btnText = custom?.['btn-text'];
  const btnHref = custom?.['btn-href'] ?? '/';

  return (
    <article id={block.slug?.current} className="main-padding-x main-padding-y-longer bg-black">
      <div className="componnent-wrapper space-y-6 lg:space-y-12">
        <header className="text-center text-white space-y-4 lg:space-y-6 max-w-[42rem] mx-auto">
          <h2>{block.title}</h2>
          <PortableText value={block.description ?? []} />
        </header>

        <Link target="_blank" className={buttonVariants({ className: 'mx-auto' })} href={btnHref}>
          {btnText}
        </Link>
      </div>
    </article>
  );
}
