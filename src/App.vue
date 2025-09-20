<template>
  <div :class="themeClass">
    <router-view />

    <nav
      v-if="
        themeClass &&
        route.path !== '/login' &&
        ['ulala'].includes(themeClass)
      "
      class="bottom-nav">

      <!-- Paslėptas failų input -->
      <input
        type="file"
        ref="fileInput"
        class="d-none"
        @change="onFileChange"
      />

      <!-- Mygtukai -->
      <button @click="openFilePicker">
        <i class="bi bi-plus-square"></i>
      </button>

      <button @click="goBack">
        <i class="bi bi-arrow-left-square"></i>
      </button>

      <button @click="logout">
        <i class="bi bi-arrow-bar-right"></i>
      </button>
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

const fileInput = ref(null)

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
  themeClass.value = user.pwa_project_code
}, { immediate: true })

// Funkcija atidaryti failų pasirinkimą
const openFilePicker = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

// Failų pasirinkimo handleris
const onFileChange = (event) => {
  const files = event.target.files
  if (files.length > 0) {
    console.log('Pasirinkti failai:', files)
    // čia gali siųsti į serverį arba rodyti peržiūrą
  }
}

// Funkcija „Back“
const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    console.log('Nėra kur grįžti, likame app viduje')
  }
}

// Logout funkcija
const logout = () => {
  userStore.$reset()
  document.body.className = ''
  themeClass.value = 'default'
  router.push('/login')
}
</script>
