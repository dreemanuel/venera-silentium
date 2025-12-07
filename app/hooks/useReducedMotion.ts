/**
 * Hook to detect user's preference for reduced motion
 * Returns true if the user prefers reduced motion
 */

import { useSyncExternalStore } from 'react';

// Media query for reduced motion preference
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(callback: () => void): () => void {
  // Only subscribe on client
  if (typeof window === 'undefined') {
    return () => {};
  }

  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener('change', callback);

  return () => {
    mediaQuery.removeEventListener('change', callback);
  };
}

function getSnapshot(): boolean {
  // Check if on client and if user prefers reduced motion
  if (typeof window === 'undefined') {
    return false;
  }
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getServerSnapshot(): boolean {
  // Default to false on server (no motion reduction)
  return false;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Get motion-safe variants for Framer Motion
 * Returns reduced motion variants when user prefers reduced motion
 */
export function getMotionVariants<T extends Record<string, unknown>>(
  defaultVariants: T,
  reducedVariants: T,
  prefersReducedMotion: boolean
): T {
  return prefersReducedMotion ? reducedVariants : defaultVariants;
}
