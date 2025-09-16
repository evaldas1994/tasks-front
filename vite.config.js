import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig(({ mode }) => {
  // įkrauna env failus pagal aplinką
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    plugins: [
      vue(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'robots.txt', 'pwa-192x192.png', 'pwa-512x512.png'],
        manifest: {
          name: env.VITE_NAME,
          short_name: env.VITE_SHORT_NAME,
          description: env.VITE_APP_DESCRIPTION,
          theme_color: env.VITE_THEME_COLOR,
          background_color: env.VITE_BACKGROUND_COLOR,
          display: env.VITE_DISPLAY,
          orientation: env.VITE_ORIENTATION,
          start_url: env.VITE_START_URL,
          icons: [
            { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
            { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' }
          ]
        }
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    // build: {
    //   outDir: 'public_html'
    // }
    // resolve: {
    //   alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    // },
    // server: { host: '0.0.0.0', port: 5175 },
  }
})
