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

test('Pressing the "plus" (+) button increases the quantity of items one by one.', async ({ page }) => {
  // GIVEN
  await page.goto('http://localhost:8080/');

  const item = page.locator('.item').filter({ has: page.getByText('Wrap Dress') });
  const quantityText = await item.locator(".quantity");

  await expect(quantityText).toHaveText('0');

  // WHEN
  await item.locator('.bi-plus-lg').click()

  // THEN
  await expect(quantityText).toHaveText('1');
});

test('Pressing the "minus" (-) button decreases the quantity of items by one.', async ({ page }) => {
  //GIVEN
  await page.goto('http://localhost:8080/');

  const item = page.locator('.item').filter({ has: page.getByText('Wrap Dress') });
  const quantityText = await item.locator(".quantity");
  await item.locator('.bi-plus-lg').click()

  await expect(quantityText).toHaveText('1');

  //WHEN
  await item.locator('.bi-dash-lg').click()

  //THEN
  await expect(quantityText).toHaveText('0');
});

test('Pressing the "minus" (-) button when the item quantity is equal to zero, does not decreases the quantity', async ({ page }) => {
  //GIVEN
  await page.goto('http://localhost:8080/');

  const item = page.locator('.item').filter({ has: page.getByText('Wrap Dress') });
  const quantityText = await item.locator(".quantity");

  await expect(quantityText).toHaveText('0');

  //WHEN
  await item.locator('.bi-dash-lg').click()

  //THEN
  await expect(quantityText).toHaveText('0');
});

test('The sum of all item quantities is displayed in the shopping cart.', async ({ page }) => {
  //GIVEN
  await page.goto('http://localhost:8080/');

  const cartAmount = page.locator('.cartAmount');
  const itemOne = page.locator('.item').filter({ has: page.getByText('Wrap Dress') });
  const itemTwo = page.locator('.item').filter({ has: page.getByText('Ribbed Sweater') });

  const quantityTextOne = await itemOne.locator(".quantity");
  const quantityTextTwo = await itemTwo.locator(".quantity");

  await expect(quantityTextOne).toHaveText('0');
  await expect(quantityTextTwo).toHaveText('0');

  //WHEN
  await itemOne.locator('.bi-plus-lg').click()
  await itemTwo.locator('.bi-plus-lg').click()

  //THEN
  await expect(cartAmount).toHaveText('2');
});

