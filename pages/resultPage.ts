import { expect, Page, Locator } from "@playwright/test";

export class ResultPage{
    page: Page;
    cards: Locator;
    emptyResult: Locator;
    price: Locator;

    constructor(page){
        this.page = page;
        this.cards = page.locator(".product-card");
        this.emptyResult = page.locator(".search-error>h1")
    }

    async getPriceForItem(index){
        const price = await this.cards.nth(index).locator(".product-card__price-current").textContent()
        return price!.trim();
    }

    async addItemToCart(index){
        await this.cards.nth(index).locator(".buy-link").click();
    }

    async checkEmptyResult(resultText) {
        await expect(this.emptyResult).toHaveText(resultText);
    }
}