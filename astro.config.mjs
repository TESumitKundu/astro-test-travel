import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [mdx()],
  site: process.env.SITE_URL ?? 'https://tesumitkundu.github.io',
  base: process.env.ASTRO_BASE_PATH ?? '/astro-test-travel/',
  output: 'static',
  vite: {
    cacheDir: '.astro/vite'
  }
});
