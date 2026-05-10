import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://faku.pro',
      dynamicRoutes: [
        '/',
        '/blog',
      ],
      exclude: ['/admin/**'],
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
    }),
  ],
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
