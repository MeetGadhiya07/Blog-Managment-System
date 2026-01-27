import { SVGProps } from 'react';
import type { IconName } from '@/lib/SVGIcons/iconUtility';

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  className?: string;
  width?: number | string;
  height?: number | string;
}
