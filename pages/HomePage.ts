import { Page, expect } from '@playwright/test';
import { HomePageLocators } from '../locators/HomePageLocators.js';
import { customClick } from '../utils/helper.js';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyHomePage() {
    await expect(this.page).toHaveTitle(HomePageLocators.expectedTitle);
  }

  async acceptCookies() {
    await customClick(HomePageLocators.cookieAcceptButton(this.page), 'Accept Cookies button');
  }

  async navigateToLogin() {
    await customClick(HomePageLocators.signinButton(this.page), 'Sign in button');
  }

}
