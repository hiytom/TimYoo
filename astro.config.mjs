import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.timyooapparel.com',
  output: 'static',
  vite: {
    build: {
      sourcemap: false,
    },
  },
});
