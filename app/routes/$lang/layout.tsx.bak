import { Outlet, redirect, useLocation } from "react-router";
import { I18nextProvider } from "react-i18next";
import { useEffect, useState, useMemo } from "react";
import type { Route } from "./+types/layout";
import {
  isValidLanguage,
  defaultLanguage,
  type SupportedLanguage,
} from "~/lib/i18n";
import { initI18nClient } from "~/lib/i18n.client";
import i18next from "i18next";
import { Header, Footer } from "~/components/layout";
import { HreflangLinks } from "~/components/seo";
import { NavigationProgress } from "~/components/ui/NavigationProgress";
import { PromoBannersList } from "~/components/ui/PromoBanner";
import { sanityClient } from "~/lib/sanity/client.server";
import { activePromoBannersQuery, type PromoBanner, type PromoBannerPage, type Language } from "~/lib/sanity";

export async function loader({ params }: Route.LoaderArgs) {
  const lang = params.lang;

  if (!lang || !isValidLanguage(lang)) {
    throw redirect(`/${defaultLanguage}`);
  }

  // Fetch active promo banners
  let promoBanners: PromoBanner[] = [];
  try {
    promoBanners = await sanityClient.fetch<PromoBanner[]>(activePromoBannersQuery) || [];
  } catch {
    // Silently fail if Sanity is not configured
  }

  return { lang, promoBanners };
}

// Helper to determine current page from pathname
function getCurrentPage(pathname: string): PromoBannerPage {
  // Remove lang prefix like /en/, /ru/, /id/
  const cleanPath = pathname.replace(/^\/(en|ru|id)\/?/, '/');

  if (cleanPath === '/' || cleanPath === '') return 'home';
  if (cleanPath.startsWith('/about')) return 'about';
  if (cleanPath.startsWith('/services')) return 'services';
  if (cleanPath.startsWith('/contact')) return 'contact';
  if (cleanPath.startsWith('/blog')) return 'blog';
  return 'home'; // Default fallback
}

export default function LangLayout({ loaderData }: Route.ComponentProps) {
  const { lang, promoBanners } = loaderData;
  const [isI18nReady, setIsI18nReady] = useState(i18next.isInitialized);
  const location = useLocation();

  // Determine current page from location
  const currentPage = useMemo(() => getCurrentPage(location.pathname), [location.pathname]);

  useEffect(() => {
    initI18nClient(lang).then(() => {
      setIsI18nReady(true);
    });
  }, [lang]);

  useEffect(() => {
    if (i18next.isInitialized && i18next.language !== lang) {
      i18next.changeLanguage(lang);
    }
  }, [lang]);

  if (!isI18nReady) {
    return (
      <div className="min-h-screen bg-cornsilk flex items-center justify-center">
        <div className="text-paynes-gray/50 font-heading">Loading...</div>
      </div>
    );
  }

  const typedLang = lang as SupportedLanguage;

  return (
    <I18nextProvider i18n={i18next}>
      <HreflangLinks currentLang={typedLang} />
      <NavigationProgress />

      {/* Top Promo Banners */}
      <PromoBannersList
        banners={promoBanners}
        lang={typedLang as Language}
        currentPage={currentPage}
        position="top"
      />

      <div className="flex flex-col min-h-screen">
        <Header lang={typedLang} />
        <main className="flex-1 pt-16 md:pt-20">
          <Outlet context={{ lang: typedLang }} />
        </main>
        <Footer lang={typedLang} />
      </div>

      {/* Bottom Promo Banners */}
      <PromoBannersList
        banners={promoBanners}
        lang={typedLang as Language}
        currentPage={currentPage}
        position="bottom"
      />
    </I18nextProvider>
  );
}
