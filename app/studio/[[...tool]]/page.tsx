/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 * 
 * SECURITY NOTE: 
 * - The Project ID being public is SAFE - it's just an identifier
 * - Sanity Studio requires authentication - users must log in with their Sanity account
 * - Only users you invite to your Sanity project can edit content
 * - For production, consider using Sanity's hosted Studio instead (npm run sanity:deploy)
 */

'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity/sanity.config'

export default function StudioPage() {
  // Disable Studio in production - use Sanity's hosted Studio instead
  if (process.env.NODE_ENV === 'production') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Studio Not Available</h1>
          <p className="text-gray-600 mb-6">
            The embedded Studio is disabled in production for security. 
            Please use Sanity&apos;s hosted Studio to manage content.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900 mb-2">
              <strong>Access Studio:</strong>
            </p>
            <p className="text-sm text-blue-800">
              Visit your Sanity project dashboard or deploy the Studio:
            </p>
            <code className="block mt-2 text-xs bg-white px-3 py-2 rounded border">
              npm run sanity:deploy
            </code>
          </div>
          <a
            href="https://www.sanity.io/manage"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Open Sanity Dashboard
          </a>
        </div>
      </div>
    );
  }
  
  // Development: Show embedded Studio
  return <NextStudio config={config} />
}
