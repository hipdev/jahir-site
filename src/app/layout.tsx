import '@/styles/globals.scss';

import { Inter, Manrope } from 'next/font/google';
import { type PropsWithChildren } from 'react';

import { Toolbar } from '@/components/molecules/toolbar';
import { Providers } from '@/providers';

const inter = Inter({
  subsets: ['latin'],
  preload: true,
  variable: '--font-inter',
  display: 'fallback',
});

const manrope = Manrope({
  subsets: ['latin'],
  preload: true,
  variable: '--font-manrope',
  display: 'fallback',
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html
      lang={'en'}
      className={`${inter.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <Toolbar />
          <main>{props.children}</main>
        </Providers>
      </body>
    </html>
  );
}
