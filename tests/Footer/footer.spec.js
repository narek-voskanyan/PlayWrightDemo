import { test, expect } from '@playwright/test';
const {LoginPage} = require('../../page-objects/LoginPagePOM.js');
const{Footer} = require('../../page-objects/FooterPOM.js')

const USERNAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;



test('Verify that three social media webpage links, Twitter, Facebook, Linkedin, exist', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);
    const footer = new Footer(page);
    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();
    
    // Checking that Twitter icon visible 
    await expect(footer.twitter).toBeVisible();

    // Checking that Facebook icon visible
    await expect(footer.facebook).toBeVisible();

    // Checking that Linkedin icon visible
    await expect(footer.linkedin).toBeVisible();
    
  });


  test('Verify that clicking on the Twitter link switches to the Sauce Labs Twitter profile', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);
    const footer = new Footer(page);
    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();

    //Check that All items page open
    await loginPage.checkAllItemsPageURL();

    const [newPage] = await Promise.all([
      page.waitForEvent('popup'),
      footer.twitter.click()
    ])

    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL('https://twitter.com/saucelabs');
   
  });


  test('Verify that clicking on the Facebook link switches to the Sauce Labs Facebook profile', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);
    const footer = new Footer(page);
    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();

    //Check that All items page open
    await loginPage.checkAllItemsPageURL();

    const [newPage] = await Promise.all([
      page.waitForEvent('popup'),
      footer.facebook.click()
    ])

    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL('https://www.facebook.com/saucelabs');
   
  });
    
    

  test('Verify that clicking on the Likedin link switches to the Sauce Labs Likedin profile', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);
    const footer = new Footer(page);
    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();


    //Check that All items page open
    await loginPage.checkAllItemsPageURL();

    const [newPage] = await Promise.all([
      page.waitForEvent('popup'),
      footer.linkedin.click()
    ])

    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL('https://www.linkedin.com/company/sauce-labs/');

   
  });


  test('Verify that the "© 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy" text exist', async ({ page }) => {
    
    // Perform authentication steps. Sign in valid user account.
    const loginPage = new LoginPage(page);
    const footer = new Footer(page);
    await loginPage.goto();
    await loginPage.fillUsernameField(USERNAME);
    await loginPage.fillPasswordfield(PASSWORD);
    await loginPage.clickLoginButton();

    await expect(footer.footerText).toHaveText(footer.footerDescription);
  });