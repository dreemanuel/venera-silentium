import { motion, type Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router';
import { Calendar, ArrowRight } from 'lucide-react';
import { getThumbnailUrl } from '~/lib/image';
import type { BlogPost, Language, BlogPostCategory } from '~/lib/sanity';
import { getLocalizedValue } from '~/lib/sanity';

interface BlogsSectionProps {
  posts: BlogPost[];
  lang: Language;
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
}

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
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
        <div className="relative h-48 overflow-hidden bg-beige">
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
        <div className="p-5">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-paynes-gray/50 mb-2">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>

          {/* Title */}
          <h3 className="font-heading text-lg font-medium text-paynes-gray mb-2 line-clamp-2 group-hover:text-tea-green transition-colors duration-300">
            {title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-sm text-paynes-gray/70 line-clamp-2 leading-relaxed mb-4">
              {excerpt}
            </p>
          )}

          {/* Read more */}
          <div className="flex items-center text-sm font-heading text-paynes-gray/50 group-hover:text-paynes-gray transition-colors duration-300">
            <span className="mr-2">Read More</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function BlogsSection({
  posts,
  lang,
  title,
  subtitle,
  showViewAll = true,
}: BlogsSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  if (posts.length === 0) return null;

  const viewAllText: Record<Language, string> = {
    en: 'View All Articles',
    ru: 'Все статьи',
    id: 'Lihat Semua Artikel',
  };

  return (
    <section ref={ref} className="py-16 md:py-24 bg-cornsilk">
      <motion.div
        className="container mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        {(title || subtitle) && (
          <motion.div variants={itemVariants} className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-paynes-gray mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="font-heading text-lg text-paynes-gray/70 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* Blog cards - horizontal scroll on mobile */}
        <div className="overflow-x-auto md:overflow-visible -mx-6 md:mx-0 px-6 md:px-0 pb-4 md:pb-0">
          <motion.div
            variants={containerVariants}
            className="flex md:grid md:grid-cols-3 gap-6 min-w-max md:min-w-0"
          >
            {posts.slice(0, 3).map((post) => (
              <div key={post._id} className="w-72 md:w-auto flex-shrink-0 md:flex-shrink">
                <BlogCard post={post} lang={lang} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* View all button */}
        {showViewAll && posts.length > 0 && (
          <motion.div variants={itemVariants} className="text-center mt-10">
            <Link
              to={`/${lang}/blog`}
              className="inline-flex items-center gap-2 px-6 py-3 font-heading text-paynes-gray border-2 border-paynes-gray/30 rounded-lg hover:bg-paynes-gray hover:text-cornsilk transition-all duration-300"
            >
              <span>{viewAllText[lang]}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
