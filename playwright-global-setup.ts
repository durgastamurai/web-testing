/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-extraneous-dependencies */
import type { Page } from '@playwright/test';
import { chromium } from '@playwright/test';

const _uname = process.env.MEETUP_USERNAME ?? '';
const _pwd = process.env.MEETUP_PASSWORD ?? '';

async function login(
  page: Page,
  username: string,
  password: string
): Promise<void> {
  await page.goto('https://app.ablespace.io/signin');
  await page.locator('#email').fill(username);
  await page.locator('#password').fill(password);
  await page.locator('button[type=submit] >> "Login"').click();
}

async function globalSetup(): Promise<void> {
  // const storageState = config.projects[0]?.use.storageState;
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await login(page, _uname, _pwd);

  // Save storage state into the file.
  await page.context().storageState({
    path: 'test-storage-state.json',
  });
  await browser.close();
}

export default globalSetup;
