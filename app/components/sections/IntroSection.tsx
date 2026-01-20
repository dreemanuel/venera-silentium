import { motion, type Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface IntroSectionProps {
  quote: string;
  attribution: string;
  bodyParagraph1: string;
  bodyParagraph2: string;
  stats: {
    value: string;
    label: string;
  }[];
  pillarLeftTitle?: string;
  pillarRightTitle?: string;
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
};

export function IntroSection({
  quote,
  attribution,
  bodyParagraph1,
  bodyParagraph2,
  stats,
  pillarLeftTitle = 'Beauty',
  pillarRightTitle = 'Wellness',
}: IntroSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section className="min-h-screen bg-cornsilk flex flex-col">
      {/* Main Content */}
      <motion.div
        ref={ref}
        className="flex-1 flex flex-col items-center justify-center px-6 py-16 md:py-20"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Main Quote */}
        <motion.div
          className="text-center max-w-4xl mb-12 md:mb-16"
          variants={itemVariants}
        >
          <blockquote className="font-body text-2xl md:text-3xl lg:text-4xl italic text-deep-slate leading-relaxed mb-6">
            "{quote}"
          </blockquote>
          <p className="font-heading text-xs md:text-sm uppercase tracking-[0.2em] text-golden-bronze">
            {attribution}
          </p>
        </motion.div>

        {/* Two Pillars */}
        <motion.div
          className="flex gap-16 md:gap-24 mb-12 md:mb-16"
          variants={itemVariants}
        >
          {/* Beauty Pillar */}
          <div className="text-center">
            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 border-2 border-golden-bronze rounded-full flex items-center justify-center text-golden-bronze text-xl md:text-2xl transition-all duration-300 hover:bg-golden-bronze hover:text-cornsilk">
              ✦
            </div>
            <h3 className="font-heading text-xs md:text-sm uppercase tracking-[0.15em] text-deep-slate">
              {pillarLeftTitle}
            </h3>
          </div>

          {/* Wellness Pillar */}
          <div className="text-center">
            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 border-2 border-golden-bronze rounded-full flex items-center justify-center text-golden-bronze text-xl md:text-2xl transition-all duration-300 hover:bg-golden-bronze hover:text-cornsilk">
              ◯
            </div>
            <h3 className="font-heading text-xs md:text-sm uppercase tracking-[0.15em] text-deep-slate">
              {pillarRightTitle}
            </h3>
          </div>
        </motion.div>

        {/* Body Text */}
        <motion.div
          className="text-center max-w-2xl"
          variants={itemVariants}
        >
          <p className="font-body text-lg md:text-xl text-deep-slate/85 leading-relaxed mb-6">
            {bodyParagraph1}
          </p>
          <p className="font-body text-lg md:text-xl text-deep-slate/85 leading-relaxed">
            {bodyParagraph2}
          </p>
        </motion.div>
      </motion.div>

      {/* Stats Bar - Full Width */}
      <motion.div
        className="w-full bg-deep-slate py-10 md:py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="flex flex-wrap justify-center gap-8 md:gap-0">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center px-6 md:px-12 ${
                index < stats.length - 1
                  ? 'md:border-r md:border-cornsilk/20'
                  : ''
              }`}
            >
              <div className="font-heading text-3xl md:text-4xl font-semibold text-golden-bronze mb-1">
                {stat.value}
              </div>
              <div className="font-heading text-[0.65rem] md:text-xs uppercase tracking-[0.15em] text-cornsilk/80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
