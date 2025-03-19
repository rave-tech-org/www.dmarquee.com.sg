import NextImage from '@/elements/next-image';
import PortableSanityText from '@/elements/portable-sanity-text';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { PortableText } from 'next-sanity';

export default function SeamlessAudioVisualExperiences({ block }: ContentBlockRegistry) {
  if (!block) return null;
  return (
    <article id={block.slug?.current} className="relative">
      <NextImage
        src={block.imageUrl}
        className="aspect-[4/3] md:aspect-[21/9] lg:aspect-[30/9] w-full object-top object-cover"
      />

      <div className="absolute top-0 left-0 size-full flex items-center justify-center">
        <div className="component-wrapper">
          <header className="text-center text-white space-y-4 lg:space-y-6 w-full md:max-w-[42rem] mx-auto">
            <h2>{block.title}</h2>
            <PortableSanityText className="lg:space-y-6" value={block.description ?? []} />
          </header>
        </div>
      </div>
    </article>
  );
}
