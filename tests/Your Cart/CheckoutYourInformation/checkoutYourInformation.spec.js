import { test, expect } from '@playwright/test';
const {LoginPage} = require('../../../page-objects/LoginPagePOM.js');


const USERNAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;

test('Verify that the "Checkout: Your Information" title exists', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('/inventory.html'); 
    //Add product in the "Your Cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    //Click on the "Your Cart" field
    await page.locator('.shopping_cart_link').click();

    // Check that switch to "Your Cart" page open
    await expect(page).toHaveURL('/cart.html');

    //Click on the "Checout" button
    await page.locator('//button[@data-test="checkout"]').click();

    // Check that switch to "Checkout: Your Information" page 
    await expect(page).toHaveURL('/checkout-step-one.html');

    //Verifay that "Checkout: Your Information" title exist
    await expect(page.getByText("Checkout: Your Information")).toBeVisible();
  });

  test('Verify that Cancel button exist', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('/inventory.html'); 
    //Add product in the "Your Cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    //Click on the "Your Cart" field
    await page.locator('.shopping_cart_link').click();

    // Check that switch to "Your Cart" page open
    await expect(page).toHaveURL('/cart.html');

    //Click on the "Checout" button
    await page.locator('//button[@data-test="checkout"]').click();

    // Check that switch to "Checkout: Your Information" page 
    await expect(page).toHaveURL('/checkout-step-one.html');

    //Verifay that "Checkout: Your Information" title exist
    await expect(page.locator('//button[@data-test="cancel"]')).toBeVisible();
  });


  
  test('Verify that "Continue" button exist', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('/inventory.html'); 
    //Add product in the "Your Cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    //Click on the "Your Cart" field
    await page.locator('.shopping_cart_link').click();

    // Check that switch to "Your Cart" page open
    await expect(page).toHaveURL('/cart.html');

    //Click on the "Checout" button
    await page.locator('//button[@data-test="checkout"]').click();

    // Check that switch to "Checkout: Your Information" page 
    await expect(page).toHaveURL('/checkout-step-one.html');

    //Verifay that "Checkout: Your Information" title exist
    await expect(page.locator('[data-test="continue"]')).toBeVisible();

    //Check the color of "Conitnue" field
   await expect(page.locator('[data-test="continue"]')).toHaveCSS('background-color','rgb(61, 220, 145)');
  });


  test('Verify that upon clicking the "Cancel" button switches back to the "Your Cart" page', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('/inventory.html'); 
    //Add product in the "Your Cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    //Click on the "Your Cart" field
    await page.locator('.shopping_cart_link').click();

    // Check that switch to "Your cart" page open
    await expect(page).toHaveURL('/cart.html');

    //Click on the "Checout" button
    await page.locator('//button[@data-test="checkout"]').click();

    // Check that switch to "Checout: Your information" page 
    await expect(page).toHaveURL('/checkout-step-one.html');
    
    //Click on the "Cencel button"
    await page.locator('//button[@data-test="cancel"]').click();

    // Check that switch to "Your cart" page open
    await expect(page).toHaveURL('/cart.html');

   
  });


  test('Verify that it is not possible to click the "Continue" button when the Name and Last Name fields are filled correctly, but the Zip/Post code field is empty', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('/inventory.html'); 
    //Add product in the "Your Cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    //Click on the "Your Cart" field
    await page.locator('.shopping_cart_link').click();

    // Check that switch to "Your Cart" page open
    await expect(page).toHaveURL('/cart.html');

    //Click on the "Checout" button
    await page.locator('//button[@data-test="checkout"]').click();

    // Check that switch to "Checkout: Your Information" page 
    await expect(page).toHaveURL('/checkout-step-one.html');

    //Verifay that "Checkout: Your Information" title exist
    await expect(page.getByText("Checkout: Your Information")).toBeVisible();

        //Fill the correct name and lastname
        await page.locator('#first-name').fill("Name");
        await page.locator('#last-name').fill("LastName");
        
        //Click on the "Continue" button
        await page.locator('#continue').click();
    
        // Check that stay on "Checout: Your information" page 
        await expect(page).toHaveURL('/checkout-step-one.html');

        //Check that error message display
        await expect(page.locator('//h3[@data-test="error"]')).toHaveText('Error: Postal Code is required');

  });


  test('Verify that is not possible to click the "Continue. button when the Last Name and Zip/Post code fields are filled correctly, but Name field is empty', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('/inventory.html'); 
    //Add product in the "Your Cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    //Click on the "Your Cart" field
    await page.locator('.shopping_cart_link').click();

    // Check that switch to "Your Cart" page open
    await expect(page).toHaveURL('/cart.html');

    //Click on the "Checout" button
    await page.locator('//button[@data-test="checkout"]').click();

    // Check that switch to "Checkout: Your Information" page 
    await expect(page).toHaveURL('/checkout-step-one.html');

    //Verifay that "Checkout: Your Information" title exist
    await expect(page.getByText("Checkout: Your Information")).toBeVisible();

        //Fill the correct lastName and ZIP/Code
        
        await page.locator('#last-name').fill("LastName");
        await page.locator('#postal-code').fill("Correct Zip code");
        
        //Click on the "Continue" button
        await page.locator('#continue').click();
    
        // Check that stay on "Checout: Your information" page 
        await expect(page).toHaveURL('/checkout-step-one.html');

        //Check that error message display
        await expect(page.locator('//h3[@data-test="error"]')).toHaveText('Error: First Name is required');

  });


  test('Verify that is not possible to click the "Continue. button when the Name and Zip/Post code fields are filled correctly, but Last Name field is empty', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('/inventory.html'); 
    //Add product in the "Your Cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    //Click on the "Your Cart" field
    await page.locator('.shopping_cart_link').click();

    // Check that switch to "Your Cart" page open
    await expect(page).toHaveURL('/cart.html');

    //Click on the "Checout" button
    await page.locator('//button[@data-test="checkout"]').click();

    // Check that switch to "Checkout: Your Information" page 
    await expect(page).toHaveURL('/checkout-step-one.html');

    //Verifay that "Checkout: Your Information" title exist
    await expect(page.getByText("Checkout: Your Information")).toBeVisible();

        //Fill the correct lastName and ZIP/Code
        await page.locator('#first-name').fill("Name");
        await page.locator('#postal-code').fill("Correct Zip code");
        
        //Click on the "Continue" button
        await page.locator('#continue').click();
    
        // Check that stay on "Checout: Your information" page 
        await expect(page).toHaveURL('/checkout-step-one.html');

        //Check that error message display
        await expect(page.locator('//h3[@data-test="error"]')).toHaveText('Error: Last Name is required');
  });


  test('Verify that after correctly filling the Name, Last Name, and Zip/Post fields, upon clicking the "Continue" button, the page switches to the "Checkout Overview" page.', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('/inventory.html'); 
    //Add product in the "Your Cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    //Click on the "Your Cart" field
    await page.locator('.shopping_cart_link').click();

    // Check that switch to "Your Cart" page open
    await expect(page).toHaveURL('/cart.html');

    //Click on the "Checout" button
    await page.locator('//button[@data-test="checkout"]').click();

    // Check that switch to "Checkout: Your Information" page 
    await expect(page).toHaveURL('/checkout-step-one.html');

    //Verifay that "Checkout: Your Information" title exist
    await expect(page.getByText("Checkout: Your Information")).toBeVisible();

        //Fill the correct lastName and ZIP/Code
        await page.locator('#first-name').fill("Name");
        await page.locator('#last-name').fill("LastName");
        await page.locator('#postal-code').fill("Correct Zip code");
        
        //Click on the "Continue" button
        await page.locator('#continue').click();
    
        // Check that stay on "Checout: Your information" page 
        await expect(page).toHaveURL('/checkout-step-two.html');
  });


  test('Verify that clicking the "Left Menu Bar" button on the left top side of the page opens the "Left Menu Bar"', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('/inventory.html'); 
    //Add product in the "Your Cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    //Click on the "Your Cart" field
    await page.locator('.shopping_cart_link').click();

    // Check that switch to "Your Cart" page open
    await expect(page).toHaveURL('/cart.html');

    //Click on the "Checout" button
    await page.locator('//button[@data-test="checkout"]').click();

    // Check that switch to "Checkout: Your Information" page 
    await expect(page).toHaveURL('/checkout-step-one.html');

    //Verifay that "Checkout: Your Information" title exist
    await expect(page.getByText("Checkout: Your Information")).toBeVisible();

    //Click on the "left menu bar" button
   await page.locator('#react-burger-menu-btn').click();
    //Check that "left menu bar" visible
    await expect(page.locator('.bm-menu')).toBeVisible();

  });

  test('Verify that clicking the "Your Cart" icon switches to the "Your Cart" page', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('/inventory.html'); 
    //Add product in the "Your Cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    //Click on the "Your Cart" field
    await page.locator('.shopping_cart_link').click();

    // Check that switch to "Your Cart" page open
    await expect(page).toHaveURL('/cart.html');

    //Click on the "Checout" button
    await page.locator('//button[@data-test="checkout"]').click();

    // Check that switch to "Checkout: Your Information" page 
    await expect(page).toHaveURL('/checkout-step-one.html');

    //Verifay that "Checkout: Your Information" title exist
    await expect(page.getByText("Checkout: Your Information")).toBeVisible();

    //Click on the "Your cart" button
    await page.locator("#shopping_cart_container").click();

    //Chack that correspond page opened
    await expect(page).toHaveURL('/cart.html');

  });