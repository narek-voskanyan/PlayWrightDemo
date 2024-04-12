const { expect } = require('@playwright/test');
exports.LaftMenuBarPage = class LaftMenuBarPage{
    constructor(page) {
        this.page = page;
        this.leftMenuBarOpenButton = page.locator('#react-burger-menu-btn');
        this.Xbutton = page.locator('//button[@id="react-burger-cross-btn"]');
        this.allItems = page.locator('#inventory_sidebar_link');
        this.about = page.locator('#about_sidebar_link');
        this.logout = page.locator('#logout_sidebar_link');
        this.resetAppState = page.locator('#reset_sidebar_link');
        this.leftMenuBarField = page.locator('.bm-menu-wrap');
      }

      async clickOnOpenButton(){
        await this.leftMenuBarOpenButton.click();
        await expect(this.leftMenuBarField).toBeVisible();
      }

      async clicOnXButton(){
        await this.Xbutton.click();
        await expect(this.leftMenuBarField).not.toBeVisible();
      }

      async clickOnLogoutButton(){
        await this.logout.click();
      }

      async clickOnAllItems(){
        await this.allItems.click();
      }

      async clickOnResetAppState(){
        await this.resetAppState.click();
      }

      //Functions for get locator
      getXButtonLocator(){
        return this.Xbutton
      }
      getAllItemsLocator(){
        return this.allItems
      }
      getAboutLocator(){
        return this.about
      }
      getLogoutLocator(){
        return this.logout
      }
      getResetAppState(){
        return this.resetAppState
      }

}