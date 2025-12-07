# Story 3.3: Create Service Detail Page Template

**Epic**: 3 - Services Showcase
**Status**: Ready for Development

## User Story

As a **visitor**,
I want **detailed information about a specific treatment**,
so that **I can make an informed decision about booking a consultation**.

## Acceptance Criteria

- [ ] **AC1**: Dynamic route at `/:lang/services/:slug` with proper i18n
- [ ] **AC2**: Page displays full service description, benefits, and process from CMS
- [ ] **AC3**: Hero image for the service displayed prominently
- [ ] **AC4**: Related services or "You might also like" section at bottom
- [ ] **AC5**: Prominent CTA to book consultation or contact
- [ ] **AC6**: SEO meta tags generated from service content
- [ ] **AC7**: Breadcrumb navigation back to services index

## Technical Tasks

1. Create `app/routes/$lang.services.$slug.tsx`:
   ```typescript
   export async function loader({ params, request }: LoaderFunctionArgs) {
     const { lang, slug } = params;
     const service = await getServiceBySlug(slug, lang);

     if (!service) {
       throw new Response('Not Found', { status: 404 });
     }

     return json({ service, lang });
   }

   export const meta: MetaFunction<typeof loader> = ({ data }) => {
     return [
       { title: `${data.service.title} | Silentium` },
       { name: 'description', content: data.service.shortDescription },
     ];
   };
   ```

2. Create `app/components/services/ServiceDetail.tsx`:
   ```tsx
   interface ServiceDetailProps {
     service: Service;
     lang: string;
   }

   // Layout:
   // - Hero image (full width or side)
   // - Title and category
   // - Full description (portable text)
   // - Benefits list
   // - CTA button
   // - Related services grid
   ```

3. Create `app/components/services/ServiceBenefits.tsx`:
   ```tsx
   // Styled list of benefits
   // Checkmark icons
   // Gold accent color
   ```

4. Create breadcrumb component:
   ```tsx
   <nav aria-label="Breadcrumb">
     <ol className="flex items-center space-x-2">
       <li><Link to={`/${lang}`}>Home</Link></li>
       <li>/</li>
       <li><Link to={`/${lang}/services`}>Services</Link></li>
       <li>/</li>
       <li aria-current="page">{service.title}</li>
     </ol>
   </nav>
   ```

5. Style service detail page:
   - Hero: Full-width image or side-by-side layout
   - Typography: Serif for title, sans for body
   - Benefits: Card or list with icons
   - CTA: Primary button, centered or sidebar

6. Related services section:
   ```tsx
   {service.relatedServices?.length > 0 && (
     <section>
       <h2>You Might Also Like</h2>
       <ServiceGallery services={service.relatedServices} lang={lang} />
     </section>
   )}
   ```

7. Implement PortableText rendering for description

## Dependencies

- Story 3.1 (Services content in CMS)
- Story 3.2 (ServiceCard and gallery components)

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Page renders for all 13 services
- [ ] Content loads from CMS correctly
- [ ] SEO meta tags correct
- [ ] Related services display
- [ ] CTA links to contact page with service pre-selected

## Notes

- Use URL params to pre-select service in booking form
- Ensure 404 handling for invalid slugs
- Consider adding structured data (JSON-LD) for services

## Reference Documents

- `/venera_docs/uxui-spec.md` - Service detail wireframe
- `/venera_docs/prd.md` - FR6 service pages
