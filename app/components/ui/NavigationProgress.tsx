/**
 * Navigation progress indicator
 * Shows a progress bar at the top of the page during route transitions
 */

import { useNavigation } from "react-router";
import { useSyncExternalStore, useEffect } from "react";

// External store for progress state - avoids setState in effects
interface ProgressState {
  progress: number;
  visible: boolean;
}

// All mutable state lives outside React
const progressStore = {
  state: { progress: 0, visible: false } as ProgressState,
  listeners: new Set<() => void>(),
  intervalId: null as ReturnType<typeof globalThis.setInterval> | null,
  timeoutId: null as ReturnType<typeof globalThis.setTimeout> | null,
  wasNavigating: false,

  notify() {
    this.listeners.forEach((listener) => listener());
  },

  subscribe(listener: () => void) {
    progressStore.listeners.add(listener);
    return () => progressStore.listeners.delete(listener);
  },

  getSnapshot(): ProgressState {
    return progressStore.state;
  },

  startProgress() {
    progressStore.state = { progress: 0, visible: true };
    progressStore.notify();

    // Clear any existing interval
    if (progressStore.intervalId) {
      globalThis.clearInterval(progressStore.intervalId);
    }

    // Simulate progress
    progressStore.intervalId = globalThis.setInterval(() => {
      if (progressStore.state.progress < 90) {
        const increment = Math.random() * 10;
        progressStore.state = {
          ...progressStore.state,
          progress: Math.min(progressStore.state.progress + increment, 90),
        };
        progressStore.notify();
      }
    }, 200);
  },

  completeProgress() {
    // Clear progress interval
    if (progressStore.intervalId) {
      globalThis.clearInterval(progressStore.intervalId);
      progressStore.intervalId = null;
    }

    // Complete to 100%
    progressStore.state = { ...progressStore.state, progress: 100 };
    progressStore.notify();

    // Hide after animation
    if (progressStore.timeoutId) {
      globalThis.clearTimeout(progressStore.timeoutId);
    }
    progressStore.timeoutId = globalThis.setTimeout(() => {
      progressStore.state = { progress: 0, visible: false };
      progressStore.notify();
    }, 300);
  },

  handleNavigation(isNavigating: boolean) {
    if (isNavigating !== progressStore.wasNavigating) {
      if (isNavigating) {
        progressStore.startProgress();
      } else {
        progressStore.completeProgress();
      }
      progressStore.wasNavigating = isNavigating;
    }
  },
};

export function NavigationProgress() {
  const navigation = useNavigation();
  const progressState = useSyncExternalStore(
    progressStore.subscribe,
    progressStore.getSnapshot,
    progressStore.getSnapshot
  );

  const isNavigating = navigation.state !== "idle";

  // Handle state transitions in effect
  useEffect(() => {
    progressStore.handleNavigation(isNavigating);
  }, [isNavigating]);

  if (!progressState.visible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-1 bg-transparent"
      role="progressbar"
      aria-valuenow={progressState.progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page loading"
    >
      <div
        className="h-full bg-gradient-to-r from-tea-green via-paynes-gray to-tea-green transition-all duration-200 ease-out"
        style={{
          width: `${progressState.progress}%`,
          boxShadow: "0 0 10px rgba(204, 213, 174, 0.5)",
        }}
      />
    </div>
  );
}

/**
 * Global loading overlay for slow navigations
 * Simple component - just checks navigation state
 */
export function NavigationLoadingOverlay() {
  const navigation = useNavigation();
  const isNavigating = navigation.state !== "idle";

  // Only show for loading state (not submitting), after initial render
  if (!isNavigating || navigation.state === "submitting") return null;

  return (
    <div className="fixed inset-0 z-[90] bg-cornsilk/60 backdrop-blur-sm flex items-center justify-center pointer-events-none opacity-0 animate-[fadeIn_0.5s_0.5s_forwards]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-tea-green border-t-paynes-gray rounded-full animate-spin" />
        <span className="text-paynes-gray/70 font-heading text-sm">Loading...</span>
      </div>
    </div>
  );
}
