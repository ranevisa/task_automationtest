import { defineConfig, devices } from '@playwright/test';

import dotenv from 'dotenv';
dotenv.config()


export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'tests',

  // Run all tests in parallel.
  fullyParallel: false,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: 'html',

  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: process.env.BASE_URL,
    extraHTTPHeaders: {
        'x-api-key': process.env.API_KEY || ''
    },

    // Collect trace when retrying the failed test.
    trace: 'retain-on-failure',
  }

});