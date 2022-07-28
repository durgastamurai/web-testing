import { expect, test } from '@playwright/test';

test.describe('app.ablespace.io', () => {
  // working
  // test.only('login', async ({ page }) => {
  //   await page.goto('https://app.ablespace.io/signin');
  //   await page.locator('#email').fill('durga@stamurai.com');
  //   await page.locator('#password').fill('12345678');
  //   await page.locator('button[type=submit] >> "Login"').click();
  //   await expect(page).toHaveURL('https://app.ablespace.io/dashboard');
  // });

  // using global setup
  test.only('auto login', async ({ page }) => {
    await page.goto('https://app.ablespace.io/dashboard');
    await expect(page.locator('.pro-sidebar')).toHaveCount(1);
  });
});
