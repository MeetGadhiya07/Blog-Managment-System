import ArrowLeft from '../../../public/images/svg/arrow-left.svg';
import ArrowRight from '../../../public/images/svg/arrow-right.svg';
import AverageIcon from '../../../public/images/svg/average-icon.svg';
import BedIcon from '../../../public/images/svg/bed-icon.svg';
import GoodIcon from '../../../public/images/svg/good-icon.svg';
import LocationIcon from '../../../public/images/svg/location-icon.svg';
import MessageIcon from '../../../public/images/svg/message-icon.svg';
import NiceIcon from '../../../public/images/svg/nice-icon.svg';
import NormalIcon from '../../../public/images/svg/normal-icon.svg';

export const iconSet = {
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  averageIcon: AverageIcon,
  bedIcon: BedIcon,
  goodIcon: GoodIcon,
  locationIcon: LocationIcon,
  messageIcon: MessageIcon,
  niceIcon: NiceIcon,
  normalIcon: NormalIcon,
};

export type IconName = keyof typeof iconSet;
