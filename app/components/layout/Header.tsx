import { useState, lazy, Suspense, useMemo } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Menu } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "~/components/ui/Button";
import type { SupportedLanguage } from "~/lib/i18n";
import type { NavigationVisibility } from "~/lib/sanity";

// Lazy load mobile menu - only needed on mobile devices
const MobileMenu = lazy(() =>
  import("./MobileMenu").then((mod) => ({ default: mod.MobileMenu }))
);

interface HeaderProps {
  lang: SupportedLanguage;
  hasTopBanner?: boolean;
  navigationVisibility?: NavigationVisibility;
}

interface NavItem {
  key: string;
  href: string;
}

// Map nav keys to visibility settings
const navKeyToVisibility: Record<string, keyof NavigationVisibility> = {
  about: "showAbout",
  services: "showServices",
  blog: "showBlog",
  contact: "showContact",
};

export function Header({ lang, hasTopBanner = false, navigationVisibility }: HeaderProps) {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const allNavItems: NavItem[] = [
    { key: "about", href: `/${lang}/about` },
    { key: "services", href: `/${lang}/services` },
    { key: "blog", href: `/${lang}/blog` },
    { key: "contact", href: `/${lang}/contact` },
  ];

  // Filter nav items based on Sanity visibility settings
  const navItems = useMemo(() => {
    if (!navigationVisibility) return allNavItems;
    return allNavItems.filter((item) => {
      const visibilityKey = navKeyToVisibility[item.key];
      return visibilityKey ? navigationVisibility[visibilityKey] !== false : true;
    });
  }, [navigationVisibility, lang]);

  // Offset header when promo banner is present (banner height ~48px)
  const topOffset = hasTopBanner ? 'top-12' : 'top-0';

  return (
    <>
      <header className={`fixed ${topOffset} left-0 right-0 z-50 bg-sand/50 backdrop-blur-lg border-b border-sand/30 transition-[top] duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              to={`/${lang}`}
              className="text-deep-slate font-display text-2xl md:text-4xl hover:opacity-80 transition-opacity"
            >
              Woman Silentium
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  className="text-deep-slate/70 hover:text-deep-slate font-heading text-sm tracking-wide transition-colors"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher currentLang={lang} />
              <Button as="link" to={`/${lang}/contact`} size="sm">
                {t("hero.cta")}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden p-2 text-deep-slate hover:bg-sand/50  transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - lazy loaded */}
      {isMobileMenuOpen && (
        <Suspense fallback={null}>
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            navItems={navItems}
            lang={lang}
          />
        </Suspense>
      )}
    </>
  );
}
