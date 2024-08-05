import { expect, test } from "@playwright/test";
import { allure } from "allure-playwright";
import { Severity } from "allure-js-commons";

const url = "https://qa-stand-employees.inzhenerka.tech";
const login = 'leonardo';
const password = 'leads';
const companyName = '';


test.describe("Tests for company creation", async () => {

    test.beforeEach("Authorization", async ({page}) => {
        await allure.description("Creation via UI",);
        await allure.owner("Master of tests");
        await allure.tags("companies", "creation", "auth area");
        await allure.severity(Severity.CRITICAL);
        await allure.link("https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_659d235d16f1ad2e3975abca_659e574eeb35721ecb8e912b/scale_1200", "Требование");
        await allure.issue("BUG-123", "https://example.com/issues/AUTH-123");
        await allure.tms("TMS-456", "https://example.com/tms/TMS-456");
    await page.goto(url);
    await page.locator('//*[@id=":r2:"]').fill(login);
    await page.locator("//*[@id=':r3:']").fill(password);
    await page.getByText("ВОЙТИ").click();
    await expect(page.locator("h6").first()).toContainText("👋 Привет, ");

    });
  
    test("Create the company (all fields are filled out)",  {
        tag: ["@Позитивный", "@smoke"], 
        annotation: [
          { type: "Priority", description: "critical" },
          { type: "Description", description: "Authorizated user can create a company with all filled fields" }
        ],
      }, async ({ page }) => {

        await allure.parentSuite("Company");
      await allure.suite("Company addition");
      await allure.subSuite("Positive tests");


        await page.getByTestId("AddIcon").first().click();
        await page.locator('//*[@id=":r7:"]').fill("111");
        await page.locator("//*[@id=':r8:']").fill(":(((");
        await page.locator('//button[text()="Добавить"]').click();
    
        await expect(page.getByText("111").first()).toBeVisible();
    
    
    });
  
      
test("Create the company only with name",  {
    tag: ["@Positive", "@smoke"], 
    annotation: [
      { type: "Priority", description: "medium" },
      { type: "Description", description: "Authorized user can create a company only with the name" }
    ],
  }, async ({ page }) => {
   
    await page.getByTestId("AddIcon").first().click();
    await page.locator('//*[@id=":r7:"]').fill("BBB");
    await page.locator('//button[text()="Добавить"]').click();

    await expect(page.getByText("BBB")).toBeVisible();

});

  });

  test.describe("Negative test for company addition", async () => {

    test.beforeEach("Authorization", async ({page}) => {
      
        await allure.step("Launch the page", async () => {
            await page.goto(url);
          });
              await page.locator('//*[@id=":r2:"]').fill(login);
    await page.locator("//*[@id=':r3:']").fill(password);
    await page.getByText("ВОЙТИ").click();
    await expect(page.locator("h6").first()).toContainText("👋 Привет, ");

    });
    test("Create the company only with the description",  {
        tag: ["@Negative"], 
        annotation: [
          { type: "Priority", description: "critical" },
          { type: "Description", description: "Authorized user cannot create a company without a name" }
        ],
      }, async ({ page }) => {
       
        await page.getByTestId("AddIcon").first().click();
        await page.locator("//*[@id=':r8:']").fill(":(((");
    
        await expect(page.locator('//button[text()="Добавить"]')).toBeDisabled();
    
    });
    
    test("Create the company (space insted the name)", {tag: ["@Negative"], 
         annotation: [
          { type: "Priority", description: "critical" },
          { type: "Description", description: "Authorized user cannot create a company with spaces in a name" }
        ],
      }, async ({ page }) => {
        
        await page.getByTestId("AddIcon").first().click();
        await page.locator('//*[@id=":r7:"]').fill(" ");
    
        await expect(page.locator('//button[text()="Добавить"]')).toBeDisabled();
    });
    
});


