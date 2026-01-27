import { ExploreItem } from '@/types';
import ExploreCards from '../ExploreCards';
import TourGuides from './TourGuides';

const EXPLORE_DATA: ExploreItem[] = [
  {
    id: '1',
    category: 'Cullary',
    date: '13 Jun 2022',
    title: 'Two women in local stand are chatting during morning..',
    image: '/images/Blog/explore-cullary.png',
  },
  {
    id: '2',
    category: 'Travel',
    date: '22 Jul 2022',
    title: 'Enjoying the sunset on Padar island together',
    image: '/images/Blog/explore-travel.png',
  },
  {
    id: '3',
    category: 'Travel',
    date: '22 Jul 2022',
    title: 'The lush green surroundings of the campgrounds create a..',
    image: '/images/Blog/explore-travel.png',
  },
];

const ExploreMore = () => {
  return (
    <>
      <ExploreCards data={EXPLORE_DATA} />
      <TourGuides />
    </>
  );
};

export default ExploreMore;
