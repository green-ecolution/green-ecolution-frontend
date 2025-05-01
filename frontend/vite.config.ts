import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { federation } from '@module-federation/vite'

//
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    federation({
      name: 'app',
      remotes: {
        // module federation is being handled dynamically. see app.tsx
        // add dummy.js to prevent vite from throwing an error
        dummy: 'dummy.js',
      },
      filename: 'plugin.js',
      shared: ['react', 'react-dom', '@green-ecolution/plugin-interface'],
    }),
  ],
  server: {
    host: true,
    proxy: {
      '/api-local': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-local/, '/api'),
      },
      '/api-stage': {
        target: 'https://app.stage.green-ecolution.de',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-stage/, '/api'),
      },
    },
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
