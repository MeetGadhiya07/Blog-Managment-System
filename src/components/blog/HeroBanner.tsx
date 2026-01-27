'use client';

import { ImageOff } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const HeroBannerSkeleton = () => (
  <div className="relative h-48 w-full animate-pulse bg-gray-200 sm:h-64 md:h-80 lg:h-96 xl:h-112">
    <div className="absolute inset-0 bg-linear-to-r from-gray-300 to-gray-200"></div>
  </div>
);

export const HeroBanner = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className="px-4 sm:px-7.5 md:px-0">
        <div className="relative flex h-48 w-full items-center justify-center bg-gray-100 sm:h-64 md:h-80 lg:h-96 xl:h-112">
          <div className="px-4 text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 sm:mb-4 sm:h-16 sm:w-16">
              <ImageOff className="h-6 w-6 text-gray-500 sm:h-8 sm:w-8" />
            </div>
            <p className="text-sm text-gray-500 sm:text-base">Failed to load image</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-7.5 md:px-0">
      <div className="relative h-48 w-full overflow-hidden sm:h-64 md:h-80 lg:h-96 xl:h-112">
        {isLoading && <HeroBannerSkeleton />}
        <Image
          src="/images/Blog/hero-banner.jpg"
          alt="Blog Hero Banner"
          fill
          className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          priority
          onLoad={handleLoad}
          onError={handleError}
          sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 768px) calc(100vw - 60px), 100vw"
        />
      </div>
    </div>
  );
};
