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
  ],
})

router.afterEach((to, _from, failure) => {
  if (!failure) {
    document.title =
      typeof to.meta.title === 'string' ? to.meta.title : 'Portfolio'
  }
})
