import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router";
import type { Route } from "./+types/privacy";
import { generateMeta } from "~/lib/seo";
import type { SupportedLanguage } from "~/lib/i18n";

export function meta({ params }: Route.MetaArgs) {
  const lang = (params.lang as SupportedLanguage) || "en";
  const titles: Record<SupportedLanguage, string> = {
    en: "Privacy Policy | Silentium",
    ru: "Политика конфиденциальности | Silentium",
    id: "Kebijakan Privasi | Silentium",
  };
  const descriptions: Record<SupportedLanguage, string> = {
    en: "Privacy Policy for Silentium Aesthetic Cosmetology. Learn how we collect, use, and protect your personal information.",
    ru: "Политика конфиденциальности Silentium. Узнайте, как мы собираем, используем и защищаем вашу личную информацию.",
    id: "Kebijakan Privasi untuk Silentium. Pelajari bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.",
  };

  return generateMeta({
    title: titles[lang],
    description: descriptions[lang],
    locale: lang,
    noindex: true, // Legal pages typically don't need indexing
  });
}

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  const { lang } = useOutletContext<{ lang: SupportedLanguage }>();

  return (
    <main className="min-h-screen bg-cornsilk">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <h1 className="text-5xl md:text-6xl font-display text-paynes-gray mb-8">
            {t("legal.privacy.title")}
          </h1>

          <p className="text-paynes-gray/70 font-body mb-8">
            {t("legal.privacy.lastUpdated")}: December 2025
          </p>

          {/* Content */}
          <div className="prose prose-lg prose-paynes-gray max-w-none space-y-8">
            {/* Introduction */}
            <section>
              <p className="font-body text-paynes-gray/80 leading-relaxed">
                {t("legal.privacy.intro")}
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-xl font-heading font-medium text-paynes-gray mb-4">
                {t("legal.privacy.dataCollection.title")}
              </h2>
              <p className="font-body text-paynes-gray/80 leading-relaxed mb-4">
                {t("legal.privacy.dataCollection.description")}
              </p>
              <ul className="list-disc pl-6 space-y-2 font-body text-paynes-gray/80">
                <li>{t("legal.privacy.dataCollection.items.name")}</li>
                <li>{t("legal.privacy.dataCollection.items.email")}</li>
                <li>{t("legal.privacy.dataCollection.items.phone")}</li>
                <li>{t("legal.privacy.dataCollection.items.message")}</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-xl font-heading font-medium text-paynes-gray mb-4">
                {t("legal.privacy.dataUse.title")}
              </h2>
              <p className="font-body text-paynes-gray/80 leading-relaxed mb-4">
                {t("legal.privacy.dataUse.description")}
              </p>
              <ul className="list-disc pl-6 space-y-2 font-body text-paynes-gray/80">
                <li>{t("legal.privacy.dataUse.items.respond")}</li>
                <li>{t("legal.privacy.dataUse.items.appointments")}</li>
                <li>{t("legal.privacy.dataUse.items.service")}</li>
                <li>{t("legal.privacy.dataUse.items.updates")}</li>
              </ul>
            </section>

            {/* Data Protection */}
            <section>
              <h2 className="text-xl font-heading font-medium text-paynes-gray mb-4">
                {t("legal.privacy.dataProtection.title")}
              </h2>
              <p className="font-body text-paynes-gray/80 leading-relaxed">
                {t("legal.privacy.dataProtection.description")}
              </p>
            </section>

            {/* Third Parties */}
            <section>
              <h2 className="text-xl font-heading font-medium text-paynes-gray mb-4">
                {t("legal.privacy.thirdParties.title")}
              </h2>
              <p className="font-body text-paynes-gray/80 leading-relaxed">
                {t("legal.privacy.thirdParties.description")}
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-xl font-heading font-medium text-paynes-gray mb-4">
                {t("legal.privacy.rights.title")}
              </h2>
              <p className="font-body text-paynes-gray/80 leading-relaxed mb-4">
                {t("legal.privacy.rights.description")}
              </p>
              <ul className="list-disc pl-6 space-y-2 font-body text-paynes-gray/80">
                <li>{t("legal.privacy.rights.items.access")}</li>
                <li>{t("legal.privacy.rights.items.correction")}</li>
                <li>{t("legal.privacy.rights.items.deletion")}</li>
                <li>{t("legal.privacy.rights.items.withdraw")}</li>
              </ul>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl font-heading font-medium text-paynes-gray mb-4">
                {t("legal.privacy.contact.title")}
              </h2>
              <p className="font-body text-paynes-gray/80 leading-relaxed">
                {t("legal.privacy.contact.description")}
              </p>
              <p className="font-body text-paynes-gray/80 mt-4">
                Email: hello@silentium.co
              </p>
            </section>
          </div>

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-beige">
            <a
              href={`/${lang}`}
              className="text-paynes-gray/70 hover:text-paynes-gray font-heading text-sm transition-colors"
            >
              ← {t("legal.backToHome")}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
