import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // When using "npm run dev:netlify", Netlify Dev runs on 8888 and serves functions.
    // Proxy /api to 8888 so forms work even if you open the app at localhost:5173.
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
      },
    },
  },
})
