import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Today from '../views/Today.vue'
import ProjectPage from '../views/ProjectPage.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/today'
  },
  {
    path: '/today',
    name: 'Today',
    component: Today
  },
  {
    path: '/projects/:id',
    name: 'Project',
    component: ProjectPage
  }
]

const router = new VueRouter({
  routes
})

export default router
