import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import DestinationImageCarousel from '@/components/DestinationImageCarousel';
import { client } from '@/lib/sanity/client';
import { destinationBySlugQuery, destinationsQuery } from '@/lib/sanity/queries';
import { urlForImage } from '@/lib/sanity/image';
import type { Destination } from '@/lib/sanity/types';

interface PageProps {
  params: {
    slug: string;
  };
}

/**
 * Caching Strategy: ISR with 1-hour revalidation
 * - Detail pages don't change frequently after publishing
 * - 1-hour revalidation balances performance and freshness
 * - generateStaticParams pre-renders known pages at build time
 * - New pages are generated on-demand and then cached
 */
export const revalidate = 3600; // Revalidate every hour

// Generate static params for better performance
export async function generateStaticParams() {
  try {
    const destinations = await client.fetch<Destination[]>(destinationsQuery, {}, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    return destinations.map((destination) => ({
      slug: destination.slug.current,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

async function getDestination(slug: string): Promise<Destination | null> {
  try {
    const destination = await client.fetch<Destination | null>(
      destinationBySlugQuery,
      { slug },
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );
    return destination;
  } catch (error) {
    console.error('Error fetching destination:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const destination = await getDestination(params.slug);

  if (!destination) {
    return {
      title: 'Destination Not Found',
    };
  }

  const imageUrl = destination.images?.[0]?.asset?.url
    ? urlForImage(destination.images[0]!, 1200, 630, 85, 'webp')
    : undefined;

  const description = destination.description || `Explore ${destination.title} - ${destination.bestSeason || 'year-round'} destination.`;

  return {
    title: `${destination.title} | Destinations | Aleeza Travels`,
    description,
    keywords: [
      destination.title,
      'Kashmir destinations',
      destination.bestSeason || 'travel',
      'travel guide',
      'tourist attractions',
    ],
    openGraph: {
      title: `${destination.title} | Aleeza Travels`,
      description,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
      type: 'website',
      url: `https://aleezatravels.com/destinations/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${destination.title} | Aleeza Travels`,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: {
      canonical: `https://aleezatravels.com/destinations/${params.slug}`,
    },
  };
}

export default async function DestinationDetail({ params }: PageProps) {
  const destination = await getDestination(params.slug);

  if (!destination) {
    notFound();
  }

  const seasonLabels: Record<string, string> = {
    spring: 'Spring (March - May)',
    summer: 'Summer (June - August)',
    autumn: 'Autumn (September - November)',
    winter: 'Winter (December - February)',
    'year-round': 'Year Round',
  };

  const categoryLabels: Record<string, string> = {
    transportation: 'Transportation',
    accommodation: 'Accommodation',
    food: 'Food & Dining',
    safety: 'Safety',
    weather: 'Weather',
    culture: 'Culture',
    shopping: 'Shopping',
    other: 'Other',
  };

  // Structured Data (JSON-LD) for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: destination.title,
    description: destination.description,
    image: destination.images?.[0]?.asset?.url
      ? urlForImage(destination.images[0]!, 1200, 630)
      : undefined,
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Jammu and Kashmir',
      addressCountry: 'IN',
    },
  };

  const heroImages = (destination.images ?? [])
    .filter((image) => image?.asset?.url)
    .map((image) => ({
      url: urlForImage(image, 1920, 1080, 90, 'webp'),
      alt: image.alt || destination.title,
    }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative">
          {heroImages.length > 0 && (
            <div className="relative">
              <DestinationImageCarousel
                images={heroImages}
                priority
                className="h-[400px] md:h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{destination.title}</h1>
                {destination.bestSeason && (
                  <p className="text-white/90 text-lg">
                    Best Season: {seasonLabels[destination.bestSeason] || destination.bestSeason}
                  </p>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Content Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">About {destination.title}</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">{destination.description}</p>
                </div>

                {/* Things to Do */}
                {destination.thingsToDo && destination.thingsToDo.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Things to Do</h2>
                    <div className="space-y-4">
                      {destination.thingsToDo.map((item, index) => (
                        <div key={index} className="border-l-4 border-blue-600 pl-4">
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.activity}</h3>
                          {item.description && (
                            <p className="text-gray-600">{item.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image Gallery */}
                {destination.images && destination.images.length > 1 && (
                  <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Gallery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {destination.images.map((image, index) => {
                        const imageUrl = image?.asset?.url
                          ? urlForImage(image, 600, 400, 85, 'webp')
                          : null;
                        if (!imageUrl) return null;

                        return (
                          <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                            <Image
                              src={imageUrl}
                              alt={image?.alt || `${destination.title} - Image ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                              loading="lazy"
                              quality={85}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Local Tips */}
                {destination.localTips && destination.localTips.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-6 mb-8 sticky top-24">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Local Tips</h3>
                    <div className="space-y-4">
                      {destination.localTips.map((tip, index) => (
                        <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                          <p className="text-gray-700 mb-1">{tip.tip}</p>
                          {tip.category && (
                            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                              {categoryLabels[tip.category] || tip.category}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="bg-blue-600 rounded-lg shadow-md p-6 text-white">
                  <h3 className="text-2xl font-bold mb-4">Plan Your Trip</h3>
                  <p className="mb-6">Ready to visit {destination.title}? Check out our packages!</p>
                  <Link
                    href="/packages"
                    className="block w-full bg-white text-blue-600 text-center px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    View Packages
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
