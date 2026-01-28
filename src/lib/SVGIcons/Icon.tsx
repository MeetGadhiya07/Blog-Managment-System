'use client';

import { IconProps } from '@/types/icon';
import React from 'react';
import { iconSet } from './iconUtility';

const SVGIcon: React.FC<IconProps> = ({
  name,
  className,
  width = 16,
  height = 16,
  ...props
}) => {
  const IconComponent = iconSet[name as keyof typeof iconSet];

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      className={className}
      width={width}
      height={height}
      {...props}
    />
  );
};

export default SVGIcon;
