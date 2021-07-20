import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Today from '../views/Today.vue'
import ProjectPage from '../views/ProjectPage.vue'
import Schedule from '../views/Schedule.vue'
import About from '../views/About.vue'
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
    path: '/projects/:id',
    name: 'Project',
    component: ProjectPage
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule
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
  {
    path: '/about',
    name: 'About',
    component: About
  },
  
]

const router = new VueRouter({
  routes
})

export default router
