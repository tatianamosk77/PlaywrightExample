import { expect, test } from "@playwright/test";

const url = 'https://the-internet.herokuapp.com/javascript_alerts';

test("Page on domcontentloaded", async ({ page }) => {
    // page.on("domcontentloaded", (content) => {
    //   console.log(content);
    // });

    page.on('dialog', dialog => {
        console.log(dialog);
        expect(dialog.message()).toEqual('I am a JS Alert');
        dialog.accept();
    });

    console.log("Go to")
    await page.goto(url);
    await page.getByText('Click for JS Alert').click();
});