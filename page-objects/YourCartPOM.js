const { expect } = require('@playwright/test');

exports.YourCartPage = class YourCartPage{
    constructor(page){
        this.page = page;
        this.continueShoppingButton = page.locator('#continue-shopping');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.title = page.locator('[data-test="title"]');
        this.cartQuantityLable = page.locator('[data-test="cart-quantity-label"]');
        this.description = page.locator('[data-test="cart-desc-label"]');
    }
    //Click on Continue Shoppin button
    async clickOnContinueShopping(){
        await this.continueShoppingButton.click();
    }
    //Click on Checkout button
    async clickOnCheckoutButton(){
        await this.checkoutButton.click();
    }
    //Check All Items page URL
    async checkURL(URL){
        await expect(this.page).toHaveURL(URL);
    }
    //Check Titel field value
    async checkTitleValue(titleText){
        await expect(this.title).toHaveText(titleText);
    }
    //Check QTY field value
    async checkQuantityLableValue(QTY){
        await expect(this.cartQuantityLable).toHaveText(QTY);
    }
    //Check Description field value
    async checkDescriptionValue(description){
        await expect(this.description).toHaveText(description);
    }
}