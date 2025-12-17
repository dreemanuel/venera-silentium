import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, type Variants, type TargetAndTransition } from 'framer-motion';
import { Button } from '~/components/ui';
import { getResponsiveImageProps } from '~/lib/image';
import type { SanityImage, HeroMediaItem, KenBurnsDirection } from '~/lib/sanity';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  quote?: string;
  image?: SanityImage;
  ctaText: string;
  ctaLink: string;
  // Slideshow props
  slideshowEnabled?: boolean;
  media?: HeroMediaItem[];
  slideshowInterval?: number;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

// Ken Burns animation configurations
const kenBurnsConfig: Record<KenBurnsDirection, { initial: TargetAndTransition; animate: TargetAndTransition }> = {
  zoomIn: {
    initial: { scale: 1, x: '0%', y: '0%' },
    animate: { scale: 1.1, x: '0%', y: '0%' },
  },
  zoomOut: {
    initial: { scale: 1.1, x: '0%', y: '0%' },
    animate: { scale: 1, x: '0%', y: '0%' },
  },
  panLeft: {
    initial: { scale: 1.05, x: '2%', y: '0%' },
    animate: { scale: 1.05, x: '-2%', y: '0%' },
  },
  panRight: {
    initial: { scale: 1.05, x: '-2%', y: '0%' },
    animate: { scale: 1.05, x: '2%', y: '0%' },
  },
};

// Check for reduced motion preference
const prefersReducedMotion = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;

export function HeroSection({
  title,
  subtitle,
  quote,
  image,
  ctaText,
  ctaLink,
  slideshowEnabled = false,
  media = [],
  slideshowInterval = 6,
}: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Determine if we should use slideshow mode
  const useSlideshow = slideshowEnabled && media.length > 0;
  const currentMedia = useSlideshow ? media[currentIndex] : null;
  const hasMedia = useSlideshow || !!image;

  // Get duration for current slide (use override or default)
  const getCurrentDuration = useCallback(() => {
    if (!currentMedia) return slideshowInterval;
    return currentMedia.duration || slideshowInterval;
  }, [currentMedia, slideshowInterval]);

  // Advance to next slide and reset video loaded state
  const advanceSlide = useCallback(() => {
    setIsVideoLoaded(false);
    setCurrentIndex((prev) => (prev + 1) % media.length);
  }, [media.length]);

  // Auto-advance slideshow
  useEffect(() => {
    if (!useSlideshow || media.length <= 1) return;

    // Always use interval for consistent auto-advance behavior
    // Videos will also advance via onEnded, but interval acts as fallback
    const duration = getCurrentDuration();

    const interval = window.setInterval(() => {
      advanceSlide();
    }, duration * 1000);

    return () => window.clearInterval(interval);
  }, [useSlideshow, media.length, currentIndex, getCurrentDuration, advanceSlide]);

  // Handle video end
  const handleVideoEnded = useCallback(() => {
    if (useSlideshow && media.length > 1) {
      advanceSlide();
    }
  }, [useSlideshow, media.length, advanceSlide]);

  // Navigate to specific slide
  const goToSlide = useCallback((index: number) => {
    setIsVideoLoaded(false);
    setCurrentIndex(index);
    // Reset video if current is video
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, []);

  // Generate optimized image props for hero (priority loading)
  const getImagePropsForMedia = (sanityImage: SanityImage | undefined, alt: string) => {
    if (!sanityImage) return null;
    return getResponsiveImageProps(sanityImage, {
      alt,
      priority: true,
      sizes: '100vw',
      maxWidth: 1920,
      quality: 85,
    });
  };

  // Single image mode props
  const singleImageProps = !useSlideshow && image
    ? getImagePropsForMedia(image, title)
    : null;

  // Render single image (non-slideshow mode)
  const renderSingleImage = () => {
    if (!singleImageProps) return null;
    return (
      <>
        <img
          {...singleImageProps}
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paynes-gray/40 via-paynes-gray/30 to-paynes-gray/50" />
      </>
    );
  };

  // Render slideshow media
  const renderSlideshow = () => {
    if (!useSlideshow || !currentMedia) return null;

    const kenBurnsDirection = currentMedia.kenBurnsDirection || 'zoomIn';
    const kenBurns = kenBurnsConfig[kenBurnsDirection];
    const duration = getCurrentDuration();

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          {currentMedia.mediaType === 'image' && currentMedia.image && (
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial={prefersReducedMotion ? undefined : kenBurns.initial}
              animate={prefersReducedMotion ? undefined : kenBurns.animate}
              transition={prefersReducedMotion ? undefined : { duration, ease: 'linear' }}
            >
              <img
                {...getImagePropsForMedia(currentMedia.image, currentMedia.image.alt || title)}
                className="absolute inset-0 w-full h-full object-cover"
                aria-hidden="true"
              />
            </motion.div>
          )}

          {currentMedia.mediaType === 'video' && (
            <>
              {/* Video poster while loading */}
              {currentMedia.videoPoster && !isVideoLoaded && (
                <img
                  {...getImagePropsForMedia(currentMedia.videoPoster, title)}
                  className="absolute inset-0 w-full h-full object-cover"
                  aria-hidden="true"
                />
              )}
              {/* Video element */}
              {currentMedia.videoFileUrl && (
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  src={currentMedia.videoFileUrl}
                  autoPlay
                  muted
                  loop={media.length === 1} // Only loop if single video
                  playsInline
                  onEnded={handleVideoEnded}
                  onLoadedData={() => setIsVideoLoaded(true)}
                  aria-hidden="true"
                />
              )}
            </>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-paynes-gray/40 via-paynes-gray/30 to-paynes-gray/50" />
        </motion.div>
      </AnimatePresence>
    );
  };

  // Render navigation dots
  const renderDots = () => {
    if (!useSlideshow || media.length <= 1) return null;

    return (
      <div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2"
        role="tablist"
        aria-label="Slideshow navigation"
      >
        {media.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-cornsilk w-6'
                : 'bg-cornsilk/50 hover:bg-cornsilk/70'
            }`}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    );
  };

  // Render fallback decorative background
  const renderFallbackBackground = () => (
    <div className="absolute inset-0 bg-cornsilk">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tea-green/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-beige/50 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-papaya-whip/40 rounded-full blur-3xl" />
    </div>
  );

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
      {/* Background Media */}
      {useSlideshow ? (
        renderSlideshow()
      ) : singleImageProps ? (
        renderSingleImage()
      ) : (
        renderFallbackBackground()
      )}

      {/* Navigation Dots */}
      {renderDots()}

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-6 py-16 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Title - split by newlines for tight spacing */}
        <motion.h1
          variants={itemVariants}
          className={`font-display text-7xl xs:text-8xl md:text-[8rem] lg:text-[11rem] mb-2 ${
            hasMedia ? 'text-cornsilk' : 'text-paynes-gray'
          }`}
        >
          {title.split(/[\n\s]+/).map((word, index) => (
            <span
              key={index}
              className={`block ${index > 0 ? '-mt-6 md:-mt-16 lg:-mt-28' : ''}`}
            >
              {word}
            </span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            variants={itemVariants}
            className={`font-heading text-lg md:text-xl lg:text-2xl mb-8 max-w-xl mx-auto ${
              hasMedia ? 'text-cornsilk/90' : 'text-paynes-gray/80'
            }`}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Quote */}
        {quote && (
          <motion.blockquote
            variants={itemVariants}
            className={`italic text-base md:text-lg mb-12 max-w-md mx-auto ${
              hasMedia ? 'text-cornsilk/80' : 'text-paynes-gray/60'
            }`}
          >
            &ldquo;{quote}&rdquo;
          </motion.blockquote>
        )}

        {/* CTA Button */}
        <motion.div variants={itemVariants}>
          <Button
            variant={hasMedia ? 'secondary' : 'primary'}
            size="lg"
            as="link"
            to={ctaLink}
            className="shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {ctaText}
          </Button>
        </motion.div>
      </motion.div>

    </section>
  );
}
