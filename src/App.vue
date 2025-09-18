<template>
  <div :class="themeClass">
    <router-view />

    <nav class="bottom-nav">
      <button><i class="bi bi-plus-square"></i></button>
      <button @click="goBack"><i class="bi bi-arrow-left-square"></i></button>
    </nav>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const themeClass = ref('')

// Stebim vartotoją
watch(() => userStore.user, (user) => {
  if (!user) return
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
</script>
