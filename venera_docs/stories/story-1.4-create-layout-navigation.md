# Story 1.4: Create Layout Shell and Navigation

**Epic**: 1 - Foundation & Project Setup
**Status**: Ready for Development

## User Story

As a **visitor**,
I want **a consistent navigation experience across all pages**,
so that **I can easily find information and access key actions**.

## Acceptance Criteria

- [ ] **AC1**: Root layout component with header, main content area, and footer
- [ ] **AC2**: Navigation bar with logo placeholder, menu items, language switcher, and CTA button
- [ ] **AC3**: Mobile-responsive hamburger menu for smaller screens
- [ ] **AC4**: Footer with placeholder social links, quick nav, and copyright
- [ ] **AC5**: Navigation items are translatable via i18n
- [ ] **AC6**: CTA button links to contact section/page

## Technical Tasks

1. Create `app/components/layout/Header.tsx`:
   ```tsx
   - Logo (placeholder or text "Silentium")
   - Nav links: About, Services, Contact
   - LanguageSwitcher component
   - CTA Button "Book Consultation"
   - Responsive: desktop nav, mobile hamburger
   ```

2. Create `app/components/layout/Footer.tsx`:
   ```tsx
   - Quick links (About, Services, Contact, Privacy, Terms)
   - Social media icons (Instagram, Facebook, Telegram)
   - WhatsApp quick link
   - Copyright © 2025 Silentium
   ```

3. Create `app/components/layout/MobileMenu.tsx`:
   ```tsx
   - Full-screen overlay
   - Nav links with close button
   - Language switcher
   - CTA button at bottom
   - Focus trap when open
   - Escape key closes menu
   ```

4. Create `app/components/ui/Button.tsx`:
   ```tsx
   - Variants: primary, secondary, ghost
   - Sizes: sm, md, lg
   - Loading state
   - Disabled state
   ```

5. Update `app/root.tsx` to use layout components

6. Install and configure Lucide icons:
   ```bash
   npm install lucide-react
   ```

7. Create barrel exports in `app/components/layout/index.ts`

8. Style components using Tailwind classes from design system

## Dependencies

- Story 1.2 (Tailwind CSS configured)
- Story 1.3 (i18n framework for translations)

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Header displays correctly on all breakpoints
- [ ] Mobile menu opens/closes correctly
- [ ] Navigation links work
- [ ] Footer displays with all elements
- [ ] Keyboard navigation works (Tab, Escape)

## Notes

- Use Framer Motion for mobile menu animation
- Ensure focus management in mobile menu
- CTA links to `/:lang/contact` route

## Reference Documents

- `/venera_docs/uxui-spec.md` - Navigation structure, wireframes
- `/venera_docs/frontend-architecture.md` - Component patterns
