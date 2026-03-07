import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Polyfill Node Buffer for gray-matter in the browser
      buffer: 'buffer/',
    },
  },
  define: {
    'global': 'globalThis',
  },
})
