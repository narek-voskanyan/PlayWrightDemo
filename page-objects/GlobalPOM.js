const { expect } = require('@playwright/test');

exports.GlobalPageObjectModel = class GlobalPageObjectModel{
    constructor(page){
        this.page = page;
        this.addToCartButton = page.locator('.btn.btn_primary.btn_small.btn_inventory');
        this.shoppingCartButton = page.locator('#shopping_cart_container');
        this.inventoryItemName = page.locator('[data-test="inventory-item-name"]');
        this.inventoryItemDescription = page.locator('[data-test="inventory-item-desc"]');
        this.inventoryItemPrice = page.locator('[data-test="inventory-item-price"]');
    }

    async checkURL(url){
        await expect(this.page).toHaveURL(url);
    }
}