import { motion, type Variants, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '~/components/ui';

interface ContactCTAProps {
  heading: string;
  subheading: string;
  bookButtonText: string;
  whatsappButtonText: string;
  bookLink: string;
  whatsappNumber?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export function ContactCTA({
  heading,
  subheading,
  bookButtonText,
  whatsappButtonText,
  bookLink,
  whatsappNumber,
}: ContactCTAProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Format WhatsApp link
  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`
    : '#';

  return (
    <section ref={ref} className="py-20 md:py-24 bg-tea-green/30">
      <motion.div
        className="container mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl lg:text-4xl text-paynes-gray mb-4"
          >
            {heading}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-paynes-gray/70 mb-8 font-heading"
          >
            {subheading}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="primary" size="lg" as="link" to={bookLink}>
              {bookButtonText}
            </Button>

            {whatsappNumber && (
              <Button
                variant="outline"
                size="lg"
                as="link"
                to={whatsappLink}
                leftIcon={<MessageCircle className="w-5 h-5" />}
              >
                {whatsappButtonText}
              </Button>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
