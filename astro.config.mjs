import { defineConfig } from 'astro/config';

const maintenanceEnabled = false;

export default defineConfig({
  srcDir: maintenanceEnabled ? './src/maintenance' : './src',
  publicDir: maintenanceEnabled ? './maintenance-public' : './public',
  site: 'https://www.timyooapparel.com',
  output: 'static',
  trailingSlash: 'always',
  vite: {
    build: {
      sourcemap: false,
    },
  },
});
