import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';
const USERNAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;
setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('/');
  await page.locator('#user-name').fill(USERNAME)
  await page.locator('#password').fill(PASSWORD);
  await page.locator('#login-button').click();
  await expect(page).toHaveURL('/inventory.html');
  

  await page.context().storageState({ path: authFile });
});