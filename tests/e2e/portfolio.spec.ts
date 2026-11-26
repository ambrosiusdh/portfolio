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
    .getByRole('heading', { level: 1, name: 'Ambrosius David Haryono' })
  await expect(heading).toBeVisible()
  await expect(page.getByRole('banner')).toBeVisible()
  await expect(page.getByRole('contentinfo')).toBeVisible()
  await expect(
    page
      .getByRole('region', { name: 'Technical skills' })
      .getByText('Java', { exact: true }),
  ).toBeVisible()
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

test('keeps the homepage section and localizes the career timeline when switching languages', async ({
  page,
}) => {
  await page.goto('/')
  const sectionLinks = page.getByRole('navigation', { name: 'On this page' })
  await sectionLinks.getByRole('link', { name: 'Technical skills' }).click()
  await expect(page).toHaveURL('/#skills')
  await expect(
    page.getByRole('heading', { name: 'Technical skills' }),
  ).toBeFocused()

  await sectionLinks.getByRole('link', { name: 'Work experience' }).click()
  await expect(page).toHaveURL('/#experience')
  const experience = page.getByRole('region', { name: 'Work experience' })
  await expect(experience.getByRole('heading', { level: 3 })).toHaveText([
    'OCBC Indonesia',
    'Blibli',
    'Blibli',
  ])
  await expect(experience.locator('time').first()).toHaveAttribute(
    'datetime',
    '2026-05',
  )
  await expect(experience.locator('time').first()).toHaveText('May 2026')
  await expect(experience.getByText('Present', { exact: true })).toBeVisible()

  await page.getByRole('link', { name: '日本語' }).click()
  await expect(page).toHaveURL('/ja#experience')
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja')
  await expect(
    page.getByRole('heading', { name: '職務経歴', level: 2 }),
  ).toBeInViewport()

  const japaneseExperience = page.getByRole('region', { name: '職務経歴' })
  await expect(japaneseExperience.locator('time').first()).toHaveText(
    '2026年5月',
  )
  await expect(
    japaneseExperience.getByText('現在', { exact: true }),
  ).toBeVisible()
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

test('switches languages without losing the page, query, or section', async ({
  page,
}) => {
  await page.goto('/design-system?source=portfolio')
  await page.getByRole('link', { name: 'Components' }).click()

  const japanese = page.getByRole('link', { name: '日本語' })
  await expect(japanese).toHaveAttribute('lang', 'ja')
  await expect(japanese).toHaveAttribute('hreflang', 'ja')
  await expect(japanese).toHaveAttribute(
    'href',
    '/ja/design-system?source=portfolio#components',
  )
  await japanese.focus()
  await page.keyboard.press('Enter')

  await expect(page).toHaveURL('/ja/design-system?source=portfolio#components')
  await expect(page).toHaveTitle('デザインシステム | ポートフォリオ')
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja')
  const main = page.getByRole('main')
  await expect(main).toBeFocused()
  await expect(
    main.getByRole('heading', { name: 'コンポーネント' }),
  ).toBeInViewport()
  await expect(page.locator('html')).toHaveJSProperty(
    'scrollWidth',
    viewport.width,
  )

  await page.getByRole('button', { name: '例を表示' }).click()
  await expect(page.getByRole('status')).toHaveText('例を表示しました。')

  await page.goBack()
  await expect(page).toHaveURL('/design-system?source=portfolio#components')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await page.goForward()
  await expect(page).toHaveURL('/ja/design-system?source=portfolio#components')
  await page.reload()
  await expect(page).toHaveTitle('デザインシステム | ポートフォリオ')
  await expect(
    main.getByRole('heading', { name: 'コンポーネント' }),
  ).toBeInViewport()

  await page.getByRole('link', { name: 'English' }).click()
  await expect(page).toHaveURL('/design-system?source=portfolio#components')
  await expect(page).toHaveTitle('Design system | Portfolio')
})

test('uses Japanese for a direct visit and recovery from an unknown route', async ({
  page,
}) => {
  await page.goto('/ja/missing/page')
  await expect(page).toHaveTitle('ページが見つかりません | ポートフォリオ')
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja')
  await expect(page.getByRole('link', { name: 'English' })).toHaveAttribute(
    'href',
    '/',
  )

  await page.getByRole('link', { name: 'ポートフォリオに戻る' }).click()
  await expect(page).toHaveURL('/ja')
  await expect(page).toHaveTitle('ポートフォリオ')
  const primary = page.getByRole('navigation', { name: 'メインナビゲーション' })
  await expect(
    primary.getByRole('link', { name: 'ポートフォリオ' }),
  ).toHaveAttribute('aria-current', 'page')

  await primary.getByRole('link', { name: 'デザインシステム' }).click()
  await expect(page).toHaveURL('/ja/design-system')
  await expect(page.getByRole('link', { name: 'ページの先頭へ' })).toBeVisible()
})
