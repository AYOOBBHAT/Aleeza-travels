import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(client);

/**
 * Generate a URL for a Sanity image
 * @param source - Sanity image source (from query)
 * @returns URL string
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Generate optimized image URL with specific dimensions and format
 * Uses WebP for better performance (auto-detected by Sanity CDN)
 */
export function urlForImage(
  source: SanityImageSource,
  width?: number,
  height?: number,
  quality: number = 85,
  format: 'webp' | 'auto' = 'auto'
) {
  let imageBuilder = builder.image(source);

  if (width) {
    imageBuilder = imageBuilder.width(width);
  }
  if (height) {
    imageBuilder = imageBuilder.height(height);
  }

  // Use modern formats for better compression
  if (format === 'webp') {
    imageBuilder = imageBuilder.format('webp');
  } else {
    // Auto-detect best format (WebP when supported by browser)
    imageBuilder = imageBuilder.auto('format');
  }

  return imageBuilder.quality(quality).url();
}

/**
 * Generate responsive image srcSet for next/image
 * Returns object with src and srcSet for optimal loading
 */
export function urlForImageResponsive(
  source: SanityImageSource,
  sizes: number[] = [640, 768, 1024, 1280, 1920],
  quality: number = 85
) {
  const srcSet = sizes
    .map((size) => {
      const url = urlForImage(source, size, undefined, quality);
      return `${url} ${size}w`;
    })
    .join(', ');

  return {
    src: urlForImage(source, sizes[sizes.length - 1], undefined, quality),
    srcSet,
  };
}
