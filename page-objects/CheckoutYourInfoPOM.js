const { expect } = require('@playwright/test');
const exp = require('constants');

exports.CheckoutYourInfo = class CheckoutYourInfo{
    constructor(page){
        this.page = page;
        this.titleOfCheckoutYourInfo = page.locator('.header_secondary_container');
        this.cencelButton = page.locator('[data-test="cancel"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.zipCodeField = page.locator('#postal-code');
        this.errorField = page.locator('//h3[@data-test="error"]');
        

    }

    async clickOnCencelButon(){
        await this.cencelButton.click();
        await expect(this.page).toHaveURL('/cart.html');
    }
    async clickOnContionueButon(){
        await this.continueButton.click();
    }
    async errorTextCheck(text){
        await expect(this.errorField).toHaveText(text);
    }

    async fillFirstName(name){
        await this.firstName.fill(name);
        await expect(this.firstName).toHaveValue(name);
    }

    async fillLastName(lastName){
        await this.lastName.fill(lastName);
        await expect(this.lastName).toHaveValue(lastName);
    }

    async fillZipCode(zipCode){
        await this.zipCodeField.fill(zipCode);
        await expect(this.zipCodeField).toHaveValue(zipCode);
    }

}