import TourDetailLago from '@/components/tour-detail-lago';

export default async function TourDetailPage({ params }: { params: { slug: string } }) {
  const slug = params?.slug as string;
  return <TourDetailLago slug={slug} />;
}
