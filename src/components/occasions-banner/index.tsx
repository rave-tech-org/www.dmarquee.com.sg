import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { cn } from '@/lib/utils';
import { PortableText } from 'next-sanity';
import Carousel from '../event-type/carousel';

export default function OccasionsBanner({ block }: ContentBlockRegistry) {
  if (!block) return null;
  return (
    <article
      id={block?.slug?.current}
      className={cn('main-padding-x main-padding-y-longer', {
        'bg-[#eee]': !!block?.customAttributes?.find((e) => e.key === 'gray-background')?.value,
      })}
    >
      <div className="component-wrapper space-padding">
        <header className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <h2>{block.title}</h2>
          <PortableText value={block?.description ?? []} />
        </header>

        <Carousel block={block} />
      </div>
    </article>
  );
}
