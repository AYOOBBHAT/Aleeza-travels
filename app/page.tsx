import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sadasangh Holidays - Best Travel Packages for Kashmir & Jammu | 24/7 Service',
  description: 'Discover breathtaking destinations in Jammu and Kashmir with Sadasangh Holidays. Expert travel packages for Yusmarg, Lolab, Gurez, and more. Trusted travel partner with 24/7 support. Book your Kashmir adventure today!',
  keywords: [
    'Kashmir travel',
    'Jammu and Kashmir tours',
    'Kashmir travel packages',
    'Yusmarg travel',
    'Lolab valley tours',
    'Gurez travel',
    'Kashmir tourism',
    'travel agency Kashmir',
    'Kashmir vacation packages',
    'best travel agent Kashmir',
    'Srinagar travel',
    'Kashmir destinations',
    'travel packages Jammu Kashmir',
  ],
  authors: [{ name: 'Sadasangh Holidays' }],
  creator: 'Sadasangh Holidays',
  publisher: 'Sadasangh Holidays',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sadasanghholidays.com',
    siteName: 'Sadasangh Holidays',
    title: 'Sadasangh Holidays - Best Travel Packages for Kashmir & Jammu',
    description: 'Discover breathtaking destinations in Jammu and Kashmir. Expert travel packages with 24/7 support. Book your Kashmir adventure today!',
    images: [
      {
        url: 'https://res.cloudinary.com/de7qtzp1b/image/upload/v1767162472/Chatpal-Kashmir_brown_chinar_kashmir_cfzjvf.webp',
        width: 1200,
        height: 630,
        alt: 'Beautiful Kashmir Landscape - Sadasangh Holidays',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sadasangh Holidays - Best Travel Packages for Kashmir & Jammu',
    description: 'Discover breathtaking destinations in Jammu and Kashmir. Expert travel packages with 24/7 support.',
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

export default function Home() {
  // Structured Data for SEO
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Sadasangh Holidays',
    description: 'Your trusted travel partner for unforgettable journeys in Jammu and Kashmir',
    url: 'https://sadasanghholidays.com',
    logo: 'https://sadasanghholidays.com/logo.png',
    image: 'https://res.cloudinary.com/de7qtzp1b/image/upload/v1767162472/Chatpal-Kashmir_brown_chinar_kashmir_cfzjvf.webp',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dallake',
      addressRegion: 'Srinagar',
      addressCountry: 'IN',
      postalCode: '190001',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+918899470609',
      contactType: 'Customer Service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Kashmiri'],
    },
    areaServed: {
      '@type': 'State',
      name: 'Jammu and Kashmir',
    },
    priceRange: '$$',
    openingHours: 'Mo-Su 00:00-23:59',
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sadasangh Holidays',
    url: 'https://sadasanghholidays.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://sadasanghholidays.com/destinations?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative h-[600px] md:h-[700px] flex items-center justify-center" aria-label="Hero section">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/de7qtzp1b/image/upload/v1767162472/Chatpal-Kashmir_brown_chinar_kashmir_cfzjvf.webp"
            alt="Beautiful Kashmir landscape with brown chinar trees in Chatpal - Sadasangh Holidays destination"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Discover Your Next Adventure in Kashmir
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Explore the breathtaking beauty of Jammu and Kashmir with Sadasangh Holidays - Your trusted travel partner for unforgettable journeys. Expert travel packages for Yusmarg, Lolab, Gurez, and more stunning destinations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/destinations"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              aria-label="Explore our Kashmir destinations"
            >
              Explore Destinations
            </Link>
            <Link
              href="/packages"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              aria-label="View our travel packages"
            >
              View Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50" aria-labelledby="why-choose-us">
        <div className="max-w-7xl mx-auto">
          <h2 id="why-choose-us" className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Why Choose Sadasangh Holidays for Your Kashmir Adventure
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            With years of experience in organizing memorable travel experiences across Jammu and Kashmir, we offer trusted service, competitive pricing, and access to the most beautiful destinations in the region.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Trusted Service</h3>
              <p className="text-gray-600">
                Years of experience in creating memorable travel experiences
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Best Prices</h3>
              <p className="text-gray-600">
                Competitive pricing with no hidden fees
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 002 2 2 2 0 002-2v-1a2 2 0 012-2h2.945M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Global Destinations</h3>
              <p className="text-gray-600">
                Explore amazing places around the world
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="popular-destinations">
        <div className="max-w-7xl mx-auto">
          <h2 id="popular-destinations" className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Popular Kashmir Destinations
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Explore the most beautiful and serene destinations in Jammu and Kashmir. From the tranquil lakes of Yusmarg to the stunning valleys of Lolab and Gurez, discover paradise on earth.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                name: 'Yusmarg, Jammu and Kashmir', 
                href: '/destinations',
                image: 'https://res.cloudinary.com/de7qtzp1b/image/upload/v1767162518/nilnag-lake-yusmarg_ndo7wk.jpg',
                description: 'Serene meadows and pristine lakes'
              },
              { 
                name: 'Lolab, Jammu and Kashmir', 
                href: '/destinations',
                image: 'https://res.cloudinary.com/de7qtzp1b/image/upload/v1767162490/summer-beauty-of-lolab_qswci6.jpg',
                description: 'Beautiful valley with lush green landscapes'
              },
              { 
                name: 'Gurez, Jammu and Kashmir', 
                href: '/destinations',
                image: 'https://res.cloudinary.com/de7qtzp1b/image/upload/v1767162531/Kishanganga-Gurez_snuxgb.webp',
                description: 'Dramatic mountains and flowing rivers'
              },
            ].map((destination, index) => (
              <Link
                key={index}
                href={destination.href}
                className="relative h-64 rounded-lg overflow-hidden group block"
                aria-label={`Visit ${destination.name} - ${destination.description}`}
              >
                <Image
                  src={destination.image}
                  alt={`${destination.name} - ${destination.description} - Sadasangh Holidays destination`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-semibold drop-shadow-lg mb-1">{destination.name}</h3>
                  <p className="text-white/90 text-sm drop-shadow-md">{destination.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/destinations"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              aria-label="View all Kashmir destinations"
            >
              View All Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto text-center">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Kashmir Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contact Sadasangh Holidays today and let our expert team help you plan your perfect trip to Jammu and Kashmir. Available 24/7 for your convenience.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            aria-label="Contact Sadasangh Holidays for travel packages"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}

