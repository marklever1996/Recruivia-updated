import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase',
      scopeBehavior: 'local',
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})