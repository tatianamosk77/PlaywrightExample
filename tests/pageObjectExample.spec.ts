import {test, expect} from "@playwright/test";
import {MainPage} from '../pages/mainPage';
import {ResultPage} from '../pages/resultPage';
import {CartPage} from '../pages/cartPage';


test("Site search", async ({ page }) => {
    const mainPage = new MainPage(page);
    const resultPage = new ResultPage(page);
    const cartPage = new CartPage(page);

  await mainPage.openPage();
  await mainPage.searchFor("Javascript");

  const priceToBe = await resultPage.getPriceForItem(0);
  await resultPage.addItemToCart(0)
  

  await cartPage.openCart();
  await cartPage.checkTotalPrice(priceToBe);
});

test("Site search (empty result)", async ({ page }) => {
    const mainPage = new MainPage(page);
const resultPage = new ResultPage(page);
const cartPage = new CartPage(page);

    await mainPage.openPage();
    await mainPage.searchFor("fgyhujikolpkjhggh");
    await resultPage.checkEmptyResult("Мы ничего не нашли по вашему запросу! Что делать?");
    await cartPage.openCart();
    await cartPage.checkEmptyResultText("ВАША КОРЗИНА ПУСТА. ПОЧЕМУ?");
});