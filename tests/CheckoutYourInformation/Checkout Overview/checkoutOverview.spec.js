import { test, expect } from '@playwright/test';

const {LoginPage} = require('../../../page-objects/LoginPagePOM.js');


const USERNAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;

test('Verify that the "Cancel" button exists and, upon clicking, switches to the "Products" page', async ({ page }) => {
    
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

     //Check that Cancel button exist
     await expect(page.locator('//button[@data-test="cancel"]')).toBeVisible();
     //Check that button tas a text "Censel"
     await expect(page.locator('//button[@data-test="cancel"]')).toHaveText('Cancel');
     //Click on the button
     await page.locator('//button[@data-test="cancel"]').click();

     //Check that corrspon page opens
     await expect(page).toHaveURL('/inventory.html');
  });

  test('Verify that the "Finish" button exists and, upon clicking, switches to the "Checkout: Complete!" page', async ({ page }) => {
    
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
  });


  test('Verify that the tax is counted correctly ', async ({ page }) => {
    
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

    //Get price from product
    let priceFromField = await page.locator(".inventory_item_price").innerText();
    let price = priceFromField.split("$");
    let priceOnInt =   (price[price.length-1])*1;
   
    //Count the 8% of price
    let persent = (priceOnInt * 0.08).toFixed(2);
    //Verify that the Tax display correctly 
    await expect(page.locator('.summary_tax_label')).toHaveText("Tax: $"+persent);
     
  });


  test('Verify that the price for multiple products is counted correctly', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); 

    //Add "Sauce Labs Backpack" to "Your cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();

    //Add "Sauce Labs Bike Light" to "Your cart"
    await page.locator('#add-to-cart-sauce-labs-bike-light').click();

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

    //Get price from Sauce Labs Backpack product
    let priceOfSauceLabsBackpack = await page.locator("//a[@id='item_4_title_link']/following-sibling::div//div").innerText();
    let price = priceOfSauceLabsBackpack.split("$");
    let priceOfSauceLabsBackpackOnInt = (price[price.length-1])*1;

    //Get price from Sauce Labs Bike Light product
    let priceOfSauceLabsBikeLight = await page.locator('//a[@id="item_0_title_link"]/following-sibling::div//div').innerText();
    let priceOfSauceLabsBikeLightInArray = priceOfSauceLabsBikeLight.split("$");
    let priceOfSauceLabsBikeLightOnInt = (priceOfSauceLabsBikeLightInArray[priceOfSauceLabsBikeLightInArray.length-1])*1;

    let sumOfChosenProducts = priceOfSauceLabsBackpackOnInt + priceOfSauceLabsBikeLightOnInt;
    

    await expect(page.locator('.summary_subtotal_label')).toHaveText("Item total: $"+sumOfChosenProducts);

  });


  test('Verify that "Summari info" titles exist ', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); 

    //Add "Sauce Labs Backpack" to "Your cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();

    //Add "Sauce Labs Bike Light" to "Your cart"
    await page.locator('#add-to-cart-sauce-labs-bike-light').click();

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

    //Chack that "Payment Information:" title exist
    await expect(page.locator('[data-test="payment-info-label"]')).toHaveText('Payment Information:');
    //Chack that "Payment Information:" value
    await expect(page.locator('[data-test="payment-info-value"]')).toHaveText('SauceCard #31337');

    //Check that "Shipping Information:" title exist
    await expect(page.locator('[data-test="shipping-info-label"]')).toHaveText('Shipping Information:');
    //Check that "Shipping Information:" value exist
    await expect(page.locator('[data-test="shipping-info-value"]')).toHaveText('Free Pony Express Delivery!');

     //Check that "Price Total" title exist
     await expect(page.locator('[data-test="total-info-label"]')).toHaveText('Price Total');
  });



  test('Verify that the sum of chosen products and tax equals the price displayed next to the "Total" field.', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); 

    //Add "Sauce Labs Backpack" to "Your cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();

    //Add "Sauce Labs Bike Light" to "Your cart"
    await page.locator('#add-to-cart-sauce-labs-bike-light').click();

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

    //Get the product prices sum 
    let sumOfProductPrice = await page.locator("[data-test='subtotal-label']").innerText();
    let price = sumOfProductPrice.split("$");
    let sumOfProductInInt = (price[price.length-1])*1;

    //Get Tax of product
    let tax = await page.locator('[data-test="tax-label"]').innerText();
    let taxprice = tax.split("$");
    let taxInInt = (taxprice[taxprice.length-1])*1;
    
    let totalPrice = sumOfProductInInt + taxInInt

    //Check that Total price displayed correctly

    await expect(page.locator('[data-test="total-label"]')).toHaveText("Total: $"+totalPrice);

  });


  test('Verify that clicking the "Left Menu Bar" button on the left top side of the page opens the "Left Menu Bar"', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); 

    //Add "Sauce Labs Backpack" to "Your cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();

    //Add "Sauce Labs Bike Light" to "Your cart"
    await page.locator('#add-to-cart-sauce-labs-bike-light').click();

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
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); 

    //Add "Sauce Labs Backpack" to "Your cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();

    //Add "Sauce Labs Bike Light" to "Your cart"
    await page.locator('#add-to-cart-sauce-labs-bike-light').click();

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

    //Click on the "Your cart" button
    await page.locator("#shopping_cart_container").click();

    //Chack that correspond page opened
    await expect(page).toHaveURL('/cart.html');

  });

  test("Verify that clicking on the title within the chosen product field opens the corresponding product's personal page", async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); 

    //Add "Sauce Labs Backpack" to "Your cart"
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
    
    //Click on the title within the product field
    await page.locator("#item_4_title_link").click();

    //Check that correspond product personal page open
    await expect(page).toHaveURL("/inventory-item.html?id=4");

  });


  test('Verify that all chosen products are displayed in the "Checkout: Overview" page, below the "Description" title', async ({page}) =>{

    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();

    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');    
    
    //Add products to "Your cart"
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('#add-to-cart-sauce-labs-bike-light').click();

    //Save title of added product
    const productTitleList = []
    productTitleList.push(await page.locator('#item_4_title_link').innerText());
    productTitleList.push(await page.locator('#item_0_title_link').innerText());
    
    //Click on the "Your cart" button
    await page.locator('#shopping_cart_container').click();

    //Check that correspond page open
    await expect(page).toHaveURL('/cart.html');

    //Click on the "Checkout" button
    await page.locator('[data-test="checkout"]').click();

    //Check that correspon page open
    await expect(page).toHaveURL('/checkout-step-one.html');

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

   //Check that chosen products exist

   for(let i =0; i < productTitleList.length; i +=1){
    await expect(page.locator(`//div[@data-test="inventory-item"][${i+1}]//div[@class="inventory_item_name"]`)).toHaveText(productTitleList[i]);
   }


  });