import { test, expect } from '@playwright/test';

test.describe('Nexus Visual Comparison', () => {
  test('should match design reference', async ({ page }) => {
    // 1. Go to your local version
    await page.goto('http://localhost:5500/index.html'); // Update port if necessary
    
    // 2. Take a screenshot of the hero section
    await expect(page.locator('#hero')).toHaveScreenshot('hero-section.png', {
        maxDiffPixels: 100,
        threshold: 0.2
    });

    // 3. Verify mobile menu functionality
    await page.setViewportSize({ width: 375, height: 812 });
    await page.click('#navToggle');
    await expect(page.locator('#navLinks')).toBeVisible();
    
    // 4. Check Speaker Grid Layout
    const speakerCount = await page.locator('.nx-spk-img').count();
    expect(speakerCount).toBe(4);
  });
});