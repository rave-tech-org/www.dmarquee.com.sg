import AspectRatioImage from '@/elements/aspect-ratio-image';
import ViewIn from '@/elements/view-in';
import { sanityFetch } from '@/sanity/lib/client';
import { GetPostBySlug } from '@/sanity/lib/queries/cms';
import { Post } from '@/sanity/sanity.types';
import { PortableText } from 'next-sanity';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const slug = params?.slug as string;

  const post = await sanityFetch<Post & { imageUrl: string }>({
    query: GetPostBySlug,
    tags: ['post'],
    qParams: { slug },
  });

  return (
    <ViewIn variant="slideUp" delay={200}>
      <div className="lago-content-background">
        <AspectRatioImage
          src={post.imageUrl}
          alt={post.title || ''}
          aspectRatio="2/1"
          hasBlackOpacityBackground
          priority
        />
        <div className="content">
          <h3>{post.title}</h3>
        </div>
      </div>
      <div className="wrapper">
        <h2>{post.title}</h2>
        {post.content && <PortableText value={post.content} />}
      </div>
    </ViewIn>
  );
}
