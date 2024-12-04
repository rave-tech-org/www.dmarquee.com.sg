import { buttonVariants } from '@/elements/button';
import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { transformObject } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import type { HomeBannerCustomAttribute } from './type';

export default function HomeBanner({ entries, block }: ContentBlockRegistry) {
  const custom = block?.customAttributes && transformObject<HomeBannerCustomAttribute>(block?.customAttributes);

  const btnText = custom?.['btn-text'];
  const btnHref = custom?.['btn-href'] ?? '/';

  return (
    <article className="main-padding home-banner-wrapper flex items-center justify-center min-h-screen">
      <div className="wrapper grid lg:grid-cols-2 items-center gap-6 lg:gap-24 relative">
        {block?.fileUrl ? (
          <Link href={'/'} className="lg:absolute lg:-top-16 left-0">
            <NextImage src={block.fileUrl} className="w-24 lg:w-32" />
          </Link>
        ) : null}
        <section className="space-y-4 lg:space-y-10">
          <header className="space-text">
            <PortableText value={block?.description ?? []} />
          </header>
          <Link href={btnHref} className={buttonVariants()}>
            {btnText}
          </Link>
        </section>

        {block?.imageUrl ? (
          <section className="relative group">
            <NextImage
              src={block.imageUrl}
              className="aspect-square object-cover z-10 group-hover:md:-translate-x-3 group-hover:md:translate-y-3 animate"
            />
            <div className="bg-black absolute size-full aspect-square translate-y-6 -translate-x-6 group-hover:-translate-x-3 group-hover:translate-y-3 animate top-0 left-0 -z-10 max-lg:hidden" />
          </section>
        ) : null}
      </div>
    </article>
  );
}
