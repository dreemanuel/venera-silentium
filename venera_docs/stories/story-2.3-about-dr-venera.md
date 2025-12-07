# Story 2.3: Create About Dr. Venera Section

**Epic**: 2 - Content Management & Brand Foundation
**Status**: ✅ COMPLETE

## User Story

As a **visitor**,
I want **to learn about Dr. Venera's qualifications and philosophy**,
so that **I can trust her expertise before booking a consultation**.

## Acceptance Criteria

- [ ] **AC1**: About section displays Dr. Venera's photo, credentials, and story from CMS
- [ ] **AC2**: Key trust indicators highlighted (MD certification, years of experience, training locations)
- [ ] **AC3**: Content structured with elegant typography and spacing
- [ ] **AC4**: Section is translatable and renders in selected language
- [ ] **AC5**: Scroll-reveal animation for section elements
- [ ] **AC6**: Responsive layout adapts for mobile viewing

## Technical Tasks

1. Update Sanity schema `siteSettings.ts` to include aboutDrVenera field:
   ```typescript
   {
     name: 'aboutDrVenera',
     title: 'About Dr. Venera',
     type: 'object',
     fields: [
       { name: 'photo', type: 'image' },
       { name: 'name', type: 'localizedString' },
       { name: 'title', type: 'localizedString' },
       { name: 'story', type: 'localizedText' },
       { name: 'credentials', type: 'array', of: [{ type: 'localizedString' }] },
       { name: 'experience', type: 'string' }
     ]
   }
   ```

2. Create `app/components/sections/AboutPreview.tsx`:
   ```tsx
   interface AboutPreviewProps {
     photo: string;
     name: string;
     title: string;
     story: PortableTextBlock[];
     credentials: string[];
     ctaLink: string;
   }

   // Two-column layout on desktop
   // Photo on left, text on right
   // Credentials as highlighted badges/chips
   ```

3. Create `app/hooks/useScrollReveal.ts`:
   ```typescript
   // Uses Intersection Observer
   // Returns ref and isInView boolean
   // Configurable threshold
   ```

4. Implement scroll-reveal with Framer Motion:
   ```tsx
   <motion.div
     ref={ref}
     initial="hidden"
     animate={isInView ? "visible" : "hidden"}
     variants={fadeInUp}
   >
   ```

5. Style with design system:
   - Photo: Rounded corners, subtle shadow
   - Name: Serif font, large size
   - Credentials: Gold accent color badges
   - Story: Body text with proper line height

6. Add to homepage route loader:
   ```typescript
   const siteSettings = await getSiteSettings(lang);
   return json({ hero: ..., about: siteSettings.aboutDrVenera });
   ```

## Dependencies

- Story 2.1 (Sanity CMS)
- Story 2.2 (Framer Motion installed)

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Content loads from CMS
- [ ] Scroll reveal animation works
- [ ] Responsive on all breakpoints
- [ ] Trust indicators visible and styled

## Notes

- Content source: `/copywriting/Venera - About Venera.md`
- Key credentials: MD, trained in Russia, experience in Vietnam and Bali
- Photo placeholder if not yet provided

## Reference Documents

- `/venera_docs/uxui-spec.md` - About section wireframe
- `/copywriting/Venera - About Venera.md` - Dr. Venera's story
