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
test('Persistent Auth', async ({ page }) => {
  // const ctx = await browser.newContext({
  //   storageState: './auth.json',
  // });
  // const page = await ctx.newPage();
  await page.goto('https://app.ablespace.io/dashboard');
  await page.waitForTimeout(5000); // remove it
  await expect(page.locator('.pro-sidebar')).toHaveCount(1);
});

test.describe('Test calendar', () => {
  test('Create Event', async ({ page }) => {
    await page.goto('https://app.ablespace.io/dashboard');

    // Click div[role="button"]:has-text("Daily Data")
    await page.locator('div[role="button"]:has-text("Daily Data")').click();
    // await expect(page).toHaveURL('https://app.ablespace.io/dashboard');

    // Click text=Dismiss checklist
    await page.locator('text=Dismiss checklist').click();
    // Click text=Dismiss it
    await page.locator('text=Dismiss it').click();

    // Click text=CALENDAR30 Jul, 07:35 PM >> div >> nth=0
    await page.locator('text=/.*CALENDAR.*/').first().click();

    // Click #headlessui-menu-button-66
    await page.locator('id=headlessui-menu-button-5').click();
    // Click button[role="menuitem"]:has-text("Day")
    await page.locator('button[role="menuitem"]:has-text("Day")').click();

    // Click text=Create
    await page.locator('text=Create').click();

    // Fill up event details:
    // Click text=Instruction event >> nth=0
    await page.locator('text=Instruction event').first().click();

    // Fill [placeholder="New Session"]
    // playwright.locator('.auth-form', { hasText: 'Log in' });
    await page.locator('[placeholder="New Session"]').fill('My New Session 1');

    // Click text=Date‹July 2022›SuMoTuWeThFrSa262728293012345678910111213141516171819202122232425 >> input[type="text"]
    // await page.locator('text=/.*Date.*/ >> input[type="text"]').click(); // /.*Hello.*/
    await page.locator('input[type="text"]').first().click();

    // Click td:has-text("30") >> nth=4
    // await page.locator('td:has-text("30")').nth(4).click();
    // Click div[role="dialog"] td:has-text("20")
    // await page.locator('div[role="dialog"] td:has-text("20")').click();
    // Click div[role="dialog"] td:has-text("31")
    // TODO select today's date
    // await page.locator('div[role="dialog"] td:has-text("30")').click();
    // 1) <td data-month="5" data-value="30" data-year="2022" …>30</td> aka playwright.$("td:has-text("30") >> nth=3")
    // 2) <td data-month="6" data-value="30" data-year="2022" …>30</td> aka playwright.$("td:has-text("30") >> nth=4")
    // await page.locator('div[role="dialog"] [data-month="6"] >> text="30"').click();
    await page.locator('[data-month="6"] >> text="30"').click();

    // press on svg to remove the dialog
    // Click text=Date‹July 2022›SuMoTuWeThFrSa262728293012345678910111213141516171819202122232425 >> svg
    await page.locator('text=/.*Date.*/ >> svg').click();
    // await page.locator('input[type="text"] >> svg').click();
    // playwright.$$('div[role="dialog"]:has(label:has-text("Date"))') // wrong selection

    // await page.waitForSelector('#headlessui-dialog-22 > .flex > #cal-event-3 > .bg-white > .z-50')
    // await page.click('#headlessui-dialog-22 > .flex > #cal-event-3 > .bg-white > .z-50')
    // await page.waitForSelector('.bg-white > .z-50 > .mt-2 > .rdt > .form-control')
    // await page.click('.bg-white > .z-50 > .mt-2 > .rdt > .form-control')

    // Click input[type="time"] >> nth=0
    await page.locator('input[type="time"]').first().click();

    // Fill input[type="time"] >> nth=0
    await page.locator('input[type="time"]').first().fill('12:34');

    // Click input[type="time"] >> nth=1
    await page.locator('input[type="time"]').nth(1).click();

    // Fill input[type="time"] >> nth=1
    await page.locator('input[type="time"]').nth(1).fill('13:34');

    // Click text=Doesn't Repeat
    // await page.locator('#headlessui-menu-button-95').click();
    await page.locator("text=Doesn't Repeat").click();

    // Click button[role="menuitem"]:has-text("Daily")
    await page.locator('button[role="menuitem"]:has-text("Daily")').click();

    // Click on Add students
    // await page.locator('#react-select-4-input').click();
    await page.locator('input[type="text"]').nth(1).click();

    // Click text=Demo Student1
    await page.locator('text=Demo Student1').click();

    // Click button:has-text("Create Event")
    await page.locator('button:has-text("Create Event")').click();

    // Click text=12:34 PM - 01:34 PM >> nth=0
    await page.locator('text=12:34 PM - 01:34 PM').first().isVisible();
  });
});
