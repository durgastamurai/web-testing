import { expect, test } from '@playwright/test';

// working
// test('First Login', async ({ page }) => {
//   await page.goto('https://app.ablespace.io/signin');
//   await page.locator('#email').fill('durga@stamurai.com');
//   await page.locator('#password').fill('12345678');
//   await page.locator('button[type=submit] >> "Login"').click();
//   // save storage state
//   await page.context().storageState({ path: 'test-storage-state.json' });
//   await expect(page).toHaveURL('https://app.ablespace.io/dashboard');
// });

// NOT using global setup
// test.use({ storageState: 'test-storage-state.json' }); //NOT working
// working:
// use command line:
// $env:PWDEBUG=1 //set debug mode
// npx playwright codegen --save-storage=auth.json //mandatory
// npx playwright open --load-storage=auth.json app.ablespace.io
// npx playwright test --headed
// npx playwright test meetup-login --browser=all --headed
test('Persistent Auth', async ({ browser }) => {
  const ctx = await browser.newContext({
    storageState: './auth.json',
  });
  const page = await ctx.newPage();
  await page.goto('https://app.ablespace.io/dashboard');
  await page.waitForTimeout(2000); // remove it
  await expect(page.locator('.pro-sidebar')).toHaveCount(1);
});
