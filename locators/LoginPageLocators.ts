import { Page, Locator } from '@playwright/test';

export const LoginPageLocators = {
  expectedTitle: /Login/,
  usernameInput: (page: Page): Locator => page.locator('input[name="j_username"]'),
  passwordInput: (page: Page): Locator => page.locator('input[name="j_password"]'),
  loginButton: (page: Page): Locator => page.getByRole('button', { name: 'SIGN IN' }),
};
