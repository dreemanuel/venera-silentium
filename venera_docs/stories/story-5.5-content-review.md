# Story 5.5: Final Content Population and Review

**Epic**: 5 - Polish, SEO & Launch
**Status**: Ready for Development

## User Story

As a **business owner**,
I want **all website content reviewed and finalized**,
so that **the launched site accurately represents my brand**.

## Acceptance Criteria

- [ ] **AC1**: All service content populated in all three languages
- [ ] **AC2**: About page content finalized with real credentials and story
- [ ] **AC3**: Contact information verified and correct
- [ ] **AC4**: Images uploaded and displaying correctly
- [ ] **AC5**: Legal pages (Privacy Policy, Terms) created with appropriate content
- [ ] **AC6**: Spell check and grammar review completed for all languages

## Technical Tasks

1. **Content Population Checklist**:

   **Services (13 total)**:
   - [ ] Botox - EN/RU/ID
   - [ ] Fillers - EN/RU/ID
   - [ ] Russian Lips - EN/RU/ID
   - [ ] Mesotherapy (Facial) - EN/RU/ID
   - [ ] Mesotherapy (Scalp) - EN/RU/ID
   - [ ] Mesotherapy (Eye Area) - EN/RU/ID
   - [ ] Skin Boosters - EN/RU/ID
   - [ ] Exosome - EN/RU/ID
   - [ ] Peeling - EN/RU/ID
   - [ ] Lipolytics - EN/RU/ID
   - [ ] Acne/Pigmentation/Rosacea - EN/RU/ID
   - [ ] Facial Cleansing - EN/RU/ID
   - [ ] Treatments for Men - EN/RU/ID

   **Site Settings**:
   - [ ] Hero title and subtitle (EN/RU/ID)
   - [ ] Hero background image
   - [ ] About Dr. Venera content (EN/RU/ID)
   - [ ] About Silentium philosophy (EN/RU/ID)
   - [ ] Contact email
   - [ ] Phone number
   - [ ] WhatsApp number
   - [ ] Social media links
   - [ ] Location description

2. Create `app/routes/$lang.privacy.tsx`:
   ```typescript
   export default function Privacy() {
     const { t } = useTranslation();
     return (
       <main className="min-h-screen bg-cream pt-24">
         <div className="container mx-auto px-6 py-16 prose prose-lg">
           <h1>{t('privacy.title')}</h1>
           <p>{t('privacy.intro')}</p>
           {/* ... privacy policy sections */}
         </div>
       </main>
     );
   }
   ```

3. Create `app/routes/$lang.terms.tsx` (similar structure)

4. Add legal page content to translations:
   ```json
   "privacy": {
     "title": "Privacy Policy",
     "intro": "Your privacy is important to us...",
     "dataCollection": "Information We Collect",
     "dataUse": "How We Use Your Information",
     "contact": "Contact Us"
   },
   "terms": {
     "title": "Terms of Service",
     "acceptance": "Acceptance of Terms",
     "services": "Our Services",
     "liability": "Limitation of Liability"
   }
   ```

5. Content review checklist:
   - [ ] Spell check English content
   - [ ] Review Russian translations with native speaker
   - [ ] Review Indonesian translations with native speaker
   - [ ] Verify medical terminology accuracy
   - [ ] Check brand voice consistency
   - [ ] Ensure no placeholder text remains

6. Image review checklist:
   - [ ] All service images uploaded
   - [ ] Hero image high quality
   - [ ] Dr. Venera photo uploaded
   - [ ] Images optimized (WebP, appropriate size)
   - [ ] Alt text added to all images

7. Contact info verification:
   - [ ] Email address correct and receiving
   - [ ] Phone number formatted correctly
   - [ ] WhatsApp number working (test click-to-chat)
   - [ ] Social media links valid

8. Final proofread all pages:
   - [ ] Homepage
   - [ ] About page
   - [ ] Services index
   - [ ] Each service detail page
   - [ ] Contact page
   - [ ] Privacy Policy
   - [ ] Terms of Service

## Dependencies

- All previous stories

## Definition of Done

- [ ] All acceptance criteria met
- [ ] All content populated in CMS
- [ ] No placeholder text visible
- [ ] All images displaying
- [ ] Legal pages created
- [ ] Content reviewed and approved

## Notes

- **User action required**: Provide final images, translations, credentials
- Russian and Indonesian translations critical for target audience
- Legal pages can use template text adapted for Bali/Indonesia

## Reference Documents

- `/copywriting/` - Source content for services
- `/venera_docs/__venera-branding.md` - Brand voice reference
