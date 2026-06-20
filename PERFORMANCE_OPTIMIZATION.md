# Performance & SEO Optimization Guide

This document explains the performance optimizations implemented in the Next.js + Sanity CMS project.

## 🎯 Optimization Strategy

### 1. Smart Caching with ISR (Incremental Static Regeneration)

We use **ISR with revalidation** instead of disabling caching completely. This provides:
- **Fast page loads** (cached responses)
- **Fresh content** (automatic revalidation)
- **No unnecessary rebuilds** (only revalidates when needed)

#### Caching Strategy by Page Type

| Page Type | Revalidation | Reason |
|-----------|-------------|--------|
| **List Pages** (`/destinations`, `/packages`, `/blog`) | 60 seconds | Content changes infrequently, but new items should appear within a minute |
| **Detail Pages** (`/destinations/[slug]`, `/packages/[slug]`, `/blog/[slug]`) | 3600 seconds (1 hour) | Published content rarely changes, but updates should appear within an hour |
| **Home Page** | 60 seconds | Featured content may change, but not frequently |

#### How It Works

1. **First Request**: Page is generated and cached
2. **Subsequent Requests**: Served from cache (fast!)
3. **After Revalidation Period**: Next request triggers background regeneration
4. **Users Always Get Fast Responses**: While content stays fresh

### 2. CDN Usage

- **Production**: CDN enabled (`useCdn: true`) for faster data fetching
- **Development**: CDN disabled for instant updates during development
- **Revalidation**: Works with CDN - cached pages revalidate in the background

### 3. GROQ Query Optimization

#### Lightweight Projections for Lists
- List pages use `imageProjectionLight` (excludes metadata)
- Reduces payload size by ~30-40%
- Faster initial page loads

#### Full Projections for Details
- Detail pages use full `imageProjection` (includes metadata)
- Needed for proper image optimization
- Only loaded when viewing a specific item

#### Field Selection
- Only fetch required fields
- Avoid over-fetching nested data
- Use `select()` where possible

### 4. Image Optimization

#### Modern Formats
- **WebP/AVIF**: Automatic format selection for better compression
- **Quality**: 85% (optimal balance between size and quality)
- **Responsive Sizes**: Proper `sizes` attribute for all images

#### Loading Strategy
- **Above-fold images**: `priority` or `loading="eager"` (first 6 images)
- **Below-fold images**: `loading="lazy"` (rest of images)
- **Hero images**: `priority` with high quality (90%)

#### Image Sizes
- **List thumbnails**: 800x600px
- **Detail hero**: 1920x1080px
- **Gallery images**: 600x400px
- **OG images**: 1200x630px (social sharing)

### 5. SEO Optimization

#### Metadata
- **Dynamic metadata** for all detail pages
- **OpenGraph** tags for social sharing
- **Twitter Cards** for Twitter previews
- **Canonical URLs** to prevent duplicate content
- **Keywords** for better search visibility

#### Structured Data (JSON-LD)
- **TouristDestination** schema for destinations
- **TouristTrip** schema for packages
- **Article** schema for blog posts (implicit via OpenGraph type)

#### Example Metadata:
```typescript
{
  title: "Destination Name | Destinations | Aleeza Travels",
  description: "Detailed description...",
  keywords: ["destination", "Kashmir", "travel"],
  openGraph: {
    title: "Destination Name | Aleeza Travels",
    images: [{ url: "...", width: 1200, height: 630 }],
    type: "website",
    url: "https://aleezatravels.com/destinations/..."
  },
  twitter: {
    card: "summary_large_image",
    title: "...",
    images: ["..."]
  },
  alternates: {
    canonical: "https://aleezatravels.com/destinations/..."
  }
}
```

### 6. On-Demand Revalidation

For instant updates when content is published:

#### Setup
1. Add `REVALIDATE_SECRET` to environment variables
2. Configure Sanity webhook to call `/api/revalidate`
3. Webhook triggers immediate revalidation

#### Usage
```bash
POST /api/revalidate?secret=YOUR_SECRET&type=destination&slug=example
```

#### Webhook Configuration (Sanity)
- **URL**: `https://yourdomain.com/api/revalidate`
- **Method**: POST
- **Query Params**: 
  - `secret`: Your REVALIDATE_SECRET
  - `type`: `destination`, `package`, `blog`, or `all`
  - `slug`: Optional specific slug

## 📊 Performance Metrics

### Expected Performance

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.5s
- **Cumulative Layout Shift (CLS)**: < 0.1

### Caching Benefits

- **List Pages**: 95%+ cache hit rate (after warm-up)
- **Detail Pages**: 90%+ cache hit rate
- **API Response Time**: < 100ms (from CDN)

## 🔧 Configuration

### Environment Variables

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Revalidation (Optional - for webhooks)
REVALIDATE_SECRET=your_secret_token_here
```

### Next.js Configuration

```typescript
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Sanity CDN
      },
    ],
  },
};
```

## 🚀 Deployment Considerations

### Vercel
- ISR works automatically on Vercel
- Revalidation happens in the background
- No additional configuration needed

### Other Platforms
- Ensure platform supports ISR
- May need to configure revalidation manually
- Check platform docs for ISR support

## 📝 Best Practices

1. **Don't disable caching globally** - Use revalidation instead
2. **Use CDN in production** - Faster data fetching
3. **Optimize images** - Use WebP/AVIF, proper sizes
4. **Lazy load below-fold images** - Faster initial load
5. **Add structured data** - Better SEO
6. **Use on-demand revalidation** - For instant updates when needed

## 🔍 Monitoring

### Recommended Tools
- **Vercel Analytics**: Built-in performance monitoring
- **Google PageSpeed Insights**: SEO and performance scores
- **Lighthouse**: Comprehensive performance audit
- **Web Vitals**: Real user metrics

### What to Monitor
- Cache hit rates
- Revalidation frequency
- Image load times
- API response times
- Core Web Vitals

## 🐛 Troubleshooting

### Content Not Updating
1. Check revalidation period (60s for lists, 3600s for details)
2. Use on-demand revalidation for instant updates
3. Verify CDN is enabled in production

### Slow Page Loads
1. Check image optimization (format, size, lazy loading)
2. Verify CDN is enabled
3. Check GROQ query efficiency
4. Monitor API response times

### SEO Issues
1. Verify metadata is generated correctly
2. Check structured data with Google Rich Results Test
3. Ensure canonical URLs are set
4. Verify OpenGraph images are accessible

## 📚 References

- [Next.js ISR Documentation](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Sanity CDN](https://www.sanity.io/docs/cdn)
- [Schema.org](https://schema.org/)

