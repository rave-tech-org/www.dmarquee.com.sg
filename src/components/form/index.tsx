import { PATHS } from '@/app/urls';
import { buttonVariants } from '@/elements/button';
import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { cn } from '@/lib/utils';
import { transformObject } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';

export default function Form({ block }: ContentBlockRegistry) {
  const custom =
    block?.customAttributes && transformObject<{ 'btn-text': string; 'btn-href': string }>(block?.customAttributes);

  const btnText = custom?.['btn-text'];
  const btnHref = custom?.['btn-href'] ?? PATHS.main;

  return (
    <article id="form-section-discoverdmq">
      <section className="bg-primary main-padding !pb-24">
        <div className="component-wrapper flex justify-between flex-wrap gap-6 text-white main-padding-y">
          <header className="space-text max-md:text-center max-w-[52rem]">
            <PortableText value={block?.description ?? []} />
          </header>
          <Link
            target={btnHref.startsWith('/asset') ? '_blank' : undefined}
            href={btnHref}
            className={cn(buttonVariants({ color: 'white', className: 'h-fit max-sm:mx-auto' }))}
          >
            {btnText}
          </Link>
        </div>
      </section>
      {block?.imageUrl ? (
        <NextImage
          src={block?.imageUrl}
          className="w-full max-md:aspect-video md:h-[30rem] object-[80%_top] md:object-right-top -mt-16 object-cover"
        />
      ) : null}
    </article>
  );
}

// 'use client';

// import NextImage from '@/elements/next-image';
// import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
// import { PortableText } from 'next-sanity';
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';

// export default function Form({ block, entries }: ContentBlockRegistry) {
//   const router = useRouter();

//   useEffect(() => {
//     window.addEventListener('message', (event) => {
//       if (event.data === 'formSubmitted') {
//         console.log('Form was submitted in the iframe');
//         window.open('https://dmarquee.com.sg/thank-you', '_blank');
//         setTimeout(() => {
//           router.push('/thank-you');
//         }, 5000);
//       }
//     });
//   }, []);

//   return (
//     <article id="form-section-discoverdmq">
//       <section className="bg-primary main-padding !pb-32">
//         <div className="component-wrapper grid md:grid-cols-2 gap-6 lg:gap-12 text-white main-padding-y">
//           <header className="space-text max-md:text-center max-w-[32rem]">
//             <PortableText value={block?.description ?? []} />
//           </header>
//           <iframe
//             src="/form/new-form.html"
//             className="min-h-[32rem]"
//             width="100%"
//             height="100%"
//             title="Web-to-Lead form"
//           />
//         </div>
//       </section>
//       {block?.imageUrl ? (
//         <NextImage
//           src={block?.imageUrl}
//           className="w-full max-md:aspect-video md:h-[30rem] object-[80%_top] md:object-right-top -mt-16 object-cover"
//         />
//       ) : null}
//     </article>
//   );
// }
