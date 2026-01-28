'use client';

import SVGIcon from '@/lib/SVGIcons/Icon';
import { ExploreItem } from '@/types';
import Image from 'next/image';
import { memo, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '../ui';

interface ExploreCardsProps {
  data?: ExploreItem[];
}

const FALLBACK_IMAGE = '/images/Blog/article-meal.jpg';

const ExploreCards = memo(({ data = [] }: ExploreCardsProps) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  if (!data.length) {
    return null;
  }

  const renderCard = (item: ExploreItem) => (
    <article
      key={item.id}
      className="overflow-hidden"
      aria-labelledby={`blog-title-${item.id}`}
    >
      <figure className="relative mb-6 h-41.25 w-full overflow-hidden bg-gray-100">
        <Image
          src={item.image || FALLBACK_IMAGE}
          alt={`Banner image for blog post: ${item.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
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
  );

  return (
    <section className="mb-25" aria-labelledby="explore-heading">
      <h4 id="explore-heading" className="mb-10 text-xl font-semibold">
        Explore more
      </h4>
      <div className="hidden space-y-10 sm:block">{data.map(renderCard)}</div>
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
          {data.map(item => (
            <SwiperSlide key={item.id}>{renderCard(item)}</SwiperSlide>
          ))}
        </Swiper>
        <nav
          className="mt-6 flex items-center justify-between gap-4"
          aria-label="Explore navigation"
        >
          <Button
            className="rounded-none disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => swiperInstance?.slidePrev()}
            disabled={isBeginning}
            aria-label="Previous explore item"
          >
            <SVGIcon name="arrowLeft" /> Previous
          </Button>
          <Button
            className="max-w-24 rounded-none disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => swiperInstance?.slideNext()}
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
