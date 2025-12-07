# Story 2.2: Implement Homepage Hero Section

**Epic**: 2 - Content Management & Brand Foundation
**Status**: ✅ COMPLETE

## User Story

As a **visitor**,
I want **to immediately understand what Silentium offers when I land on the homepage**,
so that **I can decide if this is the right place for my aesthetic needs**.

## Acceptance Criteria

- [x] **AC1**: Hero section displays brand tagline and supporting text from CMS (with i18n fallback)
- [x] **AC2**: Background image or video (if provided) displays with proper optimization
- [x] **AC3**: Primary CTA button ("Book Consultation" or similar) prominently displayed
- [x] **AC4**: Hero content is translatable and renders in selected language
- [x] **AC5**: Subtle entrance animation using Framer Motion
- [x] **AC6**: Responsive design works on mobile, tablet, and desktop

## Technical Tasks

1. Install Framer Motion:
   ```bash
   npm install framer-motion
   ```

2. Create `app/components/sections/HeroSection.tsx`:
   ```tsx
   interface HeroSectionProps {
     title: string;
     subtitle: string;
     imageUrl?: string;
     ctaText: string;
     ctaLink: string;
   }

   // Layout:
   // - Full viewport height (min-h-screen)
   // - Background image with overlay
   // - Centered text content
   // - CTA button below text
   ```

3. Update homepage route `app/routes/$lang._index.tsx`:
   - Add loader to fetch siteSettings from Sanity
   - Pass hero content to HeroSection component
   - Handle language parameter for translations

4. Implement Framer Motion animations:
   ```tsx
   const variants = {
     hidden: { opacity: 0, y: 20 },
     visible: { opacity: 1, y: 0 }
   };

   // Stagger children animations
   ```

5. Style with Tailwind:
   - Background: `bg-cover bg-center`
   - Overlay: `bg-gradient-to-b from-charcoal/50 to-charcoal/70`
   - Typography: Serif font for tagline, sans for subtitle
   - CTA: Primary button style

6. Add responsive adjustments:
   - Mobile: Smaller font sizes, padding adjustments
   - Desktop: Larger hero text, more whitespace

7. Implement image optimization with Sanity image URL builder

## Dependencies

- Story 2.1 (Sanity CMS with siteSettings schema)
- Story 1.3 (i18n for translations)
- Story 1.4 (Layout components)

## Definition of Done

- [x] All acceptance criteria met
- [x] Hero displays content from CMS (with i18n fallback when no CMS content)
- [x] Animations play on page load (staggered fade-up)
- [x] CTA button links to contact page
- [x] Responsive on all breakpoints
- [x] Page loads under 3 seconds

## Notes

- Default tagline: "Beauty is born in silence"
- Respect `prefers-reduced-motion` for animations
- Background image should be optimized (WebP, appropriate size)

## Reference Documents

- `/venera_docs/uxui-spec.md` - Hero wireframe
- `/copywriting/About - Silentium.md` - Brand messaging
