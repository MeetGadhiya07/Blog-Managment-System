'use client';

import { useCallback, useRef } from 'react';

export const useDebounce = <T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number,
): T => {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay) as NodeJS.Timeout;
    },
    [callback, delay],
  );

  return debouncedCallback as T;
};
