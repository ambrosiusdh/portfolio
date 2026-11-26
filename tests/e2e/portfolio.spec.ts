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
