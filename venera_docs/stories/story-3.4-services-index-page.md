# Story 3.4: Create Services Index Page

**Epic**: 3 - Services Showcase
**Status**: Ready for Development

## User Story

As a **visitor**,
I want **a dedicated page listing all services**,
so that **I can explore the full range of treatments offered**.

## Acceptance Criteria

- [ ] **AC1**: Route at `/:lang/services` with proper i18n handling
- [ ] **AC2**: Services gallery component rendered as primary content
- [ ] **AC3**: Optional category filter/tabs for service browsing
- [ ] **AC4**: Page introduction text manageable from CMS
- [ ] **AC5**: SEO optimized with services-focused meta tags
- [ ] **AC6**: Responsive design for all viewports

## Technical Tasks

1. Create `app/routes/$lang.services._index.tsx`:
   ```typescript
   export async function loader({ params, request }: LoaderFunctionArgs) {
     const lang = params.lang;
     const services = await getAllServices(lang);
     const siteSettings = await getSiteSettings(lang);

     return json({
       services,
       pageIntro: siteSettings.servicesPageIntro,
       lang
     });
   }

   export const meta: MetaFunction = () => {
     return [
       { title: 'Our Services | Silentium' },
       { name: 'description', content: 'Explore our range of aesthetic treatments...' },
     ];
   };
   ```

2. Add `servicesPageIntro` to Sanity siteSettings schema:
   ```typescript
   {
     name: 'servicesPageIntro',
     title: 'Services Page Introduction',
     type: 'object',
     fields: [
       { name: 'headline', type: 'localizedString' },
       { name: 'description', type: 'localizedText' },
     ]
   }
   ```

3. Page layout structure:
   ```tsx
   <main className="min-h-screen bg-cream pt-24">
     {/* Page Header */}
     <header className="container mx-auto px-6 py-16 text-center">
       <h1 className="font-serif text-4xl md:text-5xl mb-6">
         {pageIntro.headline}
       </h1>
       <div className="max-w-2xl mx-auto">
         <PortableText value={pageIntro.description} />
       </div>
     </header>

     {/* Category Tabs (optional) */}
     <CategoryTabs
       categories={categories}
       selected={selectedCategory}
       onChange={setSelectedCategory}
     />

     {/* Services Gallery */}
     <section className="container mx-auto px-6 py-12">
       <ServiceGallery
         services={filteredServices}
         lang={lang}
       />
     </section>

     {/* CTA */}
     <ContactCTA />
   </main>
   ```

4. Create category filter functionality:
   ```tsx
   const [selectedCategory, setSelectedCategory] = useState('all');

   const filteredServices = selectedCategory === 'all'
     ? services
     : services.filter(s => s.category === selectedCategory);

   const categories = [
     { value: 'all', label: t('services.allCategories') },
     { value: 'anti-aging', label: t('services.antiAging') },
     { value: 'rejuvenation', label: t('services.rejuvenation') },
     { value: 'problem-specific', label: t('services.problemSpecific') },
     { value: 'specialized', label: t('services.specialized') },
   ];
   ```

5. Add translations for services page:
   ```json
   "services": {
     "pageTitle": "Our Services",
     "allCategories": "All Services",
     "antiAging": "Anti-Aging",
     "rejuvenation": "Rejuvenation",
     "problemSpecific": "Problem-Specific",
     "specialized": "Specialized"
   }
   ```

6. Style category tabs:
   - Horizontal scrollable on mobile
   - Underline active category
   - Smooth transition on category change

## Dependencies

- Story 3.2 (ServiceGallery component)
- Story 3.1 (Services content)

## Definition of Done

- [ ] All acceptance criteria met
- [ ] All services displayed
- [ ] Category filtering works
- [ ] Page renders correctly at `/:lang/services`
- [ ] SEO meta tags set
- [ ] Responsive on all breakpoints

## Notes

- Consider URL-based category filtering (`?category=anti-aging`)
- Animation when filtering categories
- Ensure no layout shift when filtering

## Reference Documents

- `/venera_docs/uxui-spec.md` - Services page layout
- `/venera_docs/prd.md` - FR5 services gallery
