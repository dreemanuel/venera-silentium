import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { SITE_URL, SUPPORTED_LANGUAGES } from '~/lib/seo';

interface HreflangLinksProps {
  currentLang: string;
}

/**
 * Injects hreflang and canonical link tags into the document head
 * This is a client-side solution for React Router v7
 */
export function HreflangLinks({ currentLang }: HreflangLinksProps) {
  const location = useLocation();

  useEffect(() => {
    // Remove existing hreflang and canonical links
    const existingLinks = document.querySelectorAll(
      'link[rel="alternate"][hreflang], link[rel="canonical"]'
    );
    existingLinks.forEach((link) => link.remove());

    // Get the path without language prefix
    const pathWithoutLang = location.pathname.replace(/^\/(en|ru|id)/, '') || '';

    // Add hreflang links for each language
    SUPPORTED_LANGUAGES.forEach((lang) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      link.href = `${SITE_URL}/${lang}${pathWithoutLang}`;
      document.head.appendChild(link);
    });

    // Add x-default hreflang
    const xDefaultLink = document.createElement('link');
    xDefaultLink.rel = 'alternate';
    xDefaultLink.hreflang = 'x-default';
    xDefaultLink.href = `${SITE_URL}/en${pathWithoutLang}`;
    document.head.appendChild(xDefaultLink);

    // Add canonical link
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = `${SITE_URL}/${currentLang}${pathWithoutLang}`;
    document.head.appendChild(canonicalLink);

    // Cleanup on unmount or when path changes
    return () => {
      const links = document.querySelectorAll(
        'link[rel="alternate"][hreflang], link[rel="canonical"]'
      );
      links.forEach((link) => link.remove());
    };
  }, [location.pathname, currentLang]);

  // This component doesn't render anything visible
  return null;
}
