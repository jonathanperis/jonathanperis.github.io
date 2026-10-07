import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://jonathanperis.github.io',
  outDir: 'out',
  trailingSlash: 'always',
  integrations: [sitemap()],
  // Fonts are downloaded at build time and served from this origin (no runtime Google Fonts request).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Overpass',
      cssVariable: '--font-overpass',
      weights: ['400 900'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Overpass Mono',
      cssVariable: '--font-overpass-mono',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['monospace'],
    },
  ],
  vite: {
    plugins: [tailwindcss() as never],
  },
});
