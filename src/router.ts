import { createWebHashHistory, createRouter } from 'vue-router'

import HomeView from './views/HomeView.vue'
import ConvertView from './views/ConvertView.vue'
import NotFoundView from './views/NotFoundView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/convert', component: ConvertView },
  { path: '*', component: NotFoundView},
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})