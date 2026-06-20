// Type definitions for Sanity content

export interface SanityImage {
  asset: {
    _id: string;
    url: string;
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
        aspectRatio: number;
      };
    };
  };
  alt?: string;
  caption?: string;
}

export interface Destination {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  bestSeason: string;
  image?: SanityImage; // For list queries (first image only)
  images?: SanityImage[]; // For detail queries (all images)
  thingsToDo?: Array<{
    activity: string;
    description?: string;
  }>;
  localTips?: Array<{
    tip: string;
    category?: string;
  }>;
  featured?: boolean;
}

export interface Package {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  duration: string;
  coverImage?: SanityImage;
  priceRange: {
    startingFrom: string;
    perPerson: boolean;
    currency: string;
  };
  destinationsCovered?: Array<{
    _id: string;
    title: string;
    slug: {
      current: string;
    };
    description?: string;
  }>;
  itinerary?: Array<{
    day: number;
    title: string;
    description: string;
    meals?: string[];
    accommodation?: string;
  }>;
  includes?: Array<{
    item: string;
    category?: string;
  }>;
  excludes?: string[];
  hotelType?: string;
  transportDetails?: {
    pickupLocation?: string;
    dropoffLocation?: string;
    vehicleType?: string;
    driverIncluded?: boolean;
    fuelIncluded?: boolean;
  };
  safetyNotes?: Array<{
    note: string;
    priority?: string;
  }>;
  featured?: boolean;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: any[];
  category: string;
  order: number;
  featured?: boolean;
}

