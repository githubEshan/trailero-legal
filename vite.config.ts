import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
  const isUserOrOrgPagesRepo = repository.endsWith('.github.io');

  const base = process.env.GITHUB_ACTIONS
    ? isUserOrOrgPagesRepo
      ? '/'
      : `/${repository}/`
    : '/';

  return {
    base,

    plugins: [react(), tailwindcss()],
    
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});