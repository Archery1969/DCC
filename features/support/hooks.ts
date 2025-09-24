import { Before, After } from '@cucumber/cucumber';
import { testContext } from './testContext.js';

Before(async function () {
  await testContext.initializeBrowser('prod');
});

After(async function () {
  if (testContext && testContext.browserLauncher) {
    await testContext.cleanup();
  }
});
