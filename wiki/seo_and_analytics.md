# SEO & Analytics

[← Documentation index](index.md)

## Structured Data (JSON-LD)

[`src/components/JsonLd.astro`](../src/components/JsonLd.astro) generates Schema.org `Person` markup from shared data:

- Name and job title from `PROFILE`; `worksFor` from `CURRENT_ROLE` (the `EXPERIENCES` entry whose period ends with `Present`), omitted if none exists
- `url` from the configured `Astro.site`
- Social links (`SOCIALS`) including GitHub, LinkedIn, X, Instagram, Bluesky, and Workana
- Skills (`knowsAbout`) from the six `SKILLS` categories, de-duplicated
- Education (`alumniOf`) from `EDUCATION`
- Email from `PROFILE`; `PostalAddress` from `PROFILE.address` (locality, region, country code)

The serialized JSON escapes `<` so no data value can close the script element early. The same Person markup is emitted by the shared layout on both pages.

## Meta Tags

Configured in `src/layouts/RootLayout.astro`:

| Tag | Current value / source |
|---|---|
| Canonical, Open Graph URL, English alternate URL | `new URL(canonical, Astro.site)` using the configured site and page path |
| Default canonical path | `/` |
| Default title | `Jonathan Peris — Software Engineer` |
| Default description | Software Engineer specializing in .NET and Fintech, `YEARS_OF_EXPERIENCE` years, enterprise/cloud-native systems |
| Keywords | Jonathan Peris, Software Engineer, .NET, C#, Fintech, Azure, Microservices, CQRS, DDD, Clean Architecture, Backend Developer, Cloud-Native |
| Open Graph image | `/profile-image-sharing.jpeg` resolved against the configured site |
| Open Graph image size / alt | `1024x1024` (the real file size); `og:image:alt` is `Jonathan Peris` |
| Twitter card | `summary` (square image) with `twitter:image` set to the same share image |
| Twitter creator | `@jperis_silva` |
| Theme color | `#161616` (the sign black) |
| Alternate language | `hreflang="en"` |
| Fonts | Self-hosted via the Astro Fonts API; `<Font>` preloads the latin subset of Overpass and Overpass Mono |

Pages can override `title`, `description`, and `canonical`; the share image is fixed in the layout. The `/resume/` route overrides title, description, and canonical path in `src/pages/resume.astro`. The configured trailing-slash policy, resume navigation, page-specific metadata, and generated sitemap all use `/resume/`. The English alternate link refers to the current page; it is not evidence of a translated route.

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
- Always includes a delegated `click` listener (inlined script): the closest element with `data-track-event` sends `gtag('event', <data-track-event>, { label: <data-track-label> })`, only when `window.gtag` exists. To track a new link or button, add those two attributes; no per-component handler is needed.

### Implemented custom events

| Event | Parameters | Trigger |
|---|---|---|
| `cta_click` | `{ label: 'nav_resume' }` | Header "Resume" link (`SiteSign.astro`) |
| `cta_click` | `{ label: 'info_resume' }` | Customer Information "Resume" link (`CustomerInfo.astro`) |
| `cta_click` | `{ label: 'info_pdf' }` | Customer Information "PDF" link to `/cv_jonathan_peris.pdf` (`CustomerInfo.astro`) |
| `cta_click` | `{ label: 'info_email' }` | Customer Information email row (`CustomerInfo.astro`) |
| `cta_click` | `{ label: 'resume_print' }` | "Print / Save as PDF" button on `/resume/` |
| `social_click` | `{ label: social.label }` | Customer Information social rows (`CustomerInfo.astro`), e.g. `GitHub`, `LinkedIn` |
| `project_click` | `{ label: repo name }` | Repository name link on the Connections board (`Connections.astro`) |

The former `hero_resume` and `hero_linkedin` labels were retired with the previous hero. Board Source/Live/Homepage links, "Later departures" links, map station and line-filter interactions, shell activation, section navigation, and scroll depth have no custom events. Variant parameters and persistence are proposals in [PRODUCT](../PRODUCT.md) and [DESIGN](../DESIGN.md). GA4 automatic/enhanced measurement depends on external property settings and is not established by this source inventory.

## Web App Manifest

`public/manifest.json` includes:

- App name: `Jonathan Peris — Software Engineer`
- Short name: `JP`
- `start_url`: `/`
- `display`: `standalone`
- Theme color: `#161616`
- Background color: `#fbfaf6` (the paper color)
- Icons: `favicon.svg` (`any`), `icon-192.png`, `icon-512.png`, and `apple-touch-icon.png` (180x180), all a red "JP" roundel on black

The layout links this manifest and the icons. No service worker or offline implementation is present. Browser installability and offline operation have not been validated by the manifest's presence alone.
