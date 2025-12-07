import { Outlet, redirect } from "react-router";
import { I18nextProvider } from "react-i18next";
import { useEffect, useState } from "react";
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

export function loader({ params }: Route.LoaderArgs) {
  const lang = params.lang;

  if (!lang || !isValidLanguage(lang)) {
    throw redirect(`/${defaultLanguage}`);
  }

  return { lang };
}

export default function LangLayout({ loaderData }: Route.ComponentProps) {
  const { lang } = loaderData;
  const [isI18nReady, setIsI18nReady] = useState(i18next.isInitialized);

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
      <div className="flex flex-col min-h-screen">
        <Header lang={typedLang} />
        <main className="flex-1 pt-16 md:pt-20">
          <Outlet context={{ lang: typedLang }} />
        </main>
        <Footer lang={typedLang} />
      </div>
    </I18nextProvider>
  );
}
