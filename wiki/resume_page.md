# Resume Page

[← Documentation index](index.md)

## Overview

The `/resume/` route renders a **print-optimized resume** from shared portfolio data. The page can be printed or saved to PDF from the browser; that flow does not read or regenerate the separate checked-in PDF asset.

## How It Works

- `src/pages/resume.astro` imports `PROFILE`, `SKILLS`, `EDUCATION`, `EXPERIENCES`, and `YEARS_OF_EXPERIENCE` from `src/lib/data.ts`.
- The page is wrapped in `RootLayout` with resume-specific title, description, and canonical path (`/resume/`). Canonical, Open Graph, and English alternate URLs all identify this route.
- It renders header, summary, technical skills, all experience entries, and education inside a `<main>` landmark. Email, LinkedIn, GitHub, and website in the header are real links (`mailto:`/`https://`); location is plain text.
- The "Print / Save as PDF" button (`data-print`) is wired by a small Astro-processed page script, inlined in the HTML (no inline `onclick`), that calls `window.print()`, so the browser print dialog can save as PDF. It also carries `data-track-event="cta_click"` / `data-track-label="resume_print"` for GA4.

## Sections

| Section | Data Source |
|---|---|
| Header | `PROFILE.name`, `PROFILE.email`, `PROFILE.location`, `PROFILE.linkedin`, `PROFILE.github`, `PROFILE.website` |
| Summary | `PROFILE.summary` |
| Technical Skills | `SKILLS` (languages, backend, architecture, cloud, databases, frontend) |
| Experience | `EXPERIENCES[]` from `src/lib/data.ts` |
| Education | `EDUCATION` |

## Print Styling

Print rules live in [`src/pages/resume.astro`](../src/pages/resume.astro), alongside the resume markup. The page has dual styles:

- **Screen:** Light paper/ink theme matching the portfolio — black (`sign`) print bar, red (line 1) section headings and print button, ink text, hairline-bordered tags.
- **Print:** White background, black text, compact A4 margins, and `print:break-inside-avoid` on experience entries.

```css
@media print {
  body { background: white !important; color: black !important; }
  .resume-page { padding: 0.4in 0.5in !important; }
  @page { size: A4; margin: 0; }
}
```

## Navigation

- The SiteSign navigation (`Resume`) and the Customer Information "Timetable" row (`Resume`) link to `/resume/`, the HTML resume.
- The resume page has a "Back to portfolio" link to `/`.

## Independent PDF Asset

[`public/cv_jonathan_peris.pdf`](../public/cv_jonathan_peris.pdf) remains a separately maintained public asset at `/cv_jonathan_peris.pdf`. It is not generated from `data.ts`. The Customer Information "Timetable" row links to it as `PDF` (`cta_click` / `info_pdf`); the `/resume/` route and its print button do not use it.

The PDF and shared data disagree on the 2023 T-Systems project/client and the XP role description. The owner deferred career reconciliation on 2026-09-17. Confirm authoritative facts before changing either representation; do not treat the PDF and web resume as synchronized.

When updating approved profile facts, also inspect presentation literals in `src/components/` (notably `SiteSign.astro`, the `MetroMap.astro` lede, and `CustomerInfo.astro`), station captions in `src/lib/metro.ts`, `src/lib/terminal-commands.ts`, and `resume.astro`. Metadata descriptions and JSON-LD derive years, employer, and address from `data.ts`, but shared data does not cover every sign, caption, or terminal string. Adding, removing, or renaming a role in `EXPERIENCES` requires a matching `STATIONS` update in `metro.ts`: a new role appears on the map and in the Station Index only once a station references it, and a station whose role is missing fails the build.
