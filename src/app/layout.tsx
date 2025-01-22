import Footer from '@/components/layout/footer';
import PageLayout from '@/components/previous-project/page-layout';
import ReactQueryProvider from '@/elements/react-query-provider';
import WhatsAppButton from '@/elements/whatsapp-button';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { headers } from 'next/headers';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import '@/styles/global.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'D’Marquee: Indoor MICE Venue with D’Resort in Downtown East, Pasir Ris!',
  description: 'D’Marquee: Indoor MICE Venue with D’Resort in Downtown East, Pasir Ris!',
};

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
  const isPreview = pathname.includes('preview');
  const isDiscoverDmq = pathname.includes('discoverdmq');

  const isRedirectToDiscoverDmq = true;

  return (
    <html lang="en" className={brandonGrotesque.variable}>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />

      <body>
        <NuqsAdapter>
          <ReactQueryProvider>
            {!isStudio && !isContentBlock && <WhatsAppButton />}

            {isStudio || isContentBlock ? (
              <main>{children}</main>
            ) : isDiscoverDmq ? (
              <main>
                {children}
                <Footer isDraft={isPreview} />
              </main>
            ) : (
              <PageLayout>{children}</PageLayout>
            )}
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
