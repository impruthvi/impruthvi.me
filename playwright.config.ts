import { defineConfig } from '@playwright/test'

const port = 3100
const baseURL = `http://127.0.0.1:${port}`

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
  ],
  outputDir: 'test-results',
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 100,
    },
  },
  use: {
    baseURL,
    colorScheme: 'dark',
    contextOptions: {
      reducedMotion: 'reduce',
    },
    locale: 'en-US',
    serviceWorkers: 'block',
    timezoneId: 'UTC',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'mobile-chromium',
      use: { viewport: { width: 390, height: 844 } },
    },
    {
      name: 'desktop-chromium',
      use: { viewport: { width: 1440, height: 900 } },
    },
  ],
  webServer: {
    command: `bun run build && bun run start -- --hostname 127.0.0.1 --port ${port}`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
})
