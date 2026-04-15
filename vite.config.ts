import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
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
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    
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