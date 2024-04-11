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
