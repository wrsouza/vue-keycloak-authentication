import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { keycloak } from '../services'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: import('../views/Home.vue'),
    meta: {
      isAuthenticated: false
    },
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      isAuthenticated: true
    },
    component: () => import('../views/About.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    meta: {
      isAuthenticated: true
    },
    component: () => keycloak.logout()
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.isAuthenticated) {
    const redirectUri = `${window.location.origin}${to.path}`
    if (!keycloak.authenticated) {
      return keycloak.login({ redirectUri })
    } else {
      console.log('Authenticated')
    }
    if (keycloak.token) {
      localStorage.setItem('openfinance-token', keycloak.token)
    }
    next()
  } else {
    next()
  }
})

export default router
