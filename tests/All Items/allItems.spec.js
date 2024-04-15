import { test, expect } from '@playwright/test';

const {LoginPage} = require('../../page-objects/LoginPagePOM.js');
const {LaftMenuBarPage} = require('../../page-objects/LeftMenuBarPOM.js');
const {AllItemsPage} = require('../../page-objects/AllItemsPOM.js');

const USERNAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;

test('Verify that "Swag Labs" title exist on page', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);
  
    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();


    // Check that "Swag Labs" logo exist on the page.
    await expect(page.locator('.app_logo')).toBeVisible('Swag Labs');

  });

  test('Verify that "Products" field exist', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);
    const allItemsPage = new AllItemsPage(page);
    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
   
    // Check that "Products" title exist on the page.
    await expect(page.locator('.header_secondary_container').locator('.title')).toBeVisible('Products');

  });


  test('Verify that the Your Cart icon exists and, upon clicking, switches to the Your Cart page', async ({ page }) => {
    const aaa ="hdhfjh"
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);
    const allItemsPage = new AllItemsPage(page);
    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    //Check that All itames page open
    await loginPage.checkAllItemsPageURL();
    //Click to "Your cart" icon
    await allItemsPage.clickOnYourCarButton();
    
    // Check that redirect to "Your cart" page.
    await allItemsPage.checkYourCartURL('/cart.html');

  });

  test('Verify that left top "Left menu bar" button exists and open "Left menu bar', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);
    const leftMenuBarPage = new LaftMenuBarPage(page); 
    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
  
    // Click to "Left menu bur" button for open pop-up
   await leftMenuBarPage.clickOnOpenButton();
  
  });


    //STUGEL TO BE VISIBLE

  test('Verify that the "Filter" button exists', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);
    const allItemsPage = new AllItemsPage(page);
    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
  
    // Check that Filter buton exist
   await expect(allItemsPage.filterButton).toBeVisible();
  });


  test('Verify that after adding the product to "Your Cart", the red circle appears on the "Your Cart" icon and displays the number of chosen products', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
  
      // Click to Product button for add chosen product in "Yor cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
  
    // The Red Circle should appear on the "Your Cart" icon
    await expect(page.waitForSelector('.shopping_cart_badge')).toBeTruthy();
    await expect(page.locator('.shopping_cart_badge')).toBeVisible('1');
  });

  // IMPORTATNT ASK TO TIGRAN  HOW TO GET CORRESPONDING LOCATOR
  test('Verify that the chosen product exists after starting a new login session.', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);
    const allItemsPage = new AllItemsPage(page);
    const leftMenuBarPage = new LaftMenuBarPage(page); 

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
  
    // Click to Product button for add chosen product in "Yor cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    
    //Click to "Your cart" icon
    await allItemsPage.clickOnYourCarButton();
    
    // Check that chosen product exist
    await expect(page.waitForSelector('.bm-menu-wrap')).toBeTruthy();

    // Click to "Left menu bur" button for open pop-up
    await leftMenuBarPage.clickOnOpenButton();

    //Click on "Logout" for finish corrent session
    await leftMenuBarPage.logout.click();

    // Perform authentication steps. Sign in valid user account csecond time.

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();


    //Click to "Your cart" icon
    await allItemsPage.clickOnYourCarButton();
    // Check that chosen product exist
    await expect(page.getByText('Sauce Labs Backpackcarry.')).toBeVisible();
  });



 