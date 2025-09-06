import axios from 'axios'
import { useUserStore } from '@/stores/userStore'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL // Laravel backend
axios.defaults.withCredentials = true

// interceptorius, kad automatiškai įdėtų tokeną
axios.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axios
