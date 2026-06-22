import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity/client';
import { urlForImage } from '@/lib/sanity/image';
import { packageBySlugQuery, packagesQuery } from '@/lib/sanity/queries';
import type { Package } from '@/lib/sanity/types';

interface PageProps {
  params: {
    slug: string;
  };
}

/**
 * Caching Strategy: ISR with 1-hour revalidation
 * - Package details don't change frequently
 * - 1-hour revalidation ensures price/availability updates appear within an hour
 * - generateStaticParams pre-renders known packages at build time
 */
export const revalidate = 3600; // Revalidate every hour

// Generate static params for better performance
export async function generateStaticParams() {
  try {
    const packages = await client.fetch<Package[]>(packagesQuery, {}, {
      next: { revalidate: 3600 },
    });
    return packages.map((pkg) => ({
      slug: pkg.slug.current,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

async function getPackage(slug: string): Promise<Package | null> {
  try {
    const pkg = await client.fetch<Package | null>(
      packageBySlugQuery,
      { slug },
      {
        next: { revalidate: 3600 },
      }
    );
    return pkg;
  } catch (error) {
    console.error('Error fetching package:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pkg = await getPackage(params.slug);

  if (!pkg) {
    return {
      title: 'Package Not Found',
    };
  }

  const currencySymbols: Record<string, string> = {
    INR: '₹',
    USD: '$',
    EUR: '€',
  };
  const currency = currencySymbols[pkg.priceRange?.currency || 'INR'] || '₹';
  const price = pkg.priceRange?.startingFrom || 'Price TBD';

  const description = `Travel package: ${pkg.title} - ${pkg.duration}. Starting from ${currency}${price}. ${pkg.destinationsCovered?.map(d => d.title).join(', ') || ''}`;

  return {
    title: `${pkg.title} | Travel Packages | Sadasangh Holidays`,
    description,
    keywords: [
      pkg.title,
      'travel packages',
      'Kashmir tours',
      pkg.duration,
      'tour packages',
      ...(pkg.destinationsCovered?.map(d => d.title) || []),
    ],
    openGraph: {
      title: `${pkg.title} | Sadasangh Holidays`,
      description,
      type: 'website',
      url: `https://sadasanghholidays.com/packages/${params.slug}`,
    },
    twitter: {
      card: 'summary',
      title: `${pkg.title} | Sadasangh Holidays`,
      description,
    },
    alternates: {
      canonical: `https://sadasanghholidays.com/packages/${params.slug}`,
    },
  };
}

export default async function PackageDetail({ params }: PageProps) {
  const pkg = await getPackage(params.slug);

  if (!pkg) {
    notFound();
  }

  const currencySymbols: Record<string, string> = {
    INR: '₹',
    USD: '$',
    EUR: '€',
  };

  const currency = currencySymbols[pkg.priceRange?.currency || 'INR'] || '₹';
  const price = pkg.priceRange?.startingFrom || 'Price TBD';
  const perPerson = pkg.priceRange?.perPerson ? 'per person' : '';
  const coverImageUrl = pkg.coverImage?.asset?.url
    ? urlForImage(pkg.coverImage, 1920, 600, 85, 'webp')
    : null;

  const hotelTypeLabels: Record<string, string> = {
    budget: 'Budget (2-3 Star)',
    standard: 'Standard (3 Star)',
    deluxe: 'Deluxe (4 Star)',
    luxury: 'Luxury (5 Star)',
    heritage: 'Heritage/Resort',
    houseboat: 'Houseboat',
    mixed: 'Mixed',
  };

  const vehicleTypeLabels: Record<string, string> = {
    sedan: 'Sedan (4 seater)',
    suv: 'SUV (6-7 seater)',
    tempo: 'Tempo Traveller (12 seater)',
    bus: 'Bus (20+ seater)',
    'not-included': 'Not Included',
  };

  const priorityLabels: Record<string, string> = {
    high: 'High Priority',
    medium: 'Medium Priority',
    low: 'Low Priority',
  };

  const priorityColors: Record<string, string> = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  // Structured Data (JSON-LD) for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: pkg.title,
    description: `${pkg.title} - ${pkg.duration}`,
    duration: pkg.duration,
    offers: {
      '@type': 'Offer',
      price: pkg.priceRange?.startingFrom,
      priceCurrency: pkg.priceRange?.currency || 'INR',
    },
    itinerary: pkg.itinerary?.map((day) => ({
      '@type': 'TouristDestination',
      name: day.title,
      description: day.description,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 overflow-hidden">
          {coverImageUrl && (
            <Image
              src={coverImageUrl}
              alt={pkg.coverImage?.alt || pkg.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
              quality={85}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{pkg.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <span className="text-xl">{pkg.duration}</span>
              <span className="text-2xl font-bold">
                {currency}{price} {perPerson}
              </span>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Destinations Covered */}
                {pkg.destinationsCovered && pkg.destinationsCovered.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Destinations Covered</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pkg.destinationsCovered.map((dest) => (
                        <Link
                          key={dest._id}
                          href={`/destinations/${dest.slug.current}`}
                          className="border border-gray-200 rounded-lg p-4 hover:border-blue-600 hover:shadow-md transition-all"
                        >
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{dest.title}</h3>
                          {dest.description && (
                            <p className="text-gray-600 text-sm line-clamp-2">{dest.description}</p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Itinerary */}
                {pkg.itinerary && pkg.itinerary.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Day-wise Itinerary</h2>
                    <div className="space-y-6">
                      {pkg.itinerary.map((day, index) => (
                        <div key={index} className="border-l-4 border-blue-600 pl-6">
                          <div className="flex items-center gap-4 mb-2">
                            <span className="text-2xl font-bold text-blue-600">Day {day.day}</span>
                            <h3 className="text-xl font-semibold text-gray-900">{day.title}</h3>
                          </div>
                          <p className="text-gray-600 mb-3">{day.description}</p>
                          {day.meals && day.meals.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-2">
                              {day.meals.map((meal, mealIndex) => (
                                <span
                                  key={mealIndex}
                                  className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                                >
                                  {meal}
                                </span>
                              ))}
                            </div>
                          )}
                          {day.accommodation && (
                            <p className="text-sm text-gray-500">
                              <span className="font-semibold">Accommodation:</span> {day.accommodation}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* What's Included */}
                {pkg.includes && pkg.includes.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">What&apos;s Included</h2>
                    <ul className="space-y-2">
                      {pkg.includes.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <div>
                            <span className="text-gray-900">{item.item}</span>
                            {item.category && (
                              <span className="text-xs text-gray-500 ml-2">({item.category})</span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* What's Not Included */}
                {pkg.excludes && pkg.excludes.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">What&apos;s Not Included</h2>
                    <ul className="space-y-2">
                      {pkg.excludes.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="text-gray-900">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Safety Notes */}
                {pkg.safetyNotes && pkg.safetyNotes.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Safety Notes & Important Information</h2>
                    <div className="space-y-4">
                      {pkg.safetyNotes.map((note, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border-l-4 ${
                            note.priority === 'high'
                              ? 'bg-red-50 border-red-500'
                              : note.priority === 'medium'
                              ? 'bg-yellow-50 border-yellow-500'
                              : 'bg-green-50 border-green-500'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-xs font-semibold px-2 py-1 rounded ${
                              priorityColors[note.priority || 'medium']
                            }`}>
                              {priorityLabels[note.priority || 'medium']}
                            </span>
                          </div>
                          <p className="text-gray-700">{note.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-24 space-y-6">
                  {/* Package Details */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Package Details</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Duration</span>
                        <p className="font-semibold text-gray-900">{pkg.duration}</p>
                      </div>
                      {pkg.hotelType && (
                        <div>
                          <span className="text-sm text-gray-600">Hotel Type</span>
                          <p className="font-semibold text-gray-900">
                            {hotelTypeLabels[pkg.hotelType] || pkg.hotelType}
                          </p>
                        </div>
                      )}
                      <div>
                        <span className="text-sm text-gray-600">Price</span>
                        <p className="text-2xl font-bold text-blue-600">
                          {currency}{price}
                          {perPerson && <span className="text-sm font-normal text-gray-600"> {perPerson}</span>}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Transportation */}
                  {pkg.transportDetails && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Transportation</h3>
                      <div className="space-y-2 text-sm">
                        {pkg.transportDetails.pickupLocation && (
                          <p>
                            <span className="text-gray-600">Pickup:</span>{' '}
                            <span className="font-semibold">{pkg.transportDetails.pickupLocation}</span>
                          </p>
                        )}
                        {pkg.transportDetails.dropoffLocation && (
                          <p>
                            <span className="text-gray-600">Drop-off:</span>{' '}
                            <span className="font-semibold">{pkg.transportDetails.dropoffLocation}</span>
                          </p>
                        )}
                        {pkg.transportDetails.vehicleType && (
                          <p>
                            <span className="text-gray-600">Vehicle:</span>{' '}
                            <span className="font-semibold">
                              {vehicleTypeLabels[pkg.transportDetails.vehicleType] || pkg.transportDetails.vehicleType}
                            </span>
                          </p>
                        )}
                        {pkg.transportDetails.driverIncluded !== undefined && (
                          <p>
                            <span className="text-gray-600">Driver:</span>{' '}
                            <span className="font-semibold">
                              {pkg.transportDetails.driverIncluded ? 'Included' : 'Not Included'}
                            </span>
                          </p>
                        )}
                        {pkg.transportDetails.fuelIncluded !== undefined && (
                          <p>
                            <span className="text-gray-600">Fuel:</span>{' '}
                            <span className="font-semibold">
                              {pkg.transportDetails.fuelIncluded ? 'Included' : 'Not Included'}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <Link
                    href="/contact"
                    className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
