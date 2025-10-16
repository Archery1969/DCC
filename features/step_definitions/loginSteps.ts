import { createBdd, test } from 'playwright-bdd';
import { PageFactory } from '../../utils/pageFactory.js';
import { loadConfig } from '../../utils/configLoader.js';

const { Given, When, Then } = createBdd(test);

const config = loadConfig(process.env.CI ? 'ci' : 'prod');

Given('I am on the home page', async ({ page }) => {
  await page.goto(config.storefront_website_url);
  const pages = new PageFactory(page);
  await pages.homePage.acceptCookies();
  await pages.homePage.verifyHomePage();
});

When('I navigate to the login page', async ({ page }) => {
  const pages = new PageFactory(page);
  await pages.homePage.navigateToLogin();
  await pages.loginPage.verifyLoginPage();
});

When('I enter valid credentials', async ({ page }) => {
  const pages = new PageFactory(page);
  await pages.loginPage.login(config.storefront_username, config.storefront_password);
});

Then('I should be logged in successfully', async ({ page }) => {
  const pages = new PageFactory(page);
  await pages.accountPage.verifyAccountPage();
});
