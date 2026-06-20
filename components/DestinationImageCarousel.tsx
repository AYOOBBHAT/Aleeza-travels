'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface CarouselImage {
  url: string;
  alt: string;
}

interface DestinationImageCarouselProps {
  images: CarouselImage[];
  featured?: boolean;
  priority?: boolean;
  className?: string;
}

const INTERVAL_MS = 2000;

export default function DestinationImageCarousel({
  images,
  featured,
  priority = false,
  className = 'h-64',
}: DestinationImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      {images.map((image, index) => (
        <div
          key={image.url}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={index !== currentIndex}
        >
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority && index === 0}
            loading={priority ? 'eager' : 'lazy'}
            quality={85}
          />
        </div>
      ))}
      {featured && (
        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
          Featured
        </div>
      )}
    </div>
  );
}
