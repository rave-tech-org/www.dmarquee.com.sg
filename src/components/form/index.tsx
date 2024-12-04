import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { PortableText } from 'next-sanity';
import React from 'react';

export default function Form({ block, entries }: ContentBlockRegistry) {
  return (
    <article>
      <section className="bg-primary main-padding !pb-32">
        <div className="wrapper grid md:grid-cols-2 gap-6 lg:gap-12 text-white main-padding-y">
          <header className="space-text max-w-[32rem]">
            <PortableText value={block?.description ?? []} />
          </header>
          <iframe src="/form/form.html" className="min-h-[32rem]" width="100%" height="100%" title="Web-to-Lead form" />
        </div>
      </section>
      {block?.imageUrl ? <NextImage src={block?.imageUrl} className="w-full -mt-24 object-cover object-top" /> : null}
    </article>
  );
}
