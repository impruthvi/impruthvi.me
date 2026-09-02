import type { Page } from '@playwright/test'
import { expect, test } from './fixtures'
import { coreRoutes } from './routes'

async function waitForStablePage(page: Page) {
  await page.locator('main').waitFor()
  await page.evaluate(async () => {
    await document.fonts.ready
    await Promise.all(
      Array.from(document.images, (image) => {
        if (image.complete) return Promise.resolve()
        return new Promise<void>((resolve) => {
          image.addEventListener('load', () => resolve(), { once: true })
          image.addEventListener('error', () => resolve(), { once: true })
        })
      })
    )
  })
}

test('the homepage presents its primary heading', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('main h1')).toBeVisible()
})

for (const route of coreRoutes) {
  test(`${route.name} matches its baseline without horizontal overflow`, async ({
    page,
  }) => {
    const response = await page.goto(route.path)
    expect(response?.ok()).toBeTruthy()
    await waitForStablePage(page)

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth
    )
    expect(overflow).toBeLessThanOrEqual(0)
    await expect(page).toHaveScreenshot(`${route.name}.png`, {
      animations: 'disabled',
      caret: 'hide',
      fullPage: true,
    })
  })
}

test('the primary navigation reaches every public destination', async ({
  page,
}, testInfo) => {
  for (const destination of coreRoutes) {
    if (!destination.navigationLabel) continue

    await page.goto('/')

    if (testInfo.project.name === 'mobile-chromium') {
      await page.getByRole('button', { name: 'Open menu' }).click()
      await expect(page.getByRole('dialog', { name: 'Navigation' })).toBeVisible()
    }

    const navigation = page.getByRole('navigation', {
      name: 'Main navigation',
    })
    await navigation
      .getByRole('link', { name: destination.navigationLabel, exact: true })
      .click()

    await expect(page).toHaveURL((url) => url.pathname === destination.path)
    await expect(page.locator('main')).toBeVisible()
  }
})
