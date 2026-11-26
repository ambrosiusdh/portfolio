import { expect, test } from 'vitest'
import { createApp } from 'vue'
import PortfolioPage from '../../src/pages/PortfolioPage.vue'
import { router } from '../../src/router'

test('renders the portfolio heading inside the main landmark', async () => {
  const container = document.createElement('div')
  const app = createApp(PortfolioPage).use(router)
  await router.isReady()
  app.mount(container)

  const heading = container.querySelector('main > h1')?.textContent
  app.unmount()

  expect(heading).toBe('Portfolio')
})
