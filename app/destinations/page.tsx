import type { Metadata } from 'next';
import Link from 'next/link';
import DestinationImageCarousel from '@/components/DestinationImageCarousel';
import { client } from '@/lib/sanity/client';
import { destinationsQuery } from '@/lib/sanity/queries';
import { urlForImage } from '@/lib/sanity/image';
import type { Destination } from '@/lib/sanity/types';
import { getSanityStudioUrl } from '@/lib/sanity/studio-url';

/**
 * Caching Strategy: ISR with 60-second revalidation
 * - Content cached for 60 seconds for performance
 * - After 60s, next request triggers background revalidation
 * - Users get fast cached responses while content stays fresh
 * - Balance between performance and freshness
 */
export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: 'Kashmir Destinations - Best Places to Visit in Jammu & Kashmir | Aleeza Travels',
  description: 'Explore the best Kashmir destinations with Aleeza Travels. Discover Yusmarg, Lolab, Gurez, Gulmarg, Pahalgam, Sonamarg, and more beautiful places in Jammu and Kashmir. Expert travel guides and packages.',
  keywords: [
    'Kashmir destinations',
    'places to visit in Kashmir',
    'Jammu Kashmir tourist places',
    'Yusmarg Kashmir',
    'Lolab valley',
    'Gurez Kashmir',
    'Gulmarg travel',
    'Pahalgam Kashmir',
    'Sonamarg Kashmir',
    'Srinagar tourism',
    'Kashmir travel destinations',
    'best places Kashmir',
    'Kashmir sightseeing',
    'Kashmir tourist spots',
  ],
  authors: [{ name: 'Aleeza Travels' }],
  creator: 'Aleeza Travels',
  publisher: 'Aleeza Travels',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aleezatravels.com/destinations',
    siteName: 'Aleeza Travels',
    title: 'Kashmir Destinations - Best Places to Visit | Aleeza Travels',
    description: 'Explore the best Kashmir destinations - Yusmarg, Lolab, Gurez, Gulmarg, Pahalgam, and more. Expert travel guides and packages.',
    images: [
      {
        url: 'https://res.cloudinary.com/de7qtzp1b/image/upload/v1767162518/nilnag-lake-yusmarg_ndo7wk.jpg',
        width: 1200,
        height: 630,
        alt: 'Beautiful Kashmir Destinations - Aleeza Travels',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kashmir Destinations - Best Places to Visit | Aleeza Travels',
    description: 'Explore the best Kashmir destinations with expert travel guides and packages.',
    images: ['https://res.cloudinary.com/de7qtzp1b/image/upload/v1767162518/nilnag-lake-yusmarg_ndo7wk.jpg'],
  },
  alternates: {
    canonical: 'https://aleezatravels.com/destinations',
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

async function getDestinations(): Promise<Destination[]> {
  try {
    const destinations = await client.fetch<Destination[]>(destinationsQuery, {}, {
      next: { revalidate: 60 }, // Explicit revalidation for this fetch
    });
    return destinations || [];
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return [];
  }
}

export default async function Destinations() {
  const destinations = await getDestinations();

  // Structured Data for SEO
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Kashmir Destinations - Best Places to Visit in Jammu & Kashmir',
    description: 'Explore the best Kashmir destinations with Aleeza Travels. Discover Yusmarg, Lolab, Gurez, Gulmarg, Pahalgam, Sonamarg, and more beautiful places in Jammu and Kashmir.',
    url: 'https://aleezatravels.com/destinations',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: destinations.length,
      itemListElement: destinations.slice(0, 10).map((dest, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'TouristDestination',
          name: dest.title,
          description: dest.description,
          url: `https://aleezatravels.com/destinations/${dest.slug?.current || ''}`,
        },
      })),
    },
  };

  const seasonLabels: Record<string, string> = {
    spring: 'Spring (March - May)',
    summer: 'Summer (June - August)',
    autumn: 'Autumn (September - November)',
    winter: 'Winter (December - February)',
    'year-round': 'Year Round',
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Destinations</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Discover amazing places in Kashmir and find your perfect travel destination
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {destinations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No destinations found. Please add destinations in Sanity Studio.</p>
              <a
                href={getSanityStudioUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Open Sanity Studio
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map((destination, index) => {
                const carouselImages = (destination.images ?? [])
                  .filter((image) => image?.asset?.url)
                  .map((image) => ({
                    url: urlForImage(image, 800, 600, 85, 'webp'),
                    alt: image.alt || destination.title,
                  }));

                return (
                  <article
                    key={destination._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <DestinationImageCarousel
                      images={carouselImages}
                      featured={destination.featured}
                      priority={index < 6}
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-bold text-gray-900">
                          <Link
                            href={`/destinations/${destination.slug.current}`}
                            className="hover:text-blue-600 transition-colors"
                          >
                            {destination.title}
                          </Link>
                        </h2>
                        {destination.bestSeason && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {seasonLabels[destination.bestSeason] || destination.bestSeason}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-3">{destination.description}</p>
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/destinations/${destination.slug.current}`}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
    </>
  );
}
