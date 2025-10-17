import { Page, Locator } from '@playwright/test';

export const HomePageLocators = {
  expectedTitle: /Dreams | Beds from the UK's Leading Bed & Mattress Store/,

  cookieAcceptButton: (page: Page): Locator =>
    page.getByRole('button', { name: 'Accept All Cookies' }),

  signinButton: (page: Page): Locator => page.getByRole('link', { name: 'Sign in' }),

  mobileMenuButton: (page: Page): Locator => page.locator('#mobile-nav-open-trigger'),
};
