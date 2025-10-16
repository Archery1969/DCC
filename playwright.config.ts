import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

export const GLOBAL_TIMEOUT = 30000;

const testDir = defineBddConfig({
  paths: ['features/*.feature'],
  steps: 'features/step_definitions/loginSteps.ts',
});

export default defineConfig({
  testDir,
  fullyParallel: false,
  workers: 1,
  reporter: 'html',
  timeout: GLOBAL_TIMEOUT,

  use: {
    headless: process.env.CI ? true : false,
    actionTimeout: GLOBAL_TIMEOUT,
    navigationTimeout: GLOBAL_TIMEOUT,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    locale: 'en-GB',
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
  ],
});
