<template>
  <div :class="themeClass">
    <router-view />

    <nav
      v-if="
        themeClass
        && route.path !== '/login'
        && ['ulala', 'if'].includes(themeClass)
      "
      class="bottom-nav">
      <button><i class="bi bi-plus-square"></i></button>
      <button @click="goBack"><i class="bi bi-arrow-left-square"></i></button>
      <button @click="logout"><i class="bi bi-arrow-bar-right"></i></button>
    </nav>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const themeClass = ref('default')

// Dinaminis vh aukštis
const setAppHeight = () => {
  document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`)
}

onMounted(() => {
  setAppHeight()
  window.addEventListener('resize', setAppHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', setAppHeight)
})

// Stebim vartotoją
watch(() => userStore.user, (user) => {
  if (!user) {
    document.body.className = '' // reset

    return
  }

  document.body.className = user.pwa_project_code
  themeClass.value = user.pwa_project_code  // pvz. 'if' arba 'ulala'
}, { immediate: true })

// Funkcija „Back“
const goBack = () => {
  // Patikriname, ar yra kur grįžti
  if (window.history.length > 1) {
    router.back()
  } else {
    console.log('Nėra kur grįžti, likame app viduje')
  }
}

// Logout funkcija
const logout = () => {
  // Išvalome vartotojo informaciją iš Pinia store
  userStore.$reset()

  // Resetinam temą
  document.body.className = ''
  themeClass.value = 'default'

  // Nukreipiame į login puslapį
  router.push('/login')
}
</script>
