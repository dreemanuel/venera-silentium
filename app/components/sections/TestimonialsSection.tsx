import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, type Variants, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Star, Quote, Volume2, VolumeX, Play } from 'lucide-react';
import { getThumbnailUrl, getHeroImageUrl } from '~/lib/image';
import type { Testimonial, Language } from '~/lib/sanity';
import { getLocalizedValue } from '~/lib/sanity';
import { ImageLightbox } from '~/components/ui/ImageLightbox';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  lang: Language;
  title?: string;
  subtitle?: string;
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
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? 'fill-tea-green text-tea-green'
              : 'fill-transparent text-paynes-gray/30'
          }`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  lang,
}: {
  testimonial: Testimonial;
  lang: Language;
}) {
  const quote = getLocalizedValue(testimonial.quote, lang) || '';
  const clientTitle = getLocalizedValue(testimonial.clientTitle, lang);
  const imageUrl = testimonial.clientPhoto
    ? getThumbnailUrl(testimonial.clientPhoto, 120, 120, 85)
    : null;

  return (
    <div className="bg-white p-6 md:p-8 shadow-md h-full flex flex-col">
      {/* Quote icon */}
      <Quote className="w-8 h-8 text-tea-green/40 mb-4 flex-shrink-0" />

      {/* Quote text */}
      <p className="text-paynes-gray/80 text-lg leading-relaxed flex-grow mb-6 italic">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Client info */}
      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-beige/50">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={testimonial.clientName}
            className="w-12 h-12 rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-tea-green/20 flex items-center justify-center">
            <span className="text-paynes-gray font-heading text-lg">
              {testimonial.clientName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        <div className="flex-1">
          <h4 className="font-heading font-medium text-paynes-gray">
            {testimonial.clientName}
          </h4>
          {clientTitle && (
            <p className="text-sm text-paynes-gray/60">{clientTitle}</p>
          )}
        </div>

        {testimonial.rating && (
          <StarRating rating={testimonial.rating} />
        )}
      </div>
    </div>
  );
}

// Media testimonial item with lazy loading for videos
function MediaTestimonialItem({
  testimonial,
  onClick,
}: {
  testimonial: Testimonial;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const isVideo = testimonial.mediaType === 'video';
  const hasAudio = testimonial.enableAudio === true;

  // Lazy load video using Intersection Observer
  const { ref: lazyRef, inView: isInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: '100px', // Start loading slightly before visible
  });

  // Get image URL
  const imageUrl = testimonial.mediaImage
    ? getHeroImageUrl(testimonial.mediaImage, 800, 85)
    : null;

  // Get poster URL for video
  const posterUrl = testimonial.videoPoster
    ? getHeroImageUrl(testimonial.videoPoster, 800, 85)
    : undefined;

  // Handle video visibility changes for autoplay/pause
  useEffect(() => {
    if (!isVideo || !videoRef.current) return;

    if (isInView && isVideoLoaded) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked by browser
      });
    } else if (!isInView && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isInView, isVideo, isVideoLoaded]);

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current && hasAudio) {
      setIsMuted(!isMuted);
      videoRef.current.muted = !isMuted;
    }
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (isVideo && testimonial.mediaVideoUrl) {
    return (
      <div
        ref={(node) => {
          // Combine refs
          lazyRef(node);
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className="relative h-[400px] md:h-[500px] lg:h-[600px] w-[250px] md:w-[320px] lg:w-[380px] flex-shrink-0 group/item bg-beige/30"
      >
        {/* Show poster/placeholder until video is loaded or in view */}
        {(!isInView || !isVideoLoaded) && posterUrl && (
          <div className="absolute inset-0">
            <img
              src={posterUrl}
              alt={`Video thumbnail - ${testimonial.clientName}`}
              className="h-full w-full object-cover"
            />
            {/* Loading indicator */}
            {isInView && !isVideoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}
          </div>
        )}

        {/* Only render video when in view (lazy load) */}
        {isInView && (
          <video
            ref={videoRef}
            src={testimonial.mediaVideoUrl}
            poster={posterUrl}
            className={`h-full w-full object-cover cursor-pointer transition-opacity duration-300 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            onLoadedData={() => setIsVideoLoaded(true)}
            onClick={handleVideoClick}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        )}

        {/* Video controls overlay */}
        <div className="absolute bottom-4 left-4 flex gap-2 z-10">
          {/* Play/Pause button */}
          <button
            onClick={handlePlayClick}
            className="p-2 bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors rounded-full"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>
          {/* Mute button - only show if audio is enabled */}
          {hasAudio && (
            <button
              onClick={handleVideoClick}
              className="p-2 bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors rounded-full"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          )}
        </div>
        {/* Client name overlay */}
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded">
          <span className="text-white text-sm font-heading">{testimonial.clientName}</span>
        </div>
      </div>
    );
  }

  // Image testimonial with lazy loading
  if (imageUrl) {
    return (
      <div
        ref={lazyRef}
        className="relative h-[400px] md:h-[500px] lg:h-[600px] w-[250px] md:w-[320px] lg:w-[380px] flex-shrink-0 cursor-pointer group/item overflow-hidden"
        onClick={onClick}
      >
        {isInView ? (
          <img
            src={imageUrl}
            alt={testimonial.mediaImage?.alt || `Testimonial from ${testimonial.clientName}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover/item:scale-105"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="h-full w-full bg-beige/50 animate-pulse" />
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-paynes-gray/0 group-hover/item:bg-paynes-gray/20 transition-colors duration-300" />
        {/* Client name overlay */}
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded opacity-0 group-hover/item:opacity-100 transition-opacity">
          <span className="text-white text-sm font-heading">{testimonial.clientName}</span>
        </div>
      </div>
    );
  }

  return null;
}

export function TestimonialsSection({
  testimonials,
  lang,
  title,
  subtitle,
}: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedImage, setSelectedImage] = useState<Testimonial | null>(null);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const carouselRef = useRef<HTMLDivElement>(null);

  // Separate testimonials into card-based and media-based
  const cardTestimonials = testimonials.filter((t) => !t.isMediaTestimonial);
  const mediaTestimonials = testimonials.filter((t) => t.isMediaTestimonial);

  const totalCardSlides = cardTestimonials.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalCardSlides);
  }, [totalCardSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalCardSlides) % totalCardSlides);
  }, [totalCardSlides]);

  // Autoplay for card testimonials
  useEffect(() => {
    if (!isAutoPlaying || totalCardSlides <= 1) return;

    const interval = window.setInterval(nextSlide, 5000);
    return () => window.clearInterval(interval);
  }, [isAutoPlaying, nextSlide, totalCardSlides]);

  // Scroll the media carousel
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.6;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Get full-size URL for lightbox
  const getLightboxUrl = (testimonial: Testimonial) => {
    if (!testimonial.mediaImage) return '';
    return getHeroImageUrl(testimonial.mediaImage, 1600, 90);
  };

  if (testimonials.length === 0) return null;

  return (
    <section ref={ref} className="py-16 md:py-24 bg-beige/30 overflow-hidden">
      <motion.div
        className="container mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        {(title || subtitle) && (
          <motion.div variants={itemVariants} className="text-center mb-12">
            {title && (
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-paynes-gray mb-2 leading-[0.75]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="font-heading text-lg text-paynes-gray/70 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* Media Testimonials Carousel */}
        {mediaTestimonials.length > 0 && (
          <motion.div variants={itemVariants} className="mb-12">
            <div className="relative group">
              {/* Navigation Arrows */}
              <button
                onClick={() => scrollCarousel('left')}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 bg-white/80 backdrop-blur-sm shadow-lg text-paynes-gray hover:bg-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 bg-white/80 backdrop-blur-sm shadow-lg text-paynes-gray hover:bg-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Scrollable Container */}
              <div
                ref={carouselRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-8 py-4 scroll-smooth snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {mediaTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial._id}
                    className="flex-shrink-0 snap-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.5) }}
                  >
                    <MediaTestimonialItem
                      testimonial={testimonial}
                      onClick={() => setSelectedImage(testimonial)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Card Testimonials */}
        {cardTestimonials.length > 0 && (
          <motion.div variants={itemVariants}>
            {/* Mobile: Single card carousel */}
            <div
              className="md:hidden relative"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  {cardTestimonials[currentIndex] && (
                    <TestimonialCard
                      testimonial={cardTestimonials[currentIndex]}
                      lang={lang}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation dots */}
              {totalCardSlides > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {cardTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-paynes-gray w-6'
                          : 'bg-paynes-gray/30 hover:bg-paynes-gray/50'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Desktop: Grid layout */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cardTestimonials.slice(0, 3).map((testimonial) => (
                <TestimonialCard
                  key={testimonial._id}
                  testimonial={testimonial}
                  lang={lang}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Navigation arrows for mobile card carousel */}
        {cardTestimonials.length > 1 && (
          <div className="flex md:hidden justify-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white shadow-md text-paynes-gray hover:bg-tea-green/20 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white shadow-md text-paynes-gray hover:bg-tea-green/20 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </motion.div>

      {/* Lightbox for media images */}
      {selectedImage && selectedImage.mediaImage && selectedImage.mediaType !== 'video' && (
        <ImageLightbox
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          imageUrl={getLightboxUrl(selectedImage)}
          alt={selectedImage.mediaImage?.alt || `Testimonial from ${selectedImage.clientName}`}
          title={selectedImage.clientName}
        />
      )}
    </section>
  );
}
