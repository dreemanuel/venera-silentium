import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import type { Route } from "./+types/not-found";
import { Button } from "~/components/ui/Button";
import type { SupportedLanguage } from "~/lib/i18n";

export function loader(_args: Route.LoaderArgs) {
  // Throw 404 to trigger error boundary with proper status
  throw new Response("Not Found", { status: 404 });
}

export default function NotFound() {
  // This won't render due to loader throwing, but needed for route
  return null;
}

/**
 * Custom 404 error component with brand styling
 * Used by error boundary when status is 404
 */
export function NotFoundPage({ lang }: { lang: SupportedLanguage }) {
  const { t } = useTranslation();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        {/* Decorative element */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <span className="text-8xl md:text-9xl font-display text-tea-green/40">
            404
          </span>
        </motion.div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-display text-paynes-gray mb-4">
          {t("errors.notFound.title")}
        </h1>

        {/* Description */}
        <p className="text-paynes-gray/70 font-body text-lg mb-8 leading-relaxed">
          {t("errors.notFound.description")}
        </p>

        {/* Navigation options */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button as="link" to={`/${lang}`} variant="primary">
            {t("errors.notFound.backHome")}
          </Button>
          <Button as="link" to={`/${lang}/services`} variant="outline">
            {t("errors.notFound.viewServices")}
          </Button>
        </div>

        {/* Help text */}
        <p className="mt-8 text-sm text-paynes-gray/50 font-heading">
          {t("errors.notFound.helpText")}{" "}
          <Link
            to={`/${lang}/contact`}
            className="text-paynes-gray hover:text-tea-green transition-colors underline"
          >
            {t("errors.notFound.contactUs")}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
