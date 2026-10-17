import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  // GitHub Pages serves the site under /<repo>/; the deploy workflow passes it in.
  base: process.env.VITE_BASE || '/',
  plugins: [vue()],
  server: {
    port: 5173,
  },
});
