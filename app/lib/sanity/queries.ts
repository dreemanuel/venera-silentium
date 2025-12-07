import groq from 'groq';

// Site Settings Query
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    heroTitle,
    heroSubtitle,
    heroImage,
    heroCtaText,
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
