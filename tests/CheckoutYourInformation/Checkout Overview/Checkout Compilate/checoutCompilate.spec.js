import { test, expect } from '@playwright/test';

const {LoginPage} = require('../../../../page-objects/Login-page.js');


const USERNAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;

test('Verify that all fields exist on the page.', async ({page}) => {
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); 

    //Add product to "Your cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();

    //Click on the "Your cart button"
    await page.locator(".shopping_cart_link").click();

    //Check that corrent page open
    await expect(page).toHaveURL('/cart.html');

    //Click on the Checkout button
    await page.locator('//button[@data-test="checkout"]').click();

    //Check that corrent page open
    await expect(page).toHaveURL('checkout-step-one.html');

     //Fill the correct firstname
     await page.locator('#first-name').fill("Name");
     //Check that firstname fill correct
     await expect(page.locator('#first-name')).toHaveValue("Name");

     //Fill the correct lastname
     await page.locator('#last-name').fill("LastName");
    //Check that lastname fill correct
    await expect(page.locator('#last-name')).toHaveValue("LastName");
    
    //Fill the correct Zip code
     await page.locator('#postal-code').fill("Correct Zip code");
    //Check that Zip code fill correct
    await expect(page.locator('#postal-code')).toHaveValue("Correct Zip code");
    
    //Click on the "Continue" button
     await page.locator('#continue').click();

     //Check that correspond page opens
     await expect(page).toHaveURL("/checkout-step-two.html");

     //Check that Finish button exist
     await expect(page.locator('//button[@data-test="finish"]')).toBeVisible();
     //Check that button tas a text "Censel"
     await expect(page.locator('//button[@data-test="finish"]')).toHaveText('Finish');
     //Click on the button
     await page.locator('//button[@data-test="finish"]').click();

     //Check that correspon page open
     await expect(page).toHaveURL('/checkout-complete.html');
    
     //Check that title exist
     await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');

     //Check that correspond img exist
     await expect(page.locator('.pony_express')).toHaveAttribute('alt', "Pony Express");

     //Check that  "Thank you for your order!" exist
     await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

     //Check that 'Your order has been dispatched, and will arrive just as fast as the pony can get there!' text exist
     await expect(page.locator('.complete-text')).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');

     //Check that "Back Home" button exist
     await expect(page.locator('#back-to-products')).toBeVisible();

});



test('Verify that clicking the "Back Home" button opens the Product page and clears "Your Cart".', async ({page}) => {
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); 

    //Add product to "Your cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();

    //Click on the "Your cart button"
    await page.locator(".shopping_cart_link").click();

    //Check that corrent page open
    await expect(page).toHaveURL('/cart.html');

    //Click on the Checkout button
    await page.locator('//button[@data-test="checkout"]').click();

    //Check that corrent page open
    await expect(page).toHaveURL('checkout-step-one.html');

     //Fill the correct firstname
     await page.locator('#first-name').fill("Name");
     //Check that firstname fill correct
     await expect(page.locator('#first-name')).toHaveValue("Name");

     //Fill the correct lastname
     await page.locator('#last-name').fill("LastName");
    //Check that lastname fill correct
    await expect(page.locator('#last-name')).toHaveValue("LastName");
    
    //Fill the correct Zip code
     await page.locator('#postal-code').fill("Correct Zip code");
    //Check that Zip code fill correct
    await expect(page.locator('#postal-code')).toHaveValue("Correct Zip code");
    
    //Click on the "Continue" button
     await page.locator('#continue').click();

     //Check that correspond page opens
     await expect(page).toHaveURL("/checkout-step-two.html");

     //Check that Finish button exist
     await expect(page.locator('//button[@data-test="finish"]')).toBeVisible();
     //Check that button tas a text "Censel"
     await expect(page.locator('//button[@data-test="finish"]')).toHaveText('Finish');
     //Click on the button
     await page.locator('//button[@data-test="finish"]').click();

     //Check that corrspon page open
     await expect(page).toHaveURL('/checkout-complete.html');
    //Click on the "Back Home" button
     await page.locator('#back-to-products').click();

     //Check that the products page open
     await expect(page).toHaveURL('/inventory.html');

     //Click on the "Your cart" button
     await page.locator('#shopping_cart_container').click();

     //Check that in "Your cart"  there is any product
     await expect(page.locator('//div[@class="cart_item"][1]')).not.toBeVisible();

});


test('Verify that clicking the back arrow in the browser opens the "Checkout: Overview" page, where there are no chosen products, and the Total price is 0.00', async ({page}) => {
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); 

    //Add product to "Your cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();

    //Click on the "Your cart button"
    await page.locator(".shopping_cart_link").click();

    //Check that corrent page open
    await expect(page).toHaveURL('/cart.html');

    //Click on the Checkout button
    await page.locator('//button[@data-test="checkout"]').click();

    //Check that corrent page open
    await expect(page).toHaveURL('checkout-step-one.html');

     //Fill the correct firstname
     await page.locator('#first-name').fill("Name");
     //Check that firstname fill correct
     await expect(page.locator('#first-name')).toHaveValue("Name");

     //Fill the correct lastname
     await page.locator('#last-name').fill("LastName");
    //Check that lastname fill correct
    await expect(page.locator('#last-name')).toHaveValue("LastName");
    
    //Fill the correct Zip code
     await page.locator('#postal-code').fill("Correct Zip code");
    //Check that Zip code fill correct
    await expect(page.locator('#postal-code')).toHaveValue("Correct Zip code");
    
    //Click on the "Continue" button
     await page.locator('#continue').click();

     //Check that correspond page opens
     await expect(page).toHaveURL("/checkout-step-two.html");

     //Check that Finish button exist
     await expect(page.locator('//button[@data-test="finish"]')).toBeVisible();
     //Check that button tas a text "Censel"
     await expect(page.locator('//button[@data-test="finish"]')).toHaveText('Finish');
     //Click on the button
     await page.locator('//button[@data-test="finish"]').click();

     //Check that corrspon page open
     await expect(page).toHaveURL('/checkout-complete.html');

     //Click back arrow button
     await page.goBack();

     //Check that "Checkout: Overview" page is open
     await expect(page).toHaveURL('/checkout-step-two.html');

     //Check that there is no any product
     await expect(page.locator('//div[@class="cart_item"][1]')).not.toBeVisible();

     //Check that price is $0.00
     await expect(page.locator('//div[@data-test="total-label"]')).toHaveText('Total: $0.00');

});


test('Verify that clicking the "Left Menu Bar" button on the left top side of the page opens the "Left Menu Bar"', async ({page}) => {
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); 

    //Add product to "Your cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();

    //Click on the "Your cart button"
    await page.locator(".shopping_cart_link").click();

    //Check that corrent page open
    await expect(page).toHaveURL('/cart.html');

    //Click on the Checkout button
    await page.locator('//button[@data-test="checkout"]').click();

    //Check that corrent page open
    await expect(page).toHaveURL('checkout-step-one.html');

     //Fill the correct firstname
     await page.locator('#first-name').fill("Name");
     //Check that firstname fill correct
     await expect(page.locator('#first-name')).toHaveValue("Name");

     //Fill the correct lastname
     await page.locator('#last-name').fill("LastName");
    //Check that lastname fill correct
    await expect(page.locator('#last-name')).toHaveValue("LastName");
    
    //Fill the correct Zip code
     await page.locator('#postal-code').fill("Correct Zip code");
    //Check that Zip code fill correct
    await expect(page.locator('#postal-code')).toHaveValue("Correct Zip code");
    
    //Click on the "Continue" button
     await page.locator('#continue').click();

     //Check that correspond page opens
     await expect(page).toHaveURL("/checkout-step-two.html");

     //Check that Finish button exist
     await expect(page.locator('//button[@data-test="finish"]')).toBeVisible();
     //Check that button tas a text "Censel"
     await expect(page.locator('//button[@data-test="finish"]')).toHaveText('Finish');
     //Click on the button
     await page.locator('//button[@data-test="finish"]').click();

     //Check that corrspon page open
     await expect(page).toHaveURL('/checkout-complete.html');

     //Click on the "Left menu bar" button
     await page.locator('#react-burger-menu-btn').click();

     //Check that "left menu bar" visible
     await expect(page.locator('.bm-menu-wrap')).toBeVisible();
});


test('Verify that clicking the "Your Cart" icon switches to the "Your Cart" page', async ({page}) => {
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); 

    //Add product to "Your cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();

    //Click on the "Your cart button"
    await page.locator(".shopping_cart_link").click();

    //Check that corrent page open
    await expect(page).toHaveURL('/cart.html');

    //Click on the Checkout button
    await page.locator('//button[@data-test="checkout"]').click();

    //Check that corrent page open
    await expect(page).toHaveURL('checkout-step-one.html');

     //Fill the correct firstname
     await page.locator('#first-name').fill("Name");
     //Check that firstname fill correct
     await expect(page.locator('#first-name')).toHaveValue("Name");

     //Fill the correct lastname
     await page.locator('#last-name').fill("LastName");
    //Check that lastname fill correct
    await expect(page.locator('#last-name')).toHaveValue("LastName");
    
    //Fill the correct Zip code
     await page.locator('#postal-code').fill("Correct Zip code");
    //Check that Zip code fill correct
    await expect(page.locator('#postal-code')).toHaveValue("Correct Zip code");
    
    //Click on the "Continue" button
     await page.locator('#continue').click();

     //Check that correspond page opens
     await expect(page).toHaveURL("/checkout-step-two.html");

     //Check that Finish button exist
     await expect(page.locator('//button[@data-test="finish"]')).toBeVisible();
     //Check that button tas a text "Censel"
     await expect(page.locator('//button[@data-test="finish"]')).toHaveText('Finish');
     //Click on the button
     await page.locator('//button[@data-test="finish"]').click();

     //Check that corrspon page open
     await expect(page).toHaveURL('/checkout-complete.html');

     //Click on the "Your cart" button
     await page.locator('#shopping_cart_container').click();

     //Check that "Your cart" page open
     await expect(page).toHaveURL('/cart.html');

     
});