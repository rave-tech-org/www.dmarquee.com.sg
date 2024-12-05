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
    <article className="main-padding features-introduction-wrapper">
      <div className="wrapper space-padding">
        <ul className="space-y-[2rem]">
          {block?.listItems?.map((e, i) => {
            const isOdd = i % 2 !== 0;
            return (
              <li
                key={e.title}
                className={cn('grid md:grid-cols-2 gap-y-4 items-center', {
                  'grid-flow-dense': isOdd,
                })}
              >
                {e.imageUrl ? (
                  <NextImage
                    src={e.imageUrl}
                    className={cn('object-cover aspect-[5/3] object-bottom', {
                      'md:col-start-2 md:row-start-1': isOdd,
                    })}
                  />
                ) : null}

                <header
                  className={cn('space-y-2 md:space-y-4 max-md:text-center', {
                    'md:col-start-1 md:row-start-1 md:pr-6 lg:pr-16': isOdd,
                    'md:pl-6 lg:pl-16': !isOdd,
                  })}
                >
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
