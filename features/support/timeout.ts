import { setDefaultTimeout } from '@cucumber/cucumber';
import playwrightConfig from '../../playwright.config.js';

const configTimeout = playwrightConfig.use?.navigationTimeout || 30000;
const stepTimeout = Math.max(configTimeout, 30000);

setDefaultTimeout(stepTimeout);
