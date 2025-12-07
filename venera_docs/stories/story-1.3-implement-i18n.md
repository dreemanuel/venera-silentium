# Story 1.3: Implement i18n Framework

**Epic**: 1 - Foundation & Project Setup
**Status**: Ready for Development

## User Story

As a **visitor**,
I want **to view the website in my preferred language (English, Russian, or Indonesian)**,
so that **I can understand the content comfortably**.

## Acceptance Criteria

- [ ] **AC1**: `remix-i18next` installed and configured
- [ ] **AC2**: Language detection from URL prefix (`/en`, `/ru`, `/id`) with fallback to English
- [ ] **AC3**: Translation files structure created for all three languages
- [ ] **AC4**: Language switcher component implemented
- [ ] **AC5**: Placeholder translations for common UI strings (navigation, buttons)
- [ ] **AC6**: SSR-compatible language detection and rendering

## Technical Tasks

1. Install i18n dependencies:
   ```bash
   npm install remix-i18next i18next i18next-browser-languagedetector i18next-http-backend i18next-fs-backend
   ```

2. Create `app/lib/i18n.server.ts`:
   ```typescript
   import Backend from 'i18next-fs-backend';
   import { resolve } from 'path';
   import { RemixI18Next } from 'remix-i18next';
   import i18n from './i18n';

   export const i18next = new RemixI18Next({
     detection: {
       supportedLanguages: ['en', 'ru', 'id'],
       fallbackLanguage: 'en',
     },
     i18next: {
       ...i18n,
       backend: {
         loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
       },
     },
     plugins: [Backend],
   });
   ```

3. Create `app/lib/i18n.ts` with shared config

4. Create translation files:
   ```
   public/locales/
   ├── en/common.json
   ├── ru/common.json
   └── id/common.json
   ```

5. Add placeholder translations:
   ```json
   {
     "nav": {
       "about": "About",
       "services": "Services",
       "contact": "Contact"
     },
     "hero": {
       "tagline": "Beauty is born in silence",
       "cta": "Book Consultation"
     }
   }
   ```

6. Create `app/components/layout/LanguageSwitcher.tsx`:
   - Display current language
   - Allow switching between EN/RU/ID
   - Preserve current path on switch

7. Update route structure to use `$lang` parameter

8. Update `root.tsx` to include i18n provider

## Dependencies

- Story 1.1 (Remix project initialized)

## Definition of Done

- [ ] All acceptance criteria met
- [ ] `/en`, `/ru`, `/id` routes work correctly
- [ ] Language switcher changes URL and content
- [ ] Translations render on server (view source shows translated text)
- [ ] Invalid language redirects to `/en`

## Notes

- Use URL-based language detection (not cookies) for SEO
- Ensure language switcher preserves current page path
- Russian translations can use placeholder English for now

## Reference Documents

- `/venera_docs/frontend-architecture.md` - i18n strategy
- `/venera_docs/prd.md` - FR1 language requirement
