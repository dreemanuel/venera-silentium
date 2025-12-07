import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('homepage loads with correct title', async ({ page }) => {
    await page.goto('/en');
    await expect(page).toHaveTitle(/Silentium/);
  });

  test('can navigate to all main pages', async ({ page }) => {
    await page.goto('/en');

    // Navigate to About
    await page.click('text=About');
    await expect(page).toHaveURL(/\/en\/about/);

    // Navigate to Services
    await page.click('text=Services');
    await expect(page).toHaveURL(/\/en\/services/);

    // Navigate to Contact
    await page.click('text=Contact');
    await expect(page).toHaveURL(/\/en\/contact/);

    // Navigate back to Home via logo
    await page.click('text=Silentium');
    await expect(page).toHaveURL('/en');
  });

  test('mobile menu works on small screens', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en');

    // Desktop nav should be hidden
    await expect(page.locator('nav.hidden.md\\:flex')).toBeHidden();

    // Click mobile menu button
    await page.click('button[aria-label="Open menu"]');

    // Mobile menu should be visible
    await expect(page.locator('text=About').first()).toBeVisible();

    // Click About in mobile menu
    await page.click('text=About');
    await expect(page).toHaveURL(/\/en\/about/);
  });
});

test.describe('Language Switching', () => {
  test('can switch from English to Russian', async ({ page }) => {
    await page.goto('/en');

    // Find and click language switcher
    await page.click('button:has-text("EN")');

    // Click Russian option
    await page.click('text=Russian');

    // Should redirect to Russian version
    await expect(page).toHaveURL('/ru');
  });

  test('language switch preserves current page', async ({ page }) => {
    await page.goto('/en/services');

    // Open language switcher
    await page.click('button:has-text("EN")');

    // Click Russian
    await page.click('text=Russian');

    // Should be on Russian services page
    await expect(page).toHaveURL('/ru/services');
  });

  test('can switch from Russian to Indonesian', async ({ page }) => {
    await page.goto('/ru');

    // Open language switcher
    await page.click('button:has-text("RU")');

    // Click Indonesian
    await page.click('text=Indonesian');

    // Should redirect to Indonesian version
    await expect(page).toHaveURL('/id');
  });
});

test.describe('404 Page', () => {
  test('shows custom 404 for invalid routes', async ({ page }) => {
    await page.goto('/en/invalid-page-that-does-not-exist');

    // Should show 404 text
    await expect(page.locator('text=404')).toBeVisible();
    await expect(page.locator('text=Page Not Found')).toBeVisible();

    // Should have navigation buttons
    await expect(page.locator('text=Back to Home')).toBeVisible();
    await expect(page.locator('text=View Services')).toBeVisible();
  });

  test('404 page allows navigation back to home', async ({ page }) => {
    await page.goto('/en/some-invalid-route');

    // Click back to home
    await page.click('text=Back to Home');

    // Should be on home page
    await expect(page).toHaveURL('/en');
  });
});
