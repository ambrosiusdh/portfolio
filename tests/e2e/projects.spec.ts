import { expect, test } from '@playwright/test'

test.use({ viewport: { width: 320, height: 812 } })

test('opens both case studies from the portfolio and shows their public source links', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Explore projects' }).click()
  await expect(page).toHaveURL('/projects')
  await expect(page).toHaveTitle('Projects | Portfolio')

  const main = page.getByRole('main')
  const projects = page
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('link', { name: 'Projects' })
  await expect(projects).toHaveAttribute('aria-current', 'page')
  await expect(main).toBeFocused()
  await expect(
    main.getByRole('heading', { level: 1, name: 'Projects' }),
  ).toBeVisible()

  await main.getByRole('link', { name: 'Bloom App' }).click()
  await expect(page).toHaveURL('/projects/bloom-app')
  await expect(page).toHaveTitle('Bloom App | Portfolio')
  await expect(
    main.getByRole('heading', { level: 1, name: 'Bloom App' }),
  ).toBeVisible()
  await expect(
    main.getByRole('region', { name: 'Technical decisions' }),
  ).toContainText('PostgreSQL row locks')
  await expect(
    main.getByRole('link', { name: 'Backend on GitHub' }),
  ).toHaveAttribute('href', 'https://github.com/ambrosiusdh/bloom-app')
  await expect(
    main.getByRole('link', { name: 'Frontend on GitHub' }),
  ).toHaveAttribute('href', 'https://github.com/ambrosiusdh/bloom-ui')

  await main.getByRole('link', { name: 'All projects' }).click()
  await expect(page).toHaveURL('/projects')
  await main.getByRole('link', { name: 'Bilingual Portfolio' }).click()
  await expect(page).toHaveURL('/projects/portfolio')
  await expect(page).toHaveTitle('Bilingual Portfolio | Portfolio')
  await expect(
    main.getByRole('region', { name: 'My contribution' }),
  ).toContainText('Vue and TypeScript')
  await expect(
    main.getByRole('link', { name: 'Portfolio on GitHub' }),
  ).toHaveAttribute('href', 'https://github.com/ambrosiusdh/portfolio')
})

test('retains the project and section on a localized deep link', async ({
  page,
}) => {
  await page.goto('/ja/projects/portfolio?ref=showcase#decisions')
  await expect(page).toHaveTitle('日英対応ポートフォリオ | ポートフォリオ')
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja')
  const main = page.getByRole('main')
  await expect(
    main.getByRole('heading', { level: 2, name: '設計上の判断' }),
  ).toBeInViewport()
  await expect(page.locator('html')).toHaveJSProperty('scrollWidth', 320)
  await expect(
    main.getByRole('link', { name: '制作実績一覧へ' }),
  ).toHaveAttribute('href', '/ja/projects')

  await page.getByRole('link', { name: 'English' }).click()
  await expect(page).toHaveURL('/projects/portfolio?ref=showcase#decisions')
  await expect(page).toHaveTitle('Bilingual Portfolio | Portfolio')
  await expect(
    main.getByRole('heading', { level: 2, name: 'Technical decisions' }),
  ).toBeInViewport()
})

test('shows the localized recovery page for an unknown project slug', async ({
  page,
}) => {
  await page.goto('/ja/projects/missing-project')
  await expect(page).toHaveTitle('ページが見つかりません | ポートフォリオ')
  await page.getByRole('link', { name: 'ポートフォリオに戻る' }).click()
  await expect(page).toHaveURL('/ja')
  await page.getByRole('link', { name: '制作実績を見る' }).click()
  await expect(page).toHaveURL('/ja/projects')
  await expect(
    page.getByRole('heading', { name: '制作実績', level: 1 }),
  ).toBeVisible()
})
