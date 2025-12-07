# Story 3.1: Create Services Schema and Seed Content

**Epic**: 3 - Services Showcase
**Status**: Ready for Development

## User Story

As a **content administrator**,
I want **service content manageable in the CMS**,
so that **I can add, edit, and organize treatment information**.

## Acceptance Criteria

- [ ] **AC1**: Service schema includes: title, slug, category, short description, full description, benefits, image
- [ ] **AC2**: All text fields support EN/RU/ID translations
- [ ] **AC3**: Services organized by category (Anti-Aging, Skin Rejuvenation, Problem-Specific, Specialized)
- [ ] **AC4**: Initial content seeded for all 13 treatments from copywriting files
- [ ] **AC5**: Image field configured for Sanity asset pipeline
- [ ] **AC6**: GROQ queries created for fetching services list and individual service

## Technical Tasks

1. Update service schema in `/sanity/schemas/documents/service.ts`:
   ```typescript
   export default {
     name: 'service',
     title: 'Service',
     type: 'document',
     fields: [
       {
         name: 'title',
         title: 'Title',
         type: 'localizedString',
         validation: (Rule) => Rule.required(),
       },
       {
         name: 'slug',
         title: 'Slug',
         type: 'slug',
         options: { source: 'title.en', maxLength: 96 },
       },
       {
         name: 'category',
         title: 'Category',
         type: 'string',
         options: {
           list: [
             { title: 'Anti-Aging Injectables', value: 'anti-aging' },
             { title: 'Skin Rejuvenation', value: 'rejuvenation' },
             { title: 'Problem-Specific', value: 'problem-specific' },
             { title: 'Specialized', value: 'specialized' },
             { title: 'Preparatory', value: 'preparatory' },
           ],
         },
       },
       {
         name: 'shortDescription',
         title: 'Short Description',
         type: 'localizedString',
         description: 'Brief description for service cards (max 150 chars)',
       },
       {
         name: 'description',
         title: 'Full Description',
         type: 'localizedText',
       },
       {
         name: 'benefits',
         title: 'Benefits',
         type: 'array',
         of: [{ type: 'localizedString' }],
       },
       {
         name: 'image',
         title: 'Service Image',
         type: 'image',
         options: { hotspot: true },
       },
       {
         name: 'order',
         title: 'Display Order',
         type: 'number',
       },
       {
         name: 'relatedServices',
         title: 'Related Services',
         type: 'array',
         of: [{ type: 'reference', to: [{ type: 'service' }] }],
       },
     ],
     orderings: [
       { title: 'Category', name: 'categoryAsc', by: [{ field: 'category', direction: 'asc' }] },
       { title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
     ],
   };
   ```

2. Create GROQ queries in `/app/lib/sanity.server.ts`:
   ```typescript
   export const servicesListQuery = groq`
     *[_type == "service"] | order(category asc, order asc) {
       _id,
       "slug": slug.current,
       category,
       "title": title[$lang],
       "shortDescription": shortDescription[$lang],
       "imageUrl": image.asset->url
     }
   `;

   export const serviceDetailQuery = groq`
     *[_type == "service" && slug.current == $slug][0] {
       _id,
       "slug": slug.current,
       category,
       "title": title[$lang],
       "description": description[$lang],
       "benefits": benefits[][$lang],
       "imageUrl": image.asset->url,
       "relatedServices": relatedServices[]->{
         "slug": slug.current,
         "title": title[$lang],
         "imageUrl": image.asset->url
       }
     }
   `;
   ```

3. Seed content from copywriting files:
   - Botox
   - Fillers
   - Russian Lips
   - Mesotherapy (Facial)
   - Mesotherapy (Scalp)
   - Mesotherapy (Eye Area)
   - Skin Boosters
   - Exosome
   - Peeling
   - Lipolytics
   - Acne, Pigmentation, Rosacea
   - Facial Cleansing
   - Treatments for Men

4. Create seed script or manual entry guide

## Dependencies

- Story 2.1 (Sanity CMS base setup)

## Definition of Done

- [ ] All acceptance criteria met
- [ ] All 13 services created in Sanity
- [ ] GROQ queries return expected data
- [ ] Content matches copywriting files
- [ ] Categories correctly assigned

## Notes

- Content source: `/copywriting/*.md` files
- English content primary; Russian/Indonesian can be placeholder
- Images can use placeholders initially

## Reference Documents

- `/copywriting/Venera - Services List.md` - Service overview
- `/copywriting/*.md` - Individual service descriptions
