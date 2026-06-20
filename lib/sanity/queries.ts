import { groq } from 'next-sanity';

/**
 * Optimized Image Projection
 * Only fetches essential fields for performance
 */
const imageProjection = `
  asset->{
    _id,
    url,
    metadata {
      dimensions {
        width,
        height,
        aspectRatio
      }
    }
  },
  alt
`;

/**
 * Lightweight image projection for list views
 * Excludes metadata to reduce payload size
 */
const imageProjectionLight = `
  asset->{
    _id,
    url
  },
  alt
`;

// Destination Queries
export const destinationsQuery = groq`
  *[_type == "destination"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    bestSeason,
    images[] {
      ${imageProjectionLight}
    },
    featured
  }
`;

export const destinationBySlugQuery = groq`
  *[_type == "destination" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    bestSeason,
    images[] {
      ${imageProjection}
    },
    thingsToDo[] {
      activity,
      description
    },
    localTips[] {
      tip,
      category
    },
    featured
  }
`;

export const featuredDestinationsQuery = groq`
  *[_type == "destination" && featured == true] | order(title asc) [0...6] {
    _id,
    title,
    slug,
    description,
    bestSeason,
    images[] {
      ${imageProjectionLight}
    }
  }
`;

// Package Queries
export const packagesQuery = groq`
  *[_type == "package"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    duration,
    coverImage {
      ${imageProjectionLight}
    },
    priceRange {
      startingFrom,
      perPerson,
      currency
    },
    destinationsCovered[]-> {
      _id,
      title,
      slug
    },
    hotelType,
    featured
  }
`;

export const packageBySlugQuery = groq`
  *[_type == "package" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    duration,
    coverImage {
      ${imageProjection}
    },
    priceRange {
      startingFrom,
      perPerson,
      currency
    },
    destinationsCovered[]-> {
      _id,
      title,
      slug,
      description
    },
    itinerary[] {
      day,
      title,
      description,
      meals,
      accommodation
    },
    includes[] {
      item,
      category
    },
    excludes,
    hotelType,
    transportDetails {
      pickupLocation,
      dropoffLocation,
      vehicleType,
      driverIncluded,
      fuelIncluded
    },
    safetyNotes[] {
      note,
      priority
    },
    featured
  }
`;

export const featuredPackagesQuery = groq`
  *[_type == "package" && featured == true] | order(_createdAt desc) [0...6] {
    _id,
    title,
    slug,
    duration,
    coverImage {
      ${imageProjectionLight}
    },
    priceRange {
      startingFrom,
      perPerson,
      currency
    }
  }
`;

// FAQ Query
export const faqsQuery = groq`
  *[_type == "faq"] | order(order asc, question asc) {
    _id,
    question,
    answer,
    category,
    order,
    featured
  }
`;
