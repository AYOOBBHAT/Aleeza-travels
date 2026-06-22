import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/lib/sanity/client';
import { urlForImage } from '@/lib/sanity/image';
import { packagesQuery } from '@/lib/sanity/queries';
import type { Package } from '@/lib/sanity/types';
import { getSanityStudioUrl } from '@/lib/sanity/studio-url';

/**
 * Caching Strategy: ISR with 60-second revalidation
 * - Package listings don't change frequently
 * - 60s revalidation balances performance and freshness
 * - CDN caches responses for fast delivery
 */
export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: 'Kashmir Travel Packages - Best Tour Packages for Jammu & Kashmir | Sadasangh Holidays',
  description: 'Browse our curated Kashmir travel packages. All-inclusive deals for Yusmarg, Lolab, Gurez, Gulmarg, Pahalgam, and more. Adventure tours, luxury getaways, and family-friendly Kashmir vacation packages. Best prices guaranteed.',
  keywords: [
    'Kashmir travel packages',
    'Jammu Kashmir tour packages',
    'Kashmir tour packages',
    'Kashmir vacation packages',
    'all-inclusive Kashmir tours',
    'Kashmir travel deals',
    'Kashmir holiday packages',
    'Yusmarg tour packages',
    'Lolab travel packages',
    'Gurez tour packages',
    'Gulmarg packages',
    'Pahalgam tour packages',
    'Kashmir family packages',
    'Kashmir adventure tours',
    'best Kashmir tour operator',
  ],
  authors: [{ name: 'Sadasangh Holidays' }],
  creator: 'Sadasangh Holidays',
  publisher: 'Sadasangh Holidays',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sadasanghholidays.com/packages',
    siteName: 'Sadasangh Holidays',
    title: 'Kashmir Travel Packages - Best Tour Packages | Sadasangh Holidays',
    description: 'Browse curated Kashmir travel packages. All-inclusive deals for Yusmarg, Lolab, Gurez, Gulmarg, and more. Best prices guaranteed.',
    images: [
      {
        url: 'https://res.cloudinary.com/de7qtzp1b/image/upload/v1767162472/Chatpal-Kashmir_brown_chinar_kashmir_cfzjvf.webp',
        width: 1200,
        height: 630,
        alt: 'Kashmir Travel Packages - Sadasangh Holidays',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kashmir Travel Packages - Best Tour Packages | Sadasangh Holidays',
    description: 'Browse curated Kashmir travel packages. All-inclusive deals with best prices guaranteed.',
    images: ['https://res.cloudinary.com/de7qtzp1b/image/upload/v1767162472/Chatpal-Kashmir_brown_chinar_kashmir_cfzjvf.webp'],
  },
  alternates: {
    canonical: 'https://sadasanghholidays.com/packages',
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

async function getPackages(): Promise<Package[]> {
  try {
    const packages = await client.fetch<Package[]>(packagesQuery, {}, {
      next: { revalidate: 60 },
    });
    return packages || [];
  } catch (error) {
    console.error('Error fetching packages:', error);
    return [];
  }
}

export default async function Packages() {
  const packages = await getPackages();

  // Structured Data for SEO
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Kashmir Travel Packages - Best Tour Packages for Jammu & Kashmir',
    description: 'Browse curated Kashmir travel packages. All-inclusive deals for Yusmarg, Lolab, Gurez, Gulmarg, Pahalgam, and more.',
    url: 'https://sadasanghholidays.com/packages',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: packages.length,
      itemListElement: packages.slice(0, 10).map((pkg, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'TouristTrip',
          name: pkg.title,
          duration: pkg.duration,
          url: `https://sadasanghholidays.com/packages/${pkg.slug?.current || ''}`,
          offers: pkg.priceRange ? {
            '@type': 'Offer',
            priceCurrency: pkg.priceRange.currency || 'INR',
            price: pkg.priceRange.startingFrom || '0',
            availability: 'https://schema.org/InStock',
          } : undefined,
        },
      })),
    },
  };

  const currencySymbols: Record<string, string> = {
    INR: '₹',
    USD: '$',
    EUR: '€',
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Packages</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Discover our carefully curated Kashmir travel packages designed to give you the best experience at unbeatable prices
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {packages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No packages found. Please add packages in Sanity Studio.</p>
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
              {packages.map((pkg, index) => {
                const currency = currencySymbols[pkg.priceRange?.currency || 'INR'] || '₹';
                const price = pkg.priceRange?.startingFrom || 'Price TBD';
                const perPerson = pkg.priceRange?.perPerson ? 'per person' : '';
                const imageUrl = pkg.coverImage?.asset?.url
                  ? urlForImage(pkg.coverImage, 800, 600, 85, 'webp')
                  : null;

                return (
                  <article
                    key={pkg._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="relative h-64 bg-gradient-to-br from-blue-400 to-purple-500">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={pkg.coverImage?.alt || pkg.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          loading={index < 6 ? 'eager' : 'lazy'}
                          quality={85}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20" />
                      {pkg.featured && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                          Featured
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center text-white z-10">
                        <div className="text-center px-4">
                          <h2 className="text-2xl font-bold mb-2 drop-shadow-lg">{pkg.title}</h2>
                          <p className="text-lg drop-shadow-md">{pkg.duration}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-bold text-gray-900">
                          <Link
                            href={`/packages/${pkg.slug.current}`}
                            className="hover:text-blue-600 transition-colors"
                          >
                            {pkg.title}
                          </Link>
                        </h2>
                        <span className="text-sm text-gray-500">{pkg.duration}</span>
                      </div>
                      
                      {pkg.destinationsCovered && pkg.destinationsCovered.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2">Destinations:</p>
                          <div className="flex flex-wrap gap-2">
                            {pkg.destinationsCovered.slice(0, 3).map((dest) => (
                              <span
                                key={dest._id}
                                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                              >
                                {dest.title}
                              </span>
                            ))}
                            {pkg.destinationsCovered.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{pkg.destinationsCovered.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {pkg.hotelType && (
                        <p className="text-sm text-gray-600 mb-4">
                          <span className="font-semibold">Hotel Type:</span> {pkg.hotelType}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div>
                          <span className="text-2xl font-bold text-blue-600">
                            {currency}{price}
                          </span>
                          {perPerson && (
                            <span className="text-sm text-gray-500 ml-2">{perPerson}</span>
                          )}
                        </div>
                        <Link
                          href={`/packages/${pkg.slug.current}`}
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

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contact us to create a custom travel package tailored to your needs
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Request Custom Package
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
