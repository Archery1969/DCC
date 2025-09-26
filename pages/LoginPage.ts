import { Page, expect } from '@playwright/test';
import { LoginPageLocators } from '../locators/LoginPageLocators.js';
import { customClick, customFill } from '../utils/helper.js';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyLoginPage() {
    await expect(this.page).toHaveTitle(LoginPageLocators.expectedTitle);
  }

  async login(username: string, password: string) {
    await customFill(LoginPageLocators.usernameInput(this.page), username, 'Username field');
    await customFill(LoginPageLocators.passwordInput(this.page), password, 'Password field');
    await customClick(LoginPageLocators.loginButton(this.page), 'Login button');
  }
}
