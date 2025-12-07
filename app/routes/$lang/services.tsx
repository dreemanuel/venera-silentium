import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router';
import { motion } from 'framer-motion';
import type { Route } from './+types/services';
import { ServicesGallery, ContactCTA } from '~/components/sections';
import { sanityClient } from '~/lib/sanity/client.server';
import {
  servicesQuery,
  type Service,
  type Language,
} from '~/lib/sanity';

export async function loader({ params }: Route.LoaderArgs) {
  const lang = (params.lang || 'en') as Language;

  // Fetch all services
  let services: Service[] = [];
  try {
    services = await sanityClient.fetch<Service[]>(servicesQuery);
  } catch {
    console.log('Failed to fetch services from Sanity');
  }

  return { services, lang };
}

export function meta({ params }: Route.MetaArgs) {
  const lang = params.lang || 'en';

  const titles: Record<string, string> = {
    en: 'Services | Silentium - Aesthetic Cosmetology in Bali',
    ru: 'Услуги | Silentium - Эстетическая косметология на Бали',
    id: 'Layanan | Silentium - Kosmetologi Estetika di Bali',
  };

  const descriptions: Record<string, string> = {
    en: 'Discover our range of aesthetic treatments at Silentium. From anti-aging injectables to skin rejuvenation, find the perfect treatment for your needs.',
    ru: 'Откройте для себя наш спектр эстетических процедур в Silentium. От инъекций против старения до омоложения кожи — найдите идеальную процедуру.',
    id: 'Temukan berbagai perawatan estetika kami di Silentium. Dari suntikan anti-penuaan hingga peremajaan kulit, temukan perawatan yang tepat.',
  };

  return [
    { title: titles[lang] || titles.en },
    { name: 'description', content: descriptions[lang] || descriptions.en },
    { property: 'og:title', content: titles[lang] || titles.en },
    { property: 'og:description', content: descriptions[lang] || descriptions.en },
  ];
}

export default function Services() {
  const { t } = useTranslation();
  const { services, lang } = useLoaderData<typeof loader>();

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-beige/50 to-cornsilk">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-0 w-64 h-64 bg-tea-green/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-papaya-whip/40 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-paynes-gray mb-6">
              {t('services.heading')}
            </h1>
            <p className="font-heading text-lg md:text-xl text-paynes-gray/70">
              {t('services.subheading')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Gallery */}
      {services.length > 0 ? (
        <ServicesGallery
          services={services}
          lang={lang}
          showCategories={true}
        />
      ) : (
        <section className="py-20 bg-cornsilk">
          <div className="container mx-auto px-6 text-center">
            <p className="text-paynes-gray/70 font-heading">
              {t('common.comingSoon')}
            </p>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <ContactCTA
        heading={t('contact.ctaHeading')}
        subheading={t('contact.ctaSubheading')}
        bookButtonText={t('contact.bookConsultation')}
        whatsappButtonText={t('contact.whatsappUs')}
        bookLink={`/${lang}/contact`}
        whatsappNumber="yourphonenumber"
      />
    </>
  );
}
