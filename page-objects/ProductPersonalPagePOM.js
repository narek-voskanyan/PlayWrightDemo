const { expect } = require('@playwright/test');

exports.ProductPersonalPage = class ProductPersonalPage{
    constructor(page){
        this.page = page;
        this.backpack = page.locator('//img[@alt="Sauce Labs Backpack"]');
        this.backpackTitle = page.locator('//a[@id="item_4_title_link"]//div[1]');
        this.personalPageTitleValue = page.locator('//div[@class="inventory_details_name large_size"]');
        this.personalPageDescriptionValue = page.locator('//div[@class="inventory_details_desc large_size"]');
        this.personalPageCostValue = page.locator('.inventory_details_price');
    }
}