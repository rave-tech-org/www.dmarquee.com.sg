import { buttonVariants } from '@/elements/button';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { cn } from '@/lib/utils';
import { transformObject } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import Carousel from './carousel';
import type { ShowCasesCustomAttribute } from './type';

export default function ShowCases({ block, entries }: ContentBlockRegistry) {
  const custom = block?.customAttributes && transformObject<ShowCasesCustomAttribute>(block?.customAttributes);

  const btnText = custom?.['btn-text'];
  const btnHref = custom?.['btn-href'] ?? '/';

  return (
    <article id={block?.slug?.current} className="main-padding-y lg:main-padding-x">
      <div className="component-wrapper space-padding">
        <section className="space-text">
          <header className="space-text max-lg:text-center max-lg:main-padding-x">
            <PortableText value={block?.description ?? []} />
          </header>
          <Carousel block={block} />
        </section>

        <Link href={btnHref} className={cn(buttonVariants({ className: 'mx-auto' }))}>
          {btnText}
        </Link>
      </div>
    </article>
  );
}
