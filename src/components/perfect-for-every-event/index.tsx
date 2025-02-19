import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { PortableText } from 'next-sanity';

export default function PerfectForEveryEvent({ block }: ContentBlockRegistry) {
  if (!block) return null;
  return (
    <article id={block.slug?.current} className="main-padding-x main-padding-y-longer">
      <div className="component-wrapper space-y-6 lg:space-y-12">
        <h2 className="text-center">{block.title}</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-14 items-start">
          {block?.listItems?.map((e) => {
            return (
              <li key={e.title} className="flex flex-col justify-center items-center text-center gap-4">
                {e.imageUrl ? (
                  <section className="aspect-square bg-primary w-12 md:w-16 lg:w-20 flex items-center justify-center">
                    <NextImage src={e.imageUrl} className="w-[70%]" />
                  </section>
                ) : null}

                <header>
                  <h6>{e.title}</h6>
                  {e.description?.length ? <PortableText value={e.description} /> : null}
                </header>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
