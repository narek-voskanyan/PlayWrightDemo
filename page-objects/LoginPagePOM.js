const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.username = page.locator('#user-name');
    this.password = page.locator('#password');
    this.loginButton = page.locator('#login-button');
  }

  async goto() {
    await this.page.goto('/');
  }

  async fillUsernameField(username) {
    await this.username.fill(username);
    await expect(this.username).toHaveAttribute('value', username);
  }

  async fillPasswordfield(password) {
    await this.password.fill(password);
    await expect(this.password).toHaveAttribute('value',password);
  }

  async clickLoginButton(){
    await this.loginButton.click();
  }
getUsernameLocator(){
  return this.username
}

getPasswordLocator(){
  return this.password
}
 getLoginButtonLocator(){
  return this.loginButton
 }
async checkAllItemsPageURL(){
  await expect(this.page).toHaveURL('/inventory.html');
}

async checkLoginPageOpen(){
  await expect(this.page).toHaveURL('');
}

};