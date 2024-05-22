import { test, expect } from '@playwright/test';
const {LoginPage} = require('../../page-objects/LoginPagePOM.js');
const {LaftMenuBarPage} = require('../../page-objects/LeftMenuBarPOM.js');

// check X click()
test.beforeEach(async ({page}) =>{
  await page.goto('/inventory.html')
})

test('Verify that the "X" icon closes the "Left Menu Bar"', async ({ page }) => {
   
    const leftMenuBarPage = new LaftMenuBarPage(page);

    //Click on Left menu bar open button
    await leftMenuBarPage.clickOnOpenButton();
    //Click on the X button
    await leftMenuBarPage.clicOnXButton();
  
  });

  test('Verufy that "All Items", "About", "Logout", "Reset App Stoate", and "X" fiels exista"', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const leftMenuBarPage = new LaftMenuBarPage(page);
    //Click on Left menu bar open button
    await leftMenuBarPage.clickOnOpenButton();
    
    //Check that "X" button exist
    await expect(leftMenuBarPage.getXButtonLocator()).toBeVisible();
    //Check that "All Items" referenc exist
    await expect(leftMenuBarPage.getAllItemsLocator()).toBeVisible();
    //Check that "About" referenc exist
    await expect(leftMenuBarPage.getAboutLocator()).toBeVisible();
    //Check that "Logout" referenc exist
    await expect(leftMenuBarPage.getLogoutLocator()).toBeVisible();
    //Check that "Reset App State" referenc exist
    await expect(leftMenuBarPage.getResetAppState()).toBeVisible();

  });


  test('Verify that the "Logout" menu item logs the user out to the "Login" page.', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);
    const leftMenuBarPage = new LaftMenuBarPage(page);

    //Click on Left menu bar open button
    await leftMenuBarPage.clickOnOpenButton();
    
    //Click on the "Logout" referenc
    await leftMenuBarPage.clickOnLogoutButton();

    //Check that user logout from his account
    await loginPage.checkLoginPageOpen();

  });

  test('Verify that "About" menu item redirects to the "SouceLabst" web application "https://saucelabs.com/"', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const leftMenuBarPage = new LaftMenuBarPage(page);
    // Click to "Left menu bur" button for open pop-up
    await leftMenuBarPage.clickOnOpenButton();
  
    //Receive valu stored in href attribute
    const urlForAboutPage = await leftMenuBarPage.getAboutLocator().getAttribute('href');
    //Check that the URL corresponds to https://saucelabs.com/
    await expect(urlForAboutPage).toEqual('https://saucelabs.com/');

  });

  test('Verify that the "All Items" menu item redirects to the "Products" page.', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);
    const leftMenuBarPage = new LaftMenuBarPage(page);
   
    // Click to "Left menu bur" button for open pop-up
    await leftMenuBarPage.clickOnOpenButton();
    
    //Click on the "All Items" button
    await leftMenuBarPage.clickOnAllItems();

    //Check that correspond page opens
    await loginPage.checkAllItemsPageURL();
  });


  test('"Verify that the "Reset App State" menu item removes all items from "Your Cart"', async ({ page }) => {
    const leftMenuBarPage = new LaftMenuBarPage(page);

    //Click on the "Add to cart" button in the "Sauce Labs Backpack" product field
    await page.locator("#add-to-cart-sauce-labs-backpack").click();

    //Click on the "Add to cart" button in the "Sauce Labs Bike Light" product field
    await page.locator("#add-to-cart-sauce-labs-bike-light").click();

    //Click on the "Left menu bar" button
    await leftMenuBarPage.clickOnOpenButton();

    //Click on the Reset App State button
    await leftMenuBarPage.clickOnResetAppState();

    //Click on the "Your cart" button
    await page.locator("#shopping_cart_container").click();

    //Verify that correct page should be open
    await expect(page).toHaveURL("/cart.html");

    //Verify that the there is no any shosen produc
    await expect(page.locator('//div[@class="cart_desc_label"]/following::div[@data-test="inventory-item"][1]')).not.toBeVisible();

  });
