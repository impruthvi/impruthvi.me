import { expect, test as base } from '@playwright/test'

type DiagnosticsFixtures = {
  diagnostics: void
}

export const test = base.extend<DiagnosticsFixtures>({
  diagnostics: [
    async ({ page }, use, testInfo) => {
      const consoleMessages: string[] = []

      page.on('console', (message) => {
        consoleMessages.push(`[console.${message.type()}] ${message.text()}`)
      })
      page.on('pageerror', (error) => {
        consoleMessages.push(`[pageerror] ${error.stack ?? error.message}`)
      })

      await use()

      if (testInfo.status !== testInfo.expectedStatus) {
        const html = await page
          .content()
          .catch((error: unknown) => `Unable to capture DOM: ${String(error)}`)

        await testInfo.attach('page-dom', {
          body: Buffer.from(html),
          contentType: 'text/html',
        })
        await testInfo.attach('browser-console', {
          body: Buffer.from(consoleMessages.join('\n') || 'No console messages.'),
          contentType: 'text/plain',
        })
      }
    },
    { auto: true },
  ],
})

export { expect }
