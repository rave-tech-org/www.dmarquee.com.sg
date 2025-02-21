'use client';

import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { PortableText } from 'next-sanity';
import Carousel from './carousel';

export default function Gallery({ block }: ContentBlockRegistry) {
  if (!block) return null;
  if (!block?.listItems?.length) return null;

  function splitIntoChunks<T>(arr: T[], chunkSize: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  const result = splitIntoChunks(block.listItems, 4);

  return (
    <article className="main-padding-y-longer space-padding">
      <div className="main-padding-x">
        <section className="component-wrapper">
          <header className="space-y-4 max-w-2xl">
            <h5 className="font-medium text-primary">Gallery</h5>
            <PortableText value={block?.description ?? []} />
          </header>
        </section>
      </div>
      <section className="space-padding md:component-wrapper">
        {result.map((e, i) => {
          if (!e) return null;
          return <Carousel key={i} listItems={e} />;
        })}
      </section>
    </article>
  );
}
