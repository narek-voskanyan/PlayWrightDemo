import { test, expect } from '@playwright/test';
const {LoginPage} = require('../../page-objects/LoginPagePOM.js');
const {YourCartPage} = require('../../page-objects/YourCartPOM.js');
const {AllItemsPage} = require('../../page-objects/AllItemsPOM.js');


test.beforeEach(async ({page}) =>{
  await page.goto('/inventory.html')
})

test('Verify that the "Your Cart" page contains QTY, Description tittels, "Continoe Shopping", "Checout" buttons', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const allitems = new AllItemsPage(page);
    const yourCartPage = new YourCartPage(page);
  
    
    //Click on the "Your cart" field
    await allitems.clickOnYourCarButton();

    //Check that the "Your Cart" page open
    await allitems.checkYourCartURL('/cart.html');
   
    //Check that the "Your Cart" title exist
    await yourCartPage.checkTitleValue('Your Cart');

    //Check that the "QTY" field exist
    await yourCartPage.checkQuantityLableValue('QTY');

    //Check that the "Description" field exist
    await yourCartPage.checkDescriptionValue('Description');

    //Check that the "Continue Shopping" button exist
    await expect(yourCartPage.continueShoppingButton).toBeVisible();

    //Check that the "Checkout" button exist
    await expect(yourCartPage.checkoutButton).toBeVisible();
    
  });

  test('Verify that the "Continue Shopping" button switch to "Aii items/Products" page', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const allitems = new AllItemsPage(page);
    const yourCartPage = new YourCartPage(page);
    
    //Click on the "Your cart" field
    await allitems.clickOnYourCarButton();
    
    //Check that the "Your Cart" page open
    await allitems.checkYourCartURL('/cart.html');
   
    //Click on the "Continue Shopping" button
    await yourCartPage.clickOnContinueShopping();
    //Check that all items page open
    await yourCartPage.checkURL('/inventory.html');
  });

  test('Verify that upon clicking the "Checkout" button, the "Checkout: Your Information" page should be displayed', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const allitems = new AllItemsPage(page);
    const yourCartPage = new YourCartPage(page);

      //Click on the "Your cart" field
     await allitems.clickOnYourCarButton();
    //Check that the "Your Cart" page open
    await allitems.checkYourCartURL('/cart.html');

   //Check the color of "Checout" field
   await expect(yourCartPage.checkoutButton).toHaveCSS('background-color','rgb(61, 220, 145)');

    //Click on the "Checout" button
    await yourCartPage.clickOnCheckoutButton();

    //Check that "Checout your information" page display
    await yourCartPage.checkURL('/checkout-step-one.html');
  });

//work correct only if there is one product
  test('Verify that the "Remove" button in the selected product field on the "Your Cart" page successfully removes the product from "Your Cart"', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.

    const allitems = new AllItemsPage(page);

     //Add the product into Your cart
     await page.locator('#add-to-cart-sauce-labs-backpack').click();

    //Click on the "Your cart" field
    await allitems.clickOnYourCarButton();
    //Check that the "Your Cart" page open
    await allitems.checkYourCartURL('/cart.html');

    //Check that added product display on the screen
    await expect(page.locator('//div[@class="cart_list"]/div[3]')).toBeVisible();
    
    //Click on the 'Remove' button in the product field
    await page.locator('#remove-sauce-labs-backpack').click();

    //Check that added product display on the screen
    await expect(page.locator('//div[@class="cart_list"]/div[3]')).not.toBeVisible();
    await expect(page.locator('.cart_list > :nth-child(3)')).toHaveClass('removed_cart_item');
   
  });


  test('Verify that it is not possible to click on the "Checkout" button without selecting any product(s)', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const allitems = new AllItemsPage(page);
    const yourCartPage = new YourCartPage(page);

    //Click on the "Your cart" field
    await allitems.clickOnYourCarButton();
    //Check that the "Your Cart" page open
    await allitems.checkYourCartURL('/cart.html');

    //Check that there is no any added product
    await expect(page.locator('//div[@class="cart_item"][1]')).not.toBeVisible();
    

    //Veriy that button is not clicable
    await expect(yourCartPage.checkoutButton).toBeDisabled();
   
  });

  test('Verify that the product information on the Your cart page matches the information about the same product on the "Products"  page', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.

    const allitems = new AllItemsPage(page);

     //Take title, description and price value from product
     const title = await page.locator("#item_4_title_link").innerText();
     const description = await page.locator('//a[@id="item_4_title_link"]/following::div[@data-test="inventory-item-desc"][1]').innerText();
     const price = await page.locator("//a[@id='item_4_title_link']/following::div[@data-test='inventory-item-price'][1]").innerText();
    
     //Click on the "Add to cart" button in same product for add it to the "Your cart"
     await page.locator('#add-to-cart-sauce-labs-backpack').click();

    //Click on the "Your cart" button 
    await allitems.clickOnYourCarButton();

    //Check that coresspond page open
    await allitems.checkYourCartURL('/cart.html');

    //Check that the added  product fields values same with chosen product
    await expect(page.locator('#item_4_title_link')).toHaveText(title);
    await expect(page.locator('//div[@data-test="inventory-item-desc"]')).toHaveText(description);
    await expect(page.locator('//div[@data-test="inventory-item-price"]')).toHaveText(price);
  });

  test('Verify that the added product(s) exist in the "Your Cart" icon on the red circle"  page', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const allitems = new AllItemsPage(page);
     //Click on the "Add to cart" button in same product for add it to the "Your cart"
     await page.locator('#add-to-cart-sauce-labs-backpack').click();

    //Check that the product number apear in the red circle on the "Your cart" button
    await expect(allitems.shoppingCartPageRedCircle).toHaveText('1');
  });