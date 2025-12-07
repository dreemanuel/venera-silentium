import { motion, type Variants } from 'framer-motion';
import { Button } from '~/components/ui';
import { getResponsiveImageProps } from '~/lib/image';
import type { SanityImage } from '~/lib/sanity';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  quote?: string;
  image?: SanityImage;
  ctaText: string;
  ctaLink: string;
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
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

export function HeroSection({
  title,
  subtitle,
  quote,
  image,
  ctaText,
  ctaLink,
}: HeroSectionProps) {
  // Generate optimized image props for hero (priority loading)
  const imageProps = image
    ? getResponsiveImageProps(image, {
        alt: title,
        priority: true, // Hero images load with high priority
        sizes: '100vw',
        maxWidth: 1920,
        quality: 85,
      })
    : null;

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
      {/* Background Image with overlay */}
      {imageProps ? (
        <>
          {/* Use img element for LCP optimization */}
          <img
            {...imageProps}
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-paynes-gray/40 via-paynes-gray/30 to-paynes-gray/50" />
        </>
      ) : (
        /* Fallback decorative background */
        <div className="absolute inset-0 bg-cornsilk">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tea-green/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-beige/50 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-papaya-whip/40 rounded-full blur-3xl" />
        </div>
      )}

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-6 py-16 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className={`text-4xl xs:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight ${
            imageProps ? 'text-cornsilk' : 'text-paynes-gray'
          }`}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            variants={itemVariants}
            className={`font-heading text-lg md:text-xl lg:text-2xl mb-8 max-w-xl mx-auto ${
              imageProps ? 'text-cornsilk/90' : 'text-paynes-gray/80'
            }`}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Quote */}
        {quote && (
          <motion.blockquote
            variants={itemVariants}
            className={`italic text-base md:text-lg mb-12 max-w-md mx-auto ${
              imageProps ? 'text-cornsilk/80' : 'text-paynes-gray/60'
            }`}
          >
            &ldquo;{quote}&rdquo;
          </motion.blockquote>
        )}

        {/* CTA Button */}
        <motion.div variants={itemVariants}>
          <Button
            variant={imageProps ? 'secondary' : 'primary'}
            size="lg"
            as="link"
            to={ctaLink}
            className="shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {ctaText}
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className={`w-6 h-10 border-2 rounded-full flex justify-center pt-2 ${
              imageProps ? 'border-cornsilk/50' : 'border-paynes-gray/30'
            }`}
          >
            <motion.div
              className={`w-1.5 h-1.5 rounded-full ${
                imageProps ? 'bg-cornsilk/70' : 'bg-paynes-gray/50'
              }`}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
