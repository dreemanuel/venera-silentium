import { motion, type Variants, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '~/components/ui';
import { urlFor } from '~/lib/sanity';
import type { SanityImage, PortableTextBlock } from '~/lib/sanity';

interface AboutPreviewProps {
  photo?: SanityImage;
  name: string;
  title: string;
  story?: PortableTextBlock[];
  credentials?: string[];
  experience?: string;
  ctaText: string;
  ctaLink: string;
  lang: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

// Simple portable text renderer - just extracts plain text
function getPlainText(blocks?: PortableTextBlock[]): string {
  if (!blocks) return '';
  return blocks
    .filter((block) => block._type === 'block')
    .map((block) => block.children.map((child) => child.text).join(''))
    .join('\n\n');
}

export function AboutPreview({
  photo,
  name,
  title,
  story,
  credentials,
  experience,
  ctaText,
  ctaLink,
}: AboutPreviewProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const photoUrl = photo
    ? urlFor(photo).width(600).height(750).quality(85).auto('format').url()
    : null;

  const storyText = getPlainText(story);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-papaya-whip/30 overflow-hidden">
      <motion.div
        className="container mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo Column */}
          <motion.div variants={itemVariants} className="relative">
            {photoUrl ? (
              <div className="relative">
                {/* Decorative background shape */}
                <div className="absolute -inset-4 bg-tea-green/20 rounded-3xl -rotate-3" />
                <img
                  src={photoUrl}
                  alt={name}
                  className="relative w-full max-w-md mx-auto rounded-2xl shadow-xl object-cover aspect-[4/5]"
                  loading="lazy"
                />
              </div>
            ) : (
              /* Placeholder when no photo */
              <div className="relative">
                <div className="absolute -inset-4 bg-tea-green/20 rounded-3xl -rotate-3" />
                <div className="relative w-full max-w-md mx-auto rounded-2xl shadow-xl bg-beige/50 aspect-[4/5] flex items-center justify-center">
                  <div className="text-center text-paynes-gray/40">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-tea-green/30" />
                    <p className="font-heading text-sm">Photo Coming Soon</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Content Column */}
          <div className="space-y-6">
            {/* Experience badge */}
            {experience && (
              <motion.div variants={itemVariants}>
                <span className="inline-block px-4 py-1.5 bg-tea-green/40 text-paynes-gray rounded-full text-sm font-heading tracking-wide">
                  {experience}
                </span>
              </motion.div>
            )}

            {/* Name */}
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl text-paynes-gray"
            >
              {name}
            </motion.h2>

            {/* Title */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-paynes-gray/70 font-heading"
            >
              {title}
            </motion.p>

            {/* Story excerpt */}
            {storyText && (
              <motion.p
                variants={itemVariants}
                className="text-paynes-gray/60 leading-relaxed line-clamp-4"
              >
                {storyText}
              </motion.p>
            )}

            {/* Credentials */}
            {credentials && credentials.length > 0 && (
              <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-2">
                {credentials.map((credential, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-cornsilk border border-paynes-gray/10 text-paynes-gray/80 rounded-lg text-sm"
                  >
                    {credential}
                  </span>
                ))}
              </motion.div>
            )}

            {/* CTA */}
            <motion.div variants={itemVariants} className="pt-4">
              <Button variant="outline" as="link" to={ctaLink}>
                {ctaText}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
