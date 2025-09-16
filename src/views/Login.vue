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
    userStore.setUser(res.data.user)
    userStore.setToken(res.data.token)
    error.value = ''
    router.replace('/' + res.data.user.pwa_project_code);
  } catch (e) {
    error.value = 'Prisijungimas nepavyko'
  }
}
</script>

<style scoped>
.login-container {
  max-width: 360px;
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
  font-family: sans-serif;
}

h1 {
  margin-bottom: 20px;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #4f46e5;
}

button {
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  background-color: #4f46e5;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #3730a3;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
