import type { Page } from '@playwright/test';

async function login(
  page: Page,
  username: string,
  password: string
): Promise<void> {
  await page.goto('https://app.ablespace.io/signin');
  await page.locator('.email').fill(username);
  await page.locator('.password').fill(password);
  // await page.waitForNavigation();
  await page.locator('button[type=submit] >> "Login"').click();
}

export default login;
