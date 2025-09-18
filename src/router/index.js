import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import Login from '@/views/Login.vue'
import HomeIf from '@/views/if/Home.vue'
import HomeUlala from '@/views/ulala/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Root',
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore()
      if (userStore.user) {
        next('/' + userStore.user.pwa_project_code)
      } else {
        next('/login')
      }
    }
  },
  { path: '/login', component: Login },
  { path: '/if', component: HomeIf },
  { path: '/ulala', component: HomeUlala },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Global guard – tikrina prisijungimą visiems protected route
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isAuthenticated = !!userStore.user

  // Login page neprieinamas prisijungusiam
  if (to.path === '/login' && isAuthenticated) {
    return next('/' + userStore.user.pwa_project_code)
  }

  // Protected pages – tik prisijungusiems
  const protectedPages = ['/if', '/ulala']
  if (protectedPages.includes(to.path) && !isAuthenticated) {
    return next('/login')
  }

  next()
})

export default router
