import { expect } from "@playwright/test";
import {Page, Locator} from "@playwright/test";

export class CartPage{
    page: Page;
    endedPrice: Locator;
    emptyCartText: Locator;

    constructor(page){
        this.page = page; 
        this.endedPrice = page.locator(".b-dotted-im-e-val").last();
        this.emptyCartText = page.locator(".g-alttext-head").first()
    }

    async openCart() {
        await this.page.goto("https://www.labirint.ru/cart");
    }

    async checkTotalPrice(priceToBe) {
        await expect(this.endedPrice).toHaveText(priceToBe);

    }

    async checkEmptyResultText(text){
        await expect(this.emptyCartText).toHaveText(text, {ignoreCase: true});
    }
}