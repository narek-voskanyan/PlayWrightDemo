import { test, expect } from '@playwright/test';
const {LoginPage} = require('../../page-objects/Login-page.js');


const USERNAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;


test('Verify that the product information on the personal page matches the information about the same product on the "All Items"  page', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    

    //Create variable for product photo locator
    const locetorForProductPhoto = await page.locator('//img[@alt="Sauce Labs Backpack"]');
    //Get value from photo element "Alt" attribute
    const productPhotoAltValue = await locetorForProductPhoto.getAttribute('alt');

    //Click on title chosen product for open product personal page
    await page.locator('//a[@id="item_4_title_link"]//div[1]').click();

    //Check that page open
    await expect(page).toHaveURL('/inventory-item.html?id=4');
    //Create variables for title, description, price fieldes containt values
    const titleValu = await page.locator('//div[@class="inventory_details_name large_size"]').innerText();
    const descriptionValue = await page.locator('//div[@class="inventory_details_desc large_size"]').innerText();
    const costValue = await page.locator('.inventory_details_price').innerText();
    
    //Add product in "Your cart"
    await page.locator('//button[@class="btn btn_primary btn_small btn_inventory"]').click();

    //Go to Your cart page
    await page.locator('//a[@class="shopping_cart_link"]').click();

    //Check that "Your cart" page display
    await expect(page).toHaveURL('/cart.html');
   
    // Check that the product fields' values on the "Products" page match the corresponding product fields' values on the "Your Cart" page
   await expect(page.locator('.inventory_item_name').getByText(titleValu)).toBeVisible();
   await expect(page.locator('.inventory_item_desc').getByText(descriptionValue)).toBeVisible();
   await expect(page.locator('.inventory_item_price').getByText(costValue)).toBeVisible();

  });


  test('Verify that the "Back to products" referenc functions as expected', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    //Click on title chosen product for open product personal page
    await page.locator('//a[@id="item_4_title_link"]//div[1]').click();

    //Check that page open
    await expect(page).toHaveURL('/inventory-item.html?id=4');
   
    //Click on "Back to products" field
    await page.locator('.left_component').click();
    //Check that correcspond page display
    await expect(page).toHaveURL('/inventory.html');

  });


  
  test('Verify that the text on the "Add to Cart" button changes to "Remove" after clicking on it, and returns to the original text after a second click', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    //Click on title chosen product for open product personal page
    await page.locator('//a[@id="item_4_title_link"]//div[1]').click();

    //Check that page open
    await expect(page).toHaveURL('/inventory-item.html?id=4');
   //Check that written on puton is "Add to cart" 
    await expect(page.locator('//button[@class="btn btn_primary btn_small btn_inventory"]').getByText("Add to cart")).toBeVisible();

    //Click on button
     await page.locator('//button[@class="btn btn_primary btn_small btn_inventory"]').click();

    //Check that written on button hide
    await expect(page.locator('//button[@class="btn btn_primary btn_small btn_inventory"]').getByText("Add to cart")).not.toBeVisible();
    
    //Check that written on button is "Removet" 
    await expect(page.locator('//button[@class="btn btn_secondary btn_small btn_inventory"]').getByText("Remove")).toBeVisible();

    //Click on "Remove" button
    await page.locator('//button[@class="btn btn_secondary btn_small btn_inventory"]').click();

    //Check that written on button hide 
    await expect(page.locator('//button[@id="remove-sauce-labs-backpack"]').getByText("Remove")).not.toBeVisible();
    //Check that written on puton is "Add to cart" 
    await expect(page.locator('//button[@class="btn btn_primary btn_small btn_inventory"]').getByText("Add to cart")).toBeVisible();

  });