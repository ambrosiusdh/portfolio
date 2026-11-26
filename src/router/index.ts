import { createRouter, createWebHistory } from 'vue-router'
import PortfolioPage from '../pages/PortfolioPage.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', name: 'home', component: PortfolioPage }],
})
