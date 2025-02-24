import { URLS } from '@/app/urls';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: URLS.sitemap };
}
