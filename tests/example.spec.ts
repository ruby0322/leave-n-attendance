import { expect, test } from '@playwright/test';

test('homepage has title and links to the reports page', async ({ page }) => {
  // Navigate to the homepage
    await page.goto('/', { waitUntil: 'domcontentloaded' });

  // Check the title
  await expect(page).toHaveTitle(/Leave and Attendance System/);

  // Check if the "Reports" link exists and navigate to it
  const reportsLink = page.locator('text=Reports');
  await expect(reportsLink).toBeVisible();
  await reportsLink.click();

  // Verify navigation to the reports page
  await expect(page).toHaveURL(/.*reports/);
});