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
     await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();

    //Click on the "Your cart" field
    await allitems.clickOnYourCarButton();
    //Check that the "Your Cart" page open
    await allitems.checkYourCartURL('/cart.html');

    //Check that added product display on the screen
    await expect(page.locator('[data-test="inventory-item"]')).toBeVisible();
    
    //Click on the 'Remove' button in the product field
    await page.locator('.btn.btn_secondary.btn_small.cart_button').nth(0).click();

    //Check that added product display on the screen
    await expect(page.locator('[data-test="inventory-item"]')).not.toBeVisible();
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
    await expect(page.locator('[class="cart_item"]')).not.toBeVisible();
    

    //Veriy that button is not clicable
    await expect(yourCartPage.checkoutButton).toBeDisabled();
   
  });

  test('Verify that the product information on the Your cart page matches the information about the same product on the "Products"  page', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.

    const allitems = new AllItemsPage(page);

     //Take title, description and price value from product
     const title = await page.locator(".inventory_item_name").nth(0).innerText();
     const description = await page.locator('[data-test="inventory-item-desc"]').nth(0).innerText();
     const price = await page.locator('[data-test="inventory-item-price"]').nth(0).innerText();
    
     //Click on the "Add to cart" button in same product for add it to the "Your cart"
     await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();

    //Click on the "Your cart" button 
    await allitems.clickOnYourCarButton();

    //Check that coresspond page open
    await allitems.checkYourCartURL('/cart.html');

    //Check that the added  product fields values same with chosen product
    await expect(page.locator(".inventory_item_name").nth(0)).toHaveText(title);
    await expect(page.locator('[data-test="inventory-item-desc"]').nth(0)).toHaveText(description);
    await expect(page.locator('[data-test="inventory-item-price"]').nth(0)).toHaveText(price);
  });

  test('Verify that the added product(s) exist in the "Your Cart" icon on the red circle"  page', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const allitems = new AllItemsPage(page);
     //Click on the "Add to cart" button in same product for add it to the "Your cart"
     await page.locator(".btn.btn_primary.btn_small.btn_inventory").nth(0).click();

    //Check that the product number apear in the red circle on the "Your cart" button
    await expect(allitems.shoppingCartPageRedCircle).toHaveText('1');
  });