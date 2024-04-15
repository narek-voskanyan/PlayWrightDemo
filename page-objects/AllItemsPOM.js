const { expect } = require('@playwright/test');

exports.AllItemsPage = class AllItemsPage{
    constructor(page){
        this.page = page;
        this.shoppingCartButton = page.locator('#shopping_cart_container');
        this.filterButton = page.locator('.select_container');
    
    }

    async clickOnYourCarButton(){
        await expect(this.shoppingCartButton).toBeVisible();
        await this.shoppingCartButton.click();
    }
    async checkYourCartURL(cartURL){
        await expect(this.page).toHaveURL(cartURL);
    }
    
}