import { createRouter, createWebHistory } from 'vue-router'
import PortfolioPage from '../pages/PortfolioPage.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: PortfolioPage },
    {
      path: '/design-system',
      name: 'design-system',
      component: () => import('../pages/DesignSystemPage.vue'),
      meta: { title: 'Design system | Portfolio' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../pages/NotFoundPage.vue'),
      meta: { title: 'Page not found | Portfolio' },
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

router.afterEach((to, _from, failure) => {
  if (!failure) {
    document.title =
      typeof to.meta.title === 'string' ? to.meta.title : 'Portfolio'
  }
})
