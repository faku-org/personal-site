import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { seo } from './vite-plugins/seo'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seo()],
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
