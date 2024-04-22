const { expect } = require('@playwright/test');

exports.CheckoutCompilate = class CheckoutCompilate{
    constructor(page){
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.image = page.locator('.pony_express');
        this.message = page.locator('.complete-header');
        this.text = page.locator('.complete-text');
        this.backToProductsButton = page.locator('#back-to-products');

    }
    async checkTitleValue(titleValue){
        await expect(this.title).toHaveText(titleValue);
    }
    async checkImage(attribute, value){
        await expect(this.image).toHaveAttribute(attribute, value);
    }

    async checkMessage(message){
        await expect(this.message).toHaveText(message);
    }

    async checkText(text){
         await expect(this.text).toHaveText(text);
     }

    async checkButtonVisibleAndClickable(){
        await expect(this.backToProductsButton).toBeVisible();
        await expect(this.backToProductsButton).toBeEnabled();
    }
}