'use client';

import { Button } from '@/components/ui';
import { testimonials } from '@/lib/data/testimonials';
import SVGIcon from '@/lib/SVGIcons/Icon';
import Image from 'next/image';
import { memo, useCallback, useMemo, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const BlogTestimonial = memo(() => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const isFirstSlide = activeIndex === 0;
  const isLastSlide = activeIndex === testimonials.length - 1;

  const getPrevIndex = useCallback(
    () => (activeIndex - 1 + testimonials.length) % testimonials.length,
    [activeIndex],
  );

  const getNextIndex = useCallback(() => (activeIndex + 1) % testimonials.length, [activeIndex]);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  }, []);

  const handlePrevClick = useCallback(() => {
    swiperInstance?.slidePrev();
  }, [swiperInstance]);

  const handleNextClick = useCallback(() => {
    swiperInstance?.slideNext();
  }, [swiperInstance]);

  const swiperConfig = useMemo(
    () => ({
      spaceBetween: 20,
      slidesPerView: 1 as const,
      speed: 600,
      modules: [Navigation, Autoplay],
      autoplay: {
        delay: 8000,
        disableOnInteraction: false,
      },
      loop: false, // Set to true if you want infinite loop
    }),
    [],
  );

  return (
    <div className="w-full">
      <Swiper
        {...swiperConfig}
        onSwiper={setSwiperInstance}
        onSlideChange={handleSlideChange}
        className="mb-8 max-w-202.25 border-b border-b-[#E5E6EA] pb-6"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="flex w-full flex-col items-center justify-center p-6">
              <h3 className="text-dark-blue mb-3 text-center text-xl">About {testimonial.name}</h3>
              <div className="relative mb-3 flex h-24.75 w-24.75 shrink-0 justify-center overflow-hidden rounded-full">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  fill
                  sizes="(max-width: 768px) 100px, 100px"
                  className="object-cover"
                  priority={activeIndex === 0}
                />
              </div>
              <p className="text-secondary text-base font-semibold tracking-wide italic">
                {testimonial.content}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <nav className="flex items-center justify-between" aria-label="Testimonial navigation">
        <div className="flex flex-col items-start gap-y-2">
          <Button
            onClick={handlePrevClick}
            disabled={isFirstSlide}
            className="rounded-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Previous testimonial"
          >
            <SVGIcon name="arrowLeft" />
            Previous
          </Button>
          {!isFirstSlide && (
            <div className="hidden text-sm text-[#262D4D] sm:block">
              {testimonials[getPrevIndex()].title}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-y-2">
          <Button
            onClick={handleNextClick}
            disabled={isLastSlide}
            className="rounded-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Next testimonial"
          >
            Next <SVGIcon name="arrowRight" />
          </Button>
          {!isLastSlide && (
            <div className="hidden text-sm text-[#262D4D] sm:block">
              {testimonials[getNextIndex()].title}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
});

BlogTestimonial.displayName = 'BlogTestimonial';

export default BlogTestimonial;
