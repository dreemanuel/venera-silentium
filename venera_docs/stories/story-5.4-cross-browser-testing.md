# Story 5.4: Cross-Browser and Device Testing

**Epic**: 5 - Polish, SEO & Launch
**Status**: Ready for Development

## User Story

As a **visitor**,
I want **the website to work on my device and browser**,
so that **I have a consistent experience regardless of how I access it**.

## Acceptance Criteria

- [ ] **AC1**: Tested on iOS Safari, Android Chrome (mobile)
- [ ] **AC2**: Tested on Chrome, Firefox, Safari, Edge (desktop)
- [ ] **AC3**: Tested at breakpoints: 320px, 768px, 1280px, 1536px
- [ ] **AC4**: All forms functional across tested browsers
- [ ] **AC5**: Animations gracefully degrade on low-power devices
- [ ] **AC6**: Language switching works correctly everywhere

## Technical Tasks

1. Create test checklist document:
   ```markdown
   ## Cross-Browser Testing Checklist

   ### Mobile Browsers
   - [ ] iOS Safari (iPhone)
   - [ ] Chrome Android

   ### Desktop Browsers
   - [ ] Chrome (latest)
   - [ ] Firefox (latest)
   - [ ] Safari (macOS)
   - [ ] Edge (latest)

   ### Breakpoints
   - [ ] 320px (small mobile)
   - [ ] 768px (tablet)
   - [ ] 1280px (desktop)
   - [ ] 1536px (large desktop)

   ### Pages to Test
   - [ ] Homepage
   - [ ] About page
   - [ ] Services index
   - [ ] Service detail
   - [ ] Contact page

   ### Features to Verify
   - [ ] Navigation (desktop and mobile menu)
   - [ ] Language switching
   - [ ] Form submission (contact and booking)
   - [ ] Image loading
   - [ ] Animations
   - [ ] Hover effects (desktop)
   - [ ] Touch interactions (mobile)
   ```

2. Set up Playwright for automated E2E testing:
   ```bash
   npm install -D @playwright/test
   npx playwright install
   ```

3. Create `playwright.config.ts`:
   ```typescript
   import { defineConfig, devices } from '@playwright/test';

   export default defineConfig({
     testDir: './test/e2e',
     projects: [
       { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
       { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
       { name: 'webkit', use: { ...devices['Desktop Safari'] } },
       { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
       { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
     ],
   });
   ```

4. Create E2E test for critical flow `test/e2e/contact-flow.spec.ts`:
   ```typescript
   import { test, expect } from '@playwright/test';

   test('user can submit contact form', async ({ page }) => {
     await page.goto('/en');
     await page.click('text=Contact');
     await page.fill('input[name="name"]', 'Test User');
     await page.fill('input[name="email"]', 'test@example.com');
     await page.fill('textarea[name="message"]', 'This is a test message.');
     await page.click('button[type="submit"]');
     await expect(page.locator('.success-message')).toBeVisible();
   });
   ```

5. Create E2E test for language switching:
   ```typescript
   test('language switching preserves page', async ({ page }) => {
     await page.goto('/en/services');
     await page.click('button:has-text("RU")');
     await expect(page).toHaveURL('/ru/services');
     await expect(page.locator('h1')).not.toHaveText('Our Services');
   });
   ```

6. Test glassmorphism fallback:
   ```css
   /* Ensure fallback in tailwind.css */
   @supports not (backdrop-filter: blur(12px)) {
     .glass {
       background: rgba(255, 255, 255, 0.9);
     }
   }
   ```

7. Add reduced motion support:
   ```typescript
   // In animation components
   const prefersReducedMotion = useReducedMotion();

   if (prefersReducedMotion) {
     return <div>{children}</div>; // No animation
   }
   ```

8. Manual testing checklist execution:
   - Use BrowserStack or real devices
   - Document any issues found
   - Fix critical issues before launch

9. Add test scripts to package.json:
   ```json
   {
     "scripts": {
       "test:e2e": "playwright test",
       "test:e2e:ui": "playwright test --ui"
     }
   }
   ```

## Dependencies

- All previous stories (complete site needed)

## Definition of Done

- [ ] All acceptance criteria met
- [ ] E2E tests pass on all browser projects
- [ ] Manual testing completed
- [ ] Critical bugs fixed
- [ ] Documentation of known issues (if any)

## Notes

- Prioritize mobile browsers (primary audience)
- Test on real devices if possible
- Focus on critical user journeys

## Reference Documents

- `/venera_docs/frontend-architecture.md` - Browser support
- `/venera_docs/prd.md` - NFR3, NFR4 responsive requirements
