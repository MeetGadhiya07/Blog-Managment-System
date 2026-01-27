'use client';

import { Button } from '@/components/ui';
import { testimonials } from '@/lib/data/testimonials';
import Image from 'next/image';
import { memo, useCallback, useMemo, useState } from 'react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const BlogTestimonial = memo(() => {
  const [activeIndex, setActiveIndex] = useState(0);

  const getPrevIndex = useCallback(
    () => (activeIndex - 1 + testimonials.length) % testimonials.length,
    [activeIndex],
  );

  const getNextIndex = useCallback(() => (activeIndex + 1) % testimonials.length, [activeIndex]);

  const navigationConfig = useMemo(
    () => ({
      prevEl: '.swiper-button-prev-custom',
      nextEl: '.swiper-button-next-custom',
    }),
    [],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSlideChange = useCallback((swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  }, []);

  return (
    <>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        speed={600}
        modules={[Navigation, Autoplay]}
        navigation={navigationConfig}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
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
                  className="object-cover"
                />
              </div>
              <p className="text-secondary text-base font-semibold tracking-wide italic">
                {testimonial.content}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start space-y-2">
          <Button className="swiper-button-prev-custom text-foreground rounded-none">
            <Image src="/images/Blog/left-icon.png" alt="Left-Arrow" width={20} height={20} />
            Previous
          </Button>
          <div className="hidden text-sm text-[#262D4D] sm:block">
            {testimonials[getPrevIndex()].title}
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <Button className="swiper-button-next-custom text-foreground max-w-24 rounded-none">
            Next{' '}
            <Image src="/images/Blog/right-icon.png" alt="Right-Arrow" width={20} height={20} />
          </Button>
          <div className="hidden text-sm text-[#262D4D] sm:block">
            {testimonials[getNextIndex()].title}
          </div>
        </div>
      </div>
    </>
  );
});

BlogTestimonial.displayName = 'BlogTestimonial';

export default BlogTestimonial;
