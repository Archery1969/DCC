# DCC Test Automation

**pure Playwright-BDD** test automation framework using TypeScript and ES modules. This framework follows a **Page Object Model** with clean separation of concerns for automated testing of web applications.

## 🏗️ Architecture

- **Features/Steps**: Cucumber `.feature` files with `playwright-bdd` step definitions
- **Page Objects**: Located in `pages/` with corresponding locators in `locators/`
- **Native Playwright**: Pure Playwright Test with native browser management and HTML reporting
- **Configuration**: YAML-based environment configs in `config/` with env variable substitution

## 📋 Prerequisites

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd DCC
```

### 2. Install Dependencies
```bash
npm install
```

This command will install all required dependencies including:
- Playwright Test framework
- playwright-bdd for Cucumber integration
- TypeScript and related tooling
- ESLint and Prettier for code quality

### 3. Install Playwright Browsers
```bash
npx playwright install
```

## 🎯 Running Tests

### Single Browser Tests
```bash
# Chrome/Chromium
npm run test:chrome

# Microsoft Edge
npm run test:edge

# Firefox
npm run test:firefox
```

### Multi-Browser Tests
```bash
# Run on all browsers
npm run test:all
```

### View Test Reports
```bash
# Open HTML test report
npm run test:report
```

## 🛠️ Development Commands

### Code Quality
```bash
# Format code with Prettier
npm run format

# Check code formatting
npm run format:check

# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint:fix
```

### CI Pipeline
```bash
# Run full CI pipeline (lint + format check + tests)
npm run ci
```

## 📁 Project Structure

```
DCC/
├── config/                 # Environment configurations
│   └── prod.yml           # Production config
├── features/              # Cucumber feature files
│   ├── login.feature      # Feature definitions
│   └── step_definitions/  # Step implementations
│       └── loginSteps.ts
├── locators/              # Page element locators
│   ├── HomePageLocators.ts
│   ├── LoginPageLocators.ts
│   └── AccountPageLocators.ts
├── pages/                 # Page Object Model classes
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   └── AccountPage.ts
├── utils/                 # Helper utilities
│   ├── configLoader.ts    # Configuration management
│   ├── helper.ts          # Custom Playwright helpers
│   └── pageFactory.ts     # Page object factory
├── playwright.config.ts   # Playwright configuration
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## 🔧 Configuration

### Environment Variables
The framework supports environment-specific configurations using YAML files in the `config/` directory. Variables can be substituted using the format `${VAR_NAME:-default_value}`.

### Browser Configuration
Tests are configured to run on multiple browsers via Playwright projects. See `playwright.config.ts` for detailed configuration.

## 🎨 Key Patterns

### Page Factory Pattern
```typescript
const pages = new PageFactory(page);
await pages.homePage.verifyHomePage();
await pages.loginPage.login(config.username, config.password);
```

### Custom Helper Functions
The framework includes custom helper functions with built-in waits and error handling:
- `customClick()` - Enhanced click with wait conditions
- `customFill()` - Enhanced fill with wait conditions

### Locator Pattern
Locators are functions returning Playwright `Locator` objects:
```typescript
usernameInput: (page: Page): Locator => page.locator('input[name="j_username"]')
```

## 📊 Reports

Test results are generated as HTML reports using Playwright's native reporting. Reports include:
- Test execution details
- Screenshots on failure
- Video recordings on failure
- Execution traces for debugging

## 🤝 Contributing

1. Follow the existing code patterns and conventions
2. Run `npm run lint:fix` and `npm run format` before committing
3. Ensure all tests pass with `npm run ci`
4. Use meaningful commit messages

## 📝 Notes

- This framework uses ES modules with `.js` imports (even for `.ts` files)
- Tests run with native Playwright Test framework enhanced with BDD capabilities
- Configuration supports multiple environments and credential management
- Reports are generated in `playwright-report/index.html`