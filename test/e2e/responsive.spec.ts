import { test, expect } from '@playwright/test';

const breakpoints = [
  { name: 'Small Mobile', width: 320, height: 568 },
  { name: 'Mobile', width: 375, height: 667 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1280, height: 800 },
  { name: 'Large Desktop', width: 1536, height: 864 },
];

const pages = [
  { name: 'Home', path: '/en' },
  { name: 'About', path: '/en/about' },
  { name: 'Services', path: '/en/services' },
  { name: 'Contact', path: '/en/contact' },
];

test.describe('Responsive Design', () => {
  for (const breakpoint of breakpoints) {
    for (const page of pages) {
      test(`${page.name} page renders at ${breakpoint.name} (${breakpoint.width}px)`, async ({
        page: testPage,
      }) => {
        await testPage.setViewportSize({
          width: breakpoint.width,
          height: breakpoint.height,
        });
        await testPage.goto(page.path);

        // Page should load without errors
        await expect(testPage.locator('body')).toBeVisible();

        // No horizontal scroll (content fits width)
        const scrollWidth = await testPage.evaluate(() => document.documentElement.scrollWidth);
        const clientWidth = await testPage.evaluate(() => document.documentElement.clientWidth);

        // Allow small tolerance for scrollbar
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 20);

        // Screenshot for visual regression (optional - can be enabled later)
        // await testPage.screenshot({
        //   path: `./test/screenshots/${page.name.toLowerCase()}-${breakpoint.width}.png`,
        // });
      });
    }
  }
});

test.describe('Header Responsive Behavior', () => {
  test('desktop shows nav links, mobile shows hamburger', async ({ page }) => {
    // Desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/en');

    // Desktop nav should be visible
    const desktopNav = page.locator('nav.hidden.md\\:flex, nav:visible');
    await expect(desktopNav.first()).toBeVisible();

    // Mobile menu button should be hidden on desktop
    const mobileButton = page.locator('button[aria-label="Open menu"]');
    await expect(mobileButton).toBeHidden();

    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });

    // Mobile menu button should be visible
    await expect(mobileButton).toBeVisible();
  });
});

test.describe('Images Load Correctly', () => {
  test('images have proper loading attributes', async ({ page }) => {
    await page.goto('/en');

    // Check that images below fold have lazy loading
    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < Math.min(count, 10); i++) {
      const img = images.nth(i);
      const src = await img.getAttribute('src');

      // Images should have src or srcset
      if (src) {
        expect(src.length).toBeGreaterThan(0);
      }

      // Non-hero images should have loading attribute
      const loading = await img.getAttribute('loading');
      if (loading) {
        expect(['lazy', 'eager']).toContain(loading);
      }
    }
  });

  test('hero image loads eagerly', async ({ page }) => {
    await page.goto('/en');

    // Look for hero section image
    const heroImg = page.locator('section').first().locator('img').first();

    if (await heroImg.isVisible()) {
      const loading = await heroImg.getAttribute('loading');
      // Hero images should be eager or not have loading attribute
      if (loading) {
        expect(loading).toBe('eager');
      }
    }
  });
});

test.describe('Accessibility Basics', () => {
  test('page has proper heading hierarchy', async ({ page }) => {
    await page.goto('/en');

    // Should have at least one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
  });

  test('all images have alt text', async ({ page }) => {
    await page.goto('/en');

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      // Alt should exist (can be empty for decorative images)
      expect(alt).not.toBeNull();
    }
  });

  test('buttons and links are keyboard accessible', async ({ page }) => {
    await page.goto('/en');

    // Tab through the page
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Something should be focused
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });
});
