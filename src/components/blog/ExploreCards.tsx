'use client';
import SVGIcon from '@/lib/SVGIcons/Icon';
import { ExploreItem } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '../ui';

const ExploreCards = ({ data = [] }: { data?: ExploreItem[] }) => {
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
  const [imageLoading, setImageLoading] = useState<{ [key: string]: boolean }>({});
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (!data || data.length === 0) {
    return null;
  }

  const handlePrev = () => {
    swiperInstance?.slidePrev();
  };

  const handleNext = () => {
    swiperInstance?.slideNext();
  };

  const handleSlideChange = () => {
    if (swiperInstance) {
      setIsBeginning(swiperInstance.isBeginning);
      setIsEnd(swiperInstance.isEnd);
    }
  };

  const renderCard = (item: ExploreItem) => (
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
            ></div>
          </div>
        )}
        <Image
          src={
            imageError[item.id]
              ? '/images/Blog/article-meal.jpg'
              : item.image || '/images/Blog/article-meal.jpg'
          }
          alt={`Banner image for blog post: ${item.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onLoad={() => setImageLoading((prev) => ({ ...prev, [item.id]: false }))}
          onError={() => {
            setImageError((prev) => ({ ...prev, [item.id]: true }));
            setImageLoading((prev) => ({ ...prev, [item.id]: false }));
          }}
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </figure>

      <header className="mb-2.5 flex items-center gap-2.5">
        <span className="text-sm font-medium text-black">{item.category}</span>
        <span className="text-[#757575] opacity-80">|</span>
        <span className="text-sm text-[#757575]">{item.date}</span>
      </header>

      <h3 className="line-clamp-2 text-base leading-normal font-medium tracking-wider text-[#121212]">
        {item.title}
      </h3>
    </article>
  );

  return (
    <div className="mb-25">
      <h4 className="mb-10 text-xl font-semibold">Explore more</h4>

      {/* Desktop View - Normal Stack */}
      <div className="hidden space-y-10 sm:block">{data.map((item) => renderCard(item))}</div>

      {/* Mobile View - Swiper Slider */}
      <div className="block sm:hidden">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          speed={600}
          onSwiper={setSwiperInstance}
          onSlideChange={handleSlideChange}
          className="explore-swiper"
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>{renderCard(item)}</SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <Button 
            className="rounded-none" 
            onClick={handlePrev}
            disabled={isBeginning}
          >
            <SVGIcon name="arrowLeft" /> Previous
          </Button>
          <Button 
            className="max-w-24 rounded-none" 
            onClick={handleNext}
            disabled={isEnd}
          >
            Next <SVGIcon name="arrowRight" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExploreCards;
