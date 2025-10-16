# Copilot Instructions for DCC Test Automation

## Project Architecture

This is a **pure Playwright-BDD** test automation framework using TypeScript and ES modules. The architecture follows a **Page Object Model** with clean separation of concerns:

- **Features/Steps**: Cucumber `.feature` files with `playwright-bdd` step definitions
- **Page Objects**: Located in `pages/` with corresponding locators in `locators/`
- **Native Playwright**: Pure Playwright Test with native browser management and HTML reporting
- **Configuration**: YAML-based environment configs in `config/` with env variable substitution

## Key Patterns

### Page Factory Pattern
Page objects are instantiated using the PageFactory pattern with Playwright's native page fixture:
```typescript
const pages = new PageFactory(page);
await pages.homePage.verifyHomePage();
await pages.loginPage.login(config.username, config.password);
```

### Locator Pattern
Locators are functions returning Playwright `Locator` objects, not static selectors:
```typescript
usernameInput: (page: Page): Locator => page.locator('input[name="j_username"]')
```

### Custom Helper Functions
Use `customClick()` and `customFill()` instead of native Playwright methods - they include built-in waits and error handling with descriptive messages.

## Browser & Environment Management

- **Multi-browser**: Tests run on Chrome, Edge, Firefox via Playwright projects in `playwright.config.ts`
- **Environment switching**: Use `environment` parameter ('prod', 'ci') to load different YAML configs
- **Configuration**: YAML files support env variable substitution using `${VAR_NAME:-default}` syntax

## Essential Commands

```bash
npm run test:chrome
npm run test:edge
npm run test:firefox
npm run test:all

npm run test:report
npm run lint:fix
npm run format
npm run ci
```

## File Organization Rules

- **Step definitions**: `features/step_definitions/*.ts` - use async/await pattern with playwright-bdd
- **Page objects**: `pages/*.ts` - constructor takes `Page`, methods use custom helpers
- **Locators**: `locators/*Locators.ts` - export const object with function-based locators
- **Config**: `config/*.yml` - environment-specific settings with credential management

## Critical Integration Points

- **playwright-bdd**: Bridges Cucumber syntax with Playwright Test framework
- **Module system**: ES modules with `.js` imports (even for `.ts` files)
- **Configuration**: `playwright.config.ts` with `defineBddConfig` for BDD integration
- **Reports**: Native Playwright HTML reports in `playwright-report/index.html`

## TypeScript Configuration

- Single `tsconfig.json` for pure Playwright-BDD setup
- ES modules with top-level await support
- Strict type checking enabled with Playwright types

## Testing Strategy

Focus on **page verification methods** (e.g., `verifyLoginPage()`) and **action methods** (e.g., `login()`). Each page class should handle its own assertions using Playwright's `expect()` API.