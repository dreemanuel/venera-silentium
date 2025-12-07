# Cross-Browser Testing Checklist

## Overview
This checklist ensures the Venera Silentium website works correctly across different browsers, devices, and accessibility settings.

---

## Browser Testing Matrix

### Desktop Browsers
| Browser | Version | Status | Notes |
|---------|---------|--------|-------|
| Chrome | Latest | [ ] Pending | Primary browser |
| Firefox | Latest | [ ] Pending | |
| Safari | Latest (macOS) | [ ] Pending | WebKit engine |
| Edge | Latest | [ ] Pending | Chromium-based |

### Mobile Browsers
| Browser | Device | Status | Notes |
|---------|--------|--------|-------|
| Safari | iPhone 12/13/14 | [ ] Pending | Primary mobile target |
| Chrome | Android (Pixel 5) | [ ] Pending | |
| Samsung Internet | Galaxy S21+ | [ ] Pending | |

---

## Breakpoint Testing

### Required Breakpoints
| Breakpoint | Width | Status |
|------------|-------|--------|
| Small Mobile | 320px | [ ] Pending |
| Mobile | 375px | [ ] Pending |
| Large Mobile | 428px | [ ] Pending |
| Tablet | 768px | [ ] Pending |
| Desktop | 1280px | [ ] Pending |
| Large Desktop | 1536px | [ ] Pending |

---

## Pages to Test

### Homepage (`/en`, `/ru`, `/id`)
- [ ] Hero section loads correctly
- [ ] Navigation is accessible
- [ ] CTA buttons work
- [ ] Images load with lazy loading
- [ ] Animations run smoothly (or are disabled with reduced motion)

### About Page (`/en/about`)
- [ ] Dr. Venera section renders correctly
- [ ] Silentium philosophy section renders
- [ ] Images load
- [ ] Text is readable in all languages

### Services Page (`/en/services`)
- [ ] Service grid displays correctly
- [ ] Category grouping works
- [ ] Service cards are clickable
- [ ] Images load with proper aspect ratios

### Service Detail Page (`/en/services/[slug]`)
- [ ] Hero image loads
- [ ] Description renders correctly
- [ ] Benefits list displays
- [ ] Related services show
- [ ] Booking CTA works

### Contact Page (`/en/contact`)
- [ ] Tab switching works (Booking/Contact)
- [ ] Contact form validates
- [ ] Booking form with service selection works
- [ ] WhatsApp link opens correctly
- [ ] Social media links work
- [ ] Form submission works (test with real data)

---

## Features to Verify

### Navigation
- [ ] Logo links to homepage
- [ ] Desktop nav shows on md+ screens
- [ ] Mobile menu opens/closes on touch
- [ ] Active page is highlighted
- [ ] Language switcher works
- [ ] Language persists across navigation

### Language Switching
- [ ] English loads correctly
- [ ] Russian loads correctly (Cyrillic text renders)
- [ ] Indonesian loads correctly
- [ ] URL updates on language change
- [ ] Current page preserved on switch

### Forms
- [ ] Required field validation works
- [ ] Email validation works
- [ ] Phone number accepted (international format)
- [ ] Date picker works on mobile
- [ ] Service dropdown populates
- [ ] Submit button shows loading state
- [ ] Success message displays
- [ ] Error message displays on failure

### Images
- [ ] Hero images load eagerly (priority)
- [ ] Below-fold images lazy load
- [ ] WebP format served (where supported)
- [ ] Fallback formats work
- [ ] Alt text present on all images
- [ ] Images don't cause layout shift (CLS)

### Animations
- [ ] Page transitions work
- [ ] Hover effects work on desktop
- [ ] Scroll animations trigger correctly
- [ ] No animations when reduced motion preferred
- [ ] Navigation progress bar shows during transitions

---

## Accessibility Testing

### Keyboard Navigation
- [ ] All interactive elements focusable
- [ ] Focus order logical
- [ ] Focus visible on all elements
- [ ] Skip link present (if applicable)
- [ ] Modal traps focus when open

### Screen Reader
- [ ] Page titles are descriptive
- [ ] Headings follow hierarchy (h1 > h2 > h3)
- [ ] Images have descriptive alt text
- [ ] Form labels connected to inputs
- [ ] Error messages announced
- [ ] ARIA labels used appropriately

### Visual
- [ ] Text has sufficient color contrast
- [ ] High contrast mode works
- [ ] Text resizable to 200% without breaking layout
- [ ] No horizontal scroll at any viewport

### Reduced Motion
- [ ] Animations disabled when `prefers-reduced-motion: reduce`
- [ ] No essential information lost without animations
- [ ] Page still functions without JavaScript animations

---

## Performance Checks

- [ ] Lighthouse Mobile score > 80
- [ ] Lighthouse Desktop score > 90
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] No render-blocking resources
- [ ] Images optimized and properly sized

---

## SEO Verification

- [ ] Meta titles unique per page
- [ ] Meta descriptions present
- [ ] Open Graph tags present
- [ ] Twitter card tags present
- [ ] Canonical URLs set
- [ ] Hreflang tags for all languages
- [ ] Sitemap.xml accessible
- [ ] Robots.txt configured correctly
- [ ] Structured data validates (Google Rich Results Test)

---

## 404 & Error States

- [ ] 404 page shows for invalid URLs
- [ ] 404 page has navigation options
- [ ] 404 page uses correct language
- [ ] Error boundary catches unexpected errors
- [ ] Error page provides helpful information

---

## Browser-Specific Issues to Watch

### Safari
- [ ] backdrop-filter works (or fallback shows)
- [ ] Date input styling acceptable
- [ ] Smooth scrolling works
- [ ] CSS Grid rendering correct

### Firefox
- [ ] Scrollbar styling (may differ)
- [ ] Form autofill styling
- [ ] Font rendering

### Edge
- [ ] All features working (Chromium-based, should match Chrome)

### Mobile Safari
- [ ] Viewport scaling correct
- [ ] Touch targets 44px minimum
- [ ] Safe area insets respected
- [ ] No zoom on input focus

---

## Test Commands

```bash
# Run all E2E tests
npm run test:e2e

# Run tests in headed mode (visible browser)
npm run test:e2e:headed

# Run tests with UI
npm run test:e2e:ui

# Run specific browser
npm run test:e2e:chromium
npm run test:e2e:webkit

# Run specific test file
npx playwright test navigation.spec.ts
```

---

## Manual Testing Notes

### Testing Environment
- [ ] Dev server running (`npm run dev`)
- [ ] Sanity CMS has content seeded
- [ ] Environment variables configured

### Known Issues
(Document any known issues here during testing)

| Issue | Browser/Device | Severity | Status |
|-------|----------------|----------|--------|
| | | | |

---

## Sign-Off

| Tester | Date | Browsers Tested | Status |
|--------|------|-----------------|--------|
| | | | |

---

## Resources

- [BrowserStack](https://www.browserstack.com/) - Cross-browser testing
- [Can I Use](https://caniuse.com/) - Browser support reference
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance auditing
- [WAVE](https://wave.webaim.org/) - Accessibility testing
- [Google Rich Results Test](https://search.google.com/test/rich-results) - Structured data validation
