import { test, expect } from '@playwright/test';
import exp from 'constants';

const {LoginPage} = require('../page-objects/Login-page.js');
const USERNAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;

test('Order products and return back to Products page', async({page}) => {
     // Perform authentication steps. Sign in valid user account.
     const loginPage = new LoginPage(page);

     await loginPage.goto();
     await loginPage.fillUsernameField(USERNAME);
     await loginPage.fillPasswordfield(PASSWORD);
     await loginPage.clickLoginButton();
     
     // Check that "All items" page is open
     loginPage.checkAllItemsPageURL();

     //Click on the "Add to cart" button for add backpack in the 'Your cart
     await page.locator('#add-to-cart-sauce-labs-backpack').click();
     //Check that the number of product display on the "Your cart"
     await expect(page.locator(".shopping_cart_badge")).toHaveText('1');

     //Click on the "Add to cart" button for add bike light in the 'Your cart
     await page.locator('#add-to-cart-sauce-labs-bike-light').click();
     //Check that the number of product display on the "Your cart"
     await expect(page.locator(".shopping_cart_badge")).toHaveText('2');



     const listTitels = []
     listTitels.push(await page.locator('//a[@id="item_4_title_link"]//div[@class="inventory_item_name "]').innerText());
     listTitels.push(await page.locator('//a[@id="item_0_title_link"]//div[@class="inventory_item_name "]').innerText());

     //Click on the "Your cart" button
     await page.locator('#shopping_cart_container').click();
     
     //Check that correspond page open
     await expect(page).toHaveURL('/cart.html');
     
     //Check that added product exist on the Add to cart page
     await expect(page.locator('//div[@class="cart_item"][1]//a')).toHaveText(listTitels[0])
     await expect(page.locator('//div[@class="cart_item"][2]//a')).toHaveText(listTitels[1])
     
     
     //Click on the Checkout button
     await page.locator('#checkout').click();
     //Check that "Checkout your information" page open
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

     //Check that "Checkout your information" page open
     await expect(page).toHaveURL('/checkout-step-two.html');


      //Check that added product exist on the Add to cart page
      await expect(page.locator('//div[@class="cart_item"][1]//a')).toHaveText(listTitels[0])
      await expect(page.locator('//div[@class="cart_item"][2]//a')).toHaveText(listTitels[1])

      //Get prices
      let priceFromField = await page.locator('//div[@class="cart_item"][1]//div[@class="inventory_item_price"]').innerText();
      let price = priceFromField.split('$');
      const priceList =[]
      priceList.push(price[price.length-1]*1)

      priceFromField = await page.locator('//div[@class="cart_item"][2]//div[@class="inventory_item_price"]').innerText();
      price = priceFromField.split('$');
      priceList.push(price[price.length-1]*1)
      
      //Count total price
      let totalPrice = (priceList[0] + priceList[1]) * 1.08
      totalPrice = totalPrice.toFixed(2)
     
      //Check that Total price calculate true
      await expect(page.locator('.summary_total_label')).toHaveText("Total: $" + totalPrice);

      //Click on the  "Finish" button
      await page.locator('#finish').click();

      //Check that "Checkout: Complete!" page open
      await expect(page).toHaveURL('/checkout-complete.html');

      //Check that 'Thank you for your order!' message display
      await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

     //Click on the "Back Home" button
     await page.locator('#back-to-products').click()

     //Chack that All items page open
     await expect(page).toHaveURL('/inventory.html');

     //Click on the "Your cart" button
     await page.locator('#shopping_cart_container').click();
     
     //Check that correspond page open
     await expect(page).toHaveURL('/cart.html');

     //Check that Your cart is empty
     await expect(page.locator('//div[@class="cart_item"][1]')).not.toBeVisible()

     //Click on the left menu bar
     await page.locator('.bm-burger-button').click();

     //Check that left menu bar display
     await expect(page.locator('.bm-menu-wrap')).toBeVisible();

     //Click on the Logout field
     await page.locator('[data-test="logout-sidebar-link"]').click();

     //Check that login page open
     await expect(page).toHaveURL('/');
     await expect(loginPage.getUsernameLocator()).toBeEmpty();
     await expect(loginPage.getPasswordLocator()).toBeEmpty();

});


test('Choose products, order and Logout', async ({page}) => {
     const loginPage = new LoginPage(page);

     await loginPage.goto();
     await loginPage.fillUsernameField(USERNAME);
     await loginPage.fillPasswordfield(PASSWORD);
     await loginPage.clickLoginButton();
     
     // Check that "All items" page is open
     loginPage.checkAllItemsPageURL();

     //Save all fields value of "Sauce Labs Backpack" product
     let titleValueOfBackpack = await page.locator('#item_4_title_link').innerText();
     let descriptionOfBackpack = await page.locator('//a[@data-test="item-4-title-link"]//following::div[@data-test="inventory-item-desc"][1]').innerText();
     let priceValueOfBackpack = await page.locator('//a[@data-test="item-4-title-link"]//following::div[@data-test="inventory-item-price"][1]').innerText();
     

     //Click on the "Sauce Labs Backpack" title
     await page.locator('#item_4_title_link').click();

     //Check that the "Sauce Labs Backpack" personal page open
     await expect(page).toHaveURL('/inventory-item.html?id=4');

     //Check that all product fields match the field of chosen product fields
     await expect(page.locator('//div[@data-test="inventory-item-name"]')).toHaveText(titleValueOfBackpack);
     await expect(page.locator('//div[@data-test="inventory-item-desc"]')).toHaveText(descriptionOfBackpack);
     await expect(page.locator('//div[@data-test="inventory-item-price"]')).toHaveText(priceValueOfBackpack);

     //Click on the "Add to cart" button
     await page.locator('#add-to-cart').click();
     await expect(page.locator('#add-to-cart')).not.toBeVisible();
     await expect(page.locator('[data-test="remove"]')).toBeVisible();
     await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
     await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCSS('background-color','rgb(226, 35, 26)');

     //Click on the "Back to product" button
     await page.locator('#back-to-products').click();
     //The "All items" page should open
     await expect(page).toHaveURL('/inventory.html');

     //The button on the 'Sauce Labs Backpack' should be 'Remove' instead of 'Add to cart'
     await expect(page.locator('#add-to-cart-sauce-labs-backpack')).not.toBeVisible();
     await expect(page.locator('#remove-sauce-labs-backpack')).toBeVisible();

     //Click on the "Add to cart" button in the "Sauce Labs Bike Light" product
     await page.locator('#add-to-cart-sauce-labs-bike-light').click();
     await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
     let titleValueOfBikeLight = await page.locator('#item_0_title_link').innerText();


     //The button on the 'Sauce Labs Bike Light' should be 'Remove' instead of 'Add to cart'
     await expect(page.locator('#add-to-cart-sauce-labs-bike-light')).not.toBeVisible();
     await expect(page.locator('#remove-sauce-labs-bike-light')).toBeVisible();

     //Click on the "Add to cart" button in the "Sauce Labs Bolt T-Shirt" product
     await page.locator('#add-to-cart-sauce-labs-bolt-t-shirt').click();

     //The number 2 in the red circle on the "Your cart" button should change to 3
     await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('3');

     //The button on the 'Sauce Labs Bolt T-Shirt' should be 'Remove' instead of 'Add to cart'
     await expect(page.locator('#add-to-cart-sauce-labs-bolt-t-shirt')).not.toBeVisible();
     await expect(page.locator('#remove-sauce-labs-bolt-t-shirt')).toBeVisible();


     //Save all fields value of "Sauce Labs Backpack" product
     let titleValueOfTShirt = await page.locator('#item_1_title_link').innerText();
     let descriptionOfTShirt = await page.locator('//a[@data-test="item-1-title-link"]//following::div[@data-test="inventory-item-desc"][1]').innerText();
     let priceValueOfTShirt = await page.locator('//a[@data-test="item-1-title-link"]//following::div[@data-test="inventory-item-price"][1]').innerText();
     
     //Click on the "Sauce Labs Bolt T-Shirt" title
     await page.locator('#item_1_title_link').click();
     //The personal page for the 'Sauce Labs Bolt T-Shirt' should open
     await expect(page).toHaveURL('/inventory-item.html?id=1');

     //The title, description, and price should match the corresponding fields of the "Sauce Labs Bolt T-Shirt" on the 'All items' page
     await expect(page.locator('//div[@data-test="inventory-item-name"]')).toHaveText(titleValueOfTShirt);
     await expect(page.locator('//div[@data-test="inventory-item-desc"]')).toHaveText(descriptionOfTShirt);
     await expect(page.locator('//div[@data-test="inventory-item-price"]')).toHaveText(priceValueOfTShirt);

     //The button on the 'Sauce Labs Bolt T-Shirt' should be 'Remove'
     await expect(page.locator('#add-to-cart')).not.toBeVisible();
     await expect(page.locator('#remove')).toBeVisible();

     //Click on the "Remove" button in the "Sauce Labs Bolt T-Shirt"
     await page.locator('#remove').click();

     //The button should change to "Add to cart" from "Remove"
     await expect(page.locator('#remove')).not.toBeVisible();
     await expect(page.locator('#add-to-cart')).toBeVisible();

     //The number 3 in the red circle on the "Your cart" button should change to 2
     await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

     //Click on the "Back to product" button
     await page.locator('#back-to-products').click();
     //The "All items" page should open
     await expect(page).toHaveURL('/inventory.html');

     //The button on the 'Sauce Labs Bolt T-Shirt' should be 'Add to cart' instead of 'Remove'
     await expect(page.locator('#remove-sauce-labs-bolt-t-shirt')).not.toBeVisible();
     await expect(page.locator('#add-to-cart-sauce-labs-bolt-t-shirt')).toBeVisible();

     //Click on the "Add to cart" button in the "Sauce Labs Fleece Jacket" product
     await page.locator('#add-to-cart-sauce-labs-fleece-jacket').click();

     //Save the value of Fleece jacket
     let titleValueOfFleeceJacket = await page.locator('#item_5_title_link').innerText();

     //The number 2 in the red circle on the "Your cart" button should change to 3
     await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('3');

     //The button should change to "Remove" from "Add to cart"
     await expect(page.locator('#add-to-cart-sauce-labs-fleece-jacket')).not.toBeVisible();
     await expect(page.locator('#remove-sauce-labs-fleece-jacket')).toBeVisible();

     //Click on the "Your cart" button
     await page.locator('#shopping_cart_container').click();
     //The "Your cart" page should open
     await expect(page).toHaveURL('/cart.html');

     //The "Sauce Labs Backpack", "Sauce Labs Bike Light" and "Sauce Labs Fleece Jacket" products should display on the page
     await expect(page.locator('#item_4_title_link')).toHaveText(titleValueOfBackpack)
     await expect(page.locator('#item_0_title_link')).toHaveText(titleValueOfBikeLight)
     await expect(page.locator('#item_5_title_link')).toHaveText(titleValueOfFleeceJacket)

     //Click on the "Sauce Labs Fleece Jacket" title 
     await page.locator('#item_5_title_link').click();
     //The "Sauce Labs Fleece Jacket" personal page should open
     await expect(page).toHaveURL('/inventory-item.html?id=5');

     //Click on the "Back arrow" button on the browser
     await page.goBack();
     //The "Your cart" bage should open
     await expect(page).toHaveURL('/cart.html');

     //Click on the "Remove" button on the "Sauce Labs Bike Light" product
     await page.locator('#remove-sauce-labs-bike-light').click();

     //The "Sauce Labs Bike Light" product should be removed from page
     await expect(page.locator('item-0-title-link')).not.toBeVisible();

     //Click on the "Checkout" button
     await page.locator('#checkout').click();

     //The "Checkout: Your Information" should be open
     await expect(page).toHaveURL('/checkout-step-one.html');

     //The "First Name", "Last Name", "Zip/Code" fields should be empty
     await expect(page.locator('#first-name')).toBeEmpty();
     await expect(page.locator('#last-name')).toBeEmpty();
     await expect(page.locator('#postal-code')).toBeEmpty();

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

    //Click "Cancel" button
    await page.locator('#cancel').click();
    //The "Your cart" page should be open
    await expect(page).toHaveURL('/cart.html');
     
    //The chosen products should display
    await expect(page.locator('#item_4_title_link')).toBeVisible();
    await expect(page.locator('#item_5_title_link')).toBeVisible();

     //Click on the "Checkout" button
     await page.locator('#checkout').click();

     //The "Checkout: Your Information" should be open
     await expect(page).toHaveURL('/checkout-step-one.html');

     //The "First Name", "Last Name", "Zip/Code" fields should be empty
     await expect(page.locator('#first-name')).toBeEmpty();
     await expect(page.locator('#last-name')).toBeEmpty();
     await expect(page.locator('#postal-code')).toBeEmpty();

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

    //The "Checkout: Overview" page should be open
    await expect(page).toHaveURL('/checkout-step-two.html');

    //The chosen products should display
    await expect(page.locator('#item_4_title_link')).toBeVisible();
    await expect(page.locator('#item_5_title_link')).toBeVisible();

    //Get prices
     let priceFromField = await page.locator('//div[@class="cart_item"][1]//div[@class="inventory_item_price"]').innerText();
     let price = priceFromField.split('$');
     const priceList =[]
     priceList.push(price[price.length-1]*1)

     priceFromField = await page.locator('//div[@class="cart_item"][2]//div[@class="inventory_item_price"]').innerText();
     price = priceFromField.split('$');
     priceList.push(price[price.length-1]*1)
     
     //Count total price
     let totalPrice = (priceList[0] + priceList[1]) * 1.08
     totalPrice = totalPrice.toFixed(2)

     //The total price should match the sum of all product prices and sum of  8% of those prices
     await expect(page.locator('.summary_total_label')).toHaveText('Total: $' + totalPrice);
     
     //Click on the "Finish" button
     await page.locator('#finish').click();

     //The "Checkout: Complete!" page should open
     await expect(page).toHaveURL('/checkout-complete.html')

     //The "Thank you for your order!" message should display
     await expect(page.locator('[class="complete-header"]')).toHaveText("Thank you for your order!");

     //Click on the "Back Home" button
     await page.locator('[data-test="back-to-products"]').click();
     //The "All items" page should open 
     await expect(page).toHaveURL('/inventory.html');

     //The "Sauce Labs Backpack", "Sauce Labs Bike Light" and "Sauce Labs Fleece Jacket" products "Remove" button should change to "Add to cart"
     await expect(page.locator('#add-to-cart-sauce-labs-backpack')).toBeVisible();
     await expect(page.locator('#remove-sauce-labs-backpack')).not.toBeVisible();

     await expect(page.locator('#add-to-cart-sauce-labs-bike-light')).toBeVisible();
     await expect(page.locator('#remove-sauce-labs-bike-light')).not.toBeVisible();

     await expect(page.locator('#add-to-cart-sauce-labs-fleece-jacket')).toBeVisible();
     await expect(page.locator('#remove-sauce-labs-fleece-jacket')).not.toBeVisible();

     //The red circule with number of chosen product should be "Remove" from "Your cart" button
     await expect(page.locator('data-test="shopping-cart-badge"')).not.toBeVisible();

     //Click on the "Your cart" button
     await page.locator('#shopping_cart_container').click();

     //The "Your cart" page should be open
     await expect(page).toHaveURL('/cart.html');

     //The page should not display any products
     await expect(page.locator('//div[@class="cart_item"][1]')).not.toBeVisible();
    
     //Click on the left menu bar button
     await page.locator('#react-burger-menu-btn').click();
     //The left menu bar should open
     await expect(page.locator('.bm-menu-wrap')).toBeVisible();
     //Click on the "Logout" button
     await page.locator('#logout_sidebar_link').click();
     //The account should logout from personal page
     await expect(page).toHaveURL('');
     //The username and password fields should be empty
     await expect(loginPage.getUsernameLocator()).toBeEmpty();
     await expect(loginPage.getPasswordLocator()).toBeEmpty();





});