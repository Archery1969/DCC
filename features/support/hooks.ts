import { Before, After } from '@cucumber/cucumber';
import { testContext } from './testContext.js';

Before(async function () {
  const environment = process.env.CI ? 'ci' : 'prod';
  await testContext.initializeBrowser(environment);
});

After(async function () {
  if (testContext && testContext.browserLauncher) {
    await testContext.cleanup();
  }
});
