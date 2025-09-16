import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import HomeIf from '@/views/if/Home.vue'
import HomeUlala from '@/views/ulala/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Login },
    { path: '/if', component: HomeIf },
    { path: '/ulala', component: HomeUlala },
  ],
})

export default router
