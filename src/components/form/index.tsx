'use client';

import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { PortableText } from 'next-sanity';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Form({ block, entries }: ContentBlockRegistry) {
  const router = useRouter();

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.data === 'formSubmitted') {
        console.log('Form was submitted in the iframe');
        setTimeout(() => {
          router.push('/thank-you');
        }, 5000);
      }
    });
  }, []);

  return (
    <article id="form-section-discoverdmq">
      <section className="bg-primary main-padding !pb-32">
        <div className="component-wrapper grid md:grid-cols-2 gap-6 lg:gap-12 text-white main-padding-y">
          <header className="space-text max-md:text-center max-w-[32rem]">
            <PortableText value={block?.description ?? []} />
          </header>
          <iframe
            src="/form/new-form.html"
            className="min-h-[32rem]"
            width="100%"
            height="100%"
            title="Web-to-Lead form"
          />
        </div>
      </section>
      {block?.imageUrl ? (
        <NextImage
          src={block?.imageUrl}
          className="w-full -mt-24 object-cover object-top max-md:aspect-video max-md:object-right"
        />
      ) : null}
    </article>
  );
}
