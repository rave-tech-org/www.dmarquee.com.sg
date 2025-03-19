import PortableSanityText from '@/elements/portable-sanity-text';
import type { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { PortableText } from 'next-sanity';

export default function ContactForm({ block }: ContentBlockRegistry) {
  if (!block) return null;

  const directContacts = block.customAttributes?.find((e) => e.value === 'direct-contact');
  return (
    <article id={block.slug?.current} className="main-padding-x main-padding-y-longer">
      <div className="component-wrapper grid grid-cols-1 lg:grid-cols-2 gap-16">
        <section className="flex flex-col gap-6">
          <h2>{block.title}</h2>

          <PortableSanityText value={block.description} className="space-y-2 [&_h6]:text-primary" />
          <iframe src="/form/new-form-white.html" className="min-h-[44rem] size-full" title="Web-to-Lead form" />
        </section>

        <section className="flex flex-col gap-6">
          <h2>{directContacts?.key}</h2>

          <PortableSanityText
            value={directContacts?.description}
            className="space-y-3 [&_h6]:text-primary [&_h6]:pb-2 [&_a:hover]:underline"
          />
        </section>
      </div>
    </article>
  );
}
