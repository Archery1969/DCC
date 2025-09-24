import { Page, expect } from '@playwright/test';
import { AccountPageLocators } from '../locators/AccountPageLocators.js';

export class AccountPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyAccountPage() {
    await expect(this.page).toHaveTitle(AccountPageLocators.expectedTitle);
  }
}
