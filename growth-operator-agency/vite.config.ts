import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias: {
      // Dấu '.' nghĩa là alias @ sẽ trỏ thẳng vào thư mục gốc của dự án
      '@': path.resolve(new URL('.', import.meta.url).pathname, '.'),
    },
  },
});