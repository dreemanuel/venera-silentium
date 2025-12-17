import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router";
import type { Route } from "./+types/terms";
import { generateMeta } from "~/lib/seo";
import type { SupportedLanguage } from "~/lib/i18n";

export function meta({ params }: Route.MetaArgs) {
  const lang = (params.lang as SupportedLanguage) || "en";
  const titles: Record<SupportedLanguage, string> = {
    en: "Terms of Service | Silentium",
    ru: "Условия использования | Silentium",
    id: "Ketentuan Layanan | Silentium",
  };
  const descriptions: Record<SupportedLanguage, string> = {
    en: "Terms of Service for Silentium Aesthetic Cosmetology. Please read these terms carefully before using our services.",
    ru: "Условия использования услуг Silentium. Пожалуйста, внимательно прочитайте эти условия перед использованием наших услуг.",
    id: "Ketentuan Layanan untuk Silentium. Harap baca ketentuan ini dengan saksama sebelum menggunakan layanan kami.",
  };

  return generateMeta({
    title: titles[lang],
    description: descriptions[lang],
    locale: lang,
    noindex: true, // Legal pages typically don't need indexing
  });
}

export default function TermsOfService() {
  const { t } = useTranslation();
  const { lang } = useOutletContext<{ lang: SupportedLanguage }>();

  return (
    <main className="min-h-screen bg-cornsilk">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <h1 className="text-5xl md:text-6xl font-display text-paynes-gray mb-8">
            {t("legal.terms.title")}
          </h1>

          <p className="text-paynes-gray/70 font-body mb-8">
            {t("legal.terms.lastUpdated")}: December 2025
          </p>

          {/* Content */}
          <div className="prose prose-lg prose-paynes-gray max-w-none space-y-8">
            {/* Introduction */}
            <section>
              <p className="font-body text-paynes-gray/80 leading-relaxed">
                {t("legal.terms.intro")}
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section>
              <h2 className="text-xl font-heading font-medium text-paynes-gray mb-4">
                {t("legal.terms.acceptance.title")}
              </h2>
              <p className="font-body text-paynes-gray/80 leading-relaxed">
                {t("legal.terms.acceptance.description")}
              </p>
            </section>

            {/* Services */}
            <section>
              <h2 className="text-xl font-heading font-medium text-paynes-gray mb-4">
                {t("legal.terms.services.title")}
              </h2>
              <p className="font-body text-paynes-gray/80 leading-relaxed mb-4">
                {t("legal.terms.services.description")}
              </p>
              <ul className="list-disc pl-6 space-y-2 font-body text-paynes-gray/80">
                <li>{t("legal.terms.services.items.consultation")}</li>
                <li>{t("legal.terms.services.items.medical")}</li>
                <li>{t("legal.terms.services.items.results")}</li>
              </ul>
            </section>

            {/* Appointments */}
            <section>
              <h2 className="text-xl font-heading font-medium text-paynes-gray mb-4">
                {t("legal.terms.appointments.title")}
              </h2>
              <p className="font-body text-paynes-gray/80 leading-relaxed mb-4">
                {t("legal.terms.appointments.description")}
              </p>
              <ul className="list-disc pl-6 space-y-2 font-body text-paynes-gray/80">
                <li>{t("legal.terms.appointments.items.cancellation")}</li>
                <li>{t("legal.terms.appointments.items.noshow")}</li>
                <li>{t("legal.terms.appointments.items.rescheduling")}</li>
              </ul>
            </section>

            {/* Payment */}
            <section>
              <h2 className="text-xl font-heading font-medium text-paynes-gray mb-4">
                {t("legal.terms.payment.title")}
              </h2>
              <p className="font-body text-paynes-gray/80 leading-relaxed">
                {t("legal.terms.payment.description")}
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-xl font-heading font-medium text-paynes-gray mb-4">
                {t("legal.terms.liability.title")}
              </h2>
              <p className="font-body text-paynes-gray/80 leading-relaxed">
                {t("legal.terms.liability.description")}
              </p>
            </section>

            {/* Medical Disclaimer */}
            <section>
              <h2 className="text-xl font-heading font-medium text-paynes-gray mb-4">
                {t("legal.terms.medical.title")}
              </h2>
              <p className="font-body text-paynes-gray/80 leading-relaxed">
                {t("legal.terms.medical.description")}
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-xl font-heading font-medium text-paynes-gray mb-4">
                {t("legal.terms.changes.title")}
              </h2>
              <p className="font-body text-paynes-gray/80 leading-relaxed">
                {t("legal.terms.changes.description")}
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl font-heading font-medium text-paynes-gray mb-4">
                {t("legal.terms.contact.title")}
              </h2>
              <p className="font-body text-paynes-gray/80 leading-relaxed">
                {t("legal.terms.contact.description")}
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
