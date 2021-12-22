// playwright.config.js
// @ts-check
const { devices } = require('@playwright/test');

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	use: {
		trace: 'on-first-retry',
		// headless: true,
		// viewport: { width: 1280, height: 720 },
		ignoreHTTPSErrors: true,
		// screenshot: 'only-on-failure',
	},
	projects: [
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
		{
			name: 'Chrome Stable',
			use: {
			browserName: 'chromium',
			channel: 'chrome',
			},
		},
		{
			name: 'Microsoft Edge',
			use: {
			// Supported Microsoft Edge channels are: msedge, msedge-beta, msedge-dev, msedge-canary
			channel: 'msedge',
			},
		},
		{
		name: 'webkit',
		use: { ...devices['Desktop Safari'] },
		},
	],
};

module.exports = config;