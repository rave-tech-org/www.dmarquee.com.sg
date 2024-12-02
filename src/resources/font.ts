import localFont from 'next/font/local';
import { Overpass } from 'next/font/google';

export const overpass = Overpass({
  weight: ['400', '500', '700', '900'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-overpass',
});

export const kapelka = localFont({
  src: [
    {
      path: '../../public/assets/fonts/kapelka-new.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-kapelka',
});
