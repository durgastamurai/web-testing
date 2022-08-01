import { expect, test } from '@playwright/test';

// working
// test('First Login', async ({ page }) => {
//   await page.goto('https://app.ablespace.io/signin');
//   await page.locator('#email').fill('durga@stamurai.com');
//   await page.locator('#password').fill('12345678');
//   await page.locator('button[type=submit] >> "Login"').click();
//   // save storage state
//   await page.context().storageState({ path: 'auth.json' });
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
  test.only('Create Event', async ({ page }) => {
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
    const today = new Date();
    // const dd = String(today.getDate()).padStart(2, '0');
    const dd = String(today.getDate());
    const mm = String(today.getMonth()); // January is 0
    // const yyyy = today.getFullYear();
    // today = mm + '/' + dd + '/' + yyyy;
    // const todayStr = `${mm}/${dd}`;
    // console.log(`Today date in US format: ${todayStr}`);

    // await page.locator('div[role="dialog"] td:has-text("30")').click();
    // 1) <td data-month="5" data-value="30" data-year="2022" …>30</td> aka playwright.$("td:has-text("30") >> nth=3")
    // 2) <td data-month="6" data-value="30" data-year="2022" …>30</td> aka playwright.$("td:has-text("30") >> nth=4")
    // await page.locator('div[role="dialog"] [data-month="6"] >> text="30"').click();
    await page.locator(`[data-month="${mm}"] >> text="${dd}"`).click();

    // press on svg to remove the dialog
    // Click text=Date‹July 2022›SuMoTuWeThFrSa262728293012345678910111213141516171819202122232425 >> svg
    // await page.locator('text=/.*Date.*/ >> svg').click();
    // await page.locator('input[type="text"] >> svg').click();
    // playwright.$$('div[role="dialog"]:has(label:has-text("Date"))') // wrong selection

    // await page.waitForSelector('#headlessui-dialog-22 > .flex > #cal-event-3 > .bg-white > .z-50')
    // await page.click('#headlessui-dialog-22 > .flex > #cal-event-3 > .bg-white > .z-50')
    // await page.waitForSelector('.bg-white > .z-50 > .mt-2 > .rdt > .form-control')
    // await page.click('.bg-white > .z-50 > .mt-2 > .rdt > .form-control')
    // const div = await page.locator('text=/.*Date.*/', { has: page.locator('svg') });
    // Click on svg to close the calendar popup
    await page
      .locator(
        'text=Date‹August 2022›SuMoTuWeThFrSa3112345678910111213141516171819202122232425262728 >> svg'
      )
      .click();

    // Click input[type="time"] >> nth=0
    await page.locator('input[type="time"]').first().click();

    // select 1 hour later from now
    // const time = new Date(new Date().getTime() + 1*60*60*1000).toLocaleTimeString(); // 3:18:48 PM or 15:18:48
    // const date = new Date(new Date().getTime() + 1 * 60 * 60 * 1000);
    // const hour = date.getHours();
    // const min = date.getMinutes();

    // Fill input[type="time"] >> nth=0
    await page.locator('input[type="time"]').first().fill('15:34');
    // await page.locator('input[type="time"]').first().fill(`${hour}:${min}`);

    // Click input[type="time"] >> nth=1
    await page.locator('input[type="time"]').nth(1).click();

    // Fill input[type="time"] >> nth=1
    await page.locator('input[type="time"]').nth(1).fill('16:34');

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

  test('Delete Event', async ({ page }) => {
    // close onboarding 'Get Started
    // await page.locator('.uf-close-button').click();

    // Click #headlessui-menu-button-7
    // await page.locator('#headlessui-menu-button-7').click();
    // await page.locator('id:has-text("/headlessui-menu-button-*./")').click();
    // Click text=12:34 PM - 01:34 PM >> nth=0
    // await page.locator('text=12:34 PM - 01:34 PM').isVisible();
    // await page.locator('button:right-of(:text("12:34 PM - 01:34 PM"))').click();
    await page
      .locator(
        'text=02:18 PM - 02:48 PMTake Data02:18 PM - 02:48 PMTake Data >> button'
      )
      .click();

    // Click text=Delete
    await page.locator('text=Delete').click();
    // Click text=All events
    await page.locator('text=All events').click();
    // Check input[name="push-notifications"] >> nth=2
    await page.locator('input[name="push-notifications"]').nth(2).check();
    // Click button:has-text("Delete")
    await page.locator('button:has-text("Delete")').click();
  });
});
