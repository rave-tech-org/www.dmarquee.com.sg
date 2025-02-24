import PageLayout from '@/components/previous-project/page-layout';
import ReactQueryProvider from '@/elements/react-query-provider';
import WhatsAppButton from '@/elements/whatsapp-button';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { headers } from 'next/headers';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { getMetadata } from './metadata';

import '@/styles/tailwind.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadata({});
}
const brandonGrotesque = localFont({
  variable: '--font-brandon-grotesque',
  display: 'swap',
  src: [
    { path: './fonts/HvDTrial_Brandon_Grotesque_black.otf', weight: '900', style: 'normal' },
    { path: './fonts/HvDTrial_Brandon_Grotesque_bold.otf', weight: '800', style: 'normal' },
    { path: './fonts/HvDTrial_Brandon_Grotesque_light.otf', weight: '300', style: 'normal' },
    { path: './fonts/HvDTrial_Brandon_Grotesque_medium.otf', weight: '500', style: 'normal' },
    { path: './fonts/HvDTrial_Brandon_Grotesque_regular.otf', weight: '400', style: 'normal' },
    { path: './fonts/HvDTrial_Brandon_Grotesque_thin.otf', weight: '100', style: 'normal' },

    { path: './fonts/HvDTrial_Brandon_Grotesque_black_italic.otf', weight: '900', style: 'italic' },
    { path: './fonts/HvDTrial_Brandon_Grotesque_bold_italic.otf', weight: '800', style: 'italic' },
    { path: './fonts/HvDTrial_Brandon_Grotesque_light_italic.otf', weight: '300', style: 'italic' },
    { path: './fonts/HvDTrial_Brandon_Grotesque_medium_italic.otf', weight: '500', style: 'italic' },
    { path: './fonts/HvDTrial_Brandon_Grotesque_regular_italic.otf', weight: '400', style: 'italic' },
    { path: './fonts/HvDTrial_Brandon_Grotesque_thin_italic.otf', weight: '100', style: 'italic' },
  ],
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = headers().get('path') ?? '/';

  const isStudio = pathname.includes('studio');
  const isContentBlock = pathname.includes('content-block');

  return (
    <html lang="en" className={brandonGrotesque.variable}>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />

      <body>
        <NuqsAdapter>
          <ReactQueryProvider>
            {!isStudio && !isContentBlock && <WhatsAppButton />}
            {isHome ? <PageLayout>{children}</PageLayout> : children}
          </ReactQueryProvider>
        </NuqsAdapter>
        <noscript>
          <iframe
            title="GTM"
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height={0}
            width={0}
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      </body>
    </html>
  );
}
