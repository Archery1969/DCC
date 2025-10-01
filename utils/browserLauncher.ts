import { chromium, firefox, Browser, BrowserContext, Page, webkit } from '@playwright/test';
import { PageManager } from './pageFactory.js';
import { loadConfig } from './configLoader.js';
import playwrightConfig from '../playwright.config.js';

export type BrowserType = 'chromium' | 'edge' | 'firefox' | 'safari';

export class BrowserLauncher {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;
  private pages: PageManager | null = null;
  private config: Record<string, any> | null = null;

  async initialize(
    environment: string = 'prod',
    browserType: BrowserType = 'chromium'
  ): Promise<{
    browser: Browser;
    context: BrowserContext;
    page: Page;
    pages: PageManager;
    config: Record<string, any>;
  }> {
    this.config = loadConfig(environment);

    const cleanBrowserType = browserType.trim() as BrowserType;

    const projectConfig = playwrightConfig.projects?.find(p => p.name === cleanBrowserType);
    if (!projectConfig) {
      throw new Error(`Browser "${cleanBrowserType}" not found in playwright.config.ts projects`);
    }

    const launcher = this.getBrowserLauncher(cleanBrowserType);

    const projectUse = projectConfig.use || {};
    const launchOptions = {
      ...playwrightConfig.use,
      ...projectUse,
      ...(projectUse.launchOptions || {}),
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { viewport, ...cleanLaunchOptions } = launchOptions;

    this.browser = await launcher.launch(cleanLaunchOptions);

    const contextOptions = {
      ...playwrightConfig.use,
      ...projectUse,
    };

    delete (contextOptions as any).launchOptions;
    delete (contextOptions as any).channel;

    // Handle viewport: null compatibility
    if (contextOptions.viewport === null) {
      delete (contextOptions as any).deviceScaleFactor;
      delete (contextOptions as any).isMobile;
      delete (contextOptions as any).hasTouch;
    }

    this.context = await this.browser.newContext(contextOptions);
    this.page = await this.context.newPage();

    const navigationTimeout = playwrightConfig.use?.navigationTimeout!;
    await this.page.goto(this.config.storefront_website_url, {
      timeout: navigationTimeout,
    });

    this.pages = new PageManager(this.page);

    await this.pages.homePage.acceptCookies();

    return {
      browser: this.browser!,
      context: this.context!,
      page: this.page!,
      pages: this.pages!,
      config: this.config!,
    };
  }

  async cleanup(): Promise<void> {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();

    this.page = null;
    this.context = null;
    this.browser = null;
    this.pages = null;
    this.config = null;
  }

  private getBrowserLauncher(browserType: BrowserType) {
    switch (browserType) {
      case 'chromium':
        return chromium;
      case 'edge':
        return chromium; // Edge uses Chromium engine
      case 'firefox':
        return firefox;
      case 'safari':
        return webkit; // Safari uses WebKit engine
      default:
        return chromium;
    }
  }

  getBrowser(): Browser | null {
    return this.browser;
  }

  getContext(): BrowserContext | null {
    return this.context;
  }

  getPage(): Page | null {
    return this.page;
  }

  getPages(): PageManager | null {
    return this.pages;
  }

  getConfig(): Record<string, any> | null {
    return this.config;
  }
}
