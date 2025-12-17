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
import { generateMeta, pageSeo, getOgLocale, SITE_URL } from '~/lib/seo';

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
  const seo = pageSeo.services[lang as keyof typeof pageSeo.services] || pageSeo.services.en;

  return generateMeta({
    title: seo.title,
    description: seo.description,
    url: `${SITE_URL}/${lang}/services`,
    locale: getOgLocale(lang),
  });
}

export default function Services() {
  const { t } = useTranslation();
  const { services, lang } = useLoaderData<typeof loader>();

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pb-28 bg-gradient-to-b from-beige/50 to-cornsilk">
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
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-paynes-gray mb-2 leading-[0.75]">
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
