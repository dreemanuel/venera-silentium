import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { supportedLanguages, defaultLanguage } from "./i18n";

export async function initI18nClient(initialLang: string) {
  if (i18next.isInitialized) {
    if (i18next.language !== initialLang) {
      await i18next.changeLanguage(initialLang);
    }
    return i18next;
  }

  await i18next
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      supportedLngs: [...supportedLanguages],
      fallbackLng: defaultLanguage,
      lng: initialLang,
      ns: ["common"],
      defaultNS: "common",
      detection: {
        order: ["path"],
        lookupFromPathIndex: 0,
      },
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });

  return i18next;
}
