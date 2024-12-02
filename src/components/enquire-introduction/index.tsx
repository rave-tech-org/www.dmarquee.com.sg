import { buttonVariants } from '@/elements/button';
import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { transformObject } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import type { EnquireIntroductionCustomAttribute } from './type';

export default function EnquireIntroduction({ block, entries }: ContentBlockRegistry) {
  const custom =
    block?.customAttributes && transformObject<EnquireIntroductionCustomAttribute>(block?.customAttributes);

  const btnText = custom?.['btn-text'];
  const btnHref = custom?.['btn-href'] ?? '/';

  return (
    <article className="main-padding enquire-introduction-wrapper">
      <div className="wrapper">
        <section className="flex flex-col gap-y-6 md:flex-row md:justify-between items-center main-padding !pb-24 bg-muted-light">
          <header className="space-text">
            <PortableText value={block?.description ?? []} />
          </header>
          <Link className={buttonVariants()} href={btnHref}>
            {btnText}
          </Link>
        </section>

        {block?.imageUrl ? <NextImage src={block?.imageUrl} className="w-full -mt-16 object-cover" /> : null}
      </div>
    </article>
  );
}
