import { expect, test } from './fixtures'

test('the homepage tells the approved evidence-led story', async ({ page }, testInfo) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /backend systems that stay fast as products grow/i,
    })
  ).toBeVisible()

  await expect(page.getByRole('link', { name: /view (my|selected) work/i })).toHaveAttribute(
    'href',
    '/case-studies'
  )
  await expect(page.getByRole('link', { name: /contact|start a conversation/i }).first()).toHaveAttribute(
    'href',
    '/contact'
  )

  const sectionHeadings = await page.getByRole('heading', { level: 2 }).allInnerTexts()
  expect(sectionHeadings).toEqual(
    testInfo.project.name === 'mobile-chromium'
      ? [
          'Proof from production.',
          'Contributions that shipped.',
          'Built across product stages.',
          'Writing from the work.',
          'Have a backend problem worth untangling?',
        ]
      : [
          'Selected systems',
          'Shipped in the open',
          'Experience, compressed',
          'Field notes',
          'Have a difficult Laravel problem?',
        ]
  )

  const selectedWork = page.locator('section').filter({
    has: page.getByRole('heading', {
      level: 2,
      name: /Selected systems|Proof from production/,
    }),
  })
  await expect(selectedWork.locator('a[href="/case-studies/brandarc"]').first()).toHaveAttribute(
    'href',
    '/case-studies/brandarc'
  )
  await expect(selectedWork.locator('a[href="/case-studies/everflex-plus"]').first()).toHaveAttribute(
    'href',
    '/case-studies/everflex-plus'
  )
  await expect(selectedWork.getByText('800ms', { exact: true })).toBeVisible()
  await expect(selectedWork.getByText('440ms', { exact: true })).toBeVisible()

  const openSource = page.locator('section').filter({
    has: page.getByRole('heading', {
      level: 2,
      name: /Shipped in the open|Contributions that shipped/,
    }),
  })
  await expect(openSource.getByRole('link', { name: /(?:pull request|PR) #46/i }).first()).toHaveAttribute(
    'href',
    'https://github.com/laravel/react-starter-kit/pull/46'
  )
  await expect(
    openSource.getByText('Merged by Taylor Otwell', { exact: true })
  ).toBeVisible()

  const writing = page.locator('section').filter({
    has: page.getByRole('heading', {
      level: 2,
      name: /Field notes|Writing from the work/,
    }),
  })
  await expect(writing.getByRole('link', { name: /browse all writing|all notes/i })).toHaveAttribute(
    'href',
    '/posts'
  )
})

test('the homepage remains deliberate in the supported light theme', async ({
  page,
}, testInfo) => {
  await page.goto('/')

  if (testInfo.project.name === 'mobile-chromium') {
    await page.getByRole('button', { name: 'Open menu' }).click()
  }
  await page.getByRole('button', { name: 'Toggle theme' }).click()
  if (testInfo.project.name === 'mobile-chromium') {
    await page.keyboard.press('Escape')
  }

  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(255, 255, 255)')
  await expect(page.getByRole('heading', { level: 1 })).toHaveCSS(
    'color',
    'rgb(24, 24, 27)'
  )
  await expect(page.locator('main')).toBeVisible()

  const strategyNode = page.getByText('Strategy agent', { exact: true }).first()
  await expect(strategyNode).toHaveCSS('background-color', 'rgb(244, 244, 245)')
  await expect(strategyNode).toHaveCSS('color', 'rgb(24, 24, 27)')
  await expect(page).toHaveScreenshot('home-light.png', {
    animations: 'disabled',
    caret: 'hide',
    fullPage: true,
  })
})

test('the homepage does not overflow at an intermediate viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 })
  await page.goto('/')

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  )
  expect(overflow).toBeLessThanOrEqual(0)
})
