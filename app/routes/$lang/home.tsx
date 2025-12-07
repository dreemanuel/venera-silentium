import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router';
import type { Route } from './+types/home';
import { HeroSection, AboutPreview, SilentiumPhilosophy, ServicesGallery } from '~/components/sections';
import { Button } from '~/components/ui';
import {
  sanityClient,
  siteSettingsQuery,
  featuredServicesQuery,
  getLocalizedValue,
  type SiteSettings,
  type Service,
  type Language,
  type PortableTextBlock,
} from '~/lib/sanity';

export async function loader({ params }: Route.LoaderArgs) {
  const lang = (params.lang || 'en') as Language;

  // Try to fetch from Sanity, but gracefully handle if not configured
  let siteSettings: SiteSettings | null = null;
  let featuredServices: Service[] = [];

  try {
    const [settings, services] = await Promise.all([
      sanityClient.fetch<SiteSettings>(siteSettingsQuery),
      sanityClient.fetch<Service[]>(featuredServicesQuery),
    ]);
    siteSettings = settings;
    featuredServices = services || [];
  } catch {
    // Sanity not configured or no content yet - use fallback
    console.log('Sanity fetch failed, using i18n fallback');
  }

  return { siteSettings, featuredServices, lang };
}

export function meta({ params }: Route.MetaArgs) {
  const langTitles: Record<string, string> = {
    en: 'Silentium - Aesthetic Cosmetology in Bali',
    ru: 'Silentium - Эстетическая косметология на Бали',
    id: 'Silentium - Kosmetologi Estetika di Bali',
  };

  const langDescriptions: Record<string, string> = {
    en: 'Silentium by Dr. Venera Frolova - Where science meets spirit. Premium aesthetic cosmetology in Bali.',
    ru: 'Silentium от Др. Венеры Фроловой - Где наука встречается с духом. Премиум эстетическая косметология на Бали.',
    id: 'Silentium oleh Dr. Venera Frolova - Di mana sains bertemu jiwa. Kosmetologi estetika premium di Bali.',
  };

  const lang = params.lang || 'en';

  return [
    { title: langTitles[lang] || langTitles.en },
    {
      name: 'description',
      content: langDescriptions[lang] || langDescriptions.en,
    },
    {
      property: 'og:locale',
      content: lang === 'ru' ? 'ru_RU' : lang === 'id' ? 'id_ID' : 'en_US',
    },
  ];
}

export default function Home() {
  const { t } = useTranslation();
  const { siteSettings, featuredServices, lang } = useLoaderData<typeof loader>();

  // Get Hero content from Sanity or fall back to i18n
  const heroTitle =
    getLocalizedValue(siteSettings?.heroTitle, lang) || t('hero.title');
  const heroSubtitle =
    getLocalizedValue(siteSettings?.heroSubtitle, lang) || t('hero.tagline');
  const heroCtaText =
    getLocalizedValue(siteSettings?.heroCtaText, lang) || t('hero.cta');
  const heroQuote = t('hero.quote');
  const heroImage = siteSettings?.heroImage;

  // Get About Dr. Venera content from Sanity or fall back to i18n
  const aboutDrVenera = siteSettings?.aboutDrVenera;
  const drVeneraName =
    getLocalizedValue(aboutDrVenera?.name, lang) ||
    t('about.drVenera.name');
  const drVeneraTitle =
    getLocalizedValue(aboutDrVenera?.title, lang) ||
    t('about.drVenera.title');
  const drVeneraExperience =
    aboutDrVenera?.experience || t('about.drVenera.experience');
  const drVeneraStory = getLocalizedValue(aboutDrVenera?.story, lang);
  const drVeneraCredentials =
    aboutDrVenera?.credentials?.map((c) => getLocalizedValue(c, lang) || '') ||
    (t('about.drVenera.credentials', { returnObjects: true }) as string[]);
  const drVeneraPhoto = aboutDrVenera?.photo;

  // Create fallback story as PortableText-like structure
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
    <>
      <HeroSection
        title={heroTitle}
        subtitle={heroSubtitle}
        quote={heroQuote}
        image={heroImage}
        ctaText={heroCtaText}
        ctaLink={`/${lang}/contact`}
      />

      {/* Services Preview Section */}
      {featuredServices.length > 0 ? (
        <div className="bg-beige/30">
          <ServicesGallery
            services={featuredServices}
            lang={lang}
            title={t('services.homeHeading')}
            subtitle={t('services.homeSubheading')}
            showCategories={false}
          />
          <div className="container mx-auto px-6 pb-16 text-center">
            <Button
              as="link"
              to={`/${lang}/services`}
              variant="outline"
              size="lg"
            >
              {t('services.viewAllServices')}
            </Button>
          </div>
        </div>
      ) : (
        <section className="py-20 bg-beige/30">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-paynes-gray text-3xl md:text-4xl mb-4">
              {t('services.homeHeading')}
            </h2>
            <p className="text-paynes-gray/70 font-heading mb-8">
              {t('common.comingSoon')}
            </p>
          </div>
        </section>
      )}

      {/* About Dr. Venera Preview Section */}
      <AboutPreview
        photo={drVeneraPhoto}
        name={drVeneraName}
        title={drVeneraTitle}
        story={drVeneraStory || fallbackStory}
        credentials={drVeneraCredentials.filter(Boolean)}
        experience={drVeneraExperience}
        ctaText={t('about.cta')}
        ctaLink={`/${lang}/about`}
        lang={lang}
      />

      {/* Silentium Philosophy Section */}
      <SilentiumPhilosophy
        tagline={
          getLocalizedValue(siteSettings?.aboutSilentium?.tagline, lang) ||
          t('about.silentium.tagline')
        }
        philosophy={getLocalizedValue(siteSettings?.aboutSilentium?.philosophy, lang)}
        philosophyText={t('about.silentium.philosophy')}
        image={siteSettings?.aboutSilentium?.image}
      />

      {/* Contact CTA Section */}
      <section className="py-20 bg-tea-green/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-paynes-gray text-2xl md:text-3xl mb-4">
            {t('hero.cta')}
          </h2>
          <p className="text-paynes-gray/60 text-sm font-heading">
            {t('common.location')}
          </p>
        </div>
      </section>
    </>
  );
}
