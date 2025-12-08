import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Instagram, Facebook, Send, MessageCircle } from "lucide-react";
import type { SupportedLanguage } from "~/lib/i18n";

interface FooterProps {
  lang: SupportedLanguage;
}

export function Footer({ lang }: FooterProps) {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { key: "about", href: `/${lang}/about` },
    { key: "services", href: `/${lang}/services` },
    { key: "contact", href: `/${lang}/contact` },
  ];

  const legalLinks = [
    { key: "privacyPolicy", href: `/${lang}/privacy` },
    { key: "termsOfService", href: `/${lang}/terms` },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: Instagram,
    },
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: Facebook,
    },
    {
      name: "Telegram",
      href: "https://t.me",
      icon: Send,
    },
    {
      name: "WhatsApp",
      href: "https://wa.me",
      icon: MessageCircle,
    },
  ];

  return (
    <footer className="bg-beige/50 border-t border-tea-green/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link
              to={`/${lang}`}
              className="inline-block text-paynes-gray font-display text-2xl mb-4"
            >
              Woman Silentium
            </Link>
            <p className="text-paynes-gray/70 text-sm leading-relaxed max-w-sm mb-6">
              {t("hero.tagline")}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-paynes-gray/60 hover:text-paynes-gray hover:bg-tea-green/30 rounded-lg transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-paynes-gray font-heading font-medium text-sm uppercase tracking-wider mb-4">
              {t("nav.home")}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    to={link.href}
                    className="text-paynes-gray/70 hover:text-paynes-gray text-sm transition-colors"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-paynes-gray font-heading font-medium text-sm uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    to={link.href}
                    className="text-paynes-gray/70 hover:text-paynes-gray text-sm transition-colors"
                  >
                    {t(`footer.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-tea-green/30">
          <p className="text-paynes-gray/50 text-sm text-center">
            &copy; {currentYear} Woman Silentium. {t("footer.copyright")}.
          </p>
        </div>
      </div>
    </footer>
  );
}
