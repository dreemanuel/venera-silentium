# Story 3.2: Implement Services Gallery Section

**Epic**: 3 - Services Showcase
**Status**: Ready for Development

## User Story

As a **visitor**,
I want **to browse all available treatments in an engaging visual format**,
so that **I can quickly find services that interest me**.

## Acceptance Criteria

- [ ] **AC1**: Services displayed in interactive gallery/grid layout
- [ ] **AC2**: Hover interaction reveals service image and short description
- [ ] **AC3**: Services grouped by category with visual distinction
- [ ] **AC4**: Each service card links to its detail page
- [ ] **AC5**: Gallery is responsive (grid adjusts for mobile)
- [ ] **AC6**: Content fetched from Sanity CMS with proper caching

## Technical Tasks

1. Create `app/components/services/ServiceCard.tsx`:
   ```tsx
   interface ServiceCardProps {
     slug: string;
     title: string;
     shortDescription: string;
     imageUrl: string;
     category: string;
     lang: string;
   }

   // Features:
   // - 4:3 aspect ratio
   // - Image cover with zoom on hover
   // - Gradient overlay on hover
   // - Text slides up from bottom
   // - Category badge
   ```

2. Create `app/components/services/ServiceGallery.tsx`:
   ```tsx
   interface ServiceGalleryProps {
     services: ServicePreview[];
     lang: string;
     showCategoryTabs?: boolean;
   }

   // Grid layout:
   // - Mobile: 1-2 columns
   // - Tablet: 2-3 columns
   // - Desktop: 3-4 columns
   // - Optional category filter tabs
   ```

3. Implement hover animation with Framer Motion:
   ```tsx
   <motion.div
     whileHover={{ scale: 1.02 }}
     className="relative overflow-hidden rounded-2xl"
   >
     <motion.img
       whileHover={{ scale: 1.05 }}
       transition={{ duration: 0.5 }}
     />
     {/* Overlay and text with AnimatePresence */}
   </motion.div>
   ```

4. Style cards with design system:
   - Background: Service image
   - Overlay: `bg-gradient-to-t from-charcoal/80`
   - Title: White, serif font
   - Category: Gold badge
   - Border radius: `rounded-2xl`

5. Add to homepage below philosophy section:
   ```tsx
   <ServicesPreview services={services.slice(0, 8)} lang={lang} />
   <Link to={`/${lang}/services`}>View All Services</Link>
   ```

6. Create category tabs (optional):
   ```tsx
   const categories = ['all', 'anti-aging', 'rejuvenation', 'problem-specific', 'specialized'];
   // Filter services by selected category
   ```

## Dependencies

- Story 3.1 (Services schema and content)
- Story 2.2 (Framer Motion installed)

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Gallery displays services from CMS
- [ ] Hover effects work smoothly
- [ ] Links navigate to service detail
- [ ] Responsive on all breakpoints
- [ ] No performance issues with multiple cards

## Notes

- Lazy load images below the fold
- Consider virtualization if more than 20 services
- Touch devices: tap reveals info instead of hover

## Reference Documents

- `/venera_docs/uxui-spec.md` - ServiceCard component spec
- `/venera_docs/frontend-architecture.md` - Component patterns
