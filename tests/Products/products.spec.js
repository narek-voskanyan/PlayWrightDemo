import { test, expect } from '@playwright/test';
const {LoginPage} = require('../../page-objects/LoginPagePOM.js');
const {AllItemsPage} =  require('../../page-objects/AllItemsPOM.js');
const {LaftMenuBarPage} = require('../../page-objects/LeftMenuBarPOM.js');


const USERNAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;

test('Verify that the list of products exists', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await loginPage.checkAllItemsPageURL(); 

    //Check that list of products field exist
    await expect(page.locator('.inventory_list')).toBeVisible();
   
  });


  test('Verify that the text on the "Add to Cart" button changes to "Remove" after clicking on it, and returns to the original text after a second click', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await loginPage.checkAllItemsPageURL();

    //Check that list of products field exist
    await expect(page.locator('.inventory_list')).toBeVisible();

    //Check that button hav a value "Add to cart"
    await expect(page.locator('#add-to-cart-sauce-labs-backpack')).toHaveText('Add to cart');

    //Click on "Add to Cart" button for change written text to "Remove"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();

    //Check that "Remove" button visible
    await expect(page.locator('#remove-sauce-labs-backpack')).toBeVisible();

    //Check that button hav a value "Remove"
    await expect(page.locator('#remove-sauce-labs-backpack')).toHaveText('Remove');


    //Click on "Add to Cart" button for change written text to "Remove"
    await page.locator('#remove-sauce-labs-backpack').click();

    //Check that "Remove" button visible
    await expect(page.locator('#add-to-cart-sauce-labs-backpack')).toBeVisible();

    //Check that button hav a value "Remove"
    await expect(page.locator('#add-to-cart-sauce-labs-backpack')).toHaveText('Add to cart');
    
  });

  


  test('Verify that the titles of the products are accurate references', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await loginPage.checkAllItemsPageURL(); 

    //Check that list of products field exist
    await expect(page.locator('.inventory_list')).toBeVisible();
    //Click on title of product
    await page.locator('#item_4_title_link').click();
    //Check that correct page opens
    await expect(page).toHaveURL('/inventory-item.html?id=4');
   
  });

  
  test('Verify that the product photo are accurate reference', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await loginPage.checkAllItemsPageURL();

    //Check that list of products field exist
    await expect(page.locator('.inventory_list')).toBeVisible();
   
    //Click on th product's photo
    await page.locator('#item_4_img_link').click();
    //Check that correct page opens
    await expect(page).toHaveURL('/inventory-item.html?id=4');
   
  });


  test('Verify that products display a title, product photo, description, price, and an "Add to Cart" button.', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await loginPage.checkAllItemsPageURL(); 

    //Check that list of products field exist
    await expect(page.locator('.inventory_list')).toBeVisible();
    
    //Check that photo filed exsist ont the page
    await expect(page.locator('//img[@alt="Sauce Labs Backpack"]')).toBeVisible();
   
    //Check that title filed exsist ont the page
    await expect(page.locator('//a[@id="item_4_title_link"]//div[1]')).toHaveText('Sauce Labs Backpack');

    //Check that Description filed exsist ont the page
     await expect(page.locator('//a[@id ="item_4_title_link"]//following::div[1]')).toBeVisible("carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.");

    //Check that price  filed exsist ont the page
    await expect(page.locator('//a[@id ="item_4_title_link"]//following::div[contains(text(),"$")][1]')).toBeVisible();
 
 
    //const costOfProduct = await page.locator('//a[@id ="item_4_title_link"]//following::div[contains(text(),"$")][1]').innerText();
   //console.log(costOfProduct);

    //Check that "Add to cart" button exsist ont the page
    await expect(page.locator('.inventory_list').locator('.inventory_item').first().locator('#add-to-cart-sauce-labs-backpack').first()).toBeVisible();
  });



  test('Verify that the "Add to Cart" button add the peoduct in "Your Cart" and secont time click should remove product from "Your cart"', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await loginPage.checkAllItemsPageURL();

    //Check that list of products field exist
    await expect(page.locator('.inventory_list')).toBeVisible();
    //Add the product into Your cart
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    //Go to "Your cart" page
    await page.locator('#shopping_cart_container').click();
    //Check that corrent product exsist
    await expect(page.locator('.cart_item').getByText('Sauce Labs Backpack')).toBeVisible();

    //Go beck to products page
    await page.locator('#continue-shopping').click();
    //Remove product from "Your cart"
    await page.locator('#remove-sauce-labs-backpack').click();
       
    //Go to "Your cart" page
    await page.locator('#shopping_cart_container').click();
    //Check that corrent product exsist
    await expect(page.locator('.cart_item').first().getByText('Sauce Labs Backpack')).not.toBeVisible();

   
  });

  test('Verify that "Swag Labs" title exist on the top of page', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await loginPage.checkAllItemsPageURL();

    //Check that "Swag Labs" title exist

    await expect(page.locator('.app_logo')).toHaveText('Swag Labs');
   
  });
  // Wright bag report
  test('Verify that after clicking the "Reset App State" button, all buttons for chosen products change back from "Remove" to "Add to cart"', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await loginPage.checkAllItemsPageURL(); 

    //Click on the "Add to cart button"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();

    //Check that the "Add to cart" button change to "Remove button"
    await expect(page.locator("#add-to-cart-sauce-labs-backpack")).not.toBeVisible();
    await expect(page.locator('#remove-sauce-labs-backpack')).toBeVisible();

      //Click on the "Left menu bar" button
      await page.locator("#react-burger-menu-btn").click();

      //Click on the Reset App State button
      await page.locator("#reset_sidebar_link").click();


    //Check that the "Remove" button change to "Add to Cart button"
    await expect(page.locator("//button[@class='btn btn_secondary btn_small btn_inventory '][1]")).not.toBeVisible();
    await expect(page.locator('#add-to-cart-sauce-labs-backpack')).toBeVisible();
   
  });

  test('Check that chosen product in one account is not shown in the the other account', async ({page}) => {
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);
    const allItems = new AllItemsPage(page);
    const leftMenuBar = new LaftMenuBarPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField("performance_glitch_user");
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await loginPage.checkAllItemsPageURL();
    await expect(page.locator('#add-to-cart-sauce-labs-backpack')).toBeVisible();
    await expect(page.locator('#add-to-cart-sauce-labs-backpack')).toHaveText('Add to cart');
    await allItems.clickOnYourCarButton();
    await allItems.checkYourCartURL('/cart.html');
    await expect(page.locator('[data-test="inventory-item"]')).not.toBeVisible();

    await leftMenuBar.clickOnOpenButton();
    await leftMenuBar.clickOnLogoutButton();
    await loginPage.checkLoginPageOpen();

    //Check that username and password fields are empty
    await expect(loginPage.username).toBeEmpty();
    await expect(loginPage.password).toBeEmpty();
    
    //Sign in secon account
    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();

    // Check that with correct password and username the bage is opening
    await loginPage.checkAllItemsPageURL();
    //Add the product to Your cart
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    //Click on the Your cart button
    await allItems.clickOnYourCarButton();
    //Check that Your cart open 
    await allItems.checkYourCartURL('/cart.html');
    //Check that Your cart is not empty
    await expect(page.locator('[data-test="inventory-item"]')).toBeVisible();
    //Click on the left menu bar
    await leftMenuBar.clickOnOpenButton();
    //Click on the Logout field
    await leftMenuBar.clickOnLogoutButton();
    //Check that page logout from account
    await loginPage.checkLoginPageOpen();

    //Check that username and password fields are empty
    await expect(loginPage.username).toBeEmpty();
    await expect(loginPage.password).toBeEmpty();
    // Sign in with first account
    await loginPage.goto();
    await loginPage.fillUsernameField("performance_glitch_user");
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await loginPage.checkAllItemsPageURL();
    await expect(page.locator('#add-to-cart-sauce-labs-backpack')).toBeVisible();
    await expect(page.locator('#add-to-cart-sauce-labs-backpack')).toHaveText('Add to cart');
    await allItems.clickOnYourCarButton();
    await allItems.checkYourCartURL('/cart.html');
    await expect(page.locator('[data-test="inventory-item"]')).not.toBeVisible();

  });