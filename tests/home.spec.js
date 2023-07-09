// @ts-check
const { test, expect } = require('@playwright/test');

test('The page have items to buy/see', async ({ page }) => {
  await page.goto('http://localhost:8080/');

  const item = await page.locator('.item');

  await expect(item).toBeTruthy();

});

test('When the page is in desktop mode, the items are displayed side by side.', async ({ page }) => {
  await page.goto('http://localhost:8080/');

  await page.setViewportSize({
    width: 1920,
    height: 1080,
  });

  expect(await page.screenshot()).toMatchSnapshot('home-page-desktop-size.png');
});

test('When the page is in tablet mode, the items are displayed in pairs', async ({ page }) => {
  await page.goto('http://localhost:8080/');

  await page.setViewportSize({
    width: 820,
    height: 1180,
  });

  expect(await page.screenshot()).toMatchSnapshot('home-page-tablet-size.png');
});

test('When the page is in phone mode, the items are displayed one at a time.', async ({ page }) => {
  await page.goto('http://localhost:8080/');

  await page.setViewportSize({
    width: 375,
    height: 667,
  });

  expect(await page.screenshot()).toMatchSnapshot('home-page-phone-size.png');
});

