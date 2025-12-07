import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  // Root redirects to /en
  index("routes/home-redirect.tsx"),

  // SEO routes (no layout)
  route("sitemap.xml", "routes/sitemap[.]xml.tsx"),

  // Language-prefixed routes
  layout("routes/$lang/layout.tsx", [
    route(":lang", "routes/$lang/home.tsx"),
    route(":lang/about", "routes/$lang/about.tsx"),
    route(":lang/contact", "routes/$lang/contact.tsx"),
    route(":lang/services", "routes/$lang/services.tsx"),
    route(":lang/services/:slug", "routes/$lang/services.$slug.tsx"),
    // API routes (no layout needed)
    route(":lang/api/contact", "routes/$lang/api/contact.tsx"),
    route(":lang/api/booking", "routes/$lang/api/booking.tsx"),
    // Catch-all 404 for lang-prefixed routes
    route(":lang/*", "routes/$lang/not-found.tsx"),
  ]),
] satisfies RouteConfig;
