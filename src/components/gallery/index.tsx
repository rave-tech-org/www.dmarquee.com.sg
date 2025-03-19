'use client';

import Button from '@/elements/button';
import PortableSanityText from '@/elements/portable-sanity-text';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { PortableText } from 'next-sanity';
import { useState } from 'react';
import Carousel from './carousel';

export default function Gallery({ block }: ContentBlockRegistry) {
  if (!block) return null;
  if (!block?.listItems?.length) return null;

  const [viewAll, setViewAll] = useState(false);

  function splitIntoChunks<T>(arr: T[], chunkSize: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  const result = splitIntoChunks(block.listItems, 4);
  const filteredResult = viewAll ? result : result?.slice(0, 1);

  return (
    <article className="main-padding-y-longer space-padding">
      <div className="main-padding-x">
        <section className="component-wrapper">
          <header className="space-y-4 max-w-2xl">
            <h5 className="font-medium text-primary">Gallery</h5>
            <PortableSanityText value={block?.description ?? []} />
          </header>
        </section>
      </div>
      <section className="space-padding md:component-wrapper">
        {filteredResult.map((e, i) => {
          if (!e) return null;
          return <Carousel key={i} listItems={e} />;
        })}

        {viewAll ? null : (
          <Button className="mx-auto" onClick={() => setViewAll(true)}>
            View All
          </Button>
        )}
      </section>
    </article>
  );
}
