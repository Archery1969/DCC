#!/usr/bin/env node

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const reportsDir = join(__dirname, 'reports');
const indexPath = join(reportsDir, 'index.html');

// Ensure reports directory exists
if (!existsSync(reportsDir)) {
  mkdirSync(reportsDir, { recursive: true });
}

const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cross-Browser Test Reports</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 10px;
        }
        .reports-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        .report-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            text-align: center;
            transition: transform 0.2s;
        }
        .report-card:hover {
            transform: translateY(-5px);
        }
        .browser-icon {
            font-size: 48px;
            margin-bottom: 15px;
        }
        .chrome { color: #4285f4; }
        .edge { color: #0078d4; }
        .firefox { color: #ff9500; }
        .safari { color: #006cff; }
        .report-link {
            display: inline-block;
            padding: 10px 20px;
            background: #28a745;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 10px;
        }
        .report-link:hover {
            background: #218838;
        }
        .timestamp {
            color: #666;
            font-size: 14px;
            margin-top: 20px;
            text-align: center;
        }
        .note {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            color: #856404;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚀 Cross-Browser Test Reports</h1>
        <p>Cucumber BDD Tests with Playwright</p>
    </div>

    <div class="note">
        <strong>Auto-Generated:</strong> This page is automatically created when test reports are generated. 
        Reports are created by running <code>npm run test:{browser}</code> or <code>npm run test:all</code>.
    </div>

    <div class="reports-grid">
        <div class="report-card">
            <div class="browser-icon chrome">🟦</div>
            <h3>Chrome</h3>
            <p>Chromium-based browser</p>
            <a href="report-chromium .html" class="report-link" target="_blank">View Report</a>
        </div>

        <div class="report-card">
            <div class="browser-icon edge">🔷</div>
            <h3>Microsoft Edge</h3>
            <p>Chromium-based browser</p>
            <a href="report-edge .html" class="report-link" target="_blank">View Report</a>
        </div>

        <div class="report-card">
            <div class="browser-icon firefox">🦊</div>
            <h3>Firefox</h3>
            <p>Gecko-based browser</p>
            <a href="report-firefox .html" class="report-link" target="_blank">View Report</a>
        </div>

        <div class="report-card">
            <div class="browser-icon safari">🌐</div>
            <h3>Safari (WebKit)</h3>
            <p>WebKit-based browser</p>
            <a href="report-webkit .html" class="report-link" target="_blank">View Report</a>
        </div>
    </div>

    <div class="timestamp">
        <p>Reports generated: <span id="timestamp"></span></p>
    </div>

    <script>
        document.getElementById('timestamp').textContent = new Date().toLocaleString();
    </script>
</body>
</html>`;

writeFileSync(indexPath, indexHtml);
// eslint-disable-next-line no-console
console.log('✅ Generated reports/index.html');
