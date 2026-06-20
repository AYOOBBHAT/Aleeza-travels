# Sanity CMS Integration Guide

This document explains how Sanity CMS is integrated with the Next.js frontend.

## 📁 File Structure

```
lib/
└── sanity/
    ├── client.ts          # Sanity client configuration
    ├── queries.ts         # GROQ queries for fetching data
    ├── image.ts           # Image URL utilities
    └── types.ts           # TypeScript type definitions

app/
├── destinations/
│   ├── page.tsx           # Destinations list (uses Sanity)
│   └── [slug]/
│       └── page.tsx       # Destination detail (uses Sanity)
├── packages/
│   ├── page.tsx           # Packages list (uses Sanity)
│   └── [slug]/
│       └── page.tsx       # Package detail (uses Sanity)
└── blog/
    ├── page.tsx           # Blog list (uses Sanity)
    └── [slug]/
        └── page.tsx        # Blog post detail (uses Sanity)
```

## 🔧 Core Components

### 1. Sanity Client (`lib/sanity/client.ts`)

The Sanity client is configured with:
- Project ID and dataset from environment variables
- CDN enabled in production for better performance
- Published perspective (only fetches published content)

```typescript
import { client } from '@/lib/sanity/client';
```

### 2. GROQ Queries (`lib/sanity/queries.ts`)

All data fetching uses GROQ (Graph-Relational Object Queries). Available queries:

**Destinations:**
- `destinationsQuery` - All destinations
- `destinationBySlugQuery` - Single destination by slug
- `featuredDestinationsQuery` - Featured destinations only

**Packages:**
- `packagesQuery` - All packages
- `packageBySlugQuery` - Single package by slug
- `featuredPackagesQuery` - Featured packages only

**Blog:**
- `blogPostsQuery` - All published blog posts
- `blogPostBySlugQuery` - Single blog post by slug
- `featuredBlogPostsQuery` - Featured posts only

**FAQ:**
- `faqsQuery` - All FAQs

### 3. Image Utilities (`lib/sanity/image.ts`)

Helper functions for generating optimized image URLs:

```typescript
import { urlForImage } from '@/lib/sanity/image';

// Generate optimized image URL
const imageUrl = urlForImage(image, width, height, quality);
```

### 4. TypeScript Types (`lib/sanity/types.ts`)

Type definitions for all Sanity content types:
- `Destination`
- `Package`
- `BlogPost`
- `FAQ`
- `SanityImage`

## 📄 Page Implementation

### Server Components

All pages use **Server Components** for:
- Direct data fetching (no client-side loading)
- Better SEO (content in initial HTML)
- Improved performance (no JavaScript needed for content)

### Example: Destinations List

```typescript
async function getDestinations(): Promise<Destination[]> {
  const destinations = await client.fetch<Destination[]>(destinationsQuery);
  return destinations || [];
}

export default async function Destinations() {
  const destinations = await getDestinations();
  // Render destinations...
}
```

### Dynamic Routes

Detail pages use dynamic routes with:
- `generateStaticParams()` for static generation
- `generateMetadata()` for SEO
- `notFound()` for 404 handling

## 🎨 Features Implemented

### ✅ Destinations
- List page with grid layout
- Detail page with:
  - Hero image
  - Description
  - Things to do
  - Local tips sidebar
  - Image gallery
- SEO metadata
- Responsive design

### ✅ Packages
- List page with package cards
- Detail page with:
  - Full itinerary (day-wise)
  - What's included/excluded
  - Transportation details
  - Safety notes
  - Price information
- SEO metadata
- Responsive design

### ✅ Blog
- List page with post cards
- Detail page with:
  - Rich text content (PortableText)
  - Author information
  - Categories
  - SEO fields
  - Image support
- SEO metadata
- Responsive design

## 🚀 Performance Optimizations

### 1. Static Generation
- `generateStaticParams()` pre-generates pages at build time
- Faster page loads
- Better SEO

### 2. Image Optimization
- Uses `next/image` component
- Sanity CDN for image delivery
- Responsive image sizes
- Lazy loading

### 3. CDN Usage
- Production uses Sanity CDN
- Faster data fetching
- Reduced server load

### 4. Type Safety
- Full TypeScript support
- Type-safe queries
- Compile-time error checking

## 🔍 SEO Features

### Metadata Generation
Each page generates SEO metadata:
- Title and description
- Open Graph tags
- Twitter cards
- Canonical URLs
- Keywords

### Example:
```typescript
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    // ...
  };
}
```

## 📦 Dependencies

Required packages:
- `next-sanity` - Next.js integration
- `@sanity/image-url` - Image URL generation
- `@portabletext/react` - Rich text rendering

## 🔄 Data Flow

1. **Content Creation**: Content created in Sanity Studio
2. **Content Publishing**: Content published in Sanity
3. **Data Fetching**: Next.js Server Components fetch via GROQ
4. **Rendering**: Content rendered in React components
5. **Static Generation**: Pages pre-rendered at build time

## 🛠️ Usage Examples

### Fetching Destinations

```typescript
import { client } from '@/lib/sanity/client';
import { destinationsQuery } from '@/lib/sanity/queries';

const destinations = await client.fetch(destinationsQuery);
```

### Using Images

```typescript
import { urlForImage } from '@/lib/sanity/image';
import Image from 'next/image';

const imageUrl = urlForImage(destination.image, 800, 600);
<Image src={imageUrl} alt="..." width={800} height={600} />
```

### Rendering Rich Text

```typescript
import { PortableText } from '@portabletext/react';

<PortableText value={post.content} />
```

## 🐛 Error Handling

- Try-catch blocks in all fetch functions
- Fallback to empty arrays if fetch fails
- 404 pages for missing content
- Console error logging for debugging

## 📝 Best Practices

1. **Always use Server Components** for data fetching
2. **Use TypeScript types** for type safety
3. **Generate static params** for dynamic routes
4. **Optimize images** with next/image
5. **Handle errors gracefully** with fallbacks
6. **Use SEO metadata** for all pages
7. **Validate environment variables** before use

## 🔗 Related Documentation

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Portable Text](https://www.sanity.io/docs/block-content)

---

**Ready to use!** All pages are now connected to Sanity CMS. Create content in Sanity Studio and it will appear on your website automatically.

