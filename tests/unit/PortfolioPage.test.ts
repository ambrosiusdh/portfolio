import { expect, test } from 'vitest'
import { createApp } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from '../../src/App.vue'
import { i18n } from '../../src/i18n'
import { router } from '../../src/router'

test('renders the portfolio heading inside the main landmark', async () => {
  const container = document.createElement('div')
  const memoryRouter = createRouter({
    history: createMemoryHistory(),
    routes: router.options.routes,
  })
  const app = createApp(App).use(i18n).use(memoryRouter)
  await memoryRouter.push('/')
  app.mount(container)

  const heading = container.querySelector('main h1')?.textContent
  app.unmount()

  expect(heading).toBe('Ambrosius David Haryono')
})
