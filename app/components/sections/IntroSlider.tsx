import { Swiper, SwiperSlide } from 'swiper/react';
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

  return null;
}

export function IntroSlider({ slides, lang, stats }: IntroSliderProps) {
  const { ref: statsRef, inView: statsInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <section className="intro-slider-section">
      {/* Swiper Container */}
      <Swiper
        modules={[Parallax, Pagination, Mousewheel, A11y]}
        direction="vertical"
        parallax={true}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true,
        }}
        pagination={{
          clickable: true,
          el: '.intro-slider-pagination',
          bulletClass: 'intro-slider-bullet',
          bulletActiveClass: 'intro-slider-bullet-active',
        }}
        speed={1000}
        className="intro-slider-swiper"
        a11y={{
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
        }}
      >
        {slides.map((slide) => {
          const prefix = getLocalizedValue(slide.headlinePrefix, lang) || '';
          const emphasis = getLocalizedValue(slide.headlineEmphasis, lang) || '';
          const suffix = getLocalizedValue(slide.headlineSuffix, lang) || '';
          const subtitle = getLocalizedValue(slide.subtitle, lang) || '';
          const imageUrl = slide.backgroundImage
            ? urlFor(slide.backgroundImage).width(1920).quality(85).url()
            : '';
          const overlayOpacity = slide.overlayOpacity ?? 30;

          return (
            <SwiperSlide key={slide._key} className="intro-slider-slide">
              {/* Split Screen Layout */}
              <div className="intro-slider-content">
                {/* Left Panel - Headline */}
                <div className="intro-slider-left" data-swiper-parallax-y="-20%">
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

                {/* Right Panel - Image + Text */}
                <div className="intro-slider-right" data-swiper-parallax-y="35%">
                  {/* Background Image with Ken Burns */}
                  {imageUrl && (
                    <div className="intro-slider-image-wrapper">
                      <div
                        className={`intro-slider-image ${getKenBurnsClass(slide.kenBurnsDirection)}`}
                        style={{ backgroundImage: `url(${imageUrl})` }}
                      />
                      <div
                        className="intro-slider-image-overlay"
                        style={{ opacity: overlayOpacity / 100 }}
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

      {/* Stats Bar - Outside Swiper */}
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
    </section>
  );
}
