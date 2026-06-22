import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Sanity Studio',
  description: 'Sanity Studio for Sadasangh Holidays',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

