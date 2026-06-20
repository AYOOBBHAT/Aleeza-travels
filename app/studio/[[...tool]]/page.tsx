import { redirect } from 'next/navigation';
import { getSanityStudioUrl } from '@/lib/sanity/studio-url';

export default function StudioPage() {
  redirect(getSanityStudioUrl());
}
