import { test, expect } from '@playwright/test';

const {LoginPage} = require('../../../../page-objects/LoginPagePOM.js');
const {CheckoutYourInfo} = require('../../../../page-objects/CheckoutYourInfoPOM.js');
const {AllItemsPage} = require('../../../../page-objects/AllItemsPOM.js');
const {YourCartPage} = require('../../../../page-objects/YourCartPOM.js');
const {LaftMenuBarPage} =require('../../../../page-objects/LeftMenuBarPOM.js');
const {CheckoutOverview} = require('../../../../page-objects/CheckoutOverviewPOM.js');



test.beforeEach(async({page}) =>{
  await page.goto('/inventory.html')
});

test('Verify that the "Cancel" button exists and, upon clicking, switches to the "Products" page', async ({ page }) => {
    const allItems = new AllItemsPage(page);
    const yourCart = new YourCartPage(page);
    const checkoutInfo = new CheckoutYourInfo(page);
    const checkoutOverview = new CheckoutOverview(page);
    //Add product to "Your cart"
    await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();

    //Click on the "Your cart button"
    await allItems.clickOnYourCarButton();

    //Check that corrent page open
    await allItems.checkYourCartURL('/cart.html');

    //Click on the Checkout button
    await yourCart.clickOnCheckoutButton();

    //Check that corrent page open
    await yourCart.checkURL('/checkout-step-one.html');

     //Fill the correct firstname and check that it filled corrected
     await checkoutInfo.fillFirstName('Firstname');

     //Fill the correct lastname and check that it filled corrected
     await checkoutInfo.fillLastName('Lastname');
    
    //Fill the correct Zip code and check that it filled corrected
     await checkoutInfo.fillZipCode('Zip/Code');
    
    //Click on the "Continue" button
     await checkoutInfo.clickOnContionueButon();

     //Check that correspond page opens
     await checkoutInfo.checkURL("/checkout-step-two.html");

     //Check that Cancel button exist
     await expect(checkoutOverview.cancleButton).toBeVisible();
     //Check that button tas a text "Censel"
     await expect(checkoutOverview.cancleButton).toHaveText('Cancel');
     //Click on the button
     await checkoutOverview.clickOnCencelButton();

     //Check that corrspon page opens
     await checkoutOverview.checkURL('/inventory.html');
  });

  test('Verify that the "Finish" button exists and, upon clicking, switches to the "Checkout: Complete!" page', async ({ page }) => {
    const allItems = new AllItemsPage(page);
    const yourCart = new YourCartPage(page);
    const checkoutInfo = new CheckoutYourInfo(page);
    const checkoutOverview = new CheckoutOverview(page);
    //Add product to "Your cart"
    await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();

    //Click on the "Your cart button"
    await allItems.clickOnYourCarButton();

    //Check that corrent page open
    await allItems.checkYourCartURL('/cart.html');

    //Click on the Checkout button
    await yourCart.clickOnCheckoutButton();

    //Check that corrent page open
    await yourCart.checkURL('/checkout-step-one.html');

     //Fill the correct firstname and check that it filled corrected
     await checkoutInfo.fillFirstName('Firstname');

     //Fill the correct lastname and check that it filled corrected
     await checkoutInfo.fillLastName('Lastname');
    
    //Fill the correct Zip code and check that it filled corrected
     await checkoutInfo.fillZipCode('Zip/Code');
    
    //Click on the "Continue" button
     await checkoutInfo.clickOnContionueButon();

     //Check that correspond page opens
     await checkoutInfo.checkURL("/checkout-step-two.html");

     //Check that Finish button exist
     await expect(checkoutOverview.finishButton).toBeVisible();
     //Check that button tas a text "Censel"
     await expect(checkoutOverview.finishButton).toHaveText('Finish');
     //Click on the button
     await checkoutOverview.clickOnFinishButton();

     //Check that corrspon page open
     await checkoutOverview.checkURL('/checkout-complete.html');

  });


  test('Verify that the tax is counted correctly ', async ({ page }) => {
    const allItems = new AllItemsPage(page);
    const yourCart = new YourCartPage(page);
    const checkoutInfo = new CheckoutYourInfo(page);
    const checkoutOverview = new CheckoutOverview(page);
    //Add product to "Your cart"
    await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();

    //Click on the "Your cart button"
    await allItems.clickOnYourCarButton();

    //Check that corrent page open
    await allItems.checkYourCartURL('/cart.html');

    //Click on the Checkout button
    await yourCart.clickOnCheckoutButton();

    //Check that corrent page open
    await yourCart.checkURL('/checkout-step-one.html');

    //Fill the correct firstname and check that it filled corrected
    await checkoutInfo.fillFirstName('Firstname');

    //Fill the correct lastname and check that it filled corrected
    await checkoutInfo.fillLastName('Lastname');
   
    //Fill the correct Zip code and check that it filled corrected
    await checkoutInfo.fillZipCode('Zip/Code');
   
    //Click on the "Continue" button
    await checkoutInfo.clickOnContionueButon();

    //Check that correspond page opens
    await checkoutInfo.checkURL("/checkout-step-two.html");

    //Get price from product
    let priceFromField = await page.locator(".inventory_item_price").innerText();
    let price = priceFromField.split("$");
    let priceOnInt =   (price[price.length-1])*1;
   
    //Count the 8% of price
    let persent = (priceOnInt * 0.08).toFixed(2);
    //Verify that the Tax display correctly 
    await expect(checkoutOverview.summaryTaxlable).toHaveText("Tax: $"+persent);
     
  });

  test('Verify that the price for multiple products is counted correctly', async ({ page }) => {
    const allItems = new AllItemsPage(page);
    const yourCart = new YourCartPage(page);
    const checkoutInfo = new CheckoutYourInfo(page);
    const checkoutOverview = new CheckoutOverview(page);

    //Add "Sauce Labs Backpack" to "Your cart"
    await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();

    //Add "Sauce Labs Bike Light" to "Your cart"
    await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();

    //Click on the "Your cart button"
    await allItems.clickOnYourCarButton();

    //Check that corrent page open
    await allItems.checkYourCartURL('/cart.html');

    //Click on the Checkout button
    await yourCart.clickOnCheckoutButton();

    //Check that corrent page open
    await yourCart.checkURL('/checkout-step-one.html');

    //Fill the correct firstname and check that it filled corrected
    await checkoutInfo.fillFirstName('Firstname');

    //Fill the correct lastname and check that it filled corrected
    await checkoutInfo.fillLastName('Lastname');
   
    //Fill the correct Zip code and check that it filled corrected
    await checkoutInfo.fillZipCode('Zip/Code');
   
    //Click on the "Continue" button
    await checkoutInfo.clickOnContionueButon();

    //Check that correspond page opens
    await checkoutInfo.checkURL("/checkout-step-two.html");

    //Get price from Sauce Labs Backpack product
    let priceOfSauceLabsBackpack = await page.locator('[data-test="inventory-item-price"]').nth(0).innerText();
    let price = priceOfSauceLabsBackpack.split("$");
    let priceOfSauceLabsBackpackOnInt = (price[price.length-1])*1;

    //Get price from Sauce Labs Bike Light product
    let priceOfSauceLabsBikeLight = await page.locator('[data-test="inventory-item-price"]').nth(1).innerText();
    let priceOfSauceLabsBikeLightInArray = priceOfSauceLabsBikeLight.split("$");
    let priceOfSauceLabsBikeLightOnInt = (priceOfSauceLabsBikeLightInArray[priceOfSauceLabsBikeLightInArray.length-1])*1;
    let sumOfChosenProducts = priceOfSauceLabsBackpackOnInt + priceOfSauceLabsBikeLightOnInt;
    
    await expect(checkoutOverview.summarySubtotalLable).toHaveText("Item total: $"+sumOfChosenProducts);

  });

  test('Verify that "Summari info" titles exist ', async ({ page }) => {
    const allItems = new AllItemsPage(page);
    const yourCart = new YourCartPage(page);
    const checkoutInfo = new CheckoutYourInfo(page);
    const checkoutOverview = new CheckoutOverview(page);
    //Add "Sauce Labs Backpack" to "Your cart"
    await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();

    //Add "Sauce Labs Bike Light" to "Your cart"
    await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();

    //Click on the "Your cart button"
    await allItems.clickOnYourCarButton();

    //Check that corrent page open
    await allItems.checkYourCartURL('/cart.html');

    //Click on the Checkout button
    await yourCart.clickOnCheckoutButton();

    //Check that corrent page open
    await yourCart.checkURL('/checkout-step-one.html');

    //Fill the correct firstname and check that it filled corrected
    await checkoutInfo.fillFirstName('Firstname');

    //Fill the correct lastname and check that it filled corrected
    await checkoutInfo.fillLastName('Lastname');
   
    //Fill the correct Zip code and check that it filled corrected
    await checkoutInfo.fillZipCode('Zip/Code');
   
    //Click on the "Continue" button
    await checkoutInfo.clickOnContionueButon();

    //Check that correspond page opens
    await checkoutInfo.checkURL("/checkout-step-two.html");

    //Chack that "Payment Information:" title exist
    await expect(checkoutOverview.paymentInfo).toHaveText('Payment Information:');
    //Chack that "Payment Information:" value
    await expect(checkoutOverview.paymentInfoValue).toHaveText('SauceCard #31337');

    //Check that "Shipping Information:" title exist
    await expect(checkoutOverview.shoppingInfoLable).toHaveText('Shipping Information:');
    //Check that "Shipping Information:" value exist
    await expect(checkoutOverview.shoppingInfoValue).toHaveText('Free Pony Express Delivery!');

     //Check that "Price Total" title exist
     await expect(checkoutOverview.totalInfoLable).toHaveText('Price Total');
  });

  test('Verify that the sum of chosen products and tax equals the price displayed next to the "Total" field.', async ({ page }) => {
    const allItems = new AllItemsPage(page);
    const yourCart = new YourCartPage(page);
    const checkoutInfo = new CheckoutYourInfo(page);
    const checkoutOverview = new CheckoutOverview(page);
    //Add "Sauce Labs Backpack" to "Your cart"
    await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();

    //Add "Sauce Labs Bike Light" to "Your cart"
    await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();

   //Click on the "Your cart button"
   await allItems.clickOnYourCarButton();

   //Check that corrent page open
   await allItems.checkYourCartURL('/cart.html');

   //Click on the Checkout button
   await yourCart.clickOnCheckoutButton();

   //Check that corrent page open
   await yourCart.checkURL('/checkout-step-one.html');

   //Fill the correct firstname and check that it filled corrected
   await checkoutInfo.fillFirstName('Firstname');

   //Fill the correct lastname and check that it filled corrected
   await checkoutInfo.fillLastName('Lastname');
  
   //Fill the correct Zip code and check that it filled corrected
   await checkoutInfo.fillZipCode('Zip/Code');
  
   //Click on the "Continue" button
   await checkoutInfo.clickOnContionueButon();

   //Check that correspond page opens
   await checkoutInfo.checkURL("/checkout-step-two.html");

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
    await expect(checkoutOverview.totalLable).toHaveText("Total: $"+totalPrice);

  });

  test('Verify that clicking the "Left Menu Bar" button on the left top side of the page opens the "Left Menu Bar"', async ({ page }) => {
    const allItems = new AllItemsPage(page);
    const yourCart = new YourCartPage(page);
    const checkoutInfo = new CheckoutYourInfo(page);

    //Add "Sauce Labs Backpack" to "Your cart"
    await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();

    //Add "Sauce Labs Bike Light" to "Your cart"
    await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();

    //Click on the "Your cart button"
    await allItems.clickOnYourCarButton();

    //Check that corrent page open
    await allItems.checkYourCartURL('/cart.html');

    //Click on the Checkout button
    await yourCart.clickOnCheckoutButton();

    //Check that corrent page open
    await yourCart.checkURL('/checkout-step-one.html');

    //Fill the correct firstname and check that it filled corrected
    await checkoutInfo.fillFirstName('Firstname');

    //Fill the correct lastname and check that it filled corrected
    await checkoutInfo.fillLastName('Lastname');
   
    //Fill the correct Zip code and check that it filled corrected
    await checkoutInfo.fillZipCode('Zip/Code');
   
    //Click on the "Continue" button
    await checkoutInfo.clickOnContionueButon();

    //Check that correspond page opens
    await checkoutInfo.checkURL("/checkout-step-two.html");

  //Click on the "left menu bar" button
  await page.locator('#react-burger-menu-btn').click();
  //Check that "left menu bar" visible
  await expect(page.locator('.bm-menu')).toBeVisible();

  });

  test('Verify that clicking the "Your Cart" icon switches to the "Your Cart" page', async ({ page }) => {
    const allItems = new AllItemsPage(page);
    const yourCart = new YourCartPage(page);
    const checkoutInfo = new CheckoutYourInfo(page);

    //Add "Sauce Labs Backpack" to "Your cart"
    await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();

    //Add "Sauce Labs Bike Light" to "Your cart"
    await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();

    //Click on the "Your cart button"
    await allItems.clickOnYourCarButton();

    //Check that corrent page open
    await allItems.checkYourCartURL('/cart.html');

    //Click on the Checkout button
    await yourCart.clickOnCheckoutButton();

    //Check that corrent page open
    await yourCart.checkURL('/checkout-step-one.html');

    //Fill the correct firstname and check that it filled corrected
    await checkoutInfo.fillFirstName('Firstname');

    //Fill the correct lastname and check that it filled corrected
    await checkoutInfo.fillLastName('Lastname');
   
    //Fill the correct Zip code and check that it filled corrected
    await checkoutInfo.fillZipCode('Zip/Code');
   
    //Click on the "Continue" button
    await checkoutInfo.clickOnContionueButon();

    //Check that correspond page opens
    await checkoutInfo.checkURL("/checkout-step-two.html");


    //Click on the "Your cart" button
    await page.locator("#shopping_cart_container").click();

    //Chack that correspond page opened
    await expect(page).toHaveURL('/cart.html');

  });

  test("Verify that clicking on the title within the chosen product field opens the corresponding product's personal page", async ({ page }) => {
    const allItems = new AllItemsPage(page);
    const yourCart = new YourCartPage(page);
    const checkoutInfo = new CheckoutYourInfo(page);
    //Add "Sauce Labs Backpack" to "Your cart"
    await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();


    //Click on the "Your cart button"
    await allItems.clickOnYourCarButton();

    //Check that corrent page open
    await allItems.checkYourCartURL('/cart.html');

    //Click on the Checkout button
    await yourCart.clickOnCheckoutButton();

    //Check that corrent page open
    await yourCart.checkURL('/checkout-step-one.html');

    //Fill the correct firstname and check that it filled corrected
    await checkoutInfo.fillFirstName('Firstname');

    //Fill the correct lastname and check that it filled corrected
    await checkoutInfo.fillLastName('Lastname');
   
    //Fill the correct Zip code and check that it filled corrected
    await checkoutInfo.fillZipCode('Zip/Code');
   
    //Click on the "Continue" button
    await checkoutInfo.clickOnContionueButon();

    //Check that correspond page opens
    await checkoutInfo.checkURL("/checkout-step-two.html");
    
    //Click on the title within the product field
    await page.locator('.inventory_item_name ').nth(0).click();

    //Check that correspond product personal page open
    await expect(page).toHaveURL("/inventory-item.html?id=4");

  });

  test('Verify that all chosen products are displayed in the "Checkout: Overview" page, below the "Description" title', async ({page}) =>{
    const allItems = new AllItemsPage(page);
    const yourCart = new YourCartPage(page);
    const checkoutInfo = new CheckoutYourInfo(page);
    //Add products to "Your cart"
    await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();
    await page.locator('.btn.btn_primary.btn_small.btn_inventory').nth(0).click();

    //Save title of added product
    const productTitleList = []
    productTitleList.push(await page.locator('.inventory_item_name').nth(0).innerText());
    productTitleList.push(await page.locator('.inventory_item_name').nth(1).innerText());
    
    //Click on the "Your cart button"
    await allItems.clickOnYourCarButton();

    //Check that corrent page open
    await allItems.checkYourCartURL('/cart.html');

    //Click on the Checkout button
    await yourCart.clickOnCheckoutButton();

    //Check that corrent page open
    await yourCart.checkURL('/checkout-step-one.html');

    //Fill the correct firstname and check that it filled corrected
    await checkoutInfo.fillFirstName('Firstname');

    //Fill the correct lastname and check that it filled corrected
    await checkoutInfo.fillLastName('Lastname');
   
    //Fill the correct Zip code and check that it filled corrected
    await checkoutInfo.fillZipCode('Zip/Code');
   
    //Click on the "Continue" button
    await checkoutInfo.clickOnContionueButon();

    //Check that correspond page opens
    await checkoutInfo.checkURL("/checkout-step-two.html");
   
    //Check that chosen products exist
   for(let i =0; i < productTitleList.length; i +=1){
    await expect(page.locator(`//div[@data-test="inventory-item"][${i+1}]//div[@class="inventory_item_name"]`)).toHaveText(productTitleList[i]);
   }

  });