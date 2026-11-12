import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const mainEntry = new URL('./index.html', import.meta.url).pathname;
const renderEntry = new URL('./render.html', import.meta.url).pathname;

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2022',
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: mainEntry,
        render: renderEntry,
      },
    },
  },
  server: {
    allowedHosts: true,
  },
  preview: {
    allowedHosts: true,
  },
});
