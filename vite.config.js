import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/slack-api': {
        target: 'https://slack.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/slack-api/, '')
      }
    }
  }
})