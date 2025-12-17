import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
  Link,
} from "react-router";
import { Analytics } from "@vercel/analytics/react";
import { HeroUIProvider } from "@heroui/react";

import type { Route } from "./+types/root";
import "./app.css";
import { defaultLanguage, isValidLanguage, type SupportedLanguage } from "~/lib/i18n";
import { LocalBusinessSchema, WebSiteSchema, PersonSchema } from "~/components/seo";

export const links: Route.LinksFunction = () => [
  // DNS prefetch for external resources
  { rel: "dns-prefetch", href: "https://cdn.sanity.io" },
  // Preconnect to Google Fonts
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  // Preload local fonts
  { rel: "preload", href: "/fonts/ashford-bold.otf", as: "font", type: "font/otf", crossOrigin: "anonymous" },
  // Favicon
  { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
  { rel: "icon", href: "/icon.svg", type: "image/svg+xml" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const matches = useMatches();
  const langMatch = matches.find((m) => m.params.lang);
  const lang = langMatch?.params.lang;
  const htmlLang = lang && isValidLanguage(lang) ? lang : defaultLanguage;

  return (
    <html lang={htmlLang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fefae0" />
        <meta name="color-scheme" content="light" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <LocalBusinessSchema />
        <WebSiteSchema />
        <PersonSchema />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <HeroUIProvider>
      <Outlet />
      <Analytics />
    </HeroUIProvider>
  );
}

// Error content based on language
const errorContent: Record<SupportedLanguage, {
  notFound: { title: string; description: string; backHome: string; viewServices: string };
  general: { title: string; description: string; backHome: string };
}> = {
  en: {
    notFound: {
      title: "Page Not Found",
      description: "The page you're looking for doesn't exist or has been moved.",
      backHome: "Back to Home",
      viewServices: "View Services",
    },
    general: {
      title: "Something Went Wrong",
      description: "We're sorry, but something unexpected happened. Please try again.",
      backHome: "Back to Home",
    },
  },
  ru: {
    notFound: {
      title: "Страница не найдена",
      description: "Страница, которую вы ищете, не существует или была перемещена.",
      backHome: "На главную",
      viewServices: "Смотреть услуги",
    },
    general: {
      title: "Что-то пошло не так",
      description: "Извините, произошла непредвиденная ошибка. Пожалуйста, попробуйте ещё раз.",
      backHome: "На главную",
    },
  },
  id: {
    notFound: {
      title: "Halaman Tidak Ditemukan",
      description: "Halaman yang Anda cari tidak ada atau telah dipindahkan.",
      backHome: "Kembali ke Beranda",
      viewServices: "Lihat Layanan",
    },
    general: {
      title: "Terjadi Kesalahan",
      description: "Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi.",
      backHome: "Kembali ke Beranda",
    },
  },
};

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const matches = useMatches();
  const langMatch = matches.find((m) => m.params.lang);
  const langParam = langMatch?.params.lang;
  const lang: SupportedLanguage = langParam && isValidLanguage(langParam) ? langParam : defaultLanguage;

  const is404 = isRouteErrorResponse(error) && error.status === 404;
  const notFoundContent = errorContent[lang].notFound;
  const generalContent = errorContent[lang].general;
  const stack = import.meta.env.DEV && error && error instanceof Error ? error.stack : undefined;

  return (
    <main className="min-h-screen bg-cornsilk flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        {/* Decorative 404 number */}
        {is404 && (
          <div className="mb-6">
            <span className="text-8xl md:text-9xl font-display text-tea-green/40">
              404
            </span>
          </div>
        )}

        {/* Error icon for non-404 errors */}
        {!is404 && (
          <div className="mb-6">
            <span className="text-6xl">⚠️</span>
          </div>
        )}

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-display text-paynes-gray mb-4">
          {is404 ? notFoundContent.title : generalContent.title}
        </h1>

        {/* Description */}
        <p className="text-paynes-gray/70 font-body text-lg mb-8 leading-relaxed">
          {is404 ? notFoundContent.description : generalContent.description}
        </p>

        {/* Navigation options */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={`/${lang}`}
            className="inline-flex items-center justify-center px-6 py-3 bg-paynes-gray text-cornsilk font-heading text-sm tracking-wide  hover:bg-paynes-gray/90 transition-colors"
          >
            {is404 ? notFoundContent.backHome : generalContent.backHome}
          </Link>
          {is404 && (
            <Link
              to={`/${lang}/services`}
              className="inline-flex items-center justify-center px-6 py-3 border border-paynes-gray text-paynes-gray font-heading text-sm tracking-wide  hover:bg-paynes-gray/10 transition-colors"
            >
              {notFoundContent.viewServices}
            </Link>
          )}
        </div>

        {/* Dev stack trace */}
        {stack && (
          <details className="mt-8 text-left">
            <summary className="text-sm text-paynes-gray/50 cursor-pointer hover:text-paynes-gray">
              Developer Details
            </summary>
            <pre className="mt-4 p-4 bg-paynes-gray/10  overflow-x-auto text-xs text-paynes-gray/70">
              <code>{stack}</code>
            </pre>
          </details>
        )}
      </div>
    </main>
  );
}
