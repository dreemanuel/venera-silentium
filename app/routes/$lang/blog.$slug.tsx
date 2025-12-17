import { useTranslation } from 'react-i18next';
import { useLoaderData, Link } from 'react-router';
import { motion, type Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, User, ChevronLeft, ArrowRight } from 'lucide-react';
import type { Route } from './+types/blog.$slug';
import { ContactCTA } from '~/components/sections';
import { BreadcrumbSchema } from '~/components/seo';
import { sanityClient } from '~/lib/sanity/client.server';
import {
  blogPostBySlugQuery,
  blogPostsByCategoryQuery,
  urlFor,
  getLocalizedValue,
  type BlogPost,
  type Language,
  type PortableTextBlock,
  type BlogPostCategory,
} from '~/lib/sanity';
import { getThumbnailUrl, getHeroImageUrl } from '~/lib/image';
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
  const slug = params.slug;

  if (!slug) {
    throw new Response('Blog post not found', { status: 404 });
  }

  // Fetch blog post by slug
  const post = await sanityClient.fetch<BlogPost | null>(blogPostBySlugQuery, { slug });

  if (!post) {
    throw new Response('Blog post not found', { status: 404 });
  }

  // Fetch related posts from same category
  let relatedPosts: BlogPost[] = [];
  try {
    const categoryPosts = await sanityClient.fetch<BlogPost[]>(blogPostsByCategoryQuery, {
      category: post.category,
    });
    relatedPosts = categoryPosts
      .filter((p) => p._id !== post._id)
      .slice(0, 3);
  } catch {
    // Ignore related posts fetch errors
  }

  return { post, relatedPosts, lang };
}

export function meta({ data, params }: Route.MetaArgs) {
  const lang = (params.lang || 'en') as Language;

  if (!data?.post) {
    return [{ title: `Blog Post Not Found | ${SITE_NAME}` }];
  }

  const title = getLocalizedValue(data.post.title, lang) || 'Blog Post';
  const description =
    getLocalizedValue(data.post.excerpt, lang) ||
    'Read this article on Woman Silentium blog.';

  const ogImage = data.post.featuredImage
    ? urlFor(data.post.featuredImage).width(1200).height(630).quality(85).url()
    : undefined;

  return generateMeta({
    title: `${title} | ${SITE_NAME}`,
    description,
    url: `${SITE_URL}/${lang}/blog/${data.post.slug?.current}`,
    locale: getOgLocale(lang),
    image: ogImage,
    type: 'article',
  });
}

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Portable Text renderer
function renderPortableText(blocks: PortableTextBlock[] | undefined): React.ReactNode {
  if (!blocks || blocks.length === 0) return null;

  return blocks.map((block, index) => {
    if (block._type === 'block') {
      const text = block.children?.map((child) => child.text).join('') || '';

      if (block.style === 'h2') {
        return (
          <h2 key={block._key || index} className="text-2xl md:text-3xl text-paynes-gray mt-10 mb-4">
            {text}
          </h2>
        );
      }
      if (block.style === 'h3') {
        return (
          <h3 key={block._key || index} className="font-heading text-xl md:text-2xl text-paynes-gray mt-8 mb-3">
            {text}
          </h3>
        );
      }
      if (block.style === 'blockquote') {
        return (
          <blockquote
            key={block._key || index}
            className="border-l-4 border-tea-green pl-6 my-6 text-paynes-gray/80 italic text-lg"
          >
            {text}
          </blockquote>
        );
      }
      return (
        <p key={block._key || index} className="mb-4 text-lg leading-relaxed">
          {text}
        </p>
      );
    }
    return null;
  });
}

function RelatedPostCard({ post, lang }: { post: BlogPost; lang: Language }) {
  const title = getLocalizedValue(post.title, lang) || 'Untitled';
  const imageUrl = post.featuredImage
    ? getThumbnailUrl(post.featuredImage, 300, 200, 80)
    : null;

  return (
    <Link
      to={`/${lang}/blog/${post.slug.current}`}
      className="group block bg-white  shadow-md hover:shadow-lg transition-shadow overflow-hidden"
    >
      <div className="h-32 bg-beige overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-tea-green/30 to-beige">
            <span className="text-3xl text-paynes-gray/20">&#x2766;</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h4 className="font-heading text-sm font-medium text-paynes-gray group-hover:text-tea-green transition-colors line-clamp-2">
          {title}
        </h4>
      </div>
    </Link>
  );
}

export default function BlogPostDetail() {
  const { t } = useTranslation();
  const { post, relatedPosts, lang } = useLoaderData<typeof loader>();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const title = getLocalizedValue(post.title, lang) || 'Blog Post';
  const excerpt = getLocalizedValue(post.excerpt, lang);
  const content = getLocalizedValue(post.content, lang);
  const categoryLabel = categoryLabels[post.category]?.[lang] || post.category;

  const heroImageUrl = post.featuredImage
    ? getHeroImageUrl(post.featuredImage, 1600, 90)
    : null;

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

  const blogLabel = lang === 'ru' ? 'Блог' : lang === 'id' ? 'Blog' : 'Blog';

  // Breadcrumb data
  const breadcrumbItems = [
    { name: 'Home', url: `/${lang}` },
    { name: blogLabel, url: `/${lang}/blog` },
    { name: title, url: `/${lang}/blog/${post.slug?.current}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-end">
        {heroImageUrl ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImageUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-paynes-gray/80 via-paynes-gray/40 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-tea-green/30 via-beige to-cornsilk" />
        )}

        <div className="relative z-10 container mx-auto px-6 pb-12 pt-24">
          {/* Back link */}
          <Link
            to={`/${lang}/blog`}
            className={`inline-flex items-center text-sm mb-6 transition-colors ${
              heroImageUrl
                ? 'text-cornsilk/80 hover:text-cornsilk'
                : 'text-paynes-gray/60 hover:text-paynes-gray'
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            {blogLabel}
          </Link>

          {/* Category badge */}
          <span
            className={`inline-block px-3 py-1 text-xs font-heading uppercase tracking-wider rounded-full mb-4 ${
              heroImageUrl
                ? 'bg-white/90 text-paynes-gray'
                : 'bg-paynes-gray/10 text-paynes-gray'
            }`}
          >
            {categoryLabel}
          </span>

          <h1
            className={`font-display text-4xl md:text-5xl lg:text-6xl max-w-4xl mb-2 leading-[0.75] ${
              heroImageUrl ? 'text-cornsilk' : 'text-paynes-gray'
            }`}
          >
            {title}
          </h1>

          {/* Meta info */}
          <div
            className={`flex flex-wrap items-center gap-4 text-sm ${
              heroImageUrl ? 'text-cornsilk/80' : 'text-paynes-gray/60'
            }`}
          >
            {formattedDate && (
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </span>
            )}
            {post.author && (
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section ref={ref} className="py-16 md:py-24 bg-cornsilk">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="container mx-auto px-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <motion.article
              variants={itemVariants}
              className="lg:col-span-2 prose prose-lg max-w-none"
            >
              {/* Excerpt/Intro */}
              {excerpt && (
                <p className="text-xl text-paynes-gray/80 leading-relaxed mb-8 font-heading">
                  {excerpt}
                </p>
              )}

              {/* Full Content */}
              <div className="text-paynes-gray/80">
                {content ? (
                  renderPortableText(content)
                ) : (
                  <p className="text-center py-12 text-paynes-gray/50">
                    {t('common.comingSoon')}
                  </p>
                )}
              </div>

              {/* Related Services */}
              {post.relatedServices && post.relatedServices.length > 0 && (
                <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-beige">
                  <h3 className="font-heading text-xl text-paynes-gray mb-4">
                    {lang === 'ru'
                      ? 'Связанные услуги'
                      : lang === 'id'
                      ? 'Layanan Terkait'
                      : 'Related Services'}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {post.relatedServices.map((service) => (
                      <Link
                        key={service._id}
                        to={`/${lang}/services/${service.slug.current}`}
                        className="inline-flex items-center px-4 py-2 bg-tea-green/20 text-paynes-gray rounded-full text-sm font-heading hover:bg-tea-green/40 transition-colors"
                      >
                        {getLocalizedValue(service.title, lang)}
                        <ArrowRight className="w-3 h-3 ml-2" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.article>

            {/* Sidebar */}
            <motion.aside variants={itemVariants} className="lg:col-span-1">
              {/* Author Card */}
              {post.author && (
                <div className="bg-white  shadow-md p-6 mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-tea-green/20 flex items-center justify-center">
                      <User className="w-6 h-6 text-paynes-gray/60" />
                    </div>
                    <div>
                      <h4 className="font-heading font-medium text-paynes-gray">
                        {post.author}
                      </h4>
                      <p className="text-sm text-paynes-gray/60">
                        {lang === 'ru' ? 'Автор' : lang === 'id' ? 'Penulis' : 'Author'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA Card */}
              <div className="bg-white  shadow-lg p-6 sticky top-24">
                <h3 className="font-heading text-lg text-paynes-gray mb-3">
                  {t('contact.ctaHeading')}
                </h3>
                <p className="text-sm text-paynes-gray/70 mb-6">
                  {t('contact.ctaSubheading')}
                </p>
                <Link
                  to={`/${lang}/contact`}
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-paynes-gray text-cornsilk  font-heading font-medium hover:bg-paynes-gray/90 transition-colors"
                >
                  {t('contact.bookConsultation')}
                </Link>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-heading text-lg text-paynes-gray mb-4">
                    {lang === 'ru'
                      ? 'Похожие статьи'
                      : lang === 'id'
                      ? 'Artikel Terkait'
                      : 'Related Articles'}
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <RelatedPostCard
                        key={relatedPost._id}
                        post={relatedPost}
                        lang={lang}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.aside>
          </div>
        </motion.div>
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
