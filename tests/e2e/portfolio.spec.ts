import { expect, test } from '@playwright/test'

const viewport = { width: 375, height: 812 }

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
  await expect(page.locator('html')).toHaveJSProperty(
    'scrollWidth',
    viewport.width,
  )
})
