import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Sadasangh Holidays - Best Kashmir Travel Agency | Jammu & Kashmir Tours',
    template: '%s | Sadasangh Holidays',
  },
  description: 'Sadasangh Holidays - Kashmir\'s trusted travel agency. Discover amazing destinations in Jammu and Kashmir with expert travel packages for Yusmarg, Lolab, Gurez, Gulmarg, and more. 24/7 support. Book your Kashmir adventure today!',
  keywords: [
    'Kashmir travel agency',
    'Jammu Kashmir tours',
    'Kashmir travel packages',
    'Srinagar travel agent',
    'Kashmir tourism',
    'travel agency Kashmir',
    'Kashmir vacation packages',
    'best travel agent Kashmir',
    'Kashmir destinations',
    'Yusmarg travel',
    'Lolab valley tours',
    'Gurez travel',
  ],
  authors: [{ name: 'Sadasangh Holidays' }],
  creator: 'Sadasangh Holidays',
  publisher: 'Sadasangh Holidays',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sadasanghholidays.com',
    siteName: 'Sadasangh Holidays',
    title: 'Sadasangh Holidays - Best Kashmir Travel Agency | Jammu & Kashmir Tours',
    description: 'Kashmir\'s trusted travel agency. Discover amazing destinations in Jammu and Kashmir with expert travel packages. 24/7 support.',
    images: [
      {
        url: 'https://res.cloudinary.com/de7qtzp1b/image/upload/v1767162472/Chatpal-Kashmir_brown_chinar_kashmir_cfzjvf.webp',
        width: 1200,
        height: 630,
        alt: 'Sadasangh Holidays - Kashmir Travel Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sadasangh Holidays - Best Kashmir Travel Agency | Jammu & Kashmir Tours',
    description: 'Kashmir\'s trusted travel agency. Discover amazing destinations in Jammu and Kashmir with expert travel packages.',
    images: ['https://res.cloudinary.com/de7qtzp1b/image/upload/v1767162472/Chatpal-Kashmir_brown_chinar_kashmir_cfzjvf.webp'],
  },
  alternates: {
    canonical: 'https://sadasanghholidays.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

