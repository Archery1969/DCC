import { BrowserLauncher, BrowserType } from '../../utils/browserLauncher.js';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { PageManager } from '../../utils/pageFactory.js';

export class TestContext {
  public browserLauncher: BrowserLauncher;
  public browser?: Browser;
  public context?: BrowserContext;
  public page?: Page;
  public pages?: PageManager;
  public config?: Record<string, any>;

  constructor() {
    this.browserLauncher = new BrowserLauncher();
  }

  async initializeBrowser(environment: string = 'prod', browserType: BrowserType = 'chromium') {
    const envBrowser = process.env.BROWSER as BrowserType;
    const selectedBrowser = envBrowser || browserType;

    const instances = await this.browserLauncher.initialize(environment, selectedBrowser);
    this.browser = instances.browser;
    this.context = instances.context;
    this.page = instances.page;
    this.pages = instances.pages;
    this.config = instances.config;
  }

  async cleanup() {
    await this.browserLauncher.cleanup();
  }
}

export const testContext = new TestContext();
