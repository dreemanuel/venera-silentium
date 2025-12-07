import { motion, type Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router';
import { getThumbnailUrl } from '~/lib/image';
import type { Service, Language, ServiceCategory } from '~/lib/sanity';
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

function ServiceCard({ service, lang }: { service: Service; lang: Language }) {
  const title = getLocalizedValue(service.title, lang) || 'Untitled Service';
  const shortDescription = getLocalizedValue(service.shortDescription, lang);
  const imageUrl = service.image
    ? getThumbnailUrl(service.image, 400, 300, 80)
    : null;

  return (
    <motion.div variants={itemVariants} className="group">
      <Link
        to={`/${lang}/services/${service.slug.current}`}
        className="block relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-500"
      >
        {/* Image container */}
        <div className="relative h-48 md:h-56 overflow-hidden bg-beige">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              decoding="async"
              width={400}
              height={300}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-tea-green/30 to-beige">
              <span className="text-4xl text-paynes-gray/20">✦</span>
            </div>
          )}
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-paynes-gray/0 group-hover:bg-paynes-gray/40 transition-colors duration-500" />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-heading text-lg font-medium text-paynes-gray mb-2 group-hover:text-tea-green transition-colors duration-300">
            {title}
          </h3>
          {shortDescription && (
            <p className="text-sm text-paynes-gray/70 line-clamp-2 leading-relaxed">
              {shortDescription}
            </p>
          )}

          {/* View more indicator */}
          <div className="mt-4 flex items-center text-sm font-heading text-paynes-gray/50 group-hover:text-paynes-gray transition-colors duration-300">
            <span className="mr-2">Learn More</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function CategorySection({
  category,
  services,
  lang,
}: {
  category: ServiceCategory;
  services: Service[];
  lang: Language;
}) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const categoryLabel = categoryInfo[category]?.label[lang] || category;

  return (
    <div ref={ref} className="mb-16 last:mb-0">
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="font-heading text-xl md:text-2xl text-paynes-gray mb-8 pb-3 border-b border-tea-green/30"
      >
        {categoryLabel}
      </motion.h3>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} lang={lang} />
        ))}
      </motion.div>
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

        {/* Services Grid */}
        {showCategories ? (
          // Grouped by category
          sortedCategories.map((category) => (
            <CategorySection
              key={category}
              category={category}
              services={servicesByCategory[category]}
              lang={lang}
            />
          ))
        ) : (
          // Flat grid without categories
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {displayServices.map((service) => (
              <ServiceCard key={service._id} service={service} lang={lang} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
