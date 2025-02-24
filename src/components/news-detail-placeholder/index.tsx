import NextImage from '@/elements/next-image';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { cn } from '@/lib/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function NewsDetailPlaceholder({ entries, block }: ContentBlockRegistry) {
  if (!entries.foundedDataBySlug.post) notFound();

  const data = entries.foundedDataBySlug.post;

  return (
    <article id={block?.slug?.current} className="main-padding-y-longer md:main-padding-x">
      <div className="component-wrapper">
        <header className="main-padding-x">
          <Link href="/news-and-blog" className="hover:underline">
            Back to News & Blogs
          </Link>

          <h2 className="py-12 text-center">{data.title}</h2>
        </header>

        <ul>
          {data.contents?.map((e) => {
            return (
              <li
                key={e._key}
                className={cn('main-padding', {
                  'grid grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-16 gap-y-6': !!e.imageUrl,
                  'bg-[#eee]': e.isGrayBackground,
                })}
              >
                <header
                  className={cn(
                    'space-y-4 [&_h1]:text-primary [&_h2]:text-primary [&_h3]:text-primary [&_h4]:text-primary [&_h5]:text-primary [&_h6]:text-primary [&_strong]:font-semibold'
                  )}
                >
                  <PortableText value={e.description ?? []} />
                </header>
                {e.imageUrl ? (
                  <figure className={cn({ 'row-start-1': e.leftImage })}>
                    <NextImage src={e.imageUrl} />
                    {e.image?.alt ? (
                      <figcaption className="mt-2">
                        <small className="italic">{e.image?.alt}</small>
                      </figcaption>
                    ) : null}
                  </figure>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
