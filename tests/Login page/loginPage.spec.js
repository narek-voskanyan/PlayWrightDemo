import { test, expect } from '@playwright/test';

const {LoginPage} = require('../../page-objects/LoginPagePOM.js');
test.use({ storageState: { cookies: [], origins: [] } });

const USERNAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;
const LocLocedOutUserMessage = 'Epic sadface: Sorry, this user has been locked out.'
const WrongUsernameOrPasswordMessage = 'Epic sadface: Username and password do not match any user in this service'


if(USERNAME === "locked_out_user"){
  test('Verify that is not possible to login by locked account', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // Perform authentication steps. Sign in valid user account.
    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    //Verify that correspond error message apear
    await expect(page.getByText(LocLocedOutUserMessage)).toBeVisible();
    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('https://www.saucedemo.com/'); 
   
  });
}else{

  test('Verify that with correct username and password is posible to ligin personal account', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); 
   
  });

  test('Verify ability to sign into account with using "Enter" button on keyboard', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await page.keyboard.press('Enter');
    
    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); 
   
  });


  test('Verfy that is not posible to sign in with valid username by using uppercases', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Perform authentication steps. Sign in valid user account.
    await loginPage.goto();
    await loginPage.fillUsernameField("Standard_user");
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    


    await expect(page.getByText(WrongUsernameOrPasswordMessage)).toBeVisible();

    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('https://www.saucedemo.com/'); 
   
  });


  test('Verfy that is not posible to sign in with valid password by using uppercases', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Perform authentication steps. Sign in valid user account.
    await loginPage.goto();

    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD.toUpperCase());
    await loginPage.clickLoginButton();
    
    await expect(page.getByText(WrongUsernameOrPasswordMessage)).toBeVisible();

    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('https://www.saucedemo.com/'); 
   
  });

  test('Verfy that is not posible to Login With empty username and correct password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // Perform authentication steps. Sign in valid user account.
   
    await loginPage.goto();
    await expect(loginPage.getUsernameLocator()).toBeEmpty();
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();

    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('https://www.saucedemo.com/'); 
   
  });


  test('Verfy that is not posible to Login with correct username and empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // Perform authentication steps. Sign in valid user account.
    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await expect(loginPage.getPasswordLocator()).toBeEmpty();
    await loginPage.clickLoginButton();
    
    await expect(page.getByText('Epic sadface: Password is required')).toBeVisible();

    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('https://www.saucedemo.com/'); 
   
  });


  test('Verify that is not possible to Login with correct username and incorrect password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // Perform authentication steps. Sign in valid user account.
    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield('incorrectPassword');
    await loginPage.clickLoginButton();
    
    await expect(page.getByText(WrongUsernameOrPasswordMessage)).toBeVisible();

    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('https://www.saucedemo.com/'); 
   
  });

  test('Verify that is not posible to Login whith incorrect username and correct passworrd', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // Perform authentication steps. Sign in valid user account.
    await loginPage.goto();
    await loginPage.fillUsernameField("incorrectUsername");
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    //Check correspond error message apear
    await expect(page.getByText(WrongUsernameOrPasswordMessage)).toBeVisible();
    
    //Check the color of error field
    await expect(page.locator('.error-message-container.error')).toHaveCSS('background-color','rgb(226, 35, 26)');

    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });


  test('Verify that "X" button on the error message field close the error message.', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // Perform authentication steps. Sign in valid user account.
    await loginPage.goto();
    await loginPage.fillUsernameField("incorrectUsername");
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    //Check correspond error message apear
    await expect(page.getByText(WrongUsernameOrPasswordMessage)).toBeVisible();
    
    //Click on the X button on the error field
    await page.locator('[data-test="error-button"]').click();

    //Check that error message fiels disappear
    await expect(page.locator('[data-test="error"]')).not.toBeVisible();

    // Check that with correct password and username the bage is opening
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test('Verify that the Password field displays the password with asterisks', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(page.locator('#password')).toHaveAttribute('type', 'password');
  });

}
test('Verify that username text box is not alowing exceeding maximum length', async ({page}) => {

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.fillUsernameField(USERNAME);
  await page.locator("#user-name").getAttribute('value').then((value) => {
    if(value.length > 20){
        test.fail();
    }
  });

});




