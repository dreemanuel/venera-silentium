import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getHeroImageUrl } from '~/lib/image';
import type { GalleryImage, Language } from '~/lib/sanity';
import { getLocalizedValue } from '~/lib/sanity';
import { ImageLightbox } from '~/components/ui/ImageLightbox';

interface GallerySectionProps {
  images: GalleryImage[];
  lang: Language;
  title?: string;
  subtitle?: string;
}

function GallerySkeleton() {
  return (
    <div className="w-full aspect-[16/9] rounded-xl bg-gradient-to-br from-beige to-tea-green/30 animate-pulse" />
  );
}

export function GallerySection({
  images,
  lang,
  title,
  subtitle,
}: GallerySectionProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const totalSlides = images.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  if (images.length === 0) return null;

  const currentImage = images[currentIndex];
  const imageTitle = currentImage ? getLocalizedValue(currentImage.title, lang) : '';
  const imageUrl = currentImage?.image ? getHeroImageUrl(currentImage.image, 1400, 85) : null;

  // Get full-size URL for lightbox
  const getLightboxUrl = (image: GalleryImage) => {
    if (!image.image) return '';
    return getHeroImageUrl(image.image, 1600, 90);
  };

  return (
    <section ref={ref} className="py-12 md:py-16 bg-beige/20">
      <motion.div
        className="container mx-auto px-6"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-paynes-gray mb-4">
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

        {/* Carousel */}
        <div className="relative">
          {/* Main Image */}
          <div className="relative overflow-hidden rounded-xl">
            <AnimatePresence mode="wait">
              {imageUrl ? (
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="w-full aspect-[16/9] cursor-pointer"
                  onClick={() => currentImage && setSelectedImage(currentImage)}
                >
                  <img
                    src={imageUrl}
                    alt={currentImage?.image?.alt || imageTitle || 'Gallery image'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Caption overlay */}
                  {imageTitle && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-paynes-gray/70 to-transparent p-6">
                      <p className="text-cornsilk font-heading text-lg md:text-xl">
                        {imageTitle}
                      </p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <GallerySkeleton />
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-paynes-gray hover:bg-white hover:scale-110 transition-all duration-300"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-paynes-gray hover:bg-white hover:scale-110 transition-all duration-300"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </>
          )}

          {/* Dots indicator */}
          {totalSlides > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-paynes-gray w-6'
                      : 'bg-paynes-gray/30 hover:bg-paynes-gray/50'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
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
