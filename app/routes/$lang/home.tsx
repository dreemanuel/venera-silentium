import { useTranslation } from "react-i18next";
import type { Route } from "./+types/home";

export function meta({ params }: Route.MetaArgs) {
  const langTitles: Record<string, string> = {
    en: "Silentium - Coming Soon",
    ru: "Silentium - Скоро открытие",
    id: "Silentium - Segera Hadir",
  };

  const langDescriptions: Record<string, string> = {
    en: "Silentium by Dr. Venera Frolova - Aesthetic Cosmetology in Bali",
    ru: "Silentium от Др. Венеры Фроловой - Эстетическая косметология на Бали",
    id: "Silentium oleh Dr. Venera Frolova - Kosmetologi Estetika di Bali",
  };

  const lang = params.lang || "en";

  return [
    { title: langTitles[lang] || langTitles.en },
    {
      name: "description",
      content: langDescriptions[lang] || langDescriptions.en,
    },
    { property: "og:locale", content: lang === "ru" ? "ru_RU" : lang === "id" ? "id_ID" : "en_US" },
  ];
}

export default function Home() {
  const { t } = useTranslation();

  return (
    <section className="min-h-[calc(100vh-5rem)] bg-cornsilk flex flex-col items-center justify-center text-center px-6 py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tea-green/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-beige/50 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl">
        {/* H1 with Playwrite Ireland */}
        <h1 className="text-paynes-gray text-4xl xs:text-5xl md:text-7xl mb-4">
          Silentium
        </h1>

        {/* H3 with Bricolage Grotesque */}
        <h3 className="text-paynes-gray/80 text-lg md:text-xl max-w-md mx-auto mb-8">
          {t("hero.tagline")}
        </h3>

        {/* P with EB Garamond */}
        <p className="text-paynes-gray/60 text-base md:text-lg max-w-sm mx-auto mb-12 italic">
          &ldquo;{t("hero.quote")}&rdquo;
        </p>

        {/* Glassmorphism card */}
        <div className="glass p-8 max-w-sm mx-auto">
          <p className="text-paynes-gray uppercase tracking-[0.15em] text-sm mb-2 font-heading">
            {t("common.comingSoon")}
          </p>
          <p className="text-paynes-gray/70 text-sm">
            {t("common.location")}
          </p>
        </div>

        {/* Color palette preview */}
        <div className="mt-16 flex justify-center gap-3">
          <div
            className="w-10 h-10 rounded-full bg-tea-green shadow-sm"
            title="Tea Green - #CCD5AE"
          />
          <div
            className="w-10 h-10 rounded-full bg-beige shadow-sm"
            title="Beige - #E9EDC9"
          />
          <div
            className="w-10 h-10 rounded-full bg-cornsilk border border-paynes-gray/10 shadow-sm"
            title="Cornsilk - #FEFAE0"
          />
          <div
            className="w-10 h-10 rounded-full bg-papaya-whip shadow-sm"
            title="Papaya Whip - #FAEDCD"
          />
          <div
            className="w-10 h-10 rounded-full bg-paynes-gray shadow-sm"
            title="Payne's Gray - #5C6B73"
          />
        </div>
        <p className="text-paynes-gray/50 text-xs mt-4 tracking-wider uppercase font-heading">
          {t("common.brandPalette")}
        </p>
      </div>
    </section>
  );
}
