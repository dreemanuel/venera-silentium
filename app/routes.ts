import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  // Root redirects to /en
  index("routes/home-redirect.tsx"),

  // Language-prefixed routes
  layout("routes/$lang/layout.tsx", [
    route(":lang", "routes/$lang/home.tsx"),
    route(":lang/about", "routes/$lang/about.tsx"),
    route(":lang/contact", "routes/$lang/contact.tsx"),
    route(":lang/services", "routes/$lang/services.tsx"),
    route(":lang/services/:slug", "routes/$lang/services.$slug.tsx"),
  ]),
] satisfies RouteConfig;
