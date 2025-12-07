export const supportedLanguages = ["en", "ru", "id"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export const defaultLanguage: SupportedLanguage = "en";

export const languageNames: Record<SupportedLanguage, string> = {
  en: "English",
  ru: "Русский",
  id: "Bahasa",
};

export const languageNamesShort: Record<SupportedLanguage, string> = {
  en: "EN",
  ru: "RU",
  id: "ID",
};

export function isValidLanguage(lang: string): lang is SupportedLanguage {
  return supportedLanguages.includes(lang as SupportedLanguage);
}

export function getLanguageFromPath(pathname: string): SupportedLanguage {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isValidLanguage(firstSegment)) {
    return firstSegment;
  }

  return defaultLanguage;
}

export function getPathWithoutLanguage(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isValidLanguage(firstSegment)) {
    return "/" + segments.slice(1).join("/");
  }

  return pathname;
}

export function getLocalizedPath(
  pathname: string,
  targetLang: SupportedLanguage
): string {
  const pathWithoutLang = getPathWithoutLanguage(pathname);
  return `/${targetLang}${pathWithoutLang === "/" ? "" : pathWithoutLang}`;
}
