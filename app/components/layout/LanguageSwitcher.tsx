import { useLocation, Link } from "react-router";
import { useTranslation } from "react-i18next";
import {
  supportedLanguages,
  languageNamesShort,
  getLocalizedPath,
  type SupportedLanguage,
} from "~/lib/i18n";

interface LanguageSwitcherProps {
  currentLang: SupportedLanguage;
  className?: string;
}

export function LanguageSwitcher({
  currentLang,
  className = "",
}: LanguageSwitcherProps) {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span className="sr-only">{t("language.select")}</span>
      {supportedLanguages.map((lang, index) => {
        const isActive = lang === currentLang;
        const path = getLocalizedPath(location.pathname, lang);

        return (
          <span key={lang} className="flex items-center">
            {index > 0 && (
              <span className="text-paynes-gray/30 mx-1">|</span>
            )}
            <Link
              to={path}
              className={`
                px-2 py-1 text-sm font-heading tracking-wide transition-colors
                ${
                  isActive
                    ? "text-paynes-gray font-medium"
                    : "text-paynes-gray/50 hover:text-paynes-gray"
                }
              `}
              aria-current={isActive ? "page" : undefined}
              aria-label={t(`language.${lang}`)}
            >
              {languageNamesShort[lang]}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
