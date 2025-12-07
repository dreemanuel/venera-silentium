# Story 2.5: Create About Page Route

**Epic**: 2 - Content Management & Brand Foundation
**Status**: Ready for Development

## User Story

As a **visitor**,
I want **a dedicated About page combining Dr. Venera and Silentium information**,
so that **I can learn the full story in one place**.

## Acceptance Criteria

- [ ] **AC1**: Route created at `/:lang/about` with proper i18n handling
- [ ] **AC2**: Page combines Dr. Venera and Silentium sections with clear visual hierarchy
- [ ] **AC3**: SEO meta tags populated from CMS content
- [ ] **AC4**: Breadcrumb or back navigation available
- [ ] **AC5**: CTA to contact/booking at page bottom
- [ ] **AC6**: Page content fully manageable through Sanity CMS

## Technical Tasks

1. Create `app/routes/$lang.about.tsx`:
   ```typescript
   export async function loader({ params, request }: LoaderFunctionArgs) {
     const lang = params.lang;
     const siteSettings = await getSiteSettings(lang);
     const t = await i18next.getFixedT(request, 'common');

     return json({
       aboutDrVenera: siteSettings.aboutDrVenera,
       aboutSilentium: siteSettings.aboutSilentium,
       meta: {
         title: t('about.pageTitle'),
         description: t('about.pageDescription')
       }
     });
   }
   ```

2. Create meta function for SEO:
   ```typescript
   export const meta: MetaFunction<typeof loader> = ({ data }) => {
     return [
       { title: data.meta.title },
       { name: 'description', content: data.meta.description },
       { property: 'og:title', content: data.meta.title },
       { property: 'og:description', content: data.meta.description },
     ];
   };
   ```

3. Page layout structure:
   ```tsx
   <main className="min-h-screen bg-cream">
     {/* Page Header */}
     <section className="pt-32 pb-16">
       <h1>About Silentium</h1>
     </section>

     {/* Dr. Venera Section - Full */}
     <AboutDrVeneraFull {...aboutDrVenera} />

     {/* Silentium Philosophy - Full */}
     <SilentiumPhilosophyFull {...aboutSilentium} />

     {/* CTA Section */}
     <ContactCTA />
   </main>
   ```

4. Create expanded versions of section components:
   - `AboutDrVeneraFull.tsx` - More detailed than preview
   - `SilentiumPhilosophyFull.tsx` - Complete philosophy content

5. Create `app/components/sections/ContactCTA.tsx`:
   ```tsx
   // Simple CTA section
   // "Ready to begin your journey?"
   // Two buttons: Book Consultation, WhatsApp
   ```

6. Create `app/components/seo/MetaTags.tsx`:
   - Reusable component for consistent meta tags
   - Open Graph tags for social sharing

7. Add translations to `common.json`:
   ```json
   "about": {
     "pageTitle": "About | Silentium",
     "pageDescription": "Learn about Dr. Venera and the Silentium philosophy...",
     "breadcrumb": "About"
   }
   ```

## Dependencies

- Story 2.3 (About Dr. Venera section)
- Story 2.4 (Silentium Philosophy section)

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Page renders at `/:lang/about`
- [ ] Meta tags correct for SEO
- [ ] Content hierarchy clear
- [ ] CTA links work correctly
- [ ] Page indexed by search engines (no noindex)

## Notes

- About page is key for building trust
- Ensure meta description includes key credentials
- Page should feel cohesive, not just stacked sections

## Reference Documents

- `/venera_docs/uxui-spec.md` - Page structure
- `/venera_docs/prd.md` - About page requirements
