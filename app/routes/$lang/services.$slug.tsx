import { useTranslation } from 'react-i18next';
import { useLoaderData, Link } from 'react-router';
import { motion, type Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { Route } from './+types/services.$slug';
import { Button } from '~/components/ui';
import { ContactCTA } from '~/components/sections';
import { ServiceSchema, BreadcrumbSchema } from '~/components/seo';
import { sanityClient } from '~/lib/sanity/client.server';
import {
  serviceBySlugQuery,
  servicesByCategoryQuery,
  urlFor,
  getLocalizedValue,
  type Service,
  type Language,
  type PortableTextBlock,
} from '~/lib/sanity';
import { generateMeta, getOgLocale, SITE_URL, SITE_NAME } from '~/lib/seo';
import { Clock, Sparkles, Users, ChevronLeft } from 'lucide-react';

export async function loader({ params }: Route.LoaderArgs) {
  const lang = (params.lang || 'en') as Language;
  const slug = params.slug;

  if (!slug) {
    throw new Response('Service not found', { status: 404 });
  }

  // Fetch service by slug
  const service = await sanityClient.fetch<Service | null>(serviceBySlugQuery, { slug });

  if (!service) {
    throw new Response('Service not found', { status: 404 });
  }

  // Fetch related services from same category (excluding current service)
  let relatedServices: Service[] = [];
  try {
    const categoryServices = await sanityClient.fetch<Service[]>(servicesByCategoryQuery, {
      category: service.category,
    });
    relatedServices = categoryServices
      .filter((s) => s._id !== service._id)
      .slice(0, 3);
  } catch {
    // Ignore related services fetch errors
  }

  return { service, relatedServices, lang };
}

export function meta({ data, params }: Route.MetaArgs) {
  const lang = (params.lang || 'en') as Language;

  if (!data?.service) {
    return [{ title: `Service Not Found | ${SITE_NAME}` }];
  }

  const title = getLocalizedValue(data.service.title, lang) || 'Service';
  const description =
    getLocalizedValue(data.service.shortDescription, lang) ||
    'Aesthetic cosmetology treatment at Silentium';

  // Get OG image from service or use default
  const ogImage = data.service.image
    ? urlFor(data.service.image).width(1200).height(630).quality(85).url()
    : undefined;

  return generateMeta({
    title: `${title} | ${SITE_NAME}`,
    description,
    url: `${SITE_URL}/${lang}/services/${data.service.slug?.current}`,
    locale: getOgLocale(lang),
    image: ogImage,
  });
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
      ease: 'easeOut',
    },
  },
};

// Simple Portable Text renderer
function renderPortableText(blocks: PortableTextBlock[] | undefined): React.ReactNode {
  if (!blocks || blocks.length === 0) return null;

  return blocks.map((block, index) => {
    if (block._type === 'block') {
      const text = block.children?.map((child) => child.text).join('') || '';
      if (block.style === 'h2') {
        return (
          <h2 key={block._key || index} className="text-2xl text-paynes-gray mt-8 mb-4">
            {text}
          </h2>
        );
      }
      if (block.style === 'h3') {
        return (
          <h3 key={block._key || index} className="font-heading text-xl text-paynes-gray mt-6 mb-3">
            {text}
          </h3>
        );
      }
      return (
        <p key={block._key || index} className="mb-4 leading-relaxed">
          {text}
        </p>
      );
    }
    return null;
  });
}

function RelatedServiceCard({ service, lang }: { service: Service; lang: Language }) {
  const title = getLocalizedValue(service.title, lang) || 'Service';
  const shortDescription = getLocalizedValue(service.shortDescription, lang);
  const imageUrl = service.image
    ? urlFor(service.image).width(300).height(200).quality(80).auto('format').url()
    : null;

  return (
    <Link
      to={`/${lang}/services/${service.slug.current}`}
      className="group block bg-white  shadow-md hover:shadow-lg transition-shadow overflow-hidden"
    >
      <div className="h-32 bg-beige overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-tea-green/30 to-beige">
            <Sparkles className="w-8 h-8 text-paynes-gray/20" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h4 className="font-heading text-sm font-medium text-paynes-gray group-hover:text-tea-green transition-colors">
          {title}
        </h4>
        {shortDescription && (
          <p className="text-xs text-paynes-gray/60 mt-1 line-clamp-2">{shortDescription}</p>
        )}
      </div>
    </Link>
  );
}

export default function ServiceDetail() {
  const { t } = useTranslation();
  const { service, relatedServices, lang } = useLoaderData<typeof loader>();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const title = getLocalizedValue(service.title, lang) || 'Service';
  const shortDescription = getLocalizedValue(service.shortDescription, lang);
  const description = getLocalizedValue(service.description, lang);
  const benefits = service.benefits?.map((b) => getLocalizedValue(b, lang)).filter(Boolean) || [];
  const idealFor = getLocalizedValue(service.idealFor, lang);
  const duration = service.duration;

  const heroImageUrl = service.image
    ? urlFor(service.image).width(1200).height(600).quality(85).auto('format').url()
    : null;

  // Breadcrumb data for structured data
  const breadcrumbItems = [
    { name: 'Home', url: `/${lang}` },
    { name: t('nav.services'), url: `/${lang}/services` },
    { name: title, url: `/${lang}/services/${service.slug?.current}` },
  ];

  return (
    <>
      {/* Structured Data for Service */}
      <ServiceSchema
        name={title}
        description={shortDescription || ''}
        url={`${SITE_URL}/${lang}/services/${service.slug?.current}`}
        image={heroImageUrl || undefined}
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-end">
        {heroImageUrl ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImageUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-paynes-gray/80 via-paynes-gray/40 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-tea-green/30 via-beige to-cornsilk" />
        )}

        <div className="relative z-10 container mx-auto px-6 pb-12 pt-24">
          {/* Breadcrumb */}
          <Link
            to={`/${lang}/services`}
            className={`inline-flex items-center text-sm mb-6 transition-colors ${
              heroImageUrl
                ? 'text-cornsilk/80 hover:text-cornsilk'
                : 'text-paynes-gray/60 hover:text-paynes-gray'
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            {t('nav.services')}
          </Link>

          <h1
            className={`font-display text-4xl md:text-5xl lg:text-6xl max-w-3xl leading-[0.75] ${
              heroImageUrl ? 'text-cornsilk' : 'text-paynes-gray'
            }`}
          >
            {title}
          </h1>

          {shortDescription && (
            <p
              className={`font-heading text-lg mt-4 max-w-2xl ${
                heroImageUrl ? 'text-cornsilk/90' : 'text-paynes-gray/80'
              }`}
            >
              {shortDescription}
            </p>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section ref={ref} className="py-16 md:py-24 bg-cornsilk">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="container mx-auto px-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              {/* Quick Info Pills */}
              <div className="flex flex-wrap gap-4 mb-8">
                {duration && (
                  <div className="inline-flex items-center px-4 py-2 bg-tea-green/20 rounded-full text-sm text-paynes-gray">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="font-heading">{t('services.duration')}:</span>
                    <span className="ml-1">{duration}</span>
                  </div>
                )}
              </div>

              {/* Full Description */}
              {description && (
                <div className="prose prose-paynes-gray max-w-none text-paynes-gray/80">
                  {renderPortableText(description)}
                </div>
              )}

              {/* Benefits Section */}
              {benefits.length > 0 && (
                <motion.div variants={itemVariants} className="mt-12">
                  <h2 className="text-2xl text-paynes-gray mb-6 flex items-center">
                    <Sparkles className="w-5 h-5 mr-3 text-tea-green" />
                    {t('services.benefits')}
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {benefits.map((benefit, index) => (
                      <li
                        key={index}
                        className="flex items-start p-4 bg-white  shadow-sm"
                      >
                        <span className="w-2 h-2 bg-tea-green rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-paynes-gray/80">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Ideal For Section */}
              {idealFor && (
                <motion.div variants={itemVariants} className="mt-12">
                  <h2 className="text-2xl text-paynes-gray mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-3 text-tea-green" />
                    {t('services.idealFor')}
                  </h2>
                  <p className="text-paynes-gray/80 bg-papaya-whip/50 p-6 ">
                    {idealFor}
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              {/* CTA Card */}
              <div className="bg-white  shadow-lg p-6 sticky top-24">
                <h3 className="font-heading text-lg text-paynes-gray mb-4">
                  {t('contact.ctaHeading')}
                </h3>
                <p className="text-sm text-paynes-gray/70 mb-6">
                  {t('contact.ctaSubheading')}
                </p>
                <div className="space-y-3">
                  <Button
                    as="link"
                    to={`/${lang}/contact`}
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                  >
                    {t('services.bookConsultation')}
                  </Button>
                  <a
                    href="https://wa.me/yourphonenumber"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 font-heading font-medium tracking-wide  transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-transparent border-2 border-paynes-gray text-paynes-gray hover:bg-paynes-gray hover:text-cornsilk focus-visible:ring-paynes-gray px-7 py-3.5 text-lg w-full"
                  >
                    {t('contact.whatsappUs')}
                  </a>
                </div>
              </div>

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-heading text-lg text-paynes-gray mb-4">
                    {t('services.relatedServices')}
                  </h3>
                  <div className="space-y-4">
                    {relatedServices.map((relatedService) => (
                      <RelatedServiceCard
                        key={relatedService._id}
                        service={relatedService}
                        lang={lang}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </section>

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
