import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { PortableText } from 'next-sanity';

export default function EcoFriendlyEvents({ block }: ContentBlockRegistry) {
  if (!block) return null;

  return (
    <article id={block.slug?.current} className="main-padding-x main-padding-y-longer">
      <div className="component-wrapper lg:space-y-12 space-y-6">
        <header className="[&_strong]:font-medium [&_strong]:text-primary space-y-6 max-w-[52rem]">
          <PortableText value={block.description ?? []} />
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-14 items-center">
          <ul className="grid grid-cols-2 gap-6 md:gap-12">
            {block?.listItems?.map((e) => {
              return (
                <li key={e.title} className="space-y-4">
                  {e.imageUrl ? (
                    <section className="aspect-square bg-primary w-16 md:w-20 flex items-center justify-center">
                      <NextImage src={e.imageUrl} className="w-10 md:w-12" />
                    </section>
                  ) : null}
                  <header className="space-y-2">
                    <h6>{e.title}</h6>
                    <PortableText value={e.description ?? []} />
                  </header>
                </li>
              );
            })}
          </ul>

          <NextImage src={block.imageUrl} className="size-full object-center object-cover" />
        </section>
      </div>
    </article>
  );
}
