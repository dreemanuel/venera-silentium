import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router';
import { Accordion, AccordionItem, Image } from '@heroui/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { getHeroImageUrl } from '~/lib/image';
import type { Service, Language, ServiceCategory, ServiceCategoryDoc, SanityImage } from '~/lib/sanity';
import { getLocalizedValue } from '~/lib/sanity';

interface ServicesGalleryProps {
  services: Service[];
  categories?: ServiceCategoryDoc[];
  lang: Language;
  title?: string;
  subtitle?: string;
  showCategories?: boolean;
  limit?: number;
  titleLink?: string;
}

// Fallback category display info (used when CMS categories not available)
const fallbackCategoryInfo: Record<ServiceCategory, { label: Record<Language, string>; order: number }> = {
  'anti-aging-injectables': {
    label: { en: 'Anti-Aging Injectables', ru: 'Инъекции против старения', id: 'Suntikan Anti-Penuaan' },
    order: 1,
  },
  'skin-rejuvenation': {
    label: { en: 'Skin Rejuvenation', ru: 'Омоложение кожи', id: 'Peremajaan Kulit' },
    order: 2,
  },
  'problem-specific': {
    label: { en: 'Problem-Specific Treatments', ru: 'Лечение проблем кожи', id: 'Perawatan Khusus' },
    order: 3,
  },
  specialized: {
    label: { en: 'Specialized Treatments', ru: 'Специализированные процедуры', id: 'Perawatan Khusus' },
    order: 4,
  },
  preparatory: {
    label: { en: 'Preparatory Procedures', ru: 'Подготовительные процедуры', id: 'Prosedur Persiapan' },
    order: 5,
  },
  consultation: {
    label: { en: 'Consultation', ru: 'Консультация', id: 'Konsultasi' },
    order: 6,
  },
};

// Image slideshow component
function ServiceImageSlideshow({
  images,
  serviceName,
}: {
  images: SanityImage[];
  serviceName: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Ensure currentIndex is valid for current images array
  // Use modulo to handle when images array changes
  const safeIndex = images.length > 0 ? currentIndex % images.length : 0;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-advance slides every 4 seconds
  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return;

    const interval = window.setInterval(nextSlide, 4000);
    return () => window.clearInterval(interval);
  }, [isAutoPlaying, nextSlide, images.length]);

  if (images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sand to-tea-green/30">
        <span className="text-6xl text-deep-slate/20">✦</span>
      </div>
    );
  }

  const currentImage = images[safeIndex];
  const imageUrl = currentImage ? getHeroImageUrl(currentImage, 1200, 85) : null;

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Main Image with zoom effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={safeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full overflow-hidden"
        >
          {imageUrl ? (
            <Image
              isZoomed
              src={imageUrl}
              alt={serviceName}
              classNames={{
                wrapper: 'w-full h-full !max-w-none',
                img: 'w-full h-full object-cover',
                zoomedWrapper: '',
              }}
              radius="none"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sand to-tea-green/30">
              <span className="text-6xl text-deep-slate/20">✦</span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows - only show if multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm shadow-lg text-deep-slate hover:bg-white hover:scale-110 transition-all duration-300 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm shadow-lg text-deep-slate hover:bg-white hover:scale-110 transition-all duration-300 z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 transition-all duration-300 ${
                  index === safeIndex
                    ? 'bg-white w-6'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Service overlay component
function ServiceOverlay({
  service,
  lang,
  onClose,
}: {
  service: Service;
  lang: Language;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const title = getLocalizedValue(service.title, lang) || service.title?.en || 'Untitled';
  const description = getLocalizedValue(service.shortDescription, lang);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target as HTMLElement)) {
        onClose();
      }
    };
    // Delay to prevent immediate close on the click that opened it
    const timer = window.setTimeout(() => {
      window.addEventListener('click', handleClickOutside);
    }, 100);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  return (
    <motion.div
      ref={overlayRef}
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute bottom-0 left-0 right-0 z-20 flex flex-col"
      style={{ height: '40%' }}
    >
      {/* Heading container - deep slate bg */}
      <div className="bg-deep-slate px-6 py-4">
        <h3
          className="text-3xl md:text-4xl lg:text-5xl text-right"
          style={{ color: '#BA9D26', fontFamily: 'Gilmoray, sans-serif' }}
        >
          {title}
        </h3>
      </div>

      {/* Description container - glassmorphism */}
      <div className="glass-overlay flex-1 px-6 py-5 flex flex-col justify-between overflow-hidden">
        {description && (
          <p className="font-body text-deep-slate text-right text-lg md:text-xl lg:text-2xl leading-relaxed line-clamp-4">
            {description}
          </p>
        )}
        <div className="flex justify-end mt-4 shrink-0">
          <Link
            to={`/${lang}/services/${service.slug.current}`}
            className="inline-flex items-center gap-2 px-5 py-3 bg-sand hover:bg-golden-bronze text-deep-slate font-heading text-base md:text-lg transition-colors"
          >
            <span>
              {lang === 'ru' ? 'Подробнее' : lang === 'id' ? 'Selengkapnya' : 'Learn More'}
            </span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// Skeleton placeholder for image area
function ImageSkeleton() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-sand to-tea-green/30 animate-pulse flex items-center justify-center">
      <span className="text-6xl text-deep-slate/10">✦</span>
    </div>
  );
}

export function ServicesGallery({
  services,
  categories = [],
  lang,
  title,
  subtitle,
  showCategories = true,
  limit,
  titleLink,
}: ServicesGalleryProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  // State for category-first interaction (when showCategories=true)
  const [expandedCategoryKey, setExpandedCategoryKey] = useState<string | null>(null);
  // State for flat list accordion (when showCategories=false)
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  // Shared state
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);
  const [overlayServiceId, setOverlayServiceId] = useState<string | null>(null);

  // Apply limit if specified
  const displayServices = limit ? services.slice(0, limit) : services;

  // Group services by category
  const servicesByCategory = displayServices.reduce(
    (acc, service) => {
      const category = service.category || 'specialized';
      if (!acc[category]) acc[category] = [];
      acc[category].push(service);
      return acc;
    },
    {} as Record<ServiceCategory, Service[]>
  );

  // Get sorted categories - use CMS categories if available, otherwise fallback
  const sortedCategoryKeys = categories.length > 0
    ? categories
        .filter((cat) => servicesByCategory[cat.key])
        .map((cat) => cat.key)
    : (Object.keys(servicesByCategory) as ServiceCategory[]).sort((a, b) => {
        const orderA = fallbackCategoryInfo[a]?.order || 99;
        const orderB = fallbackCategoryInfo[b]?.order || 99;
        return orderA - orderB;
      });

  // Get category info (title, description) from CMS or fallback
  const getCategoryInfo = (key: ServiceCategory) => {
    const cmsCategory = categories.find((c) => c.key === key);
    if (cmsCategory) {
      return {
        title: getLocalizedValue(cmsCategory.title, lang) || key,
        description: getLocalizedValue(cmsCategory.description, lang),
      };
    }
    return {
      title: fallbackCategoryInfo[key]?.label[lang] || key,
      description: undefined,
    };
  };

  // Determine which images to show in slideshow
  const getSlideshowImages = (): { images: SanityImage[]; name: string } => {
    // If a specific service is hovered, show all its images
    if (hoveredServiceId) {
      const hoveredService = displayServices.find((s) => s._id === hoveredServiceId);
      if (hoveredService) {
        const images: SanityImage[] = [];
        if (hoveredService.image) images.push(hoveredService.image);
        if (hoveredService.gallery) images.push(...hoveredService.gallery);
        return {
          images,
          name: getLocalizedValue(hoveredService.title, lang) || '',
        };
      }
    }

    // For flat list mode (showCategories=false), show selected service images
    if (!showCategories && selectedServiceId) {
      const selectedService = displayServices.find((s) => s._id === selectedServiceId);
      if (selectedService) {
        const images: SanityImage[] = [];
        if (selectedService.image) images.push(selectedService.image);
        if (selectedService.gallery) images.push(...selectedService.gallery);
        return {
          images,
          name: getLocalizedValue(selectedService.title, lang) || '',
        };
      }
    }

    // If a category is expanded (showCategories=true), show main images from all services in that category
    if (showCategories && expandedCategoryKey && servicesByCategory[expandedCategoryKey as ServiceCategory]) {
      const categoryServices = servicesByCategory[expandedCategoryKey as ServiceCategory];
      const images = categoryServices
        .filter((s) => s.image)
        .map((s) => s.image!);
      return {
        images,
        name: getCategoryInfo(expandedCategoryKey as ServiceCategory).title,
      };
    }

    // Default: show first service's main image or nothing
    const firstService = displayServices[0];
    if (firstService && firstService.image) {
      return {
        images: [firstService.image],
        name: getLocalizedValue(firstService.title, lang) || '',
      };
    }

    return { images: [], name: '' };
  };

  const { images: slideshowImages, name: slideshowName } = getSlideshowImages();

  // Get the service for overlay
  const overlayService = overlayServiceId
    ? displayServices.find((s) => s._id === overlayServiceId)
    : null;

  // Handle category accordion selection change
  const handleCategoryAccordionChange = (keys: 'all' | Set<React.Key>) => {
    if (keys === 'all') return;
    const selectedKey = Array.from(keys)[0];
    setExpandedCategoryKey(selectedKey ? String(selectedKey) : null);
    // Clear overlay when category changes
    setOverlayServiceId(null);
  };

  // Handle flat list accordion selection change
  const handleFlatAccordionChange = (keys: 'all' | Set<React.Key>) => {
    if (keys === 'all') return;
    const selectedKey = Array.from(keys)[0];
    setSelectedServiceId(selectedKey ? String(selectedKey) : null);
  };

  // Handle service click (for category mode)
  const handleServiceClick = (serviceId: string) => {
    setOverlayServiceId((prev) => (prev === serviceId ? null : serviceId));
  };

  return (
    <section ref={ref} className="py-16 md:py-24 bg-vanilla-custard">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            {title && (
              titleLink ? (
                <Link
                  to={titleLink}
                  className="group inline-block"
                >
                  <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-deep-slate mb-2 leading-[0.75] group-hover:text-golden-bronze transition-colors">
                    {title}
                  </h2>
                </Link>
              ) : (
                <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-deep-slate mb-2 leading-[0.75]">
                  {title}
                </h2>
              )
            )}
            {subtitle && (
              <p className="font-heading text-lg text-deep-slate/70 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* Main Content - Accordion + Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col lg:flex-row lg:items-stretch gap-8"
        >
          {/* Left: Accordion (1/3 width on desktop) */}
          <div className="w-full lg:w-1/3 order-2 lg:order-1">
            {showCategories ? (
              /* Category-first accordion for services page */
              <Accordion
                variant="light"
                selectionMode="single"
                selectedKeys={expandedCategoryKey ? new Set([expandedCategoryKey]) : new Set()}
                onSelectionChange={handleCategoryAccordionChange}
                className="px-0"
                itemClasses={{
                  base: 'py-0',
                  title: 'font-heading text-xl md:text-2xl text-left',
                  trigger: 'py-5 px-4 cursor-pointer hover:bg-golden-bronze/20 transition-colors data-[open=true]:bg-deep-slate data-[open=true]:text-vanilla-custard text-deep-slate justify-start',
                  content: 'px-4 pb-5 text-left bg-golden-bronze/10',
                  indicator: 'text-deep-slate/50 data-[open=true]:text-vanilla-custard data-[open=true]:-rotate-90 transition-transform duration-300 ease-in-out',
                  titleWrapper: 'text-left',
                }}
              >
                {sortedCategoryKeys.map((categoryKey) => {
                  const { title: categoryTitle, description: categoryDescription } = getCategoryInfo(categoryKey);
                  const categoryServices = servicesByCategory[categoryKey] || [];

                  return (
                    <AccordionItem
                      key={categoryKey}
                      aria-label={categoryTitle}
                      title={categoryTitle}
                    >
                      <div className="space-y-4">
                        {/* Category description */}
                        {categoryDescription && (
                          <p className="text-base md:text-lg text-deep-slate/70 leading-relaxed italic">
                            {categoryDescription}
                          </p>
                        )}

                        {/* Service list */}
                        <div className="space-y-1">
                          {categoryServices.map((service) => {
                            const serviceTitle = getLocalizedValue(service.title, lang) || 'Untitled';
                            const isActive = overlayServiceId === service._id;

                            return (
                              <button
                                key={service._id}
                                onClick={() => handleServiceClick(service._id)}
                                onMouseEnter={() => setHoveredServiceId(service._id)}
                                onMouseLeave={() => setHoveredServiceId(null)}
                                className={`w-full text-left px-4 py-3 font-heading text-base md:text-lg transition-all duration-200 ${
                                  isActive
                                    ? 'bg-deep-slate text-vanilla-custard'
                                    : 'hover:bg-sand/50 text-deep-slate'
                                }`}
                              >
                                {serviceTitle}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            ) : (
              /* Flat service accordion for home page */
              <Accordion
                variant="light"
                selectionMode="single"
                selectedKeys={selectedServiceId ? new Set([selectedServiceId]) : new Set()}
                onSelectionChange={handleFlatAccordionChange}
                className="px-0"
                itemClasses={{
                  base: 'py-0',
                  title: 'font-heading text-lg text-left',
                  trigger: 'py-3 px-2 cursor-pointer hover:bg-golden-bronze/20 transition-colors data-[open=true]:bg-deep-slate data-[open=true]:text-vanilla-custard text-deep-slate justify-start',
                  content: 'px-2 pb-4 text-left bg-golden-bronze/20',
                  indicator: 'text-deep-slate/50 data-[open=true]:text-vanilla-custard data-[open=true]:-rotate-90 transition-transform duration-300 ease-in-out',
                  titleWrapper: 'text-left',
                }}
              >
                {displayServices.map((service) => {
                  const serviceTitle = getLocalizedValue(service.title, lang) || 'Untitled';
                  const shortDesc = getLocalizedValue(service.shortDescription, lang);

                  return (
                    <AccordionItem
                      key={service._id}
                      aria-label={serviceTitle}
                      title={serviceTitle}
                      onMouseEnter={() => setHoveredServiceId(service._id)}
                      onMouseLeave={() => setHoveredServiceId(null)}
                    >
                      <div className="space-y-3">
                        {shortDesc && (
                          <p className="text-sm text-deep-slate/70 leading-relaxed">
                            {shortDesc}
                          </p>
                        )}
                        <Link
                          to={`/${lang}/services/${service.slug.current}`}
                          className="inline-flex items-center gap-2 text-sm font-heading text-deep-slate hover:text-golden-bronze transition-colors"
                        >
                          <span>
                            {lang === 'ru' ? 'Подробнее' : lang === 'id' ? 'Selengkapnya' : 'Learn More'}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            )}
          </div>

          {/* Right: Image Slideshow (2/3 width on desktop) */}
          <div className="w-full lg:w-2/3 order-1 lg:order-2">
            <div className="sticky top-24 w-full aspect-[4/3] lg:aspect-auto lg:h-[75vh] overflow-hidden bg-sand/30 relative">
              {slideshowImages.length > 0 ? (
                <ServiceImageSlideshow
                  key={hoveredServiceId || expandedCategoryKey || selectedServiceId || 'default'}
                  images={slideshowImages}
                  serviceName={slideshowName}
                />
              ) : (
                <ImageSkeleton />
              )}

              {/* Service Overlay (only in category mode) */}
              {showCategories && (
                <AnimatePresence>
                  {overlayService && (
                    <ServiceOverlay
                      service={overlayService}
                      lang={lang}
                      onClose={() => setOverlayServiceId(null)}
                    />
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
