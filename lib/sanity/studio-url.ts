/** Hosted Sanity Studio URL (not deployed on Vercel). */
export function getSanityStudioUrl(): string {
  if (process.env.NEXT_PUBLIC_SANITY_STUDIO_URL) {
    return process.env.NEXT_PUBLIC_SANITY_STUDIO_URL;
  }

  const host = process.env.NEXT_PUBLIC_SANITY_STUDIO_HOST;
  if (host) {
    return `https://${host}.sanity.studio`;
  }

  return 'https://www.sanity.io/manage';
}
