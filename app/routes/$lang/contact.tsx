import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router';
import type { Route } from './+types/contact';
import { motion, type Variants } from 'framer-motion';
import {
  sanityClient,
  siteSettingsQuery,
  type SiteSettings,
  type Language,
} from '~/lib/sanity';

export async function loader({ params }: Route.LoaderArgs) {
  const lang = (params.lang || 'en') as Language;

  let siteSettings: SiteSettings | null = null;
  try {
    siteSettings = await sanityClient.fetch<SiteSettings>(siteSettingsQuery);
  } catch {
    console.log('Sanity fetch failed');
  }

  return { siteSettings, lang };
}

export function meta({ params }: Route.MetaArgs) {
  const defaultMeta = {
    title: 'Contact | Silentium - Aesthetic Cosmetology',
    description:
      'Book a consultation with Dr. Venera Frolova. Contact Silentium for premium aesthetic cosmetology in Bali.',
  };

  const langMeta: Record<string, { title: string; description: string }> = {
    en: defaultMeta,
    ru: {
      title: 'Контакты | Silentium - Эстетическая косметология',
      description:
        'Запишитесь на консультацию к Др. Венере Фроловой. Свяжитесь с Silentium для премиум эстетической косметологии на Бали.',
    },
    id: {
      title: 'Kontak | Silentium - Kosmetologi Estetika',
      description:
        'Pesan konsultasi dengan Dr. Venera Frolova. Hubungi Silentium untuk kosmetologi estetika premium di Bali.',
    },
  };

  const lang = params.lang || 'en';
  const currentMeta = langMeta[lang] || defaultMeta;

  return [
    { title: currentMeta.title },
    { name: 'description', content: currentMeta.description },
    { property: 'og:title', content: currentMeta.title },
    { property: 'og:description', content: currentMeta.description },
  ];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function Contact() {
  const { t } = useTranslation();
  const { siteSettings } = useLoaderData<typeof loader>();

  return (
    <main className="min-h-screen bg-cornsilk">
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-tea-green/20">
        <motion.div
          className="container mx-auto px-6 text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl text-paynes-gray mb-4"
          >
            {t('nav.contact')}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-paynes-gray/70 font-heading text-lg md:text-xl max-w-2xl mx-auto"
          >
            {t('contact.ctaSubheading')}
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Info - Coming in Epic 4 */}
      <section className="py-20">
        <motion.div
          className="container mx-auto px-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="max-w-2xl mx-auto">
            <motion.div variants={itemVariants} className="glass p-8 text-center">
              <h2 className="text-2xl text-paynes-gray mb-4 font-heading">
                {t('common.comingSoon')}
              </h2>
              <p className="text-paynes-gray/60 mb-6">
                {t('common.location')}
              </p>

              {/* Contact details from Sanity */}
              <div className="space-y-3 text-paynes-gray/70">
                {siteSettings?.contactEmail && (
                  <p>
                    <a
                      href={`mailto:${siteSettings.contactEmail}`}
                      className="hover:text-paynes-gray transition-colors"
                    >
                      {siteSettings.contactEmail}
                    </a>
                  </p>
                )}
                {siteSettings?.contactPhone && (
                  <p>
                    <a
                      href={`tel:${siteSettings.contactPhone}`}
                      className="hover:text-paynes-gray transition-colors"
                    >
                      {siteSettings.contactPhone}
                    </a>
                  </p>
                )}
                {siteSettings?.whatsappNumber && (
                  <p>
                    <a
                      href={`https://wa.me/${siteSettings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-paynes-gray transition-colors"
                    >
                      WhatsApp: {siteSettings.whatsappNumber}
                    </a>
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
