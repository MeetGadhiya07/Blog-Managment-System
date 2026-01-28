'use client';

import SVGIcon from '@/lib/SVGIcons/Icon';
import { ExploreItem } from '@/types';
import Image from 'next/image';
import { memo, useCallback, useMemo, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '../ui';

interface ExploreCardsProps {
  data?: ExploreItem[];
}

const FALLBACK_IMAGE = '/images/Blog/article-meal.jpg';
const BLUR_DATA_URL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';

const ExploreCards = memo(({ data = [] }: ExploreCardsProps) => {
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = useCallback(() => {
    swiperInstance?.slidePrev();
  }, [swiperInstance]);

  const handleNext = useCallback(() => {
    swiperInstance?.slideNext();
  }, [swiperInstance]);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  const handleImageLoad = useCallback((itemId: string) => {
    setImageLoading((prev) => ({ ...prev, [itemId]: false }));
  }, []);

  const handleImageError = useCallback((itemId: string) => {
    setImageError((prev) => ({ ...prev, [itemId]: true }));
    setImageLoading((prev) => ({ ...prev, [itemId]: false }));
  }, []);

  const swiperConfig = useMemo(
    () => ({
      modules: [Navigation],
      spaceBetween: 20,
      slidesPerView: 1 as const,
      speed: 600,
    }),
    [],
  );

  const renderCard = useCallback(
    (item: ExploreItem) => (
      <article key={item.id} className="overflow-hidden" aria-labelledby={`blog-title-${item.id}`}>
        <figure
          className="relative mb-6 h-41.25 w-full overflow-hidden bg-gray-100"
          role="img"
          aria-label={`Banner image for ${item.title}`}
        >
          {imageLoading[item.id] !== false && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-gray-100"
              aria-label="Loading image"
            >
              <div
                className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"
                role="status"
                aria-label="Loading"
              />
            </div>
          )}
          <Image
            src={imageError[item.id] ? FALLBACK_IMAGE : item.image || FALLBACK_IMAGE}
            alt={`Banner image for blog post: ${item.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onLoad={() => handleImageLoad(item.id)}
            onError={() => handleImageError(item.id)}
            priority={false}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        </figure>

        <header className="mb-2.5 flex items-center gap-2.5">
          <span className="text-sm font-medium text-black">{item.category}</span>
          <span className="text-[#757575] opacity-80">|</span>
          <time className="text-sm text-[#757575]" dateTime={item.date}>
            {item.date}
          </time>
        </header>

        <h3
          id={`blog-title-${item.id}`}
          className="line-clamp-2 text-base leading-normal font-medium tracking-wider text-[#121212]"
        >
          {item.title}
        </h3>
      </article>
    ),
    [imageError, imageLoading, handleImageLoad, handleImageError],
  );

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section className="mb-25" aria-labelledby="explore-heading">
      <h4 id="explore-heading" className="mb-10 text-xl font-semibold">
        Explore more
      </h4>

      {/* Desktop View - Normal Stack */}
      <div className="hidden space-y-10 sm:block">{data.map((item) => renderCard(item))}</div>

      {/* Mobile View - Swiper Slider */}
      <div className="block sm:hidden">
        <Swiper
          {...swiperConfig}
          onSwiper={setSwiperInstance}
          onSlideChange={handleSlideChange}
          className="explore-swiper"
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>{renderCard(item)}</SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <nav
          className="mt-6 flex items-center justify-between gap-4"
          aria-label="Explore navigation"
        >
          <Button
            className="rounded-none disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handlePrev}
            disabled={isBeginning}
            aria-label="Previous explore item"
          >
            <SVGIcon name="arrowLeft" /> Previous
          </Button>
          <Button
            className="max-w-24 rounded-none disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleNext}
            disabled={isEnd}
            aria-label="Next explore item"
          >
            Next <SVGIcon name="arrowRight" />
          </Button>
        </nav>
      </div>
    </section>
  );
});

ExploreCards.displayName = 'ExploreCards';

export default ExploreCards;
