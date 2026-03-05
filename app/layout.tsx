import type { Metadata } from 'next';
import { Inter, Playfair_Display, Caveat } from 'next/font/google';
import './globals.css';
import PageLoader from '@/components/ui/PageLoader';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-handwriting',
  display: 'swap',
});

const defaultOgImage = '/assets/images/meta/centre-for-women-justice.jpg';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  icons: {
    icon: '/assets/images/logo/favicon.ico',
  },
  title: {
    default: 'Centre for Women Justice Uganda (CWJ-U)',
    template: '%s | CWJ-U',
  },
  description: 'Promoting access to justice for women and girls in Uganda through legal aid, advocacy, and empowerment.',
  openGraph: {
    type: 'website',
    locale: 'en_UG',
    url: 'https://centreforwomenjustice.org',
    siteName: 'CWJ-U',
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: 'Centre for Women Justice Uganda',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [defaultOgImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${caveat.variable}`}>
      <body suppressHydrationWarning className="min-h-screen flex flex-col">
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
