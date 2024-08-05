import { expect, test } from "@playwright/test";

const url = "https://qa-stand-employees.inzhenerka.tech";
const login = "leonardo";
const pass = "leads";

test.describe("Create the company", async () => {
  test.beforeEach("Authorization", async ({ page }) => {
    await page.goto(url);
    await page.locator("input[type=text]").fill(login);
    await page.locator("input[type=password]").fill(pass);
    await page.locator("button[type=submit]").click();
    await expect(page.locator("h6").first()).toContainText("👋 Привет, ");
  });

  test("Create the company only with name", async ({ page }) => {
    const requestPromise = page.waitForRequest(
        request => request.url().endsWith("/company") && request.method() === "POST"
    );

    await page.getByTestId("AddIcon").first().click();
    const form = page.getByRole("dialog");
    await expect(form).toBeVisible();
    await form.locator("input[type=text]").first().fill("Test 2");
    await form.getByText("Добавить").last().click();

    const request = await requestPromise;
    expect(request.postDataJSON()).toEqual({name: 'Test 2', description: ''});
  });
});