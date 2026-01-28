import { RefObject, useEffect } from 'react';

/**
 * Custom hook that detects clicks outside of the specified element
 * @param ref - React ref object for the element to monitor
 * @param handler - Callback function that triggers when a click occurs outside the element
 * @param excludeRefs - Optional array of refs to exclude from triggering the outside click
 * @param enabled - Optional boolean to enable/disable the hook (defaults to true)
 */
export const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void,
  excludeRefs: RefObject<HTMLElement | null>[] = [],
  enabled: boolean = true
): void => {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent): void => {
      const target = event.target as Node;

      // Check if click target is outside main ref element
      const isOutside = ref.current && !ref.current.contains(target);

      // Check if click target is inside any of the excluded elements
      const isInsideExcluded = excludeRefs.some(
        excludeRef => excludeRef.current && excludeRef.current.contains(target)
      );

      // Only trigger handler if click is outside both the main ref and all excluded refs
      if (isOutside && !isInsideExcluded) {
        handler();
      }
    };

    // Add event listeners for both mouse and touch events
    document.addEventListener('mousedown', handleClickOutside, true);
    document.addEventListener('touchstart', handleClickOutside, true);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('touchstart', handleClickOutside, true);
    };
  }, [ref, handler, excludeRefs, enabled]);
};

export default useOutsideClick;
