import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
}

const LT_USERNAME = requireEnv('LT_USERNAME');
const LT_ACCESS_KEY = requireEnv('LT_ACCESS_KEY');

function getCapability(opts: {
  platform: string;
  browserName: string;
  browserVersion?: string;
  name: string;
}) {
  return {
    browserName: opts.browserName,
    browserVersion: opts.browserVersion ?? 'latest',
    'LT:Options': {
      platform: opts.platform,
      build: 'Playwright LambdaTest Build',
      name: opts.name,
      user: LT_USERNAME,
      accessKey: LT_ACCESS_KEY,
      video: true,
      network: true,
      tunnel: process.env.HYPEREXECUTE === 'true' ? false : true,
      console: true,
    },
  };
}

const lambdaTestCombos = [
  {
    projectName: 'lambdatest-win10-chrome',
    platform: 'Windows 10',
    browserName: 'pw-chromium',
    browserVersion: 'latest',
  },
  {
    projectName: 'lambdatest-macos-ventura-firefox',
    platform: 'MacOS Ventura',
    browserName: 'pw-firefox',
    browserVersion: 'latest',
  },
];


export default defineConfig({
  globalSetup: require.resolve('./utils/setup.utils'),
  globalTeardown: require.resolve('./utils/teardown.utils'),
  outputDir: './test-results',
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? lambdaTestCombos.length : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: process.env.HYPEREXECUTE === 'true'
    ? [
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'] },
        },
        {
          name: 'firefox',
          use: { ...devices['Desktop Firefox'] },
        },
      ]
    : [
        ...lambdaTestCombos.map((combo) => ({
          name: combo.projectName,
          use: {
            connectOptions: {
              wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
                JSON.stringify(
                  getCapability({
                    platform: combo.platform,
                    browserName: combo.browserName,
                    browserVersion: combo.browserVersion,
                    name: `Playwright Test - ${combo.projectName}`,
                  })
                )
              )}`,
            },
          },
        })),
      ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});