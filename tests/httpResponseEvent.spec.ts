import { expect, test } from "@playwright/test";

const url = "https://qa-stand-employees.inzhenerka.tech";
const login = "leonardo";
const pass = "leads"; 
 
 test("Auth test", async ({ page }) => {
    await page.goto(url);

    const responsePromise = page.waitForResponse(
      (response) => response.url().endsWith("/login") && response.status() < 300
    );

    await page.locator("input[type=text]").fill(login);
    await page.locator("input[type=password]").fill(pass);
    await page.locator("button[type=submit]").click();

    const response = await responsePromise;
    const responseBody = await response.json();

    expect(responseBody['role']).toStrictEqual('admin');
    expect(responseBody['displayName']).toStrictEqual(login);
    expect(responseBody['login']).toStrictEqual(login);
    expect(responseBody['userToken']).not.toBeNull()

    await expect(page.locator("h6").first()).toHaveText(`👋 Привет, ${login}`);
  });