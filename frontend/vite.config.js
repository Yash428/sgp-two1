import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy:{
      '/y': 'http://localhost:8002/api/v1',
    },
  },
  plugins: [react()],
})
