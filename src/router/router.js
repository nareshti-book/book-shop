import { createRouter, createWebHistory } from 'vue-router'

import ClientPage from '../components/ClientPage.vue';
import AdminPage from '../components/AdminPage.vue'

const history = createWebHistory()

const routes = [
  {
    path: '/admin-kostya',
    component: AdminPage
  },
  {
    path: '/',
    component: ClientPage,
  },
]

const router = createRouter({
  history,
  routes,
})

export default router
