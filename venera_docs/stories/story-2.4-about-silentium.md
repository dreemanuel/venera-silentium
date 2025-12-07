# Story 2.4: Create About Silentium Philosophy Section

**Epic**: 2 - Content Management & Brand Foundation
**Status**: Ready for Development

## User Story

As a **visitor**,
I want **to understand the Silentium sanctuary concept**,
so that **I can appreciate the unique experience offered beyond just treatments**.

## Acceptance Criteria

- [ ] **AC1**: Section displays Silentium philosophy content from CMS
- [ ] **AC2**: Brand messaging emphasizes "beauty through inner harmony" concept
- [ ] **AC3**: Visual design evokes calm, sanctuary-like atmosphere
- [ ] **AC4**: Content is translatable and renders in selected language
- [ ] **AC5**: Smooth scroll integration from hero CTA or navigation
- [ ] **AC6**: Works standalone as dedicated About page or as homepage section

## Technical Tasks

1. Update Sanity schema to include aboutSilentium:
   ```typescript
   {
     name: 'aboutSilentium',
     title: 'About Silentium',
     type: 'object',
     fields: [
       { name: 'headline', type: 'localizedString' },
       { name: 'philosophy', type: 'localizedText' },
       { name: 'values', type: 'array', of: [
         {
           type: 'object',
           fields: [
             { name: 'title', type: 'localizedString' },
             { name: 'description', type: 'localizedString' }
           ]
         }
       ]},
       { name: 'ambientImage', type: 'image' }
     ]
   }
   ```

2. Create `app/components/sections/SilentiumPhilosophy.tsx`:
   ```tsx
   interface SilentiumPhilosophyProps {
     headline: string;
     philosophy: PortableTextBlock[];
     values: Array<{ title: string; description: string }>;
     imageUrl?: string;
   }

   // Full-width section
   // Soft background (cream or soft gradient)
   // Centered headline
   // Philosophy text with elegant spacing
   // Values displayed as cards or list
   ```

3. Style for sanctuary atmosphere:
   - Background: Cream with subtle texture or gradient
   - Typography: Serif for headline, sans for body
   - Spacing: Generous padding, comfortable reading width
   - Values: Card-style with glassmorphism effect

4. Add scroll-reveal animation (reuse from Story 2.3)

5. Integrate into homepage below About Dr. Venera section

6. Create PortableText renderer for rich text:
   ```tsx
   import { PortableText } from '@portabletext/react';

   const components = {
     block: {
       normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
       h2: ({ children }) => <h2 className="font-serif text-2xl mb-4">{children}</h2>,
     }
   };
   ```

## Dependencies

- Story 2.3 (useScrollReveal hook, animation patterns)
- Story 2.1 (Sanity CMS)

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Content loads from CMS correctly
- [ ] Visual design feels calm and elegant
- [ ] Values/principles are clearly presented
- [ ] Responsive on all breakpoints

## Notes

- Content source: `/copywriting/About - Silentium.md`
- Key message: "Beauty is born in silence"
- Sanctuary concept: science meets spirit

## Reference Documents

- `/venera_docs/uxui-spec.md` - Section layout
- `/copywriting/About - Silentium.md` - Philosophy text
