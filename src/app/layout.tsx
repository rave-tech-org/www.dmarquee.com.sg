import ReactQueryProvider from '@/elements/react-query-provider';
import { kapelka, overpass } from '@/resources/font';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import MainLayout from '@components/layout/main-layout';
import type { Metadata } from 'next';
import '@/styles/global.scss';
import '@/styles/tailwind.css';

export const metadata: Metadata = {
  title: 'Lago Travel',
  description: 'Lago Travel',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${overpass.variable} ${kapelka.variable}`}>
      <body>
        <ReactQueryProvider>
          <AntdRegistry>
            <MainLayout>{children}</MainLayout>
          </AntdRegistry>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
