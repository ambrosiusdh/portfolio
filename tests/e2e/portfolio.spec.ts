import { expect, test } from '@playwright/test'

const viewport = { width: 320, height: 812 }

test.use({ viewport })

test('loads the production home page at a mobile viewport', async ({
  page,
}) => {
  await page.goto('/')

  await expect(page).toHaveTitle('Portfolio')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  const heading = page
    .getByRole('main')
    .getByRole('heading', { level: 1, name: 'Portfolio' })
  await expect(heading).toBeVisible()
  await expect(page.getByRole('banner')).toBeVisible()
  await expect(page.getByRole('contentinfo')).toBeInViewport()
  await expect(
    page.getByRole('navigation', { name: 'Primary' }).getByRole('link', {
      name: 'Portfolio',
    }),
  ).toHaveAttribute('aria-current', 'page')
  await expect(page.locator('html')).toHaveJSProperty(
    'scrollWidth',
    viewport.width,
  )
})

test('supports keyboard navigation and restores the previous scroll position', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/design-system#components')

  const main = page.getByRole('main')
  const primary = page.getByRole('navigation', { name: 'Primary' })
  const portfolio = primary.getByRole('link', { name: 'Portfolio' })
  const components = main.getByRole('heading', { name: 'Components' })
  await expect(components).toBeInViewport()
  await expect(
    primary.getByRole('link', { name: 'Design system' }),
  ).toHaveAttribute('aria-current', 'page')

  await page.keyboard.press('Tab')
  const skipLink = page.getByRole('link', { name: 'Skip to main content' })
  await expect(skipLink).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(main).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(main.getByRole('link', { name: 'Color' })).toBeFocused()

  await main.getByRole('link', { name: 'Components' }).click()
  await expect(components).toBeInViewport()
  const previousScroll = await page.evaluate(() => {
    window.scrollBy(0, -120)
    return window.scrollY
  })

  await portfolio.evaluate((link) => link.focus({ preventScroll: true }))
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL('/')
  await expect(main).toBeFocused()
  await expect(portfolio).toHaveAttribute('aria-current', 'page')

  await page.goBack()
  await expect(page).toHaveURL('/design-system#components')
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBe(previousScroll)

  await page.getByRole('link', { name: 'Back to top' }).click()
  await expect(page.getByRole('banner')).toBeFocused()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
})

test('shows a recovery link for an unknown URL', async ({ page }) => {
  await page.goto('/unknown/page')

  await expect(page).toHaveTitle('Page not found | Portfolio')
  const main = page.getByRole('main')
  await expect(
    main.getByRole('heading', { level: 1, name: 'Page not found' }),
  ).toBeVisible()
  await main.getByRole('link', { name: 'Return to the portfolio' }).click()
  await expect(page).toHaveURL('/')
  await expect(main).toBeFocused()
})

test('previews the design system and operates button states by keyboard', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Design system' }).click()

  await expect(page).toHaveTitle('Design system | Portfolio')
  await expect(
    page.getByRole('heading', { name: 'Design system', level: 1 }),
  ).toBeVisible()
  await expect(page.locator('html')).toHaveJSProperty(
    'scrollWidth',
    viewport.width,
  )

  await page.getByRole('link', { name: 'Components' }).click()
  await expect(page).toHaveURL('/design-system#components')

  const show = page.getByRole('button', { name: 'Show example' })
  const reset = page.getByRole('button', { name: 'Reset' })
  const status = page.getByRole('status')

  await expect(page.getByRole('button', { name: 'Unavailable' })).toBeDisabled()
  await expect(status).toHaveText('No example selected.')
  await page.keyboard.press('Tab')
  await expect(show).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(status).toHaveText('Example shown.')
  await page.keyboard.press('Tab')
  await expect(reset).toBeFocused()
  await page.keyboard.press('Space')
  await expect(status).toHaveText('No example selected.')

  await page.getByRole('link', { name: 'Portfolio', exact: true }).click()
  await expect(page).toHaveTitle('Portfolio')
})
