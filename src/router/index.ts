import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import ShowListView from '../views/ShowListView.vue'
import ShowDetailView from '../views/ShowDetailView.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: ShowListView },
  { path: '/show/:id', name: 'ShowDetail', component: ShowDetailView }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
