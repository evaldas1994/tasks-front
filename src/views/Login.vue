<template>
  <div class="login-container">
    <h1>Prisijungimas</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="El. paštas" required />
      <input v-model="password" type="password" placeholder="Slaptažodis" required />
      <button type="submit">Prisijungti</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from '@/plugins/axios'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')

const userStore = useUserStore()
const router = useRouter()

const login = async () => {
  try {
    const res = await axios.post('/api/auth/login', {
      email: email.value,
      password: password.value
    })
    // Set user and token in Pinia
    userStore.setUser(res.data.user)
    userStore.setToken(res.data.token)
    error.value = ''
    router.push('/dashboard')
  } catch (e) {
    error.value = 'Prisijungimas nepavyko'
  }
}
</script>

<style scoped>

input, button {
  padding: 10px;
  font-size: 16px;
}
.error {
  color: red;
}
</style>
