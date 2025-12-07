import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/contact');
  });

  test('contact form is visible and has required fields', async ({ page }) => {
    // Check that contact tab is available
    await expect(page.locator('button:has-text("Send Message")')).toBeVisible();

    // Click the contact tab if tabbed interface
    const contactTab = page.locator('[role="tab"]:has-text("Contact")');
    if (await contactTab.isVisible()) {
      await contactTab.click();
    }

    // Check form fields exist
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
  });

  test('contact form shows validation errors for empty submission', async ({ page }) => {
    // Click the contact tab if tabbed interface
    const contactTab = page.locator('[role="tab"]:has-text("Contact")');
    if (await contactTab.isVisible()) {
      await contactTab.click();
    }

    // Try to submit empty form
    await page.click('button[type="submit"]:has-text("Send")');

    // HTML5 validation should prevent submission
    // Check that required field is present
    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toHaveAttribute('required', '');
  });

  test('contact form can be filled out', async ({ page }) => {
    // Click the contact tab if tabbed interface
    const contactTab = page.locator('[role="tab"]:has-text("Contact")');
    if (await contactTab.isVisible()) {
      await contactTab.click();
    }

    // Fill in the form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'This is a test message from Playwright E2E tests.');

    // Verify fields are filled
    await expect(page.locator('input[name="name"]')).toHaveValue('Test User');
    await expect(page.locator('input[name="email"]')).toHaveValue('test@example.com');
    await expect(page.locator('textarea[name="message"]')).toHaveValue(
      'This is a test message from Playwright E2E tests.'
    );
  });
});

test.describe('Booking Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/contact');
  });

  test('booking form is accessible via tab', async ({ page }) => {
    // Click booking tab
    const bookingTab = page.locator('[role="tab"]:has-text("Book")');
    if (await bookingTab.isVisible()) {
      await bookingTab.click();
    }

    // Check booking-specific fields exist
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
  });

  test('booking form has service selection', async ({ page }) => {
    // Click booking tab
    const bookingTab = page.locator('[role="tab"]:has-text("Book")');
    if (await bookingTab.isVisible()) {
      await bookingTab.click();
    }

    // Check for service selector
    const serviceSelect = page.locator('select[name="service"], [role="combobox"]');
    await expect(serviceSelect).toBeVisible();
  });
});

test.describe('WhatsApp Integration', () => {
  test('WhatsApp button is visible on contact page', async ({ page }) => {
    await page.goto('/en/contact');

    // Look for WhatsApp link or button
    const whatsappLink = page.locator('a[href*="wa.me"], a[href*="whatsapp"]');
    await expect(whatsappLink).toBeVisible();
  });
});
