import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://jonathanperis.github.io',
  outDir: 'out',
  trailingSlash: 'always',
  // /lab/ holds design prototypes: never listed in the sitemap.
  integrations: [sitemap({ filter: (page) => !page.includes('/lab/') })],
  // Fonts are downloaded at build time and served from this origin (no runtime Google Fonts request).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'DM Sans',
      cssVariable: '--font-dm-sans',
      weights: ['400 900'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['monospace'],
    },
    {
      provider: fontProviders.google(),
      name: 'Pixelify Sans',
      cssVariable: '--font-pixelify',
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
