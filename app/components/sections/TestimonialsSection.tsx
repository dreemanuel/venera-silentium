import { useState, useEffect, useCallback } from 'react';
import { motion, type Variants, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { getThumbnailUrl } from '~/lib/image';
import type { Testimonial, Language } from '~/lib/sanity';
import { getLocalizedValue } from '~/lib/sanity';

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
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md h-full flex flex-col">
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

export function TestimonialsSection({
  testimonials,
  lang,
  title,
  subtitle,
}: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const totalSlides = testimonials.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay
  useEffect(() => {
    if (!isAutoPlaying || totalSlides <= 1) return;

    const interval = window.setInterval(nextSlide, 5000);
    return () => window.clearInterval(interval);
  }, [isAutoPlaying, nextSlide, totalSlides]);

  if (testimonials.length === 0) return null;

  return (
    <section ref={ref} className="py-16 md:py-24 bg-beige/30">
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-paynes-gray mb-4">
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

        {/* Carousel for mobile, Grid for desktop */}
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
                {testimonials[currentIndex] && (
                  <TestimonialCard
                    testimonial={testimonials[currentIndex]}
                    lang={lang}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation dots */}
            {totalSlides > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
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
            {testimonials.slice(0, 3).map((testimonial) => (
              <TestimonialCard
                key={testimonial._id}
                testimonial={testimonial}
                lang={lang}
              />
            ))}
          </div>
        </motion.div>

        {/* Navigation arrows for mobile */}
        {totalSlides > 1 && (
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
    </section>
  );
}
