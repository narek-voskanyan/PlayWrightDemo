import { test, expect } from '@playwright/test';

const {LoginPage} = require('../../../../../page-objects/LoginPagePOM.js');
const {CheckoutCompilate} = require('../../../../../page-objects/CheckoutCompilatePOM.js');
const {CheckoutYourInfo} = require('../../../../../page-objects/CheckoutYourInfoPOM.js');
const {AllItemsPage} = require('../../../../../page-objects/AllItemsPOM.js');
const {YourCartPage} = require('../../../../../page-objects/YourCartPOM.js');
const {LaftMenuBarPage} =require('../../../../../page-objects/LeftMenuBarPOM.js');
const {CheckoutOverview} = require('../../../../../page-objects/CheckoutOverviewPOM.js');

const USERNAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;

test.beforeEach(async ({page}) => {
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);
    const allItems = new AllItemsPage(page);
    const yourCart = new YourCartPage(page);
    const checkoutInfo = new CheckoutYourInfo(page);
    const checkoutOverview = new CheckoutOverview(page);

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
    await checkoutInfo.checkURL('/checkout-step-two.html');
    //Click on the button
    await checkoutOverview.clickOnFinishButton();
    //Check that corrspon page open
    await checkoutOverview.checkURL('/checkout-complete.html');
});


test('Verify that all fields exist on the page.', async ({page}) => {
    const checkoutCompilate = new CheckoutCompilate(page);
     //Check that title exist
     await checkoutCompilate.checkTitleValue('Checkout: Complete!');
     //Check that correspond img exist
     await checkoutCompilate.checkImage('alt', "Pony Express");
     //Check that  "Thank you for your order!" exist
     await checkoutCompilate.checkMessage('Thank you for your order!');
     //Check that 'Your order has been dispatched, and will arrive just as fast as the pony can get there!' text exist
     await checkoutCompilate.checkText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
     //Check that "Back Home" button exist
     await checkoutCompilate.checkButtonVisibleAndClickable();
});

test('Verify that clicking the "Back Home" button opens the Product page and clears "Your Cart".', async ({page}) => {
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
    const leftMenuBar = new LaftMenuBarPage(page);
     //Click on the "Left menu bar" button
     await leftMenuBar.clickOnOpenButton();
});

test('Verify that clicking the "Your Cart" icon switches to the "Your Cart" page', async ({page}) => {
     const shoppingCart = new AllItemsPage(page);
     //Click on the Your Cart button
     await shoppingCart.clickOnYourCarButton();
     //Check that "Your cart" page open
     await shoppingCart.checkYourCartURL('/cart.html'); 
});