import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { clientNoCache } from '@/lib/sanity/client';

/**
 * On-Demand Revalidation API Route
 * 
 * This endpoint allows Sanity webhooks to trigger immediate revalidation
 * when content is published or updated.
 * 
 * Security: Protect this route with a secret token in production
 * 
 * Usage:
 * POST /api/revalidate?secret=YOUR_SECRET&type=destination&slug=example
 * 
 * Query params:
 * - secret: Secret token (must match REVALIDATE_SECRET env var)
 * - type: Content type ('destination', 'package', or 'all')
 * - slug: Optional slug for specific page revalidation
 */
export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const secret = searchParams.get('secret');
    const type = searchParams.get('type') || 'all';
    const slug = searchParams.get('slug');

    // Verify secret token
    const expectedSecret = process.env.REVALIDATE_SECRET;
    if (!expectedSecret) {
      console.warn('REVALIDATE_SECRET not set. Revalidation endpoint is disabled.');
      return NextResponse.json(
        { error: 'Revalidation not configured' },
        { status: 500 }
      );
    }

    if (secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Invalid secret token' },
        { status: 401 }
      );
    }

    // Revalidate based on type
    if (type === 'all' || type === 'destination') {
      revalidatePath('/destinations');
      if (slug) {
        revalidatePath(`/destinations/${slug}`);
      } else {
        // Revalidate all destination pages
        revalidatePath('/destinations', 'page');
      }
    }

    if (type === 'all' || type === 'package') {
      revalidatePath('/packages');
      if (slug) {
        revalidatePath(`/packages/${slug}`);
      } else {
        revalidatePath('/packages', 'page');
      }
    }


    // Always revalidate home page (may show featured content)
    revalidatePath('/');

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type,
      slug: slug || 'all',
    });
  } catch (error) {
    console.error('Error revalidating:', error);
    return NextResponse.json(
      { error: 'Error revalidating' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint for testing (remove in production)
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Revalidation endpoint. Use POST with secret token.',
    usage: 'POST /api/revalidate?secret=YOUR_SECRET&type=destination&slug=example',
  });
}

