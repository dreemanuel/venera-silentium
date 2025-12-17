import groq from 'groq';

// Site Settings Query
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    heroTitle,
    heroSubtitle,
    heroImage,
    heroCtaText,
    heroSlideshowEnabled,
    heroSlideshowInterval,
    heroMedia[] {
      _key,
      mediaType,
      image {
        ...,
        "alt": alt
      },
      "videoFileUrl": videoFile.asset->url,
      videoPoster,
      duration,
      kenBurnsDirection
    },
    contactEmail,
    contactPhone,
    whatsappNumber,
    address,
    socialLinks,
    seoTitle,
    seoDescription,
    aboutDrVenera {
      photo,
      name,
      title,
      story,
      credentials,
      experience
    },
    aboutSilentium {
      tagline,
      philosophy,
      image
    }
  }
`;

// All Services Query (for services listing)
export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    category,
    shortDescription,
    image,
    featured,
    order
  }
`;

// Featured Services Query (for homepage)
export const featuredServicesQuery = groq`
  *[_type == "service" && featured == true] | order(order asc) {
    _id,
    title,
    slug,
    category,
    shortDescription,
    image
  }
`;

// Single Service Query (for service detail page)
export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    shortDescription,
    description,
    benefits,
    idealFor,
    duration,
    image,
    gallery
  }
`;

// Services by Category Query
export const servicesByCategoryQuery = groq`
  *[_type == "service" && category == $category] | order(order asc) {
    _id,
    title,
    slug,
    category,
    shortDescription,
    image
  }
`;

// Page Query (for static pages)
export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    pageType,
    content,
    heroTitle,
    heroSubtitle,
    heroImage,
    seoTitle,
    seoDescription
  }
`;

// Page by Type Query (for specific page types like about-venera)
export const pageByTypeQuery = groq`
  *[_type == "page" && pageType == $pageType][0] {
    _id,
    title,
    slug,
    pageType,
    content,
    heroTitle,
    heroSubtitle,
    heroImage,
    seoTitle,
    seoDescription
  }
`;

// All Testimonials Query
export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(publishedAt desc) {
    _id,
    clientName,
    clientTitle,
    quote,
    service-> {
      _id,
      title,
      slug
    },
    rating,
    clientPhoto,
    featured,
    publishedAt
  }
`;

// Featured Testimonials Query (for homepage)
export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    clientName,
    clientTitle,
    quote,
    service-> {
      title,
      slug
    },
    rating,
    clientPhoto
  }
`;

// Contact Info Query (lightweight query for header/footer)
export const contactInfoQuery = groq`
  *[_type == "siteSettings"][0] {
    contactEmail,
    contactPhone,
    whatsappNumber,
    socialLinks
  }
`;

// All Blog Posts Query
export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category,
    author,
    publishedAt,
    featured
  }
`;

// Featured Blog Posts Query (for homepage)
export const featuredBlogPostsQuery = groq`
  *[_type == "blogPost" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category,
    author,
    publishedAt
  }
`;

// Single Blog Post Query
export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    featuredImage,
    category,
    author,
    publishedAt,
    relatedServices[]-> {
      _id,
      title,
      slug
    }
  }
`;

// Blog Posts by Category Query
export const blogPostsByCategoryQuery = groq`
  *[_type == "blogPost" && category == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category,
    author,
    publishedAt
  }
`;

// All Brands Query
export const brandsQuery = groq`
  *[_type == "brand"] | order(order asc) {
    _id,
    name,
    logo,
    website,
    description,
    order
  }
`;

// All Gallery Images Query
export const galleryImagesQuery = groq`
  *[_type == "galleryImage"] | order(order asc) {
    _id,
    title,
    image,
    category,
    order,
    featured
  }
`;

// Featured Gallery Images Query (for homepage)
export const featuredGalleryImagesQuery = groq`
  *[_type == "galleryImage" && featured == true] | order(order asc) {
    _id,
    title,
    image,
    category
  }
`;

// Gallery Images by Category Query
export const galleryImagesByCategoryQuery = groq`
  *[_type == "galleryImage" && category == $category] | order(order asc) {
    _id,
    title,
    image,
    category
  }
`;

// Active Promo Banners Query
export const activePromoBannersQuery = groq`
  *[_type == "promoBanner" && isActive == true &&
    (startDate == null || startDate <= now()) &&
    (endDate == null || endDate >= now())] | order(priority desc) {
    _id,
    title,
    message,
    backgroundColor,
    textColor,
    linkUrl,
    linkText,
    position,
    dismissible,
    showOnPages,
    priority
  }
`;

// Promo Banners for Specific Page Query
export const promoBannersForPageQuery = groq`
  *[_type == "promoBanner" && isActive == true &&
    (startDate == null || startDate <= now()) &&
    (endDate == null || endDate >= now()) &&
    ($page in showOnPages || "all" in showOnPages)] | order(priority desc) {
    _id,
    title,
    message,
    backgroundColor,
    textColor,
    linkUrl,
    linkText,
    position,
    dismissible,
    priority
  }
`;
