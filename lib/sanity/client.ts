import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

if (!projectId || !dataset) {
  throw new Error(
    'Missing Sanity environment variables. Please set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in your .env.local file.'
  );
}

/**
 * Sanity Client Configuration
 * 
 * Caching Strategy:
 * - useCdn: true in production for better performance
 * - CDN caches responses, but we use revalidation for freshness
 * - Revalidation ensures content updates appear within the revalidate period
 * - This balances performance (CDN) with freshness (revalidation)
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production for performance
  perspective: 'published', // Only fetch published content
  // No token needed for read-only operations
});

/**
 * Client for on-demand revalidation (bypasses CDN cache)
 * Use this when you need to force fresh data immediately
 */
export const clientNoCache = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Bypass CDN for instant updates
  perspective: 'published',
});
