import { Given, When, Then } from '@cucumber/cucumber';
import { testContext } from '../support/testContext.js';

Given('I am on the home page', async function () {
  await testContext.pages!.homePage.verifyHomePage();
});

When('I navigate to the login page', async function () {
  await testContext.pages!.homePage.navigateToLogin();
  await testContext.pages!.loginPage.verifyLoginPage();
});

When('I enter valid credentials', async function () {
  await testContext.pages!.loginPage.login(
    testContext.config!.storefront_username,
    testContext.config!.storefront_password
  );
});

Then('I should be logged in successfully', async function () {
  await testContext.pages!.accountPage.verifyAccountPage();
});
