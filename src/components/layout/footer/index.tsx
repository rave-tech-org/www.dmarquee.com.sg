import { sanityFetch } from '@/sanity/lib/client';
import { GetFooterLayout } from '@/sanity/lib/queries/cms';
import type { PageType } from '@/types/shared';
import { buildMenu, transformObject } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import type { FooterCustomAttribute } from './type';

export default async function Footer({ isDraft = true }: { isDraft?: boolean }) {
  const data = await sanityFetch<PageType>({
    query: GetFooterLayout,
    isDraft,
    tags: ['page', 'footerLayout'],
  });

  const menu = data?.layout?.find((e) => e.slug?.current === 'footer-menu');
  const body = data?.layout?.find((e) => e.slug?.current === 'footer-body');

  const footerMenu = buildMenu(menu?.description);

  const custom = body?.customAttributes && transformObject<FooterCustomAttribute>(body?.customAttributes);

  const title1 = custom?.['title-1'];
  const title2 = custom?.['title-2'];

  return (
    <footer>
      <section className="main-padding">
        <div className="max-lg:text-center wrapper grid lg:grid-cols-5 gap-4 items-center main-padding-y bg-white">
          <header className="lg:col-span-2 space-y-1 lg:space-y-2">
            <h3 className="hidden md:flex">{title1}</h3>
            <p className="md:hidden">{title1}</p>
            <h2>{title2}</h2>
          </header>
          <div className="lg:col-span-3">
            <PortableText value={body?.description ?? []} />
          </div>
        </div>
      </section>

      <section className="main-padding-x py-6 bg-black text-white">
        <div className="wrapper flex flex-col-reverse md:flex-row gap-1 md:gap-4 justify-between items-center">
          <PortableText value={data?.description ?? []} />
          <ul className="flex">
            {footerMenu?.[0]?.subMenu?.map((e, i) => {
              const lastIndex = footerMenu?.[0]?.subMenu.length - 1 === i;
              return (
                <li key={e.text}>
                  <Link href={e.marks?.href ?? '/'} className="hover:underline">
                    {e.text}
                  </Link>
                  {!lastIndex ? <span className="px-1 md:px-4">|</span> : null}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </footer>
  );
}
