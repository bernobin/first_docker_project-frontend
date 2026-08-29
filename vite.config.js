import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // watch enables hot reload outside the container
    watch: {
      usePolling: true,
    },
    // proxy forwards requests to the backend through the internal network
    proxy: {
      '/api': {
        target: 'http://backend:8000',
      },
    },
  },
});
