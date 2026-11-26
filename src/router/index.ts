import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from 'vue-router'
import { i18n } from '../i18n'
import PortfolioPage from '../pages/PortfolioPage.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:locale(ja)?',
      children: [
        { path: '', name: 'home', component: PortfolioPage },
        {
          path: 'design-system',
          name: 'design-system',
          component: () => import('../pages/DesignSystemPage.vue'),
          meta: { titleKey: 'designSystem.title' },
        },
        {
          path: ':pathMatch(.*)*',
          name: 'not-found',
          component: () => import('../pages/NotFoundPage.vue'),
          meta: { titleKey: 'notFound.title' },
        },
      ],
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    const target = document.getElementById(to.hash.slice(1))
    return target ? { el: target } : { top: 0, left: 0 }
  },
})

function updateDocumentLanguage({
  params,
  meta,
}: Pick<RouteLocationNormalized, 'params' | 'meta'>) {
  const { locale, t } = i18n.global
  const prefix = params.locale
  locale.value =
    typeof prefix === 'string' && prefix.toLowerCase() === 'ja' ? 'ja' : 'en'

  document.documentElement.lang = locale.value
  const siteName = t('site.name')
  document.title =
    typeof meta.titleKey === 'string'
      ? `${t(meta.titleKey)} | ${siteName}`
      : siteName
}

updateDocumentLanguage(router.resolve(router.options.history.location))

router.afterEach((to, _from, failure) => {
  if (!failure) {
    updateDocumentLanguage(to)
  }
})
