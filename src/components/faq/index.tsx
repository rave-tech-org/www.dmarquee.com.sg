'use client';

import { PATHS } from '@/app/urls';
import { buttonVariants } from '@/elements/button';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { transformObject } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

export default function Faq({ block }: ContentBlockRegistry) {
  if (!block) return null;
  const custom =
    block?.customAttributes && transformObject<{ 'btn-text': string; 'btn-href': string }>(block?.customAttributes);
  const btnText = custom?.['btn-text'];
  const btnHref = custom?.['btn-href'] ?? PATHS.main;

  const isFaqPage = usePathname() === '/faq';

  const updatedData = isFaqPage ? block?.listItems : block?.listItems?.slice(0, 5);

  return (
    <article id={block.slug?.current} className="main-padding-x main-padding-y-longer">
      <div className="component-wrapper grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-24">
        <header className="[&_strong]:text-primary [&_strong]:font-medium space-text">
          {isFaqPage ? (
            <PortableText
              value={block?.customAttributes?.find((e) => e.key === 'faq-page-header')?.description ?? []}
            />
          ) : (
            <Fragment>
              <PortableText value={block?.description ?? []} />
              <Link
                target={btnHref.startsWith('/asset') ? '_blank' : undefined}
                className={buttonVariants()}
                href={btnHref}
              >
                {btnText}
              </Link>
            </Fragment>
          )}
        </header>

        <Accordion type="multiple" className="border-b border-black">
          {updatedData?.map((e) => {
            if (!e.title) return null;

            return (
              <AccordionItem value={e.title} key={e.title}>
                <AccordionTrigger className="border-t border-black">
                  <h6 className="font-semibold">{e.title}</h6>
                </AccordionTrigger>
                <AccordionContent>
                  <PortableText value={e.description ?? []} />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </article>
  );
}
