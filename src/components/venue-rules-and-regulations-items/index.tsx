import NextImage from '@/elements/next-image';
import PortableSanityText from '@/elements/portable-sanity-text';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { cn } from '@/lib/utils';
import { PortableText } from 'next-sanity';

export default function VenueRulesAndRegulationsItems({ block }: ContentBlockRegistry) {
  if (!block) return null;
  return (
    <article id={block.slug?.current} className="main-padding-x pb-12">
      <div className="component-wrapper-small">
        <header className="text-center main-padding-y-longer">
          <PortableSanityText value={block.description ?? []} />
        </header>

        <ul className="flex flex-col">
          {block.listItems?.map((e, i) => {
            if (!block.listItems?.length) return null;
            const isLastIndex = i === block?.listItems?.length - 1;
            return (
              <li key={i} className={cn({ 'border-b border-black': !isLastIndex })}>
                <section className="flex gap-4 items-center main-padding-t">
                  <section className="aspect-square bg-primary w-16 md:w-20 flex items-center justify-center">
                    <NextImage src={e.imageUrl} className="w-10 md:w-12" />
                  </section>
                  <h4>{e.title}</h4>
                </section>

                <ul className="grid grid-cols-2 gap-6 xl:gap-y-10 main-padding-y">
                  {e.customAttributes?.map((l, index) => {
                    return (
                      <li key={index} className="flex flex-col gap-2">
                        <h5 className="font-semibold">{l.key}</h5>
                        <PortableSanityText className="space-y-2" value={l.description ?? []} />
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
