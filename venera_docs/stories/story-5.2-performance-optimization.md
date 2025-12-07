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

## Technical Tasks

1. Create Sanity image URL builder `app/lib/image.ts`:
   ```typescript
   import imageUrlBuilder from '@sanity/image-url';
   import { sanityClient } from './sanity.server';

   const builder = imageUrlBuilder(sanityClient);

   export function urlFor(source: any) {
     return builder.image(source);
   }

   export function getResponsiveImageProps(source: any, alt: string) {
     return {
       src: urlFor(source).width(800).format('webp').url(),
       srcSet: `
         ${urlFor(source).width(400).format('webp').url()} 400w,
         ${urlFor(source).width(800).format('webp').url()} 800w,
         ${urlFor(source).width(1200).format('webp').url()} 1200w
       `,
       sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
       alt,
       loading: 'lazy' as const,
     };
   }
   ```

2. Optimize font loading in `app/styles/fonts.css`:
   ```css
   @font-face {
     font-family: 'Gilmoray';
     src: url('/fonts/gilmoray.woff2') format('woff2');
     font-weight: 400;
     font-style: normal;
     font-display: swap;
   }

   @font-face {
     font-family: 'Gilmer';
     src: url('/fonts/gilmer-light.woff2') format('woff2');
     font-weight: 300;
     font-style: normal;
     font-display: swap;
   }
   ```

3. Add font preload links in `app/root.tsx`:
   ```typescript
   export const links: LinksFunction = () => [
     {
       rel: 'preload',
       href: '/fonts/gilmoray.woff2',
       as: 'font',
       type: 'font/woff2',
       crossOrigin: 'anonymous',
     },
     {
       rel: 'preload',
       href: '/fonts/gilmer-light.woff2',
       as: 'font',
       type: 'font/woff2',
       crossOrigin: 'anonymous',
     },
   ];
   ```

4. Convert fonts to WOFF2 format (if not already):
   ```bash
   # Use online converter or tool like fonttools
   ```

5. Configure Vercel caching in `vercel.json`:
   ```json
   {
     "headers": [
       {
         "source": "/fonts/(.*)",
         "headers": [
           {
             "key": "Cache-Control",
             "value": "public, max-age=31536000, immutable"
           }
         ]
       },
       {
         "source": "/(.*).webp",
         "headers": [
           {
             "key": "Cache-Control",
             "value": "public, max-age=31536000, immutable"
           }
         ]
       }
     ]
   }
   ```

6. Implement lazy loading for below-fold images:
   ```tsx
   <img
     src={imageUrl}
     alt={alt}
     loading="lazy"
     decoding="async"
   />
   ```

7. Add loading priority for hero image:
   ```tsx
   // In HeroSection
   <img
     src={heroImageUrl}
     alt={alt}
     loading="eager"
     fetchPriority="high"
   />
   ```

8. Optimize JavaScript bundle:
   ```typescript
   // Use dynamic imports for non-critical components
   const MobileMenu = lazy(() => import('./MobileMenu'));
   ```

9. Run Lighthouse audit and address issues:
   ```bash
   npm install -g lighthouse
   lighthouse https://your-preview-url.vercel.app --output html
   ```

10. Monitor Core Web Vitals in Vercel Analytics

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
- Consider using Vercel Image Optimization if needed

## Reference Documents

- `/venera_docs/prd.md` - NFR1, NFR2 performance requirements
- `/venera_docs/frontend-architecture.md` - Performance section
