import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, Link } from 'react-router';
import { motion, type Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, ArrowRight } from 'lucide-react';
import type { Route } from './+types/blog';
import { ContactCTA } from '~/components/sections';
import { sanityClient } from '~/lib/sanity/client.server';
import {
  blogPostsQuery,
  type BlogPost,
  type Language,
  type BlogPostCategory,
  getLocalizedValue,
} from '~/lib/sanity';
import { getThumbnailUrl } from '~/lib/image';
import { generateMeta, SITE_URL, SITE_NAME, getOgLocale } from '~/lib/seo';

const categoryLabels: Record<BlogPostCategory, Record<Language, string>> = {
  'skincare-tips': {
    en: 'Skincare Tips',
    ru: 'Советы по уходу',
    id: 'Tips Perawatan',
  },
  'treatment-guides': {
    en: 'Treatment Guides',
    ru: 'Руководства',
    id: 'Panduan Perawatan',
  },
  wellness: {
    en: 'Wellness',
    ru: 'Здоровье',
    id: 'Kesehatan',
  },
  news: {
    en: 'News & Updates',
    ru: 'Новости',
    id: 'Berita',
  },
};

export async function loader({ params }: Route.LoaderArgs) {
  const lang = (params.lang || 'en') as Language;

  let posts: BlogPost[] = [];
  try {
    posts = await sanityClient.fetch<BlogPost[]>(blogPostsQuery);
  } catch {
    console.log('Failed to fetch blog posts from Sanity');
  }

  return { posts, lang };
}

export function meta({ params }: Route.MetaArgs) {
  const lang = (params.lang || 'en') as 'en' | 'ru' | 'id';

  const titles = {
    en: `Blog | ${SITE_NAME} - Aesthetic Cosmetology`,
    ru: `Блог | ${SITE_NAME} - Эстетическая косметология`,
    id: `Blog | ${SITE_NAME} - Kosmetologi Estetika`,
  } as const;

  const descriptions = {
    en: 'Expert insights, skincare tips, and treatment guides from Dr. Venera Frolova.',
    ru: 'Экспертные советы, рекомендации по уходу за кожей и руководства по процедурам от Др. Венеры Фроловой.',
    id: 'Wawasan ahli, tips perawatan kulit, dan panduan perawatan dari Dr. Venera Frolova.',
  } as const;

  return generateMeta({
    title: titles[lang],
    description: descriptions[lang],
    url: `${SITE_URL}/${lang}/blog`,
    locale: getOgLocale(lang),
  });
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

function BlogCard({ post, lang }: { post: BlogPost; lang: Language }) {
  const title = getLocalizedValue(post.title, lang) || 'Untitled Post';
  const excerpt = getLocalizedValue(post.excerpt, lang);
  const imageUrl = post.featuredImage
    ? getThumbnailUrl(post.featuredImage, 600, 400, 80)
    : null;
  const categoryLabel = categoryLabels[post.category]?.[lang] || post.category;

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(
        lang === 'ru' ? 'ru-RU' : lang === 'id' ? 'id-ID' : 'en-US',
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }
      )
    : '';

  return (
    <motion.article variants={itemVariants} className="group">
      <Link
        to={`/${lang}/blog/${post.slug.current}`}
        className="block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
      >
        {/* Image */}
        <div className="relative h-48 md:h-56 overflow-hidden bg-beige">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-tea-green/30 to-beige">
              <span className="text-5xl text-paynes-gray/20">&#x2766;</span>
            </div>
          )}

          {/* Category badge */}
          <span className="absolute top-3 left-3 px-3 py-1 text-xs font-heading uppercase tracking-wider bg-white/90 text-paynes-gray rounded-full">
            {categoryLabel}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          {/* Date & Author */}
          <div className="flex items-center gap-2 text-sm text-paynes-gray/50 mb-3">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
            {post.author && (
              <>
                <span className="mx-1">•</span>
                <span>{post.author}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h2 className="font-heading text-xl font-medium text-paynes-gray mb-3 line-clamp-2 group-hover:text-tea-green transition-colors duration-300">
            {title}
          </h2>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-sm text-paynes-gray/70 line-clamp-3 leading-relaxed mb-4">
              {excerpt}
            </p>
          )}

          {/* Read more */}
          <div className="flex items-center text-sm font-heading text-paynes-gray/50 group-hover:text-paynes-gray transition-colors duration-300">
            <span className="mr-2">
              {lang === 'ru' ? 'Читать далее' : lang === 'id' ? 'Baca Selengkapnya' : 'Read More'}
            </span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function Blog() {
  const { t } = useTranslation();
  const { posts, lang } = useLoaderData<typeof loader>();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeCategory, setActiveCategory] = useState<BlogPostCategory | 'all'>('all');

  const headings: Record<Language, string> = {
    en: 'Our Blog',
    ru: 'Наш блог',
    id: 'Blog Kami',
  };

  const subheadings: Record<Language, string> = {
    en: 'Expert insights and skincare tips from Dr. Venera',
    ru: 'Экспертные советы по уходу за кожей от Др. Венеры',
    id: 'Wawasan ahli dan tips perawatan kulit dari Dr. Venera',
  };

  // Get unique categories from posts
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  // Filter posts by category
  const filteredPosts =
    activeCategory === 'all'
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-beige/50 to-cornsilk">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-0 w-64 h-64 bg-tea-green/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-papaya-whip/40 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-paynes-gray mb-6">
              {headings[lang]}
            </h1>
            <p className="font-heading text-lg md:text-xl text-paynes-gray/70">
              {subheadings[lang]}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section ref={ref} className="py-16 md:py-24 bg-cornsilk">
        <div className="container mx-auto px-6">
          {/* Category filters */}
          {categories.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-5 py-2 rounded-full text-sm font-heading transition-all duration-300 ${
                  activeCategory === 'all'
                    ? 'bg-paynes-gray text-cornsilk'
                    : 'bg-white text-paynes-gray hover:bg-tea-green/20'
                }`}
              >
                {lang === 'en' ? 'All' : lang === 'ru' ? 'Все' : 'Semua'}
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-heading transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-paynes-gray text-cornsilk'
                      : 'bg-white text-paynes-gray hover:bg-tea-green/20'
                  }`}
                >
                  {categoryLabels[category]?.[lang] || category}
                </button>
              ))}
            </motion.div>
          )}

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredPosts.map((post) => (
                <BlogCard key={post._id} post={post} lang={lang} />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-paynes-gray/70 font-heading">
                {t('common.comingSoon')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <ContactCTA
        heading={t('contact.ctaHeading')}
        subheading={t('contact.ctaSubheading')}
        bookButtonText={t('contact.bookConsultation')}
        whatsappButtonText={t('contact.whatsappUs')}
        bookLink={`/${lang}/contact`}
        whatsappNumber="yourphonenumber"
      />
    </>
  );
}
