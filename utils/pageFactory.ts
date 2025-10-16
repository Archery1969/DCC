import { Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { AccountPage } from '../pages/AccountPage.js';

export class PageFactory {
  homePage: HomePage;
  loginPage: LoginPage;
  accountPage: AccountPage;

  constructor(page: Page) {
    this.homePage = new HomePage(page);
    this.loginPage = new LoginPage(page);
    this.accountPage = new AccountPage(page);
  }
}
