# Story 2.1: Initialize Sanity Studio and Content Schemas

**Epic**: 2 - Content Management & Brand Foundation
**Status**: ✅ COMPLETE

## User Story

As a **content administrator**,
I want **a CMS where I can manage website content**,
so that **I can update text and images without developer assistance**.

## Acceptance Criteria

- [x] **AC1**: Sanity Studio initialized in `/sanity` directory
- [x] **AC2**: Sanity project created and connected to Sanity.io (Project ID: qibofery)
- [x] **AC3**: Base schemas defined: `siteSettings`, `page`, `service`, `testimonial`
- [x] **AC4**: Schema supports multilingual fields (EN/RU/ID)
- [x] **AC5**: Sanity Studio accessible locally via `npm run sanity`
- [x] **AC6**: GROQ query utility created for fetching content in Remix loaders

## Technical Tasks

1. Install Sanity CLI and initialize project:
   ```bash
   npm create sanity@latest -- --project-id <id> --dataset production --template clean
   ```

2. Move Sanity to `/sanity` directory and configure workspace

3. Create schema objects in `/sanity/schemas/objects/`:
   - `localizedString.ts` - String with en/ru/id fields
   - `localizedText.ts` - Portable text with en/ru/id
   - `portableText.ts` - Base rich text configuration

4. Create document schemas in `/sanity/schemas/documents/`:

   **siteSettings.ts**:
   ```typescript
   {
     name: 'siteSettings',
     title: 'Site Settings',
     type: 'document',
     fields: [
       { name: 'heroTitle', type: 'localizedString' },
       { name: 'heroSubtitle', type: 'localizedString' },
       { name: 'heroImage', type: 'image' },
       { name: 'contactEmail', type: 'string' },
       { name: 'contactPhone', type: 'string' },
       { name: 'whatsappNumber', type: 'string' },
       { name: 'socialLinks', type: 'object', fields: [...] }
     ]
   }
   ```

   **service.ts**:
   ```typescript
   {
     name: 'service',
     title: 'Service',
     type: 'document',
     fields: [
       { name: 'title', type: 'localizedString' },
       { name: 'slug', type: 'slug' },
       { name: 'category', type: 'string', options: { list: [...] } },
       { name: 'shortDescription', type: 'localizedString' },
       { name: 'description', type: 'localizedText' },
       { name: 'benefits', type: 'array', of: [{ type: 'localizedString' }] },
       { name: 'image', type: 'image' },
       { name: 'order', type: 'number' }
     ]
   }
   ```

5. Create `/sanity/lib/client.ts` with Sanity client

6. Create `/app/lib/sanity.server.ts` with GROQ queries:
   ```typescript
   export const servicesQuery = groq`*[_type == "service"]...`;
   export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]...`;
   ```

7. Add Sanity script to root package.json:
   ```json
   "sanity": "cd sanity && sanity dev"
   ```

8. Update Vercel environment variables with Sanity credentials

## Dependencies

- Story 1.5 (Deployment pipeline for env vars)

## Definition of Done

- [x] All acceptance criteria met
- [x] Sanity Studio runs locally at http://localhost:3333
- [x] All schemas defined and visible in Studio
- [x] Can create/edit content in Studio
- [x] GROQ queries defined and ready for use

## Notes

- User must create Sanity account and project
- Use free tier (10K API requests/month)
- Deploy Sanity Studio separately if needed (optional for MVP)

## Reference Documents

- `/venera_docs/architecture.md` - Sanity integration details
- `/venera_docs/prd.md` - FR13 CMS requirement
