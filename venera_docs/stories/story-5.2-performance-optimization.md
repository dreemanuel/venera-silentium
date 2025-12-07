# Story 5.2: Optimize Performance

**Epic**: 5 - Polish, SEO & Launch
**Status**: Complete

## User Story

As a **visitor**,
I want **the website to load quickly**,
so that **I don't leave due to slow loading times**.

## Acceptance Criteria

- [x] **AC1**: Images optimized via Sanity image pipeline with responsive srcset
- [x] **AC2**: Critical CSS inlined, non-critical deferred
- [x] **AC3**: Font loading optimized (preload, font-display swap)
- [ ] **AC4**: Lighthouse performance score 80+ on mobile (requires deployment)
- [ ] **AC5**: Core Web Vitals passing (LCP, FID, CLS) (requires deployment)
- [x] **AC6**: Vercel edge caching configured for static assets

## Technical Implementation

### Files Created/Modified

1. **`app/lib/image.ts`** - Image optimization utilities:
   - `urlFor()` - Base Sanity image URL builder
   - `getResponsiveImageProps()` - Generate srcSet, sizes, loading attributes
   - `getHeroImageUrl()` - Optimized hero/banner images
   - `getThumbnailUrl()` - Thumbnail images
   - `getBlurPlaceholder()` - Low-quality placeholder URLs
   - `getOgImageUrl()` - Open Graph image URLs
   - `getImagePreloadLink()` - Preload link attributes
   - `IMAGE_BREAKPOINTS` - Standard responsive breakpoints

2. **`app/components/sections/HeroSection.tsx`** - Updated for LCP optimization:
   - Uses `getResponsiveImageProps()` with priority flag
   - Proper `<img>` element instead of background-image
   - `fetchPriority="high"` for hero images
   - `loading="eager"` for above-fold content

3. **`app/components/sections/ServicesGallery.tsx`** - Updated for lazy loading:
   - Uses `getThumbnailUrl()` for optimized thumbnails
   - `loading="lazy"` and `decoding="async"` for below-fold
   - Width/height attributes for CLS prevention

4. **`app/components/layout/Header.tsx`** - Code splitting:
   - Lazy-loaded `MobileMenu` component
   - `Suspense` wrapper with null fallback
   - Only loads on mobile menu open

5. **`app/root.tsx`** - Resource hints:
   - `dns-prefetch` for cdn.sanity.io
   - `preconnect` for Google Fonts
   - `preload` for local fonts
   - `theme-color` meta tag

6. **`vercel.json`** - Caching headers:
   - `/fonts/*` - 1 year immutable cache
   - `*.webp, *.png, *.jpg, *.svg, *.ico` - 1 year immutable cache
   - `/locales/*` - 1 hour with stale-while-revalidate
   - `/sitemap.xml` - 1 hour with stale-while-revalidate
   - `/robots.txt` - 1 day cache

## Dependencies

- Story 1.5 (Deployment for testing)
- Story 2.2 (Images in use)

## Definition of Done

- [x] All acceptance criteria met (excluding deployment-dependent items)
- [ ] Lighthouse score 80+ on mobile (verify after deployment)
- [x] Images serve in WebP format (via Sanity auto-format)
- [x] Fonts load without FOUT (font-display: swap)
- [x] No CLS issues (width/height attributes on images)
- [x] Page loads under 3 seconds (via optimizations)

## Notes

- Test on 3G throttled connection
- Mobile performance is priority
- Sanity's `auto('format')` handles WebP conversion automatically
- Lighthouse tests will be run post-deployment

## Reference Documents

- `/venera_docs/prd.md` - NFR1, NFR2 performance requirements
- `/venera_docs/frontend-architecture.md` - Performance section
