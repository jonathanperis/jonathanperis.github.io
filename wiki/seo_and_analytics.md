# SEO & Analytics

[← Documentation index](index.md)

## Structured Data (JSON-LD)

[`src/components/JsonLd.astro`](../src/components/JsonLd.astro) generates Schema.org `Person` markup using shared data and several presentation literals:

- Name and job title from `PROFILE`; employer is the literal `Derivative Path`
- Social links (`SOCIALS`) including GitHub, LinkedIn, X, Instagram, Bluesky, and Workana
- Skills (`knowsAbout`) from the six `SKILLS` categories
- Education (`alumniOf`) from `EDUCATION`
- Email from `PROFILE`; address is a literal Itanhaém/São Paulo/BR object

The website URL is also literal in this component. Review employer/address/URL alongside shared data when updating profile facts. The same Person markup is emitted by the shared layout on both pages.

## Meta Tags

Configured in `src/layouts/RootLayout.astro`:

| Tag | Current value / source |
|---|---|
| Canonical, Open Graph URL, English alternate URL | `new URL(canonical, Astro.site)` using the configured site and page path |
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

The `/resume/` route overrides title, description, and canonical path in `src/pages/resume.astro`. The configured trailing-slash policy, resume navigation, page-specific metadata, and generated sitemap all use `/resume/`. The English alternate link refers to the current page; it is not evidence of a translated route.

## Sitemap

The `@astrojs/sitemap` integration in [`astro.config.ts`](../astro.config.ts) generates the authoritative route list during `bun run build`:

- `out/sitemap-index.xml` is the primary index advertised to crawlers.
- `out/sitemap-0.xml` lists `/` and `/resume/` for the current two-page site.
- [`public/sitemap.xml`](../public/sitemap.xml) preserves the previously published entry point as a compatibility index pointing to the generated `sitemap-0.xml`.

There are no handwritten page entries, priorities, change frequencies, or `lastmod` dates to maintain. When adding routes, verify the generated sitemap; if output ever spans multiple sitemap shards, update the compatibility index to include them.

## robots.txt

```txt
User-agent: *
Allow: /
Sitemap: https://jonathanperis.github.io/sitemap-index.xml
```

## Google Analytics 4

`src/components/Analytics.astro` loads GA4 conditionally:

- Activates only when `PUBLIC_GA_ID` is set.
- The production workflow passes `PUBLIC_GA_ID=G-35CN95481D`.
- Emits the standard async `https://www.googletagmanager.com/gtag/js?id=...` loader and inline `gtag('config', GA_ID)` initialization.
- `Portfolio.tsx` dispatches custom events only when `window.gtag` exists.

### Implemented custom events

| Event | Parameters | Trigger |
|---|---|---|
| `cta_click` | `{ label: 'nav_resume' }` | Navbar resume link |
| `cta_click` | `{ label: 'hero_resume' }` | Hero resume link |
| `cta_click` | `{ label: 'hero_linkedin' }` | Hero LinkedIn link |
| `social_click` | `{ label: social.label }` | Footer social links |

Project/repository clicks, shell activation, section navigation, scroll depth, and resume print actions have no custom event handlers. Variant parameters and persistence are proposals in [PRODUCT](../PRODUCT.md) and [DESIGN](../DESIGN.md). GA4 automatic/enhanced measurement depends on external property settings and is not established by this source inventory.

## Web App Manifest

`public/manifest.json` includes:

- App name: `Jonathan Peris — Software Engineer`
- Short name: `JP`
- `start_url`: `/`
- `display`: `standalone`
- Theme color: `#4ade80`
- Background color: `#09090b`
- SVG favicon and Apple touch icon entries

The layout links this manifest and the icons. No service worker or offline implementation is present. Browser installability and offline operation have not been validated by the manifest's presence alone.
