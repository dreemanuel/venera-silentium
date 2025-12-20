import { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { PromoBanner as PromoBannerType, Language } from '~/lib/sanity';
import { getLocalizedValue } from '~/lib/sanity';
import { usePromoBanner } from '~/routes/$lang/layout';

// Map speed setting (1-5) to animation duration in seconds
// 1 = slowest (60s), 5 = fastest (15s)
const speedToDuration: Record<number, number> = {
  1: 60,
  2: 45,
  3: 30,
  4: 20,
  5: 15,
};

// Marquee component for scrolling text effect
function Marquee({ children, className, speed = 3 }: { children: React.ReactNode; className?: string; speed?: number }) {
  const duration = speedToDuration[speed] || 30;
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className || ''}`}>
      <div
        className="inline-flex animate-marquee"
        style={{ animationDuration: `${duration}s` }}
      >
        <span className="mx-8">{children}</span>
        <span className="mx-8">{children}</span>
        <span className="mx-8">{children}</span>
        <span className="mx-8">{children}</span>
      </div>
    </div>
  );
}

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
  const { setTopBannerVisible } = usePromoBanner();
  const isTopBanner = banner.position !== 'bottom';

  // Dismiss state - resets on page reload (no localStorage persistence)
  // This ensures important messages are shown on every visit
  const [isDismissed, setIsDismissed] = useState(false);

  const handleDismiss = () => {
    setIsDismissed(true);
    // Notify layout that banner is no longer visible
    if (isTopBanner) {
      setTopBannerVisible(false);
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
        {banner.enableMarquee ? (
          /* Marquee mode - full width scrolling text */
          <div className="flex items-center justify-between py-3 px-4">
            <Marquee className="flex-1" speed={banner.marqueeSpeed || 3}>
              <span className="text-sm font-heading tracking-wide">
                {message}
                {banner.linkUrl && linkText && (
                  <>
                    {' — '}
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
              </span>
            </Marquee>

            {banner.dismissible && (
              <button
                onClick={handleDismiss}
                className={`p-1 rounded-full hover:bg-black/10 transition-colors flex-shrink-0 ml-4 ${textColor}`}
                aria-label="Dismiss banner"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          /* Static mode - centered text */
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
        )}
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
