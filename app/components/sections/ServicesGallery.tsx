import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router';
import { Accordion, AccordionItem, Image } from '@heroui/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { getHeroImageUrl } from '~/lib/image';
import type { Service, Language, ServiceCategory, SanityImage } from '~/lib/sanity';
import { getLocalizedValue } from '~/lib/sanity';

interface ServicesGalleryProps {
  services: Service[];
  lang: Language;
  title?: string;
  subtitle?: string;
  showCategories?: boolean;
  limit?: number;
}

// Category display info
const categoryInfo: Record<ServiceCategory, { label: Record<Language, string>; order: number }> = {
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

// Image slideshow component for the selected service
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
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-beige to-tea-green/30 rounded-xl">
        <span className="text-6xl text-paynes-gray/20">✦</span>
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
      <div className="w-full h-full overflow-hidden rounded-xl">
        {imageUrl ? (
          <Image
            isZoomed
            src={imageUrl}
            alt={serviceName}
            classNames={{
              wrapper: 'w-full h-full !max-w-none',
              img: 'w-full h-full object-cover',
              zoomedWrapper: 'rounded-xl',
            }}
            radius="lg"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-beige to-tea-green/30">
            <span className="text-6xl text-paynes-gray/20">✦</span>
          </div>
        )}
      </div>

      {/* Navigation arrows - only show if multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-paynes-gray hover:bg-white hover:scale-110 transition-all duration-300 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-paynes-gray hover:bg-white hover:scale-110 transition-all duration-300 z-10"
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
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
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

// Skeleton placeholder for image area
function ImageSkeleton() {
  return (
    <div className="w-full h-full rounded-xl bg-gradient-to-br from-beige to-tea-green/30 animate-pulse flex items-center justify-center">
      <span className="text-6xl text-paynes-gray/10">✦</span>
    </div>
  );
}

export function ServicesGallery({
  services,
  lang,
  title,
  subtitle,
  showCategories = true,
  limit,
}: ServicesGalleryProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);

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

  // Sort categories by order
  const sortedCategories = Object.keys(servicesByCategory).sort((a, b) => {
    const orderA = categoryInfo[a as ServiceCategory]?.order || 99;
    const orderB = categoryInfo[b as ServiceCategory]?.order || 99;
    return orderA - orderB;
  }) as ServiceCategory[];

  // Get the currently active service (hovered takes priority over selected)
  const activeServiceId = hoveredServiceId || selectedServiceId || displayServices[0]?._id;
  const activeService = displayServices.find((s) => s._id === activeServiceId);

  // Get all images for the active service (main image + gallery)
  const getServiceImages = (service: Service | undefined): SanityImage[] => {
    if (!service) return [];
    const images: SanityImage[] = [];
    if (service.image) images.push(service.image);
    if (service.gallery) images.push(...service.gallery);
    return images;
  };

  const activeImages = getServiceImages(activeService);
  const activeServiceName = activeService ? getLocalizedValue(activeService.title, lang) || '' : '';

  // Handle accordion selection change
  const handleSelectionChange = (keys: 'all' | Set<React.Key>) => {
    if (keys === 'all') return;
    const selectedKey = Array.from(keys)[0];
    setSelectedServiceId(selectedKey ? String(selectedKey) : null);
  };

  return (
    <section ref={ref} className="py-16 md:py-24 bg-cornsilk">
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

        {/* Main Content - Accordion + Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col lg:flex-row gap-8"
        >
          {/* Left: Accordion List (1/3 width on desktop) */}
          <div className="w-full lg:w-1/3 order-2 lg:order-1">
            {showCategories ? (
              // Grouped by category
              <div className="space-y-6">
                {sortedCategories.map((category) => (
                  <div key={category}>
                    <h3 className="font-heading text-lg font-medium text-paynes-gray mb-4 px-2 text-left">
                      {categoryInfo[category]?.label[lang] || category}
                    </h3>
                    <Accordion
                      variant="light"
                      selectionMode="single"
                      selectedKeys={selectedServiceId ? new Set([selectedServiceId]) : new Set()}
                      onSelectionChange={handleSelectionChange}
                      className="px-0"
                      itemClasses={{
                        base: 'py-0',
                        title: 'font-heading text-lg text-paynes-gray text-left',
                        trigger: 'py-3 px-2 rounded-lg hover:bg-tea-green/10 transition-colors data-[open=true]:bg-tea-green/20 justify-start',
                        content: 'px-2 pb-4 text-left',
                        indicator: 'text-paynes-gray/50',
                        titleWrapper: 'text-left',
                      }}
                    >
                      {servicesByCategory[category].map((service) => {
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
                                <p className="text-sm text-paynes-gray/70 leading-relaxed">
                                  {shortDesc}
                                </p>
                              )}
                              <Link
                                to={`/${lang}/services/${service.slug.current}`}
                                className="inline-flex items-center gap-2 text-sm font-heading text-paynes-gray hover:text-tea-green transition-colors"
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
                  </div>
                ))}
              </div>
            ) : (
              // Flat list without categories
              <Accordion
                variant="light"
                selectionMode="single"
                selectedKeys={selectedServiceId ? new Set([selectedServiceId]) : new Set()}
                onSelectionChange={handleSelectionChange}
                className="px-0"
                itemClasses={{
                  base: 'py-0',
                  title: 'font-heading text-lg text-paynes-gray text-left',
                  trigger: 'py-3 px-2 rounded-lg hover:bg-tea-green/10 transition-colors data-[open=true]:bg-tea-green/20 justify-start',
                  content: 'px-2 pb-4 text-left',
                  indicator: 'text-paynes-gray/50',
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
                          <p className="text-sm text-paynes-gray/70 leading-relaxed">
                            {shortDesc}
                          </p>
                        )}
                        <Link
                          to={`/${lang}/services/${service.slug.current}`}
                          className="inline-flex items-center gap-2 text-sm font-heading text-paynes-gray hover:text-tea-green transition-colors"
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
            <div className="sticky top-24 aspect-[4/3] lg:aspect-[16/10] rounded-xl overflow-hidden bg-beige/30">
              {activeService ? (
                <ServiceImageSlideshow
                  key={activeService._id}
                  images={activeImages}
                  serviceName={activeServiceName}
                />
              ) : (
                <ImageSkeleton />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
