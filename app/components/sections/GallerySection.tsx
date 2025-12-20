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
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<number | null>(null);
  const isHoveredRef = useRef(false);

  // Keep ref in sync with state for use in interval callback
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  // Scroll the carousel (used by manual buttons)
  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.6;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

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

      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;

      if (isAtEnd) {
        // Loop back to start
        carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll right
        const scrollAmount = clientWidth * 0.6;
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
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

  return (
    <section ref={ref} className="py-12 md:py-16 bg-beige/20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-8 px-6">
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
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 bg-white/80 backdrop-blur-sm shadow-lg text-paynes-gray hover:bg-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 bg-white/80 backdrop-blur-sm shadow-lg text-paynes-gray hover:bg-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
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
            {images.map((image, index) => {
              const imageUrl = image.image ? getHeroImageUrl(image.image, 800, 85) : null;
              const imageTitle = getLocalizedValue(image.title, lang);

              if (!imageUrl) return null;

              return (
                <motion.div
                  key={image._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-shrink-0 cursor-pointer group/item"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={image.image?.alt || imageTitle || 'Gallery image'}
                      className="h-full w-auto object-contain transition-transform duration-500 group-hover/item:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-paynes-gray/0 group-hover/item:bg-paynes-gray/20 transition-colors duration-300" />
                  </div>
                  {/* Caption */}
                  {imageTitle && (
                    <p className="mt-2 text-sm text-paynes-gray/70 font-heading text-center max-w-[250px]">
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
