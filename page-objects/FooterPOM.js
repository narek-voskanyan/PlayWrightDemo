const { expect } = require('@playwright/test');

exports.Footer = class Footer{
    constructor(page){
        this.twitter = page.locator('.social_twitter');
        this.facebook = page.locator('.social_facebook');
        this.linkedin = page.locator('.social_linkedin');
        this.footerText = page.locator('.footer_copy');
        this.footerDescription = '© 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy';
    }
}