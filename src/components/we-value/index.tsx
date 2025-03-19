import NextImage from '@/elements/next-image';
import PortableSanityText from '@/elements/portable-sanity-text';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { PortableText } from 'next-sanity';

export default function WeValue({ block }: ContentBlockRegistry) {
  if (!block) return null;
  return (
    <article id={block?.slug?.current} className="main-padding-x main-padding-y-longer bg-[#eee]">
      <div className="component-wrapper lg:space-y-12 space-y-6">
        <h2>{block?.title}</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
          {block?.listItems?.map((e) => {
            return (
              <li key={e.title} className="space-y-4">
                {e.imageUrl ? (
                  <section className="aspect-square bg-primary w-16 md:w-20 flex items-center justify-center">
                    <NextImage src={e.imageUrl} className="w-10 md:w-12" />
                  </section>
                ) : null}
                <header className="space-y-2">
                  <h5>{e.title}</h5>
                  <PortableSanityText className="space-y-2" value={e.description ?? []} />
                </header>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
