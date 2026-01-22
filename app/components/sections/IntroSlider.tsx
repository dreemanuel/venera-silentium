import { useState, useCallback, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Parallax, Pagination, Mousewheel, A11y } from 'swiper/modules';
import { PortableText } from '@portabletext/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { IntroSlide, Language, LocalizedText, PortableTextBlock } from '~/lib/sanity/types';
import { getLocalizedValue, urlFor } from '~/lib/sanity';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/parallax';
import 'swiper/css/pagination';

interface IntroSliderProps {
  slides: IntroSlide[];
  lang: Language;
  stats: {
    value: string;
    label: string;
  }[];
}

// Helper to get Ken Burns animation class
function getKenBurnsClass(direction?: string): string {
  switch (direction) {
    case 'zoomOut':
      return 'intro-slider-ken-burns-zoom-out';
    case 'panLeft':
      return 'intro-slider-ken-burns-pan-left';
    case 'panRight':
      return 'intro-slider-ken-burns-pan-right';
    case 'zoomIn':
    default:
      return 'intro-slider-ken-burns-zoom-in';
  }
}

// Helper to render portable text or string
function renderParagraph(
  paragraph: LocalizedText | undefined,
  lang: Language
): React.ReactNode {
  const localizedParagraph = paragraph?.[lang] ?? paragraph?.en;

  if (!localizedParagraph) return null;

  // Check if it's PortableText blocks
  if (Array.isArray(localizedParagraph) && localizedParagraph.length > 0) {
    return <PortableText value={localizedParagraph as PortableTextBlock[]} />;
  }

  // Handle plain string fallback
  if (typeof localizedParagraph === 'string') {
    return <p>{localizedParagraph}</p>;
  }

  return null;
}

// Navbar height constant (adjust if your navbar has a different height)
const NAVBAR_HEIGHT = 80;

export function IntroSlider({ slides, lang, stats }: IntroSliderProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const hasSnapped = useRef(false);

  const { ref: statsRef, inView: statsInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Ref callback for section (used to track element for scroll calculations)
  const { ref: sectionInViewRef } = useInView({
    threshold: 0.1,
  });

  const totalSlides = slides?.length || 0;
  const isFirstSlide = activeIndex === 0;
  const isLastSlide = activeIndex === totalSlides - 1;

  // Combine refs for section
  const setSectionRefs = useCallback(
    (node: HTMLElement | null) => {
      sectionRef.current = node;
      sectionInViewRef(node);
    },
    [sectionInViewRef]
  );

  // Snap swiper container to top when it enters viewport
  const snapToTop = useCallback(() => {
    const swiperContainer = swiperContainerRef.current;
    if (!swiperContainer) return;

    const containerTop = swiperContainer.getBoundingClientRect().top + window.scrollY;
    const targetScroll = containerTop - NAVBAR_HEIGHT;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  }, []);

  // Handle snap behavior only - let Swiper handle slide transitions natively
  useEffect(() => {
    const swiperContainer = swiperContainerRef.current;
    if (!swiperContainer || !swiperInstance) return;

    const handleWheel = (e: WheelEvent) => {
      const containerRect = swiperContainer.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerBottom = containerRect.bottom;
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      // Get current slide state directly from swiper
      const currentIndex = swiperInstance.activeIndex;
      const atFirstSlide = currentIndex === 0;
      const atLastSlide = currentIndex === totalSlides - 1;

      // Check if swiper container is at the snap position
      const isAtTop = containerTop <= NAVBAR_HEIGHT + 10 && containerTop >= NAVBAR_HEIGHT - 50;

      // Entering from above (scrolling down into swiper)
      const isEnteringFromAbove = containerTop > NAVBAR_HEIGHT && containerTop < window.innerHeight * 0.6;

      // Entering from below (scrolling up into swiper)
      const isEnteringFromBelow = containerBottom > window.innerHeight * 0.4 && containerTop < 0;

      // At edges - allow Swiper's releaseOnEdges to handle it, don't block
      if (isAtTop && atFirstSlide && scrollingUp) {
        hasSnapped.current = false;
        return;
      }
      if (isAtTop && atLastSlide && scrollingDown) {
        hasSnapped.current = false;
        return;
      }

      // Snap when entering from above
      if (scrollingDown && isEnteringFromAbove && !hasSnapped.current) {
        e.preventDefault();
        hasSnapped.current = true;
        snapToTop();
        return;
      }

      // Snap when entering from below
      if (scrollingUp && isEnteringFromBelow && !hasSnapped.current) {
        e.preventDefault();
        hasSnapped.current = true;
        swiperInstance.slideTo(totalSlides - 1, 0);
        snapToTop();
        return;
      }

      // When snapped and not at edges, block page scroll
      if (isAtTop && hasSnapped.current && !atFirstSlide && !atLastSlide) {
        e.preventDefault();
        return;
      }

      // In the middle slides, still need to block page scroll
      if (isAtTop && hasSnapped.current) {
        if ((atFirstSlide && scrollingDown) || (atLastSlide && scrollingUp)) {
          e.preventDefault();
          return;
        }
      }

      // Reset snap when far from position
      if (containerTop > NAVBAR_HEIGHT + 150) {
        hasSnapped.current = false;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [swiperInstance, snapToTop, totalSlides]);

  // Handle slide change
  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  }, []);

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <section ref={setSectionRefs} className={`intro-slider-section ${isLocked ? 'is-locked' : ''}`}>
      {/* Stats Bar - ABOVE slider as visual separator from Hero */}
      <motion.div
        ref={statsRef}
        className="intro-slider-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="intro-slider-stats-inner">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`intro-slider-stat ${
                index < stats.length - 1 ? 'intro-slider-stat-bordered' : ''
              }`}
            >
              <div className="intro-slider-stat-value">{stat.value}</div>
              <div className="intro-slider-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Swiper Container */}
      <div ref={swiperContainerRef} className="intro-slider-swiper-wrapper">
        <Swiper
          modules={[Parallax, Pagination, Mousewheel, A11y]}
          direction="vertical"
          parallax={true}
          mousewheel={{
            sensitivity: 1,
            thresholdDelta: 50,
            releaseOnEdges: true,
          }}
          pagination={{
            clickable: true,
            el: '.intro-slider-pagination',
            bulletClass: 'intro-slider-bullet',
            bulletActiveClass: 'intro-slider-bullet-active',
          }}
          speed={800}
          cssMode={false}
          className="intro-slider-swiper"
          a11y={{
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
          }}
          onSwiper={setSwiperInstance}
          onSlideChange={handleSlideChange}
        >
        {slides.map((slide) => {
          const prefix = getLocalizedValue(slide.headlinePrefix, lang) || '';
          const emphasis = getLocalizedValue(slide.headlineEmphasis, lang) || '';
          const suffix = getLocalizedValue(slide.headlineSuffix, lang) || '';
          const subtitle = getLocalizedValue(slide.subtitle, lang) || '';
          const leftImageUrl = slide.leftImage
            ? urlFor(slide.leftImage).width(1920).quality(85).url()
            : '';
          const rightImageUrl = slide.rightImage
            ? urlFor(slide.rightImage).width(1920).quality(85).url()
            : '';
          const overlayOpacity = slide.overlayOpacity ?? 30;

          return (
            <SwiperSlide key={slide._key} className="intro-slider-slide">
              {/* Split Screen Layout */}
              <div className="intro-slider-content">
                {/* Left Panel - Headline with Background Image */}
                <div className="intro-slider-left" data-swiper-parallax-y="-20%">
                  {/* Left Background Image with Sepia Filter */}
                  {leftImageUrl && (
                    <div className="intro-slider-image-wrapper">
                      <div
                        className={`intro-slider-image intro-slider-image-left ${getKenBurnsClass(slide.kenBurnsDirection)}`}
                        style={{ backgroundImage: `url(${leftImageUrl})` }}
                      />
                      <div
                        className="intro-slider-image-overlay"
                        style={{ opacity: overlayOpacity / 100 }}
                      />
                    </div>
                  )}

                  {/* Headline Content */}
                  <div className="intro-slider-left-content">
                    {subtitle && (
                      <span
                        className="intro-slider-subtitle"
                        data-swiper-parallax-opacity="0"
                        data-swiper-parallax-y="-100%"
                      >
                        {subtitle}
                      </span>
                    )}
                    <h2 className="intro-slider-headline">
                      <span
                        className="intro-slider-headline-line"
                        data-swiper-parallax-opacity="0"
                        data-swiper-parallax-x="-20%"
                      >
                        {prefix}{' '}
                        <em className="intro-slider-emphasis">{emphasis}</em>
                      </span>
                      {suffix && (
                        <span
                          className="intro-slider-headline-line"
                          data-swiper-parallax-opacity="0"
                          data-swiper-parallax-x="-30%"
                        >
                          {suffix}
                        </span>
                      )}
                    </h2>
                  </div>
                </div>

                {/* Right Panel - Image + Text */}
                <div className="intro-slider-right" data-swiper-parallax-y="35%">
                  {/* Right Background Image with Hue-Rotate Filter */}
                  {rightImageUrl && (
                    <div className="intro-slider-image-wrapper">
                      <div
                        className="intro-slider-image intro-slider-image-right"
                        style={{ backgroundImage: `url(${rightImageUrl})` }}
                      />
                      <div
                        className="intro-slider-image-overlay intro-slider-image-overlay-right"
                        style={{ opacity: (overlayOpacity + 20) / 100 }}
                      />
                    </div>
                  )}

                  {/* Paragraph Text */}
                  <div
                    className="intro-slider-paragraph"
                    data-swiper-parallax-opacity="0"
                    data-swiper-parallax-y="50%"
                  >
                    {renderParagraph(slide.paragraph, lang)}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        {/* Custom Pagination */}
        <div className="intro-slider-pagination" />
        </Swiper>
      </div>
    </section>
  );
}
