import StarRating from '@/components/ui/StarRating';
import SVGIcon from '@/lib/SVGIcons/Icon';
import Image from 'next/image';

interface TourGuide {
  id: string;
  name: string;
  location: string;
  rating: number;
  image: string;
}

const tourGuidesData: TourGuide[] = [
  {
    id: '1',
    name: 'Miranda Rachel',
    location: 'Jombang, Jawa timur',
    rating: 4.0,
    image: '/images/Blog/miranda-rachel.png',
  },
  {
    id: '2',
    name: 'Danielle Marsh',
    location: 'Wonosobo, Jawa ten..',
    rating: 4.0,
    image: '/images/Blog/danielle-marsh.png',
  },
  {
    id: '3',
    name: 'Kang Haerin',
    location: 'Bandung, Jawa barat',
    rating: 5.0,
    image: '/images/Blog/kang-haerin.png',
  },
];

const TourGuides = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Tour Guides</h2>

      <div className="space-y-4">
        {tourGuidesData.map((guide, index) => (
          <div
            key={guide.id}
            className={` ${index !== tourGuidesData.length - 1 ? 'border-b border-b-[#DEDEDE] pb-5' : ''}`}
          >
            <div className={`mb-3.75 flex items-center space-x-4.5`}>
              <div className="relative h-15 w-15 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={guide.image}
                  alt={guide.name}
                  fill
                  className="object-cover"
                  sizes="60px"
                />
              </div>

              <div className="">
                <h3 className="mb-2 text-base font-medium tracking-wide text-black">
                  {guide.name}
                </h3>

                <div className="flex items-center space-x-1">
                  <SVGIcon name="locationIcon" />
                  <span className="line-clamp-1 text-sm tracking-wider text-black opacity-80">
                    {guide.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <StarRating rating={guide.rating} readonly size={15} />
              <span className="text-[15px] text-black">({guide.rating.toFixed(1)})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourGuides;
