import * as yaml from 'js-yaml';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadConfig(environment: string = 'prod'): Record<string, any> {
  try {
    const configPath = path.join(__dirname, '..', 'config', `${environment}.yml`);
    const configFile = fs.readFileSync(configPath, 'utf8');

    // Replace environment variables in config file
    const expandedConfig = configFile.replace(/\$\{([^}]+)\}/g, (match, envVar) => {
      const [varName, defaultValue] = envVar.split(':-');
      return process.env[varName] || defaultValue || match;
    });

    const config = yaml.load(expandedConfig) as Record<string, any>;
    return config;
  } catch (error) {
    throw new Error(
      `Failed to load configuration: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
