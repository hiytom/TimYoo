import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.timyooapparel.com',
  output: 'static',
  trailingSlash: 'always',
  vite: {
    build: {
      sourcemap: false,
    },
  },
});
