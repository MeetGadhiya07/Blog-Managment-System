'use client';
import { cn } from '@/lib/utils';
import { ReactNode, useState } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  delay?: number;
}

const Tooltip = ({
  content,
  children,
  position = 'right',
  className = '',
  delay = 200,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  const getTooltipClasses = () => {
    const baseClasses =
      'absolute z-50 whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-sm text-white transition-opacity duration-200';

    const positionClasses = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      right:
        'top-full left-1/2 -translate-x-1/2 mt-2 md:left-full md:top-1/2 md:-translate-y-1/2 md:ml-2 md:mt-0',
    };

    return cn(
      baseClasses,
      positionClasses[position],
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
      className
    );
  };

  const getArrowClasses = () => {
    const arrowClasses = {
      top: 'top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800',
      bottom:
        'bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-800',
      left: 'left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-800',
      right:
        'bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-800 md:right-full md:top-1/2 md:-translate-y-1/2 md:left-auto md:bottom-auto md:border-r-gray-800 md:border-b-transparent',
    };

    return cn('absolute', arrowClasses[position]);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div className={getTooltipClasses()}>
        {content}
        <div className={getArrowClasses()}></div>
      </div>
    </div>
  );
};

export default Tooltip;
