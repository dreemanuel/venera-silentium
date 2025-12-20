import { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { PromoBanner as PromoBannerType, Language } from '~/lib/sanity';
import { getLocalizedValue } from '~/lib/sanity';

interface PromoBannerProps {
  banner: PromoBannerType;
  lang: Language;
}

const bgColorMap: Record<string, string> = {
  'tea-green': 'bg-tea-green',
  'beige': 'bg-beige',
  'paynes-gray': 'bg-paynes-gray',
  'cornsilk': 'bg-cornsilk',
  'papaya-whip': 'bg-papaya-whip',
};

const textColorMap: Record<string, string> = {
  'dark': 'text-paynes-gray',
  'light': 'text-cornsilk',
};

export function PromoBanner({ banner, lang }: PromoBannerProps) {
  const [isDismissed, setIsDismissed] = useState(() => {
    // Check localStorage on mount (only runs on client)
    if (typeof window !== 'undefined' && banner.dismissible) {
      try {
        const dismissedBanners = JSON.parse(
          window.localStorage.getItem('dismissedBanners') || '[]'
        ) as string[];
        return dismissedBanners.includes(banner._id);
      } catch {
        return false;
      }
    }
    return false;
  });

  const handleDismiss = () => {
    setIsDismissed(true);
    if (banner.dismissible && typeof window !== 'undefined') {
      try {
        const dismissedBanners = JSON.parse(
          window.localStorage.getItem('dismissedBanners') || '[]'
        ) as string[];
        if (!dismissedBanners.includes(banner._id)) {
          dismissedBanners.push(banner._id);
          window.localStorage.setItem('dismissedBanners', JSON.stringify(dismissedBanners));
        }
      } catch {
        // Ignore localStorage errors
      }
    }
  };

  const message = getLocalizedValue(banner.message, lang);
  const linkText = getLocalizedValue(banner.linkText, lang);
  const bgColor = bgColorMap[banner.backgroundColor || 'tea-green'] || 'bg-tea-green';
  const textColor = textColorMap[banner.textColor || 'dark'] || 'text-paynes-gray';

  if (isDismissed || !message) return null;

  const isInternalLink = banner.linkUrl?.startsWith('/');

  const isTop = banner.position !== 'bottom';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: isTop ? -20 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: isTop ? -20 : 20 }}
        transition={{ duration: 0.3 }}
        className={`${bgColor} ${textColor} fixed left-0 right-0 ${
          isTop ? 'top-0 z-[60]' : 'bottom-0 z-40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="flex-1 text-sm font-heading tracking-wide text-center sm:text-left">
              {message}
              {banner.linkUrl && linkText && (
                <>
                  {' '}
                  {isInternalLink ? (
                    <Link
                      to={banner.linkUrl}
                      className="font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
                    >
                      {linkText}
                    </Link>
                  ) : (
                    <a
                      href={banner.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
                    >
                      {linkText}
                    </a>
                  )}
                </>
              )}
            </p>

            {banner.dismissible && (
              <button
                onClick={handleDismiss}
                className={`p-1 rounded-full hover:bg-black/10 transition-colors ${textColor}`}
                aria-label="Dismiss banner"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

interface PromoBannersListProps {
  banners: PromoBannerType[];
  lang: Language;
  position?: 'top' | 'bottom';
  currentPage?: string;
}

export function PromoBannersList({ banners, lang, position = 'top', currentPage = 'home' }: PromoBannersListProps) {
  // Filter banners by position and current page
  const filteredBanners = banners.filter((banner) => {
    // Check position
    if ((banner.position || 'top') !== position) return false;

    // Check page visibility
    const showOnPages = banner.showOnPages || ['all'];
    if (showOnPages.includes('all')) return true;
    return showOnPages.includes(currentPage as 'home' | 'about' | 'services' | 'contact' | 'blog');
  });

  if (filteredBanners.length === 0) return null;

  // Show only the highest priority banner
  const topBanner = filteredBanners[0];
  if (!topBanner) return null;

  return <PromoBanner banner={topBanner} lang={lang} />;
}
