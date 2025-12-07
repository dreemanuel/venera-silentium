import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router';
import type { Route } from './+types/about';
import { motion, type Variants } from 'framer-motion';
import { AboutPreview, SilentiumPhilosophy, ContactCTA } from '~/components/sections';
import {
  sanityClient,
  siteSettingsQuery,
  getLocalizedValue,
  type SiteSettings,
  type Language,
  type PortableTextBlock,
} from '~/lib/sanity';

export async function loader({ params }: Route.LoaderArgs) {
  const lang = (params.lang || 'en') as Language;

  let siteSettings: SiteSettings | null = null;
  try {
    siteSettings = await sanityClient.fetch<SiteSettings>(siteSettingsQuery);
  } catch {
    console.log('Sanity fetch failed, using i18n fallback');
  }

  return { siteSettings, lang };
}

export function meta({ params }: Route.MetaArgs) {
  const defaultMeta = {
    title: 'About | Silentium - Aesthetic Cosmetology',
    description:
      'Learn about Dr. Venera Frolova and the Silentium philosophy. Where science meets spirit in aesthetic cosmetology.',
  };

  const langMeta: Record<string, { title: string; description: string }> = {
    en: defaultMeta,
    ru: {
      title: 'О нас | Silentium - Эстетическая косметология',
      description:
        'Узнайте о Др. Венере Фроловой и философии Silentium. Где наука встречается с духом.',
    },
    id: {
      title: 'Tentang | Silentium - Kosmetologi Estetika',
      description:
        'Pelajari tentang Dr. Venera Frolova dan filosofi Silentium. Di mana sains bertemu jiwa.',
    },
  };

  const lang = params.lang || 'en';
  const currentMeta = langMeta[lang] || defaultMeta;

  return [
    { title: currentMeta.title },
    { name: 'description', content: currentMeta.description },
    { property: 'og:title', content: currentMeta.title },
    { property: 'og:description', content: currentMeta.description },
    {
      property: 'og:locale',
      content: lang === 'ru' ? 'ru_RU' : lang === 'id' ? 'id_ID' : 'en_US',
    },
  ];
}

const headerVariants: Variants = {
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

export default function About() {
  const { t } = useTranslation();
  const { siteSettings, lang } = useLoaderData<typeof loader>();

  // Get About Dr. Venera content
  const aboutDrVenera = siteSettings?.aboutDrVenera;
  const drVeneraName =
    getLocalizedValue(aboutDrVenera?.name, lang) || t('about.drVenera.name');
  const drVeneraTitle =
    getLocalizedValue(aboutDrVenera?.title, lang) || t('about.drVenera.title');
  const drVeneraExperience =
    aboutDrVenera?.experience || t('about.drVenera.experience');
  const drVeneraStory = getLocalizedValue(aboutDrVenera?.story, lang);
  const drVeneraCredentials =
    aboutDrVenera?.credentials?.map((c) => getLocalizedValue(c, lang) || '') ||
    (t('about.drVenera.credentials', { returnObjects: true }) as string[]);
  const drVeneraPhoto = aboutDrVenera?.photo;

  // Fallback story
  const fallbackStory: PortableTextBlock[] = drVeneraStory
    ? []
    : [
        {
          _type: 'block',
          _key: 'fallback',
          children: [
            {
              _type: 'span',
              _key: 'text',
              text: t('about.drVenera.story'),
              marks: [],
            },
          ],
        },
      ];

  return (
    <main className="min-h-screen bg-cornsilk">
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-beige/30">
        <motion.div
          className="container mx-auto px-6 text-center"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-paynes-gray mb-4">
            {t('about.pageHeading')}
          </h1>
          <p className="text-paynes-gray/70 font-heading text-lg md:text-xl max-w-2xl mx-auto">
            {t('about.pageSubheading')}
          </p>
        </motion.div>
      </section>

      {/* About Dr. Venera - Full Section */}
      <AboutPreview
        photo={drVeneraPhoto}
        name={drVeneraName}
        title={drVeneraTitle}
        story={drVeneraStory || fallbackStory}
        credentials={drVeneraCredentials.filter(Boolean)}
        experience={drVeneraExperience}
        ctaText={t('hero.cta')}
        ctaLink={`/${lang}/contact`}
        lang={lang}
      />

      {/* Silentium Philosophy - Full Section */}
      <SilentiumPhilosophy
        tagline={
          getLocalizedValue(siteSettings?.aboutSilentium?.tagline, lang) ||
          t('about.silentium.tagline')
        }
        philosophy={getLocalizedValue(siteSettings?.aboutSilentium?.philosophy, lang)}
        philosophyText={t('about.silentium.philosophy')}
        image={siteSettings?.aboutSilentium?.image}
      />

      {/* Contact CTA */}
      <ContactCTA
        heading={t('contact.ctaHeading')}
        subheading={t('contact.ctaSubheading')}
        bookButtonText={t('contact.bookConsultation')}
        whatsappButtonText={t('contact.whatsappUs')}
        bookLink={`/${lang}/contact`}
        whatsappNumber={siteSettings?.whatsappNumber}
      />
    </main>
  );
}
