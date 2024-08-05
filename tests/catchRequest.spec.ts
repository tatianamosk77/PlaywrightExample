import {expect, test} from "@playwright/test";

test('Listen for the response', async ({ page }) => {

    await page.route("https://todo-app-sky.herokuapp.com/", async route => {
      const response = await route.fetch();
      const body = await response.json()
      console.log(body);
      await route.continue()
    })
    await page.goto('https://sky-todo-list.herokuapp.com', {waitUntil: 'networkidle'});
  });

  test('Replace the response', async ({ page }) => {
    const emptyList = [];
  
    await page.route("https://todo-app-sky.herokuapp.com/", async route => {
      await route.fulfill({json: emptyList})
    })
  
    await page.goto('https://sky-todo-list.herokuapp.com', {waitUntil: 'networkidle'});
    await expect(page.locator("tr")).toHaveCount(0)
  });