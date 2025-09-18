import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import axios from '@/plugins/axios' // importuojam mūsų globalų axios

// CSS
import 'bootstrap/dist/css/bootstrap.css'
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import "bootstrap-icons/font/bootstrap-icons.css"

// Importuojam visus galimus CSS failus globaliai
import './assets/css/app.css'
import '@/assets/css/if/app.css'
import '@/assets/css/ulala/app.css'

import './registerSW'

// -----------------------
// Pinia setup
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// -----------------------
// Vue app
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(BootstrapVue3)

// -----------------------
// Mount
app.mount('#app')
