import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

import manifestIf from './public/manifest-if.json'
import manifestUlala from './public/manifest-ulala.json'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate', // automatinis SW atnaujinimas
      includeAssets: ['favicon.svg', 'robots.txt', 'if/pwa-192x192.png', 'if/pwa-512x512.png'],
      manifest: manifestIf
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5175,
  }
})
