import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us - Kashmir Travel Agency | Aleeza Travels',
  description: 'Learn about Aleeza Travels - Kashmir\'s trusted travel agency based in Srinagar. Specializing in Jammu and Kashmir tours, travel packages, and personalized travel experiences. 24/7 customer support.',
  keywords: [
    'Kashmir travel agency',
    'Srinagar travel agent',
    'Jammu Kashmir tour operator',
    'about Aleeza Travels',
    'Kashmir travel company',
    'local travel agency Kashmir',
    'Kashmir tourism company',
    'travel experts Kashmir',
    'Dallake Srinagar travel',
  ],
  authors: [{ name: 'Aleeza Travels' }],
  creator: 'Aleeza Travels',
  publisher: 'Aleeza Travels',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aleezatravels.com/about',
    siteName: 'Aleeza Travels',
    title: 'About Us - Kashmir Travel Agency | Aleeza Travels',
    description: 'Learn about Aleeza Travels - Kashmir\'s trusted travel agency. Specializing in Jammu and Kashmir tours with 24/7 support.',
    images: [
      {
        url: 'https://res.cloudinary.com/de7qtzp1b/image/upload/v1767162472/Chatpal-Kashmir_brown_chinar_kashmir_cfzjvf.webp',
        width: 1200,
        height: 630,
        alt: 'Aleeza Travels - Kashmir Travel Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Kashmir Travel Agency | Aleeza Travels',
    description: 'Learn about Aleeza Travels - Kashmir\'s trusted travel agency specializing in Jammu and Kashmir tours.',
    images: ['https://res.cloudinary.com/de7qtzp1b/image/upload/v1767162472/Chatpal-Kashmir_brown_chinar_kashmir_cfzjvf.webp'],
  },
  alternates: {
    canonical: 'https://aleezatravels.com/about',
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

const values = [
  {
    title: 'Trust & Reliability',
    description: 'We build lasting relationships with our clients through transparency and dependable service.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Customer First',
    description: 'Your satisfaction is our priority. We go above and beyond to ensure your travel dreams come true.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Expert Knowledge',
    description: 'Our team of travel experts has extensive local knowledge of Jammu and Kashmir destinations, ensuring authentic experiences.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: 'Best Value',
    description: 'We offer competitive prices without compromising on quality or service.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const stats = [
  { number: '1K+', label: 'Happy Travelers' },
  { number: '10+', label: 'Destinations' },
  { number: '5+', label: 'Years Experience' },
  { number: '98%', label: 'Satisfaction Rate' },
];

export default function About() {
  // Structured Data for SEO
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Aleeza Travels',
    description: 'Kashmir\'s trusted travel agency specializing in Jammu and Kashmir tours, travel packages, and personalized travel experiences.',
    url: 'https://aleezatravels.com',
    logo: 'https://aleezatravels.com/logo.png',
    image: 'https://res.cloudinary.com/de7qtzp1b/image/upload/v1767162472/Chatpal-Kashmir_brown_chinar_kashmir_cfzjvf.webp',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Dallake',
      addressLocality: 'Srinagar',
      addressRegion: 'Jammu and Kashmir',
      addressCountry: 'IN',
      postalCode: '190001',
    },
    telephone: '+919149792237',
    email: 'deltadawood963@gmail.com',
    openingHours: 'Mo-Su 00:00-23:59',
    priceRange: '$$',
    areaServed: {
      '@type': 'State',
      name: 'Jammu and Kashmir',
    },
    serviceArea: {
      '@type': 'State',
      name: 'Jammu and Kashmir',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Kashmir Travel Packages',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'TouristTrip',
            name: 'Kashmir Tour Packages',
          },
        },
      ],
    },
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Aleeza Travels</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Kashmir&apos;s trusted travel agency - Your partner for unforgettable journeys in Jammu and Kashmir
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded over 5 years ago, Aleeza Travels began with a simple mission: to showcase the breathtaking beauty
                  of Jammu and Kashmir to travelers from around the world. What started as a small local travel agency in
                  Srinagar has grown into a trusted name in Kashmir tourism.
                </p>
                <p>
                  Based in Dallake, Srinagar, we have deep-rooted knowledge of Kashmir&apos;s hidden gems - from the serene
                  valleys of Yusmarg and Lolab to the pristine landscapes of Gurez. We believe that travel has the power to
                  transform lives, broaden perspectives, and create lasting memories. That&apos;s why we&apos;re committed to
                  crafting personalized Kashmir travel experiences that exceed expectations.
                </p>
                <p>
                  Our team of experienced travel consultants, with extensive local knowledge of Jammu and Kashmir, works
                  tirelessly to stay updated on the latest travel trends, destination insights, and best deals, ensuring you
                  get the most value for your Kashmir travel investment.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop"
                alt="Travel team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-blue-600 mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            To inspire and enable people to explore the breathtaking beauty of Jammu and Kashmir by providing exceptional
            travel experiences, personalized service, and unbeatable value. We&apos;re not just booking trips; we&apos;re
            creating memories that last a lifetime in the paradise of Kashmir.
          </p>
        </div>
      </section>
    </div>
    </>
  );
}

