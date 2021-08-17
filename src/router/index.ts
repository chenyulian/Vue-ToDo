import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Today from '../views/Today.vue'
import Stats from '../views/Stats.vue'
import Projects from '../views/Projects.vue'

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
    path: '/stats',
    name: 'Stats',
    component: Stats
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
]

const router = new VueRouter({
  routes
})

export default router
