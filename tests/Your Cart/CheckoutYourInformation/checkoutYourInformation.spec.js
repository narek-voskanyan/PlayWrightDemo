import { test, expect } from '@playwright/test';
const {LoginPage} = require('../../../page-objects/LoginPagePOM.js');
const {CheckoutYourInfo} = require('../../../page-objects/CheckoutYourInfoPOM.js');
const {AllItemsPage} = require('../../../page-objects/AllItemsPOM.js');
const {YourCartPage} = require('../../../page-objects/YourCartPOM.js');
const {LaftMenuBarPage} =require('../../../page-objects/LeftMenuBarPOM.js');
const USERNAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;

test('Verify that the "Checkout: Your Information" title exists', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);
    const checkoutInfo = new CheckoutYourInfo(page);
    const allItems = new AllItemsPage(page);
    const yourCart = new YourCartPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await loginPage.checkAllItemsPageURL();

    //Add product in the "Your Cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    //Click on the "Your Cart" field
    await allItems.clickOnYourCarButton();

    // Check that switch to "Your Cart" page open
    await allItems.checkYourCartURL('/cart.html');

    //Click on the "Checout" button
    await yourCart.clickOnCheckoutButton();

    // Check that switch to "Checkout: Your Information" page 
    await yourCart.checkURL('/checkout-step-one.html');

    //Verifay that "Checkout: Your Information" title exist
    await expect(checkoutInfo.titleOfCheckoutYourInfo).toHaveText('Checkout: Your Information');
  });

  test('Verify that Cancel button exist', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);
    const checkoutInfo = new CheckoutYourInfo(page);
    const allItems = new AllItemsPage(page);
    const yourCart = new YourCartPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await loginPage.checkAllItemsPageURL();

    //Add product in the "Your Cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    //Click on the "Your Cart" field
    await allItems.clickOnYourCarButton()

    // Check that switch to "Your Cart" page open
    await allItems.checkYourCartURL('/cart.html');

    //Click on the "Checout" button
    await yourCart.clickOnCheckoutButton();

    // Check that switch to "Checkout: Your Information" page 
    await yourCart.checkURL('/checkout-step-one.html');

    //Verifay that Cencel buton exist
    await expect(checkoutInfo.cencelButton).toBeVisible();
  });


  
  test('Verify that "Continue" button exist', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);
    const checkoutInfo = new CheckoutYourInfo(page);
    const allItems = new AllItemsPage(page);
    const yourCart = new YourCartPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await loginPage.checkAllItemsPageURL();

    //Add product in the "Your Cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    //Click on the "Your Cart" field
    await allItems.clickOnYourCarButton()

    // Check that switch to "Your Cart" page open
    await allItems.checkYourCartURL('/cart.html');

    //Click on the "Checout" button
    await yourCart.clickOnCheckoutButton();

    // Check that switch to "Checkout: Your Information" page 
    await yourCart.checkURL('/checkout-step-one.html');

    //Verifay that "Checkout: Your Information" title exist
    await expect(checkoutInfo.continueButton).toBeVisible();

    //Check the color of "Conitnue" field
   await expect(checkoutInfo.continueButton).toHaveCSS('background-color','rgb(61, 220, 145)');
  });


  test('Verify that upon clicking the "Cancel" button switches back to the "Your Cart" page', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);
    const checkoutInfo = new CheckoutYourInfo(page);
    const allItems = new AllItemsPage(page);
    const yourCart = new YourCartPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await loginPage.checkAllItemsPageURL();
    //Add product in the "Your Cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    //Click on the "Your Cart" field
    await allItems.clickOnYourCarButton();

    // Check that switch to "Your cart" page open
    await allItems.checkYourCartURL('/cart.html');

    //Click on the "Checout" button
    await yourCart.clickOnCheckoutButton();

    // Check that switch to "Checout: Your information" page
    await yourCart.checkURL('/checkout-step-one.html');
    
    //Click on the "Cencel button" and check that corresponding URL open
    await checkoutInfo.clickOnCencelButon();
  });


  test('Verify that it is not possible to click the "Continue" button when the Name and Last Name fields are filled correctly, but the Zip/Post code field is empty', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);
    const checkoutInfo = new CheckoutYourInfo(page);
    const allItems = new AllItemsPage(page);
    const yourCart = new YourCartPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await loginPage.checkAllItemsPageURL(); 
    //Add product in the "Your Cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    //Click on the "Your Cart" field
    await allItems.clickOnYourCarButton();

    // Check that switch to "Your Cart" page open
    await allItems.checkYourCartURL('/cart.html');

    //Click on the "Checout" button
    await yourCart.clickOnCheckoutButton();

    // Check that switch to "Checkout: Your Information" page 
    await yourCart.checkURL('/checkout-step-one.html');

        //Fill the correct name and lastname
        await checkoutInfo.fillFirstName("FirstName");
        await checkoutInfo.fillLastName("LastName");
        
        //Click on the "Continue" button
        await checkoutInfo.clickOnContionueButon();
    
        // Check that stay on "Checout: Your information" page 
        await yourCart.checkURL('/checkout-step-one.html');

        //Check that error message display
        await checkoutInfo.errorTextCheck('Error: Postal Code is required');

  });


  test('Verify that is not possible to click the "Continue. button when the Last Name and Zip/Post code fields are filled correctly, but Name field is empty', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);
    const checkoutInfo = new CheckoutYourInfo(page);
    const allItems = new AllItemsPage(page);
    const yourCart = new YourCartPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await loginPage.checkAllItemsPageURL();
    //Add product in the "Your Cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
   
    //Click on the "Your Cart" field
    await allItems.clickOnYourCarButton();

    // Check that switch to "Your Cart" page open
    await allItems.checkYourCartURL('/cart.html');

    //Click on the "Checout" button
    await yourCart.clickOnCheckoutButton();

    // Check that switch to "Checkout: Your Information" page 
    await yourCart.checkURL('/checkout-step-one.html');

        //Fill the correct lastName and ZIP/Code
        
        await checkoutInfo.fillLastName("LastName");
        await checkoutInfo.fillZipCode("Correct Zip code");
        
        //Click on the "Continue" button
        await checkoutInfo.clickOnContionueButon();
    
        // Check that stay on "Checout: Your information" page 
        await yourCart.checkURL('/checkout-step-one.html');

        //Check that error message display
        await checkoutInfo.errorTextCheck('Error: First Name is required');

  });


  test('Verify that is not possible to click the "Continue. button when the Name and Zip/Post code fields are filled correctly, but Last Name field is empty', async ({ page }) => {
    
   // Perform authentication steps. Sign in valid user account.
   const loginPage = new LoginPage(page);
   const checkoutInfo = new CheckoutYourInfo(page);
   const allItems = new AllItemsPage(page);
   const yourCart = new YourCartPage(page);

   await loginPage.goto();
   await loginPage.fillUsernameField(USERNAME);
   await loginPage.fillPasswordfield(PASSWORD);
   await loginPage.clickLoginButton();
   
   // Check that with correct password and username the bage is opening
   await loginPage.checkAllItemsPageURL();
   //Add product in the "Your Cart"
   await page.locator('#add-to-cart-sauce-labs-backpack').click();
  
   //Click on the "Your Cart" field
   await allItems.clickOnYourCarButton();

   // Check that switch to "Your Cart" page open
   await allItems.checkYourCartURL('/cart.html');

   //Click on the "Checout" button
   await yourCart.clickOnCheckoutButton();

   // Check that switch to "Checkout: Your Information" page 
   await yourCart.checkURL('/checkout-step-one.html');

       //Fill the correct lastName and ZIP/Code
       
       await checkoutInfo.fillFirstName("FirstName");
       await checkoutInfo.fillZipCode("Correct Zip code");
       
       //Click on the "Continue" button
       await checkoutInfo.clickOnContionueButon();
   
       // Check that stay on "Checout: Your information" page 
       await yourCart.checkURL('/checkout-step-one.html');

        //Check that error message display
        await checkoutInfo.errorTextCheck('Error: Last Name is required');
  });


  test('Verify that after correctly filling the Name, Last Name, and Zip/Post fields, upon clicking the "Continue" button, the page switches to the "Checkout Overview" page.', async ({ page }) => {
    
     // Perform authentication steps. Sign in valid user account.
   const loginPage = new LoginPage(page);
   const checkoutInfo = new CheckoutYourInfo(page);
   const allItems = new AllItemsPage(page);
   const yourCart = new YourCartPage(page);

   await loginPage.goto();
   await loginPage.fillUsernameField(USERNAME);
   await loginPage.fillPasswordfield(PASSWORD);
   await loginPage.clickLoginButton();
   
   // Check that with correct password and username the bage is opening
   await loginPage.checkAllItemsPageURL();
   //Add product in the "Your Cart"
   await page.locator('#add-to-cart-sauce-labs-backpack').click();
  
   //Click on the "Your Cart" field
   await allItems.clickOnYourCarButton();

   // Check that switch to "Your Cart" page open
   await allItems.checkYourCartURL('/cart.html');

   //Click on the "Checout" button
   await yourCart.clickOnCheckoutButton();

   // Check that switch to "Checkout: Your Information" page 
   await yourCart.checkURL('/checkout-step-one.html');

       //Fill the correct lastName and ZIP/Code
       
       await checkoutInfo.fillFirstName("FirstName");
       await checkoutInfo.fillLastName('LastName');
       await checkoutInfo.fillZipCode("Correct Zip code");
       
       //Click on the "Continue" button
       await checkoutInfo.clickOnContionueButon();
   
       // Check that stay on "Checout: Your information" page 
       await yourCart.checkURL('/checkout-step-two.html');
       
  });


  test('Verify that clicking the "Left Menu Bar" button on the left top side of the page opens the "Left Menu Bar"', async ({ page }) => {
    
     // Perform authentication steps. Sign in valid user account.
   const loginPage = new LoginPage(page);
   const allItems = new AllItemsPage(page);
   const yourCart = new YourCartPage(page);
   const leftMenuBar = new LaftMenuBarPage(page);

   await loginPage.goto();
   await loginPage.fillUsernameField(USERNAME);
   await loginPage.fillPasswordfield(PASSWORD);
   await loginPage.clickLoginButton();
   
   // Check that with correct password and username the bage is opening
   await loginPage.checkAllItemsPageURL();
   //Add product in the "Your Cart"
   await page.locator('#add-to-cart-sauce-labs-backpack').click();
  
   //Click on the "Your Cart" field
   await allItems.clickOnYourCarButton();

   // Check that switch to "Your Cart" page open
   await allItems.checkYourCartURL('/cart.html');

   //Click on the "Checout" button
   await yourCart.clickOnCheckoutButton();

   // Check that switch to "Checkout: Your Information" page 
   await yourCart.checkURL('/checkout-step-one.html');

    //Click on the "left menu bar" button and check that left menu bar open
   await leftMenuBar.clickOnOpenButton();

  });

  test('Verify that clicking the "Your Cart" icon switches to the "Your Cart" page', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
   const loginPage = new LoginPage(page);
   const allItems = new AllItemsPage(page);
   const yourCart = new YourCartPage(page);

   await loginPage.goto();
   await loginPage.fillUsernameField(USERNAME);
   await loginPage.fillPasswordfield(PASSWORD);
   await loginPage.clickLoginButton();
   
   // Check that with correct password and username the bage is opening
   await loginPage.checkAllItemsPageURL();
   //Add product in the "Your Cart"
   await page.locator('#add-to-cart-sauce-labs-backpack').click();
  
   //Click on the "Your Cart" field
   await allItems.clickOnYourCarButton();

   // Check that switch to "Your Cart" page open
   await allItems.checkYourCartURL('/cart.html');

   //Click on the "Checout" button
   await yourCart.clickOnCheckoutButton();

   // Check that switch to "Checkout: Your Information" page 
   await yourCart.checkURL('/checkout-step-one.html');

   await allItems.clickOnYourCarButton();
   await allItems.checkYourCartURL('/cart.html');
  });