import { test, expect } from '@playwright/test';
const {LoginPage} = require('../../page-objects/LoginPagePOM.js');


const USERNAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;



test('Verify that three social media webpage links, Twitter, Facebook, Linkedin, exist', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Checking that Twitter icon visible 
    await expect(page.locator('.social_twitter')).toBeVisible();

    // Checking that Facebook icon visible
    await expect(page.locator('.social_facebook')).toBeVisible();

    // Checking that Linkedin icon visible
    await expect(page.locator('.social_linkedin')).toBeVisible();
    
  });


  test('Verify that clicking on the Twitter link switches to the Sauce Labs Twitter profile', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();

    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Twitter' })).toHaveAttribute('href', "https://twitter.com/saucelabs");
  });


  test('Verify that clicking on the Facebook link switches to the Sauce Labs Facebook profile', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();


    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Facebook' })).toHaveAttribute('href', "https://www.facebook.com/saucelabs");
    //const a = process.env.USER_NAME
  });

  test('Verify that clicking on the Likedin link switches to the Sauce Labs Likedin profile', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();


    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', "https://www.linkedin.com/company/sauce-labs/");
    //const a = process.env.USER_NAME
  });


  test('Verify that the "© 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy" text exist', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();

    await expect(page.locator('.footer_copy')).toHaveText('© 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy')
  });