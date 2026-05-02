# SEO & Analytics

## Structured Data (JSON-LD)

`components/json-ld.tsx` generates Schema.org `Person` markup:

- Name, job title, employer (Derivative Path)
- Social links (GitHub, LinkedIn, X, Instagram, Bluesky)
- Skills (`knowsAbout`) — 23 technologies across 6 categories
- Education (`alumniOf`) — UNIESP
- Email, location

This helps Google display rich knowledge panels.

## Meta Tags

Configured in `layout.tsx`:

| Tag | Value |
|---|---|
| `metadataBase` | `https://jonathanperis.github.io` |
| `canonical` | `/` |
| `keywords` | 12 relevant terms |
| `og:title` | Jonathan Peris — Software Engineer |
| `og:image` | profile-image-sharing.jpeg |
| `twitter:card` | summary_large_image |
| `twitter:creator` | @jperis_silva |
| `theme-color` | #09090b |
| `hreflang` | en |

## Sitemap

`public/sitemap.xml` includes:
- `/` (priority 1.0, weekly)
- `/resume` (priority 0.8, monthly)

## robots.txt

```
User-agent: *
Allow: /
Sitemap: https://jonathanperis.github.io/sitemap.xml
```

## Google Analytics 4

`components/analytics.tsx` loads GA4 conditionally:
- Only activates when `NEXT_PUBLIC_GA_ID` env var is set
- Measurement ID: `G-GFK73008MT`
- Loaded with `afterInteractive` strategy (non-blocking)

## PWA Manifest

`public/manifest.json` with:
- App name, short name (JP)
- Theme color (#4ade80), background (#09090b)
- SVG favicon + apple-touch-icon
