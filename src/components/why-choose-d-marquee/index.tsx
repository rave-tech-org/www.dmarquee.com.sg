import PortableSanityText from '@/elements/portable-sanity-text';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { cn } from '@/lib/utils';
import { isOdd } from '@/utils';
import { PortableText } from 'next-sanity';

export default function WhyChoose({ block }: ContentBlockRegistry) {
  if (!block) return null;
  return (
    <article id={block.slug?.current} className="main-padding-x main-padding-y-longer">
      <div className="component-wrapper space-y-12">
        <PortableSanityText
          className="space-y-6 [&_strong]:font-medium [&_strong]:text-primary"
          value={block.description ?? []}
        />

        <ul className="grid grid-cols-2 md:grid-cols-6 gap-6 xl:gap-12">
          {block.listItems?.map((e, i) => {
            if (!block.listItems?.length) return null;

            const isOddd = isOdd(block.listItems.length);

            const lastItem = block.listItems.length - 1 === i;
            const lastSecondItem = block.listItems.length - 2 === i;

            return (
              <li
                key={i}
                className={cn('space-y-4 md:col-span-2', {
                  'md:col-start-4 md:col-span-2': lastItem && isOddd,
                  'md:col-start-2 md:col-span-2': lastSecondItem && isOddd,
                  'md:col-span-2': isOddd && !lastItem && !lastSecondItem,
                })}
              >
                <h6>{e.title}</h6>
                <PortableSanityText value={e.description ?? []} />
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
