# Story 1.2: Configure Tailwind CSS and Base Styles

**Epic**: 1 - Foundation & Project Setup
**Status**: Ready for Development

## User Story

As a **developer**,
I want **Tailwind CSS configured with a custom design system foundation**,
so that **I can rapidly build UI components with consistent styling**.

## Acceptance Criteria

- [ ] **AC1**: Tailwind CSS installed and configured with Remix
- [ ] **AC2**: Custom color palette defined in `tailwind.config.ts` (cream, gold, green, charcoal)
- [ ] **AC3**: Custom font families configured (serif heading, sans-serif body)
- [ ] **AC4**: Base CSS reset and typography styles applied
- [ ] **AC5**: Glassmorphism utility classes defined for reuse
- [ ] **AC6**: Responsive breakpoints configured (320px, 768px, 1280px, 1536px)

## Technical Tasks

1. Install Tailwind CSS and dependencies:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p --ts
   ```

2. Create `tailwind.config.ts` with custom theme:
   ```typescript
   export default {
     content: ['./app/**/*.{ts,tsx}'],
     theme: {
       extend: {
         colors: {
           cream: '#FAF7F2',
           gold: '#C9A961',
           'deep-gold': '#B8934A',
           sage: '#8B9A7D',
           'deep-teal': '#2D4A4A',
           charcoal: '#2D2D2D',
           'soft-charcoal': '#4A4A4A',
         },
         fontFamily: {
           serif: ['Gilmoray', 'Georgia', 'serif'],
           sans: ['Gilmer', 'system-ui', 'sans-serif'],
         },
         screens: {
           'xs': '320px',
           'sm': '480px',
           'md': '768px',
           'lg': '1024px',
           'xl': '1280px',
           '2xl': '1536px',
         },
       },
     },
   }
   ```

3. Create `app/styles/tailwind.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   @layer components {
     .glass {
       @apply bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg;
     }
   }
   ```

4. Create `app/styles/fonts.css` with @font-face declarations for custom fonts

5. Copy font files from `/venera_docs/venera_fonts/` to `/public/fonts/`

6. Import styles in `app/root.tsx`

7. Test by applying classes to placeholder content

## Dependencies

- Story 1.1 (Remix project initialized)

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Tailwind classes working in components
- [ ] Custom fonts loading correctly
- [ ] Glassmorphism effect visible
- [ ] Responsive breakpoints tested

## Notes

- Use fonts: Gilmoray (serif), Gilmer Light (sans-serif)
- Verify font licenses before production
- Test glassmorphism fallback for unsupported browsers

## Reference Documents

- `/venera_docs/uxui-spec.md` - Color palette, typography specs
- `/venera_docs/venera_fonts/` - Available font files
