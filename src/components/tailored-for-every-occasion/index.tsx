import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { PortableText } from 'next-sanity';

export default function TailoredForEveryOccasion({ block }: ContentBlockRegistry) {
  if (!block) return null;
  return (
    <article id={block.slug?.current} className="bg-primary main-padding-y-longer main-padding-x">
      <div className="component-wrapper space-padding text-white">
        <h2 className="text-center">{block.title}</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {block?.listItems?.map((e) => {
            return (
              <li key={e._key}>
                <figure className="space-y-6">
                  <NextImage src={e.imageUrl} className="aspect-video object-cover object-center" />
                  <figcaption className="text-center space-y-4">
                    <h5>{e.title}</h5>
                    <PortableText value={e.description ?? []} />
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
