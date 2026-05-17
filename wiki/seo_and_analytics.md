# SEO & Analytics

## Structured Data (JSON-LD)

`src/components/JsonLd.astro` generates Schema.org `Person` markup from `src/lib/data.ts`:

- Name, job title, and current employer (Derivative Path)
- Social links (`SOCIALS`) including GitHub, LinkedIn, X, Instagram, Bluesky, and Workana
- Skills (`knowsAbout`) from the six `SKILLS` categories
- Education (`alumniOf`) from `EDUCATION`
- Email and location

## Meta Tags

Configured in `src/layouts/RootLayout.astro`:

| Tag | Current value / source |
|---|---|
| Canonical base | `https://jonathanperis.github.io` plus the page `canonical` prop |
| Default canonical path | `/` |
| Default title | `Jonathan Peris — Software Engineer` |
| Default description | Software Engineer specializing in .NET and Fintech, 12+ years, enterprise/cloud-native systems |
| Keywords | Jonathan Peris, Software Engineer, .NET, C#, Fintech, Azure, Microservices, CQRS, DDD, Clean Architecture, Backend Developer, Cloud-Native |
| Open Graph image | `https://jonathanperis.github.io/profile-image-sharing.jpeg` |
| Open Graph image size | `460x844` |
| Twitter card | `summary_large_image` |
| Twitter creator | `@jperis_silva` |
| Theme color | `#0a0a0f` |
| Alternate language | `hreflang="en"` |

The `/resume` route overrides title, description, and canonical path in `src/pages/resume.astro`.

## Sitemap

`public/sitemap.xml` currently includes:

- `/` (priority 1.0, weekly)
- `/resume` (priority 0.8, monthly)

Astro also has the `@astrojs/sitemap` integration enabled in `astro.config.ts`.

## robots.txt

```txt
User-agent: *
Allow: /
Sitemap: https://jonathanperis.github.io/sitemap.xml
```

## Google Analytics 4

`src/components/Analytics.astro` loads GA4 conditionally:

- Activates only when `PUBLIC_GA_ID` is set.
- The production workflow passes `PUBLIC_GA_ID=G-35CN95481D`.
- Emits the standard async `https://www.googletagmanager.com/gtag/js?id=...` loader and inline `gtag('config', GA_ID)` initialization.
- `Portfolio.tsx` calls `trackEvent('cta_click', ...)` for resume and LinkedIn CTAs; events are sent only when `window.gtag` exists.

## PWA Manifest

`public/manifest.json` includes:

- App name: `Jonathan Peris — Software Engineer`
- Short name: `JP`
- `start_url`: `/`
- `display`: `standalone`
- Theme color: `#4ade80`
- Background color: `#09090b`
- SVG favicon and Apple touch icon entries
