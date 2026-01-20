import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getHeroImageUrl } from '~/lib/image';
import type { GalleryImage, Language } from '~/lib/sanity';
import { getLocalizedValue } from '~/lib/sanity';
import { ImageLightbox } from '~/components/ui/ImageLightbox';

// Auto-scroll interval in milliseconds
const AUTO_SCROLL_INTERVAL = 4000; // 4 seconds

interface GallerySectionProps {
  images: GalleryImage[];
  lang: Language;
  title?: string;
  subtitle?: string;
}

export function GallerySection({
  images,
  lang,
  title,
  subtitle,
}: GallerySectionProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<number | null>(null);
  const isHoveredRef = useRef(false);
  const hasInitialized = useRef(false);

  // Triple the images for infinite loop effect
  const loopedImages = images.length > 1 ? [...images, ...images, ...images] : images;
  const singleSetWidth = useRef(0);

  // Keep ref in sync with state for use in interval callback
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  // Initialize scroll position to middle set and calculate single set width
  useEffect(() => {
    if (!carouselRef.current || images.length <= 1 || hasInitialized.current) return;

    // Wait for images to load and layout to complete
    const initializeScroll = () => {
      if (!carouselRef.current) return;
      const { scrollWidth } = carouselRef.current;
      singleSetWidth.current = scrollWidth / 3;
      // Start at the middle set
      carouselRef.current.scrollLeft = singleSetWidth.current;
      hasInitialized.current = true;
    };

    // Small delay to ensure layout is complete
    const timer = setTimeout(initializeScroll, 100);
    return () => clearTimeout(timer);
  }, [images.length]);

  // Handle infinite loop - jump when reaching boundaries
  useEffect(() => {
    if (images.length <= 1) return;

    const handleScroll = () => {
      if (!carouselRef.current || !singleSetWidth.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const maxScroll = scrollWidth - clientWidth;

      // If scrolled to the start (first set), jump to middle set
      if (scrollLeft < 50) {
        carouselRef.current.scrollLeft = singleSetWidth.current + scrollLeft;
      }
      // If scrolled to the end (third set), jump to middle set
      else if (scrollLeft > maxScroll - 50) {
        carouselRef.current.scrollLeft = singleSetWidth.current - (maxScroll - scrollLeft);
      }
    };

    const carousel = carouselRef.current;
    carousel?.addEventListener('scroll', handleScroll);
    return () => carousel?.removeEventListener('scroll', handleScroll);
  }, [images.length]);

  // Scroll the carousel (used by manual buttons)
  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.6;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Wheel scroll when hovering - convert vertical scroll to horizontal
  useEffect(() => {
    if (images.length <= 1) return;

    const handleWheel = (e: globalThis.WheelEvent) => {
      // Only handle wheel when hovering over the carousel
      if (!isHoveredRef.current || !carouselRef.current) return;

      // Hijack scroll and convert to horizontal
      e.preventDefault();
      carouselRef.current.scrollBy({
        left: e.deltaY * 2.5, // Multiply for faster horizontal scroll
        behavior: 'auto',
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [images.length]);

  // Auto-scroll effect - runs once when inView becomes true
  useEffect(() => {
    // Only start auto-scroll when section is in view and has multiple images
    if (!inView || images.length <= 1) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const doAutoScroll = () => {
      // Skip if hovered or no carousel ref
      if (isHoveredRef.current || !carouselRef.current) return;

      // Simply scroll right - infinite loop handling takes care of boundaries
      const scrollAmount = carouselRef.current.clientWidth * 0.4;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    autoScrollRef.current = window.setInterval(doAutoScroll, AUTO_SCROLL_INTERVAL);

    return () => {
      if (autoScrollRef.current) {
        window.clearInterval(autoScrollRef.current);
      }
    };
  }, [inView, images.length]);

  if (images.length === 0) return null;

  // Get full-size URL for lightbox
  const getLightboxUrl = (image: GalleryImage) => {
    if (!image.image) return '';
    return getHeroImageUrl(image.image, 1600, 90);
  };

  // Combine refs for section element
  const setSectionRefs = (el: HTMLElement | null) => {
    sectionRef.current = el;
    // Also set the inView ref
    if (typeof ref === 'function') {
      ref(el);
    }
  };

  return (
    <section ref={setSectionRefs} className="h-screen mt-16 md:mt-24 py-16 md:py-24 bg-vanilla-custard overflow-hidden flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-8 px-6">
            {title && (
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-deep-slate mb-2 leading-[0.75]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="font-heading text-lg text-deep-slate/70 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Horizontal Carousel */}
        <div
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 bg-white/80 backdrop-blur-sm shadow-lg text-deep-slate hover:bg-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 bg-white/80 backdrop-blur-sm shadow-lg text-deep-slate hover:bg-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide px-6 md:px-12 py-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {loopedImages.map((image, index) => {
              const imageUrl = image.image ? getHeroImageUrl(image.image, 800, 85) : null;
              const imageTitle = getLocalizedValue(image.title, lang);

              if (!imageUrl) return null;

              // Use modulo to get correct delay for repeated images
              const delayIndex = index % images.length;

              return (
                <motion.div
                  key={`${image._id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: delayIndex * 0.1 }}
                  className="flex-shrink-0 cursor-pointer group/item"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative h-[350px] md:h-[500px] lg:h-[600px] overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={image.image?.alt || imageTitle || 'Gallery image'}
                      className="h-full w-auto object-contain transition-transform duration-500 group-hover/item:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-deep-slate/0 group-hover/item:bg-deep-slate/20 transition-colors duration-300" />
                  </div>
                  {/* Caption */}
                  {imageTitle && (
                    <p className="mt-2 text-sm text-cornsilk font-heading text-center max-w-[250px]">
                      {imageTitle}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Lightbox */}
      {selectedImage && selectedImage.image && (
        <ImageLightbox
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          imageUrl={getLightboxUrl(selectedImage)}
          alt={selectedImage.image?.alt || ''}
          title={getLocalizedValue(selectedImage.title, lang)}
        />
      )}
    </section>
  );
}
