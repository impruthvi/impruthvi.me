import { expect, test } from './fixtures'
import { coreRoutes } from './routes'

test('the shared shell uses the canonical content lane and typography', async ({
  page,
}, testInfo) => {
  await page.goto('/privacy')
  await page.evaluate(() => document.fonts.ready)

  const wordmark = page
    .getByRole('banner')
    .getByRole('link', { name: /IMPRUTHVI/ })
  const wordmarkBox = await wordmark.boundingBox()
  const contentBox = await page.locator('main > section').boundingBox()
  const expectedGutter =
    testInfo.project.name === 'mobile-chromium' ? 24 : 130
  const expectedWidth =
    testInfo.project.name === 'mobile-chromium' ? 342 : 1180

  expect(wordmarkBox?.x).toBe(expectedGutter)
  expect(contentBox?.x).toBe(expectedGutter)
  expect(contentBox?.width).toBe(expectedWidth)

  const typography = await page.evaluate(() => ({
    body: getComputedStyle(document.body).fontFamily,
    heading: getComputedStyle(document.querySelector('main h1')!).fontFamily,
    wordmark: getComputedStyle(
      document.querySelector('header a[href="/"]')!
    ).fontFamily,
  }))

  expect(typography.body).toContain('Inter')
  expect(typography.heading).toContain('Space Grotesk')
  expect(typography.wordmark).toContain('JetBrains Mono')
})

test('the responsive shell exposes the approved navigation and footer', async ({
  page,
}, testInfo) => {
  await page.goto('/privacy')

  const header = page.getByRole('banner')
  const footer = page.getByRole('contentinfo')
  const isMobile = testInfo.project.name === 'mobile-chromium'

  await expect(header).toHaveCSS('height', isMobile ? '79px' : '88px')

  if (isMobile) {
    const menuButton = page.getByRole('button', { name: 'Open menu' })
    await expect(menuButton).toHaveCSS('width', '44px')
    await expect(menuButton).toHaveCSS('height', '44px')

    await menuButton.click()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByRole('dialog', { name: 'Navigation' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Close menu' })).toBeFocused()
    await expect(page.getByRole('button', { name: 'Close menu' })).toHaveCSS(
      'height',
      '44px'
    )
    await expect(page.getByRole('button', { name: 'Toggle theme' })).toHaveCSS(
      'height',
      '44px'
    )
    await expect(page.getByRole('dialog', { name: 'Navigation' })).toHaveCSS(
      'overflow-y',
      'auto'
    )

    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog', { name: 'Navigation' })).toBeHidden()
    await expect(menuButton).toBeFocused()
  } else {
    await expect(
      header.getByRole('navigation', { name: 'Main navigation' })
    ).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'Open menu' })
    ).toBeHidden()
  }

  for (const label of ['GitHub', 'LinkedIn', 'X', 'impruthvi.me']) {
    await expect(footer.getByRole('link', { name: label, exact: true })).toBeVisible()
  }

  if (isMobile) {
    await expect(footer.getByText('IMPRUTHVI', { exact: true })).toBeVisible()
    const shortestFooterLink = footer.getByRole('link', { name: 'X', exact: true })
    const targetBox = await shortestFooterLink.boundingBox()
    expect(targetBox?.width).toBeGreaterThanOrEqual(44)
    expect(targetBox?.height).toBeGreaterThanOrEqual(44)
  }
})

test('the shell exposes deliberate dark and light semantic colors', async ({
  page,
}, testInfo) => {
  await page.goto('/privacy')

  const readShellColors = () =>
    page.evaluate(() => ({
      background: getComputedStyle(document.body).backgroundColor,
      border: getComputedStyle(document.querySelector('header')!)
        .borderBottomColor,
      foreground: getComputedStyle(document.body).color,
    }))

  await expect.poll(readShellColors).toEqual({
    background: 'rgb(9, 9, 11)',
    border: 'rgb(45, 45, 48)',
    foreground: 'rgb(250, 250, 250)',
  })
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto')

  if (testInfo.project.name === 'mobile-chromium') {
    await page.getByRole('button', { name: 'Open menu' }).click()
  }
  for (const icon of await page
    .getByRole('button', { name: 'Toggle theme' })
    .locator('svg')
    .all()) {
    await expect(icon).toHaveCSS('transition-property', 'none')
  }
  await expect(
    page.getByRole('button', { name: 'Toggle theme' }).locator('svg:visible')
  ).toHaveCSS('transform', 'none')
  await page.getByRole('button', { name: 'Toggle theme' }).click()

  await expect.poll(readShellColors).toEqual({
    background: 'rgb(255, 255, 255)',
    border: 'rgb(212, 212, 216)',
    foreground: 'rgb(24, 24, 27)',
  })
})

test('shared form controls use the canonical field and action language', async ({
  page,
}, testInfo) => {
  await page.goto('/contact')

  const name = page.getByRole('textbox', { name: /Name/ })
  const message = page.getByRole('textbox', { name: /Message/ })
  const submit = page.getByRole('button', { name: 'Send Message' })

  await expect(name).toHaveCSS('height', '50px')
  await expect(name).toHaveCSS('border-radius', '6px')
  await expect(name).toHaveCSS('border-color', 'rgb(98, 98, 104)')
  await expect(message).toHaveCSS('height', '174px')
  await expect(message).toHaveCSS('border-radius', '6px')
  await expect(submit).toHaveCSS('height', '48px')
  await expect(submit).toHaveCSS('background-color', 'rgb(255, 45, 32)')
  await expect(submit).toHaveCSS('color', 'rgb(9, 9, 11)')
  await submit.hover()
  await expect(submit).toHaveCSS('background-color', 'rgb(255, 75, 64)')

  if (testInfo.project.name === 'mobile-chromium') {
    await page.getByRole('button', { name: 'Open menu' }).click()
  }
  await page.getByRole('button', { name: 'Toggle theme' }).click()
  if (testInfo.project.name === 'mobile-chromium') {
    await page.keyboard.press('Escape')
  }
  await expect(submit).toHaveCSS('color', 'rgb(255, 255, 255)')
  await expect(name).toHaveCSS('border-color', 'rgb(148, 148, 154)')
  await submit.hover()
  await expect(submit).toHaveCSS('background-color', 'rgb(197, 29, 18)')

  await submit.click()
  await expect(name).toHaveAttribute('aria-describedby', 'name-error')
  await expect(page.locator('#name-error')).toHaveRole('alert')
})

test('every core page assigns display typography to its primary heading', async ({
  page,
}) => {
  for (const route of coreRoutes) {
    await page.goto(route.path)
    const heading = page.locator('main h1')
    await expect(heading).toBeVisible()
    await expect(heading).toHaveCSS('font-family', /Space Grotesk/)
  }
})

test('evidence surfaces keep sharp geometry and technical typography', async ({
  page,
}) => {
  await page.goto('/')

  const metric = page.getByText('Years Experience', { exact: true }).locator('../..')
  const value = metric.getByText('5+', { exact: true })

  await expect(metric).toHaveCSS('background-color', 'rgb(24, 24, 27)')
  await expect(metric).toHaveCSS('border-color', 'rgb(45, 45, 48)')
  await expect(metric).toHaveCSS('border-radius', '0px')
  await expect(value).toHaveCSS('font-family', /JetBrains Mono/)

  await page.goto('/case-studies/biznetworkpro')
  await expect(page.getByText(/B2B SaaS/i).first()).toHaveCSS(
    'font-family',
    /JetBrains Mono/
  )
})

test('the writing search keeps a visible accessible label', async ({ page }) => {
  await page.goto('/posts')
  await expect(page.getByLabel('Search field notes')).toBeVisible()
})

test('external case-study actions use the canonical branded control', async ({
  page,
}) => {
  await page.goto('/case-studies/biznetworkpro')

  const visitLive = page.getByRole('link', { name: /Visit Live/ })
  await expect(visitLive).toHaveCSS('height', '48px')
  await expect(visitLive).toHaveCSS('background-color', 'rgb(255, 45, 32)')
  await expect(visitLive).toHaveCSS('color', 'rgb(9, 9, 11)')
})
