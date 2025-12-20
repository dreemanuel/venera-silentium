import { useRef, useState, useEffect } from 'react';
import { motion, type Variants, useInView } from 'framer-motion';
import { useFetcher } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { quickLeadSchema, type QuickLeadData } from '~/lib/schemas';
import { Button } from '~/components/ui';
import { Input } from '~/components/ui/Input';

interface ContactCTAProps {
  heading: string;
  subheading: string;
  bookButtonText: string;
  whatsappButtonText: string;
  bookLink: string;
  whatsappNumber?: string;
  lang: string;
  /** If true, shows the quick lead form instead of buttons */
  showForm?: boolean;
  /** Optional background image URL */
  backgroundImageUrl?: string;
  /** Overlay opacity (0-100) */
  overlayOpacity?: number;
}

interface ActionResponse {
  success?: boolean;
  error?: string;
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
  lang,
  showForm = false,
  backgroundImageUrl,
  overlayOpacity = 50,
}: ContactCTAProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useTranslation();
  const fetcher = useFetcher<ActionResponse>();
  const [formKey, setFormKey] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const prevSuccessRef = useRef<boolean | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuickLeadData>({
    resolver: zodResolver(quickLeadSchema),
  });

  const isSubmitting = fetcher.state === 'submitting';
  const isSuccess = fetcher.data?.success === true;
  const serverError = fetcher.data?.error;

  // Handle success state changes via effect (with previous value tracking)
  // Using setTimeout(0) to schedule state updates asynchronously
  useEffect(() => {
    // Only trigger on transition from false/undefined to true
    if (isSuccess && prevSuccessRef.current !== true) {
      const timeoutId = window.setTimeout(() => {
        setShowSuccess(true);
        setFormKey((k) => k + 1);
      }, 0);
      prevSuccessRef.current = isSuccess;
      return () => window.clearTimeout(timeoutId);
    }
    prevSuccessRef.current = isSuccess;
  }, [isSuccess]);

  const onSubmit = (data: QuickLeadData) => {
    setShowSuccess(false); // Clear previous success on new submission
    fetcher.submit(
      { ...data, language: lang, source: 'cta_form' },
      { method: 'post', action: `/${lang}/api/contact` }
    );
  };

  // Format WhatsApp link
  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`
    : '#';

  // Determine if we have a background image
  const hasBackgroundImage = !!backgroundImageUrl;

  return (
    <section
      ref={ref}
      className={`py-20 md:py-24 relative overflow-hidden ${!hasBackgroundImage ? 'bg-tea-green/30' : ''}`}
    >
      {/* Background Image with Overlay */}
      {hasBackgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          />
          <div
            className="absolute inset-0 bg-paynes-gray"
            style={{ opacity: overlayOpacity / 100 }}
          />
        </>
      )}

      <motion.div
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            variants={itemVariants}
            className={`font-display text-4xl md:text-5xl lg:text-6xl mb-2 leading-[0.75] ${
              hasBackgroundImage ? 'text-cornsilk' : 'text-paynes-gray'
            }`}
          >
            {heading}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className={`mb-24 font-heading ${
              hasBackgroundImage ? 'text-cornsilk/80' : 'text-paynes-gray/70'
            }`}
          >
            {subheading}
          </motion.p>

          {showForm ? (
            <>
              {/* Success Message */}
              {showSuccess && (
                <motion.div
                  variants={itemVariants}
                  className="mb-6 p-4 bg-tea-green/50 rounded-lg flex items-center gap-3 text-left"
                >
                  <CheckCircle className="w-5 h-5 text-paynes-gray flex-shrink-0" />
                  <div>
                    <p className="text-paynes-gray font-heading text-sm">
                      {t('form.success')}
                    </p>
                    {whatsappNumber && (
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-paynes-gray/70 text-sm underline hover:text-paynes-gray flex items-center gap-1 mt-1"
                      >
                        <MessageCircle className="w-4 h-4" />
                        {t('form.whatsappFollowUp')}
                      </a>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {serverError && (
                <motion.div
                  variants={itemVariants}
                  className="mb-6 p-4 bg-red-100 rounded-lg flex items-center gap-3 text-left"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-red-600 font-heading text-sm">{serverError}</p>
                </motion.div>
              )}

              {/* Quick Lead Form */}
              <motion.form
                key={formKey}
                variants={itemVariants}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Two column layout for name and email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="text-left">
                    <Input
                      id="cta-name"
                      {...register('name')}
                      hasError={!!errors.name}
                      placeholder={t('form.namePlaceholder')}
                      aria-label={t('form.name')}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="text-left">
                    <Input
                      id="cta-email"
                      type="email"
                      {...register('email')}
                      hasError={!!errors.email}
                      placeholder={t('form.emailPlaceholder')}
                      aria-label={t('form.email')}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Two column layout for phone and instagram */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="text-left">
                    <Input
                      id="cta-phone"
                      type="tel"
                      {...register('phone')}
                      hasError={!!errors.phone}
                      placeholder={`${t('form.phonePlaceholder')} (${t('form.optional')})`}
                      aria-label={t('form.phone')}
                    />
                  </div>
                  <div className="text-left">
                    <Input
                      id="cta-instagram"
                      {...register('instagram')}
                      hasError={!!errors.instagram}
                      placeholder={`@instagram (${t('form.optional')})`}
                      aria-label="Instagram"
                    />
                  </div>
                </div>

                {/* Honeypot field */}
                <input
                  type="text"
                  {...register('website')}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <input type="hidden" {...register('language')} value={lang} />

                {/* Submit buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-24">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('form.sending') : bookButtonText}
                  </Button>

                  {whatsappNumber && (
                    <Button
                      variant="outline"
                      size="lg"
                      as="a"
                      href={whatsappLink}
                      target="_blank"
                      leftIcon={<MessageCircle className="w-5 h-5" />}
                    >
                      {whatsappButtonText}
                    </Button>
                  )}
                </div>
              </motion.form>
            </>
          ) : (
            /* Original button-only layout */
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
                  as="a"
                  href={whatsappLink}
                  target="_blank"
                  leftIcon={<MessageCircle className="w-5 h-5" />}
                >
                  {whatsappButtonText}
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
