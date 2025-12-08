import { motion, type Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getThumbnailUrl } from '~/lib/image';
import type { Brand, Language } from '~/lib/sanity';

interface BrandsSectionProps {
  brands: Brand[];
  lang?: Language;
  title?: string;
  subtitle?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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

function BrandLogo({ brand }: { brand: Brand }) {
  const logoUrl = brand.logo ? getThumbnailUrl(brand.logo, 200, 100, 90) : null;

  const LogoImage = logoUrl ? (
    <img
      src={logoUrl}
      alt={brand.logo?.alt || brand.name}
      className="max-w-[120px] max-h-[60px] object-contain filter grayscale opacity-60
                 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
      loading="lazy"
      decoding="async"
    />
  ) : (
    <span className="text-paynes-gray/40 font-heading text-lg group-hover:text-paynes-gray transition-colors">
      {brand.name}
    </span>
  );

  if (brand.website) {
    return (
      <a
        href={brand.website}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center p-4 min-h-[100px]"
        aria-label={`Visit ${brand.name} website`}
      >
        {LogoImage}
      </a>
    );
  }

  return (
    <div className="group flex items-center justify-center p-4 min-h-[100px]">
      {LogoImage}
    </div>
  );
}

export function BrandsSection({
  brands,
  lang: _lang,
  title,
  subtitle,
}: BrandsSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  if (brands.length === 0) return null;

  // Duplicate brands for infinite scroll effect (only if we have enough)
  const displayBrands = brands.length >= 4 ? [...brands, ...brands] : brands;

  return (
    <section ref={ref} className="py-16 md:py-24 bg-papaya-whip/30 overflow-hidden">
      <motion.div
        className="container mx-auto px-6"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        {(title || subtitle) && (
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
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

        {/* Brands logos - infinite scroll animation */}
        <motion.div variants={containerVariants} className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-papaya-whip/30 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-papaya-whip/30 to-transparent z-10 pointer-events-none" />

          {/* Scrolling container */}
          <div className="overflow-hidden">
            {brands.length >= 4 ? (
              // Infinite scroll animation for 4+ brands
              <motion.div
                className="flex items-center gap-8 md:gap-12"
                animate={{
                  x: ['0%', '-50%'],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 20,
                    ease: 'linear',
                  },
                }}
              >
                {displayBrands.map((brand, index) => (
                  <motion.div
                    key={`${brand._id}-${index}`}
                    variants={itemVariants}
                    className="flex-shrink-0"
                  >
                    <BrandLogo brand={brand} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // Static grid for fewer brands
              <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
                {brands.map((brand) => (
                  <motion.div key={brand._id} variants={itemVariants}>
                    <BrandLogo brand={brand} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
