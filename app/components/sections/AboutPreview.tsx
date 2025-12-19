import { motion, type Variants, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useInView as useInViewObserver } from 'react-intersection-observer';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '~/components/ui';
import { urlFor } from '~/lib/sanity';
import type { SanityImage, PortableTextBlock, AboutMediaItem, KenBurnsDirection } from '~/lib/sanity';
import type { TargetAndTransition } from 'framer-motion';

interface AboutPreviewProps {
  photo?: SanityImage;
  name: string;
  title: string;
  story?: PortableTextBlock[];
  credentials?: string[];
  experience?: string;
  ctaText: string;
  ctaLink: string;
  lang: string;
  // Slideshow props
  slideshowEnabled?: boolean;
  media?: AboutMediaItem[];
  slideshowInterval?: number;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Ken Burns animation configurations (same as HeroSection)
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

// Order of Ken Burns effects to cycle through
const kenBurnsOrder: KenBurnsDirection[] = ['zoomIn', 'panRight', 'zoomOut', 'panLeft'];

// Check for reduced motion preference
const prefersReducedMotion = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;

// Simple portable text renderer - just extracts plain text
function getPlainText(blocks?: PortableTextBlock[]): string {
  if (!blocks) return '';
  return blocks
    .filter((block) => block._type === 'block')
    .map((block) => block.children.map((child) => child.text).join(''))
    .join('\n\n');
}

export function AboutPreview({
  photo,
  name,
  title,
  story,
  credentials,
  experience,
  ctaText,
  ctaLink,
  slideshowEnabled = false,
  media = [],
  slideshowInterval = 5,
}: AboutPreviewProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.7);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // Determine if we should use slideshow mode
  const useSlideshow = slideshowEnabled && media.length > 0;
  const currentMedia = useSlideshow ? media[currentIndex] : null;

  // Check if current slide is a video that should use its full duration
  const isVideoWithFullDuration = currentMedia?.mediaType === 'video' &&
    (currentMedia.useVideoDuration ?? true); // Default to true for videos

  // Get duration for current slide (only used for images or videos without full duration)
  const getCurrentDuration = useCallback(() => {
    if (!currentMedia) return slideshowInterval;
    return currentMedia.duration || slideshowInterval;
  }, [currentMedia, slideshowInterval]);

  // Advance to next slide
  const advanceSlide = useCallback(() => {
    setIsVideoLoaded(false);
    setIsMuted(true); // Reset mute when changing slides (videos start muted)
    setCurrentIndex((prev) => (prev + 1) % media.length);
  }, [media.length]);

  // Auto-advance slideshow (skip for videos using full duration - they advance via onEnded)
  useEffect(() => {
    if (!useSlideshow || media.length <= 1) return;

    // Don't use timer for videos that should play their full duration
    if (isVideoWithFullDuration) return;

    const duration = getCurrentDuration();
    const interval = window.setInterval(() => {
      advanceSlide();
    }, duration * 1000);

    return () => window.clearInterval(interval);
  }, [useSlideshow, media.length, currentIndex, getCurrentDuration, advanceSlide, isVideoWithFullDuration]);

  // Handle video end - always advance when video ends (for multi-slide shows)
  const handleVideoEnded = useCallback(() => {
    if (useSlideshow && media.length > 1) {
      advanceSlide();
    }
  }, [useSlideshow, media.length, advanceSlide]);

  // Navigate to specific slide
  const goToSlide = useCallback((index: number) => {
    setIsVideoLoaded(false);
    setIsMuted(true); // Reset mute when changing slides (videos start muted)
    setCurrentIndex(index);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, []);

  // Apply volume to video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted, isVideoLoaded]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  // Handle volume change
  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  // Generate image URL
  const getImageUrl = (image: SanityImage | undefined, width = 600, height = 750) => {
    if (!image) return null;
    return urlFor(image).width(width).height(height).quality(85).auto('format').url();
  };

  const photoUrl = photo ? getImageUrl(photo) : null;
  const storyText = getPlainText(story);

  // Render single photo (non-slideshow mode)
  const renderSinglePhoto = () => {
    if (!photoUrl) {
      return (
        <div className="relative w-full max-w-md mx-auto shadow-xl bg-beige/50 aspect-[4/5] flex items-center justify-center">
          <div className="text-center text-paynes-gray/40">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-tea-green/30" />
            <p className="font-heading text-sm">Photo Coming Soon</p>
          </div>
        </div>
      );
    }

    return (
      <img
        src={photoUrl}
        alt={name}
        className="relative w-full max-w-md mx-auto shadow-xl object-cover aspect-[4/5]"
        loading="lazy"
      />
    );
  };

  // Lazy loading for videos - only load when section is near viewport
  const { ref: lazyVideoRef, inView: isNearViewport } = useInViewObserver({
    threshold: 0,
    triggerOnce: false,
    rootMargin: '200px', // Start loading 200px before visible
  });

  // Pause video when not in viewport to save resources
  useEffect(() => {
    if (videoRef.current && currentMedia?.mediaType === 'video') {
      if (!isNearViewport) {
        videoRef.current.pause();
      } else if (isVideoLoaded) {
        videoRef.current.play().catch(() => {
          // Autoplay may be blocked
        });
      }
    }
  }, [isNearViewport, isVideoLoaded, currentMedia?.mediaType]);

  // Render slideshow
  const renderSlideshow = () => {
    if (!useSlideshow || !currentMedia) return null;

    // Get Ken Burns direction for current slide (cycle through the 4 directions)
    const kenBurnsDirection = kenBurnsOrder[currentIndex % kenBurnsOrder.length] ?? 'zoomIn';
    const kenBurns = kenBurnsConfig[kenBurnsDirection];
    const duration = getCurrentDuration();

    return (
      <div
        ref={lazyVideoRef}
        className="relative w-full max-w-md mx-auto aspect-[4/5] overflow-hidden shadow-xl"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            {currentMedia.mediaType === 'image' && currentMedia.image && (
              <motion.div
                className="absolute inset-0 overflow-hidden"
                initial={prefersReducedMotion ? undefined : kenBurns.initial}
                animate={prefersReducedMotion ? undefined : kenBurns.animate}
                transition={prefersReducedMotion ? undefined : { duration, ease: 'linear' }}
              >
                <img
                  src={getImageUrl(currentMedia.image) || ''}
                  alt={currentMedia.image.alt || name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            )}

            {currentMedia.mediaType === 'video' && (
              <>
                {/* Video poster while loading or not in viewport */}
                {currentMedia.videoPoster && (!isVideoLoaded || !isNearViewport) && (
                  <img
                    src={getImageUrl(currentMedia.videoPoster) || ''}
                    alt={name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                {/* Loading indicator */}
                {isNearViewport && !isVideoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
                    <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                )}
                {/* Video element - only render when near viewport (lazy load) */}
                {currentMedia.videoFileUrl && isNearViewport && (
                  <video
                    ref={videoRef}
                    className={`w-full h-full object-cover cursor-pointer transition-opacity duration-300 ${
                      isVideoLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    src={currentMedia.videoFileUrl}
                    autoPlay
                    muted={isMuted}
                    loop={media.length === 1}
                    playsInline
                    preload="metadata"
                    onEnded={handleVideoEnded}
                    onLoadedData={() => setIsVideoLoaded(true)}
                    onClick={toggleMute}
                  />
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Volume controls - only shown for videos */}
        {currentMedia?.mediaType === 'video' && isVideoLoaded && (
          <div
            className="absolute top-4 right-4 z-10 flex items-center gap-2"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            {/* Volume slider */}
            <AnimatePresence>
              {showVolumeSlider && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 80 }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-cornsilk/30 rounded-full appearance-none cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none
                      [&::-webkit-slider-thumb]:w-3
                      [&::-webkit-slider-thumb]:h-3
                      [&::-webkit-slider-thumb]:rounded-full
                      [&::-webkit-slider-thumb]:bg-cornsilk
                      [&::-webkit-slider-thumb]:cursor-pointer
                      [&::-moz-range-thumb]:w-3
                      [&::-moz-range-thumb]:h-3
                      [&::-moz-range-thumb]:rounded-full
                      [&::-moz-range-thumb]:bg-cornsilk
                      [&::-moz-range-thumb]:border-0
                      [&::-moz-range-thumb]:cursor-pointer"
                    aria-label="Volume"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mute/unmute button */}
            <button
              onClick={toggleMute}
              className="p-2 bg-paynes-gray/50 backdrop-blur-sm rounded-full text-cornsilk hover:bg-paynes-gray/70 transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>
        )}

        {/* Navigation dots */}
        {media.length > 1 && (
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2"
            role="tablist"
            aria-label="Photo slideshow navigation"
          >
            {media.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-cornsilk w-5'
                    : 'bg-cornsilk/50 hover:bg-cornsilk/70'
                }`}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section ref={ref} className="py-20 md:py-28 bg-papaya-whip/30 overflow-hidden">
      <motion.div
        className="container mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo Column */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative">
              {/* Decorative background shape */}
              <div className="absolute -inset-4 bg-tea-green/20 -rotate-3" />
              <div className="relative">
                {useSlideshow ? renderSlideshow() : renderSinglePhoto()}
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <div className="space-y-6">
            {/* Experience badge */}
            {experience && (
              <motion.div variants={itemVariants}>
                <span className="inline-block px-4 py-1.5 bg-tea-green/40 text-paynes-gray rounded-full text-sm font-heading tracking-wide">
                  {experience}
                </span>
              </motion.div>
            )}

            {/* Name */}
            <motion.h2
              variants={itemVariants}
              className="font-display text-5xl md:text-6xl lg:text-7xl text-paynes-gray leading-[0.75]"
            >
              {name}
            </motion.h2>

            {/* Title */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-paynes-gray/70 font-heading mt-2"
            >
              {title}
            </motion.p>

            {/* Story excerpt */}
            {storyText && (
              <motion.p
                variants={itemVariants}
                className="text-paynes-gray/60 leading-relaxed line-clamp-4"
              >
                {storyText}
              </motion.p>
            )}

            {/* Credentials */}
            {credentials && credentials.length > 0 && (
              <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-2">
                {credentials.map((credential, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-cornsilk border border-paynes-gray/10 text-paynes-gray/80 text-sm"
                  >
                    {credential}
                  </span>
                ))}
              </motion.div>
            )}

            {/* CTA */}
            <motion.div variants={itemVariants} className="pt-4">
              <Button variant="outline" as="link" to={ctaLink}>
                {ctaText}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
