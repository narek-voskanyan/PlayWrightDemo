import { test, expect } from '@playwright/test';
import exp from 'constants';
const {LoginPage} = require('../../page-objects/Login-page.js');

const USERNAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;
// check X click()

test('Verify that the "X" icon closes the "Left Menu Bar"', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    // Wait until the page receives the cookies.
    //
   
    // Check that "Swag Labs" logo exist on the page.
    await expect(page.locator('.app_logo')).toBeVisible('Swag Labs');

    // Click to "Left menu bur" button for open pop-up
    await page.locator('#react-burger-menu-btn').click();
    //Check that "levt menu bar" is display
    await expect(page.getByText('All ItemsAboutLogoutReset App')).toBeVisible();
    //Click on the "X" button
    await page.locator('//button[@id="react-burger-cross-btn"]').click();
    //Check that "levt menu bar" is not display
    await expect(page.getByText('All ItemsAboutLogoutReset App')).not.toBeVisible();

  });

  test('Verufy that "All Items", "About", "Logout", "Reset App Stoate", and "X" fiels exista"', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    // Wait until the page receives the cookies.
    //
   
    // Check that "Swag Labs" logo exist on the page.
    await expect(page.locator('.app_logo')).toBeVisible('Swag Labs');

    // Click to "Left menu bur" button for open pop-up
    await page.locator('#react-burger-menu-btn').click();
    
    //Check that "X" button exist
    await expect(page.locator('//button[@id="react-burger-cross-btn"]').getByText('Close Menu')).toBeVisible();
    //Check that "All Items" referenc exist
    await expect(page.locator('#inventory_sidebar_link').getByText('All Items')).toBeVisible();
    //Check that "About" referenc exist
    await expect(page.locator('#about_sidebar_link').getByText('About')).toBeVisible();
    //Check that "Logout" referenc exist
    await expect(page.locator('#logout_sidebar_link').getByText('Logout')).toBeVisible();
    //Check that "Reset App State" referenc exist
    await expect(page.locator('#reset_sidebar_link').getByText('Reset App State')).toBeVisible();

  });


  test('Verify that the "Logout" menu item logs the user out to the "Login" page.', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    // Wait until the page receives the cookies.
    //
   
    // Check that "Swag Labs" logo exist on the page.
    await expect(page.locator('.app_logo')).toBeVisible('Swag Labs');

    // Click to "Left menu bur" button for open pop-up
    await page.locator('#react-burger-menu-btn').click();
    
    //Click on the "Logout" referenc
    await page.locator('#logout_sidebar_link').click();

    //Check that user logout from his account
    await expect(page).toHaveURL('https://www.saucedemo.com/');

  });

  test('Verify that "About" menu item redirects to the "SouceLabst" web application "https://saucelabs.com/"', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
   
    // Click to "Left menu bur" button for open pop-up
    await page.locator('#react-burger-menu-btn').click();
    

    //Receive valu stored in href attribute
    const urlForAboutPage = await page.locator('#about_sidebar_link').getAttribute('href');
    //Check that the URL corresponds to https://saucelabs.com/
    await expect(urlForAboutPage).toEqual('https://saucelabs.com/');

  });

  test('Verify that the "All Items" menu item redirects to the "Products" page.', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
   
    // Click to "Left menu bur" button for open pop-up
    await page.locator('#react-burger-menu-btn').click();
    
    //Click on the "All Items" button
    await page.locator('#inventory_sidebar_link').click();
  
  
    //Check that correspond page opens
    await expect(page).toHaveURL('/inventory.html');
  });


  test('"Verify that the "Reset App State" menu item removes all items from "Your Cart"', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
   
    //Click on the "Add to cart" button in the "Sauce Labs Backpack" product field
    await page.locator("#add-to-cart-sauce-labs-backpack").click();

    //Click on the "Add to cart" button in the "Sauce Labs Bike Light" product field
    await page.locator("#add-to-cart-sauce-labs-bike-light").click();

    //Click on the "Left menu bar" button
    await page.locator("#react-burger-menu-btn").click();

    //Click on the Reset App State button
    await page.locator("#reset_sidebar_link").click();

    //Click on the "Your cart" button
    await page.locator("#shopping_cart_container").click();

    //Verify that correct page should be open
    await expect(page).toHaveURL("/cart.html");

    //Verify that the there is no any shosen produc
    await expect(page.locator('//div[@class="cart_desc_label"]/following::div[@data-test="inventory-item"][1]')).not.toBeVisible();

  });


  //  //div[@class="cart_desc_label"]/following::div[@data-test="inventory-item"][1]