# SEO & Analytics

[← Documentation index](index.md)

## Structured Data (JSON-LD)

[`src/components/JsonLd.astro`](../src/components/JsonLd.astro) emits one Schema.org `@graph` per page, built from shared data and linked by `@id`:

- `WebSite` (`/#website`): name, `inLanguage`, and the person as publisher
- `ProfilePage` on `/` (main entity: the person) or `WebPage` plus `BreadcrumbList` (Home > Resume) on `/resume/`
- `Person` (`/#person`):
  - name, `givenName`, `familyName`, handle as `alternateName`, `jobTitle` from `PROFILE`, and the LinkedIn headline as `description`
  - the share image as `image`, `url` from the configured `Astro.site`, and email from `PROFILE`
  - social links (`SOCIALS`) as `sameAs`
  - `PostalAddress` from `PROFILE.address`
  - `worksFor` from `CURRENT_ROLE` (the `EXPERIENCES` entry whose period ends with `Present`), omitted if none exists
  - `alumniOf` from `EDUCATION`
  - `knowsAbout` from the six `SKILLS` categories, de-duplicated. Rust, Go and Python are deliberately left out: the site presents them as languages being explored.
  - `knowsLanguage` from `SPOKEN_LANGUAGES` (BCP 47 codes)

The serialized JSON escapes `<` so no data value can close the script element early. The 404 page passes `page="none"` and emits no JSON-LD.

## Meta Tags

Configured in `src/layouts/RootLayout.astro`:

| Tag | Current value / source |
|---|---|
| Canonical, Open Graph URL, hreflang alternates | `new URL(canonical, Astro.site)`; `hreflang="en"` and `x-default` both point at the current page. Skipped when `noindex`. |
| Default canonical path | `/` |
| Default title | `Jonathan Peris — Software Engineer \| .NET · C# · Azure`, built from `PROFILE` |
| Default description | Built from `PROFILE.title`, `CURRENT_ROLE.company`, `YEARS_OF_EXPERIENCE` and `AVAILABILITY.short`, kept near 155 characters |
| Resume title / description | `Resume — Jonathan Peris, Software Engineer`; description names the current employer and the fintech, automotive and edtech scope (set in `src/pages/resume.astro`) |
| Keywords | Name, role, .NET, C#, ASP.NET Core, Azure, Azure DevOps, Fintech, Backend Architecture, Microservices, CQRS, DDD, Clean Architecture, Blazor, Remote |
| Author / robots | `author` is the profile name; `robots` is `index, follow, max-image-preview:large`, or `noindex, follow` for the 404 page |
| Open Graph type | `profile`, with `profile:first_name`, `profile:last_name` and `profile:username` |
| Open Graph image | `/profile-image-sharing.jpeg` resolved against the configured site, `image/jpeg`, `1024x1024` (the real file size) |
| Image alt | `Illustrated portrait of Jonathan Peris` on both `og:image:alt` and `twitter:image:alt` (the share image is an illustration) |
| Twitter card | `summary` (square image); `twitter:site` and `twitter:creator` use the X handle from `SOCIALS` |
| Identity links | One `<link rel="me">` per entry in `SOCIALS` |
| Theme color | `#161616` (the sign black) |
| Sitemap link | `<link rel="sitemap" href="/sitemap-index.xml">` |
| Fonts | Self-hosted via the Astro Fonts API; `<Font>` preloads the latin subset of Overpass and Overpass Mono |

Pages can override `title`, `description` and `canonical`, and set `page` (`home`, `resume` or `none`) and `noindex`; the share image is fixed in the layout. The `/resume/` route overrides title, description, canonical path and page kind in `src/pages/resume.astro`. The configured trailing-slash policy, resume navigation, page-specific metadata, and generated sitemap all use `/resume/`. The alternate links refer to the current page; they are not evidence of a translated route.

## 404 page and llms.txt

- [`src/pages/404.astro`](../src/pages/404.astro) builds `404.html`, which GitHub Pages serves for unknown paths. It is `noindex`, has no canonical or alternates, and links to the two real routes. `@astrojs/sitemap` leaves it out of the sitemap.
- [`src/pages/llms.txt.ts`](../src/pages/llms.txt.ts) generates `/llms.txt`, a plain-text summary (headline, summary, current role, pages, experience, skills, profiles, contact) for language-model crawlers. It reads the same `src/lib/data.ts` exports as the pages and the JSON-LD, so there is nothing to keep in sync by hand.

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
Sitemap: https://jonathanperis.dev/sitemap-index.xml
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

- `id` and `scope`: `/`; `lang`: `en`; `dir`: `ltr`
- App name: `Jonathan Peris — Software Engineer`; short name: `J. Peris`
- `description`: portfolio and resume of a Software Engineer building .NET, C# and Azure backends for fintech
- `start_url`: `/`; `display`: `standalone`
- Theme color: `#161616`; background color: `#fbfaf6` (the paper color)
- Icons: `favicon.svg` (`any`), `icon-192.png` and `icon-512.png` (`purpose: any`), and `apple-touch-icon.png` (180x180), all a red "JP" roundel on black. There are no maskable icons yet.

The layout links this manifest and the icons. No service worker or offline implementation is present. Browser installability and offline operation have not been validated by the manifest's presence alone.
