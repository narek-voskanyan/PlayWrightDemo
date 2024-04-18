const { expect } = require('@playwright/test');

exports.CheckoutOverview = class CheckoutOverview{
    constructor(page){
        this.page = page;
        this.cancleButton = page.locator('[data-test="cancel"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.summaryTaxlable = page.locator('.summary_tax_label');
        this.summarySubtotalLable = page.locator('.summary_subtotal_label');
        this.paymentInfo = page.locator('[data-test="payment-info-label"]');
        this.paymentInfoValue = page.locator('[data-test="payment-info-value"]');
        this.shoppingInfoLable = page.locator('[data-test="shipping-info-label"]');
        this.shoppingInfoValue = page.locator('[data-test="shipping-info-value"]');
        this.totalInfoLable = page.locator('[data-test="total-info-label"]');
        this.totalLable = page.locator('[data-test="total-label"]');
    }

    async clickOnCencelButton(){
        await this.cancleButton.click();
    }

    async clickOnFinishButton(){
        await this.finishButton.click();
    }

    async checkURL(url){
        await expect(this.page).toHaveURL(url);
    }
}