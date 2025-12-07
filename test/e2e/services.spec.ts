import { test, expect } from '@playwright/test';

test.describe('Services Page', () => {
  test('services page loads and displays services', async ({ page }) => {
    await page.goto('/en/services');

    // Page should have heading
    await expect(page.locator('h1, h2').first()).toContainText(/Services|Treatments/i);

    // Should have service cards
    const serviceCards = page.locator('a[href*="/services/"]');
    await expect(serviceCards.first()).toBeVisible();
  });

  test('can navigate to a service detail page', async ({ page }) => {
    await page.goto('/en/services');

    // Click on first service card
    const firstServiceCard = page.locator('a[href*="/en/services/"]').first();
    await firstServiceCard.click();

    // Should be on a service detail page
    await expect(page).toHaveURL(/\/en\/services\/.+/);

    // Should have service content
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('service detail page has booking button', async ({ page }) => {
    await page.goto('/en/services');

    // Click on first service
    await page.locator('a[href*="/en/services/"]').first().click();

    // Should have a booking/consultation button
    const bookingButton = page.locator('a[href*="/contact"], button:has-text("Book"), button:has-text("Consult")');
    await expect(bookingButton.first()).toBeVisible();
  });
});

test.describe('Services at Different Breakpoints', () => {
  test('services grid adjusts for mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en/services');

    // Page should still be functional
    await expect(page.locator('h1, h2').first()).toBeVisible();

    // Service cards should be visible
    const serviceCards = page.locator('a[href*="/services/"]');
    await expect(serviceCards.first()).toBeVisible();
  });

  test('services grid adjusts for tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/en/services');

    // Page should still be functional
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('services grid adjusts for large desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1536, height: 864 });
    await page.goto('/en/services');

    // Page should still be functional
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });
});
