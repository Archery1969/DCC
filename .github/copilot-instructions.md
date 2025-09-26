# Copilot Instructions for LGC Maine Standards

## Project Architecture

This is a **Playwright + Cucumber BDD** test automation framework using TypeScript and ES modules. The architecture follows a **Page Object Model** with clean separation of concerns:

- **Features/Steps**: Cucumber `.feature` files with TypeScript step definitions
- **Page Objects**: Located in `pages/` with corresponding locators in `locators/`
- **Test Context**: Singleton pattern via `testContext` manages browser lifecycle and shared state
- **Configuration**: YAML-based environment configs in `config/` with env variable substitution

## Key Patterns

### Test Context Pattern
All browser instances, page objects, and config are managed through the global `testContext` singleton:
```typescript
await testContext.pages!.homePage.verifyHomePage();
await testContext.config!.storefront_username;
```

### Locator Pattern
Locators are functions returning Playwright `Locator` objects, not static selectors:
```typescript
usernameInput: (page: Page): Locator => page.locator('input[name="j_username"]')
```

### Custom Helper Functions
Use `customClick()` and `customFill()` instead of native Playwright methods - they include built-in waits and error handling with descriptive messages.

## Browser & Environment Management

- **Multi-browser**: Tests run on Chrome, Edge, Firefox via `BROWSER` env var
- **Environment switching**: Use `environment` parameter ('prod', 'ci') to load different YAML configs
- **Configuration**: YAML files support env variable substitution using `${VAR_NAME:-default}` syntax

## Essential Commands

```bash
npm run test:chrome
npm run test:all

npm run lint:fix
npm run format
npm run ci

npm run test:watch
```

## File Organization Rules

- **Step definitions**: `features/step_definitions/*.ts` - use async/await pattern
- **Page objects**: `pages/*.ts` - constructor takes `Page`, methods use custom helpers
- **Locators**: `locators/*Locators.ts` - export const object with function-based locators
- **Support files**: `features/support/` - hooks and shared utilities
- **Config**: `config/*.yml` - environment-specific settings with credential management

## Critical Integration Points

- **Hooks**: `Before/After` hooks in `hooks.ts` manage browser lifecycle per scenario
- **Module system**: ES modules with `.js` imports (even for `.ts` files)
- **Cucumber config**: `cucumber.cjs` (CommonJS) loads TypeScript with ts-node/esm
- **Reports**: HTML reports generated per browser in `reports/report-{browser}.html`

## TypeScript Configuration

- Two tsconfigs: `tsconfig.json` (standard) and `tsconfig.cucumber.json` (for Cucumber)
- ES modules with top-level await support
- Strict type checking enabled with Playwright types

## Testing Strategy

Focus on **page verification methods** (e.g., `verifyLoginPage()`) and **action methods** (e.g., `login()`). Each page class should handle its own assertions using Playwright's `expect()` API.