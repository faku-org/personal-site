/**
 * /admin/vite.config.ts
 * Vite configuration for the admin CMS app.
 * Proxies /api/* to the Elysia backend in development.
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
