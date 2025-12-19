import { motion, type Variants, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { urlFor } from '~/lib/sanity';
import type { SanityImage, PortableTextBlock } from '~/lib/sanity';

// Check for reduced motion preference
const prefersReducedMotion = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;

interface SilentiumPhilosophyProps {
  tagline: string;
  philosophy?: PortableTextBlock[];
  philosophyText?: string; // Fallback plain text from i18n
  image?: SanityImage;
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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

// Simple portable text renderer - just extracts plain text
function getPlainText(blocks?: PortableTextBlock[]): string {
  if (!blocks) return '';
  return blocks
    .filter((block) => block._type === 'block')
    .map((block) => block.children.map((child) => child.text).join(''))
    .join('\n\n');
}

export function SilentiumPhilosophy({
  tagline,
  philosophy,
  philosophyText,
  image,
}: SilentiumPhilosophyProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax: Image moves slower than scroll (creates depth effect)
  // Y offset: 0% at start -> 30% at end (image moves up slower than scroll)
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  // Subtle scale for additional depth (starts slightly zoomed, ends at normal)
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.1, 1.05]);

  const backgroundImageUrl = image
    ? urlFor(image).width(1920).quality(75).auto('format').url()
    : null;

  const displayText = getPlainText(philosophy) || philosophyText || '';

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background with Parallax */}
      {backgroundImageUrl ? (
        <>
          {/* Parallax image container - extra height to accommodate movement */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${backgroundImageUrl})`,
                // Apply parallax transforms (respects reduced motion)
                y: prefersReducedMotion ? 0 : y,
                scale: prefersReducedMotion ? 1 : scale,
                // Extend height to prevent gaps during parallax
                height: '130%',
                top: '-15%',
              }}
            />
          </div>
          <div className="absolute inset-0 bg-cornsilk/40" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-cornsilk via-papaya-whip/30 to-beige/40">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-tea-green/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-beige/40 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        </div>
      )}

      <motion.div
        className="relative z-10 container mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className="max-w-3xl mx-auto text-center">
          {/* Decorative line */}
          <motion.div
            variants={itemVariants}
            className="w-16 h-px bg-paynes-gray/30 mx-auto mb-8"
          />

          {/* Tagline */}
          <motion.h2
            variants={itemVariants}
            className="font-display text-5xl md:text-6xl lg:text-7xl text-paynes-gray mb-2 leading-[0.75]"
          >
            {tagline}
          </motion.h2>

          {/* Philosophy text */}
          {displayText && (
            <motion.div variants={itemVariants} className="space-y-6">
              {displayText.split('\n\n').map((paragraph, index) => (
                <p
                  key={index}
                  className="text-paynes-gray/70 text-lg md:text-xl leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>
          )}

          {/* Decorative quote marks */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex justify-center"
          >
            <div className="flex items-center gap-4">
              <span className="w-8 h-px bg-tea-green/50" />
              <span className="text-tea-green text-8xl font-display">&ldquo;</span>
              <span className="text-paynes-gray/50 text-sm font-heading tracking-widest uppercase">
                Woman Silentium
              </span>
              <span className="text-tea-green text-8xl font-display">&rdquo;</span>
              <span className="w-8 h-px bg-tea-green/50" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
