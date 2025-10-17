import { Locator, Page } from '@playwright/test';
import { GLOBAL_TIMEOUT } from '../playwright.config.js';

export function isMobile(page: Page): boolean {
  return (page.viewportSize()?.width ?? 1920) < 768;
}

export async function customClick(
  locator: Locator,
  description?: string,
  options?: {
    timeout?: number;
    force?: boolean;
  }
): Promise<void> {
  const elementDesc = description || 'element';
  try {
    await locator.waitFor({ state: 'visible', timeout: options?.timeout || GLOBAL_TIMEOUT });
    await locator.waitFor({ state: 'attached', timeout: options?.timeout || GLOBAL_TIMEOUT });
    await locator.scrollIntoViewIfNeeded();
    await locator.click({
      timeout: options?.timeout || GLOBAL_TIMEOUT,
      force: options?.force || false,
    });
  } catch (error) {
    throw new Error(`Failed to click ${elementDesc}: ${error}`);
  }
}

export async function customFill(
  locator: Locator,
  value: string,
  description?: string,
  options?: {
    timeout?: number;
    force?: boolean;
    clearFirst?: boolean;
  }
): Promise<void> {
  const elementDesc = description || 'input field';
  try {
    await locator.waitFor({ state: 'visible', timeout: options?.timeout || GLOBAL_TIMEOUT });
    await locator.waitFor({ state: 'attached', timeout: options?.timeout || GLOBAL_TIMEOUT });
    await locator.scrollIntoViewIfNeeded();
    if (options?.clearFirst !== false) {
      await locator.clear({ timeout: options?.timeout || GLOBAL_TIMEOUT });
    }
    await locator.fill(value, {
      timeout: options?.timeout || GLOBAL_TIMEOUT,
      force: options?.force || false,
    });
  } catch (error) {
    throw new Error(`Failed to fill ${elementDesc} with value "${value}": ${error}`);
  }
}
