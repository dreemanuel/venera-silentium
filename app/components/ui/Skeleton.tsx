/**
 * Skeleton component for loading states
 * Provides animated placeholders while content is loading
 */

import { cn } from "~/lib/utils";

interface SkeletonProps {
  className?: string;
}

/**
 * Base skeleton element with pulse animation
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse  bg-paynes-gray/10",
        className
      )}
    />
  );
}

/**
 * Text line skeleton
 */
export function SkeletonText({ className, lines = 1 }: SkeletonProps & { lines?: number }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === lines - 1 && lines > 1 ? "w-3/4" : "w-full"
          )}
        />
      ))}
    </div>
  );
}

/**
 * Heading skeleton
 */
export function SkeletonHeading({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-8 w-2/3", className)} />;
}

/**
 * Avatar/circle skeleton
 */
export function SkeletonAvatar({ className, size = "md" }: SkeletonProps & { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
  };

  return (
    <Skeleton className={cn("rounded-full", sizeClasses[size], className)} />
  );
}

/**
 * Image/card skeleton
 */
export function SkeletonImage({ className, aspectRatio = "video" }: SkeletonProps & { aspectRatio?: "square" | "video" | "portrait" }) {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
  };

  return (
    <Skeleton className={cn("w-full", aspectClasses[aspectRatio], className)} />
  );
}

/**
 * Button skeleton
 */
export function SkeletonButton({ className, size = "md" }: SkeletonProps & { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-8 w-20",
    md: "h-10 w-28",
    lg: "h-12 w-36",
  };

  return (
    <Skeleton className={cn("", sizeClasses[size], className)} />
  );
}

/**
 * Input field skeleton
 */
export function SkeletonInput({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-10 w-full ", className)} />;
}

/**
 * Service card skeleton
 */
export function SkeletonServiceCard({ className }: SkeletonProps) {
  return (
    <div className={cn(" bg-white shadow-md overflow-hidden", className)}>
      <SkeletonImage aspectRatio="video" className="rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <SkeletonText lines={2} />
        <div className="flex items-center gap-2 pt-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

/**
 * Service detail page skeleton
 */
export function SkeletonServiceDetail({ className }: SkeletonProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {/* Hero section */}
      <div className="relative h-64 md:h-80">
        <SkeletonImage aspectRatio="video" className="absolute inset-0 h-full rounded-none" />
      </div>

      {/* Content section */}
      <div className="container mx-auto px-6 space-y-6">
        <SkeletonHeading className="w-1/2" />
        <SkeletonText lines={4} />

        {/* Details grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-3">
            <Skeleton className="h-5 w-24" />
            <SkeletonText lines={2} />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-5 w-24" />
            <SkeletonText lines={2} />
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center pt-6">
          <SkeletonButton size="lg" />
        </div>
      </div>
    </div>
  );
}

/**
 * Services gallery skeleton
 */
export function SkeletonServicesGallery({ className, count = 6 }: SkeletonProps & { count?: number }) {
  return (
    <div className={cn("py-16 md:py-24 bg-cornsilk", className)}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <SkeletonHeading className="mx-auto" />
          <Skeleton className="h-5 w-1/2 mx-auto" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: count }).map((_, i) => (
            <SkeletonServiceCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Contact form skeleton
 */
export function SkeletonContactForm({ className }: SkeletonProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <SkeletonInput />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <SkeletonInput />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <SkeletonInput />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-32 w-full " />
      </div>
      <SkeletonButton size="lg" className="w-full" />
    </div>
  );
}
