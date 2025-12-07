import { useState } from 'react';
import { getResponsiveImageProps, getBlurPlaceholder, type ImageOptions } from '~/lib/image';
import type { SanityImage } from '~/lib/sanity';

interface OptimizedImageProps extends Omit<ImageOptions, 'alt'> {
  source: SanityImage | null | undefined;
  alt: string;
  className?: string;
  imgClassName?: string;
  fallback?: React.ReactNode;
  onLoad?: () => void;
}

/**
 * Optimized image component with:
 * - Responsive srcSet for multiple sizes
 * - WebP format auto-conversion
 * - Lazy loading for below-fold images
 * - Priority loading for above-fold images
 * - Blur placeholder while loading
 */
export function OptimizedImage({
  source,
  alt,
  className = '',
  imgClassName = '',
  fallback,
  priority = false,
  sizes,
  aspectRatio,
  quality,
  maxWidth,
  onLoad,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!source) {
    return fallback ? <>{fallback}</> : null;
  }

  const imageProps = getResponsiveImageProps(source, {
    alt,
    priority,
    sizes,
    aspectRatio,
    quality,
    maxWidth,
  });

  const blurPlaceholder = getBlurPlaceholder(source);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
  };

  if (hasError && fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder */}
      {!isLoaded && !priority && (
        <div
          className="absolute inset-0 bg-cover bg-center blur-lg scale-110 transition-opacity duration-300"
          style={{ backgroundImage: `url(${blurPlaceholder})` }}
          aria-hidden="true"
        />
      )}

      {/* Main image */}
      <img
        {...imageProps}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded || priority ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}

/**
 * Background image component for hero sections
 * Uses CSS background-image for better performance on large hero images
 */
interface BackgroundImageProps {
  source: SanityImage | null | undefined;
  className?: string;
  children?: React.ReactNode;
  priority?: boolean;
  overlay?: boolean;
  overlayClassName?: string;
}

export function BackgroundImage({
  source,
  className = '',
  children,
  priority = false,
  overlay = false,
  overlayClassName = 'bg-gradient-to-b from-paynes-gray/40 via-paynes-gray/30 to-paynes-gray/50',
}: BackgroundImageProps) {
  if (!source) {
    return (
      <div className={className}>
        {overlay && <div className={`absolute inset-0 ${overlayClassName}`} />}
        {children}
      </div>
    );
  }

  const imageProps = getResponsiveImageProps(source, {
    alt: '',
    priority,
    maxWidth: 1920,
    quality: 85,
  });

  return (
    <div className={`relative ${className}`}>
      {/* Background using picture element for responsive images */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageProps.src})` }}
        role="img"
        aria-hidden="true"
      />

      {/* Overlay */}
      {overlay && <div className={`absolute inset-0 ${overlayClassName}`} />}

      {/* Content */}
      {children}
    </div>
  );
}
