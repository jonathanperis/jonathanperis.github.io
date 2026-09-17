# Resume Page

[← Documentation index](index.md)

## Overview

The `/resume/` route renders a **print-optimized resume** from shared portfolio data. The page can be printed or saved to PDF from the browser; that flow does not read or regenerate the separate checked-in PDF asset.

## How It Works

- `src/pages/resume.astro` imports `PROFILE`, `SKILLS`, `EDUCATION`, and `EXPERIENCES` from `src/lib/data.ts`.
- The page is wrapped in `RootLayout` with resume-specific title, description, and canonical path (`/resume/`). Canonical, Open Graph, and English alternate URLs all identify this route.
- It renders header, summary, technical skills, all experience entries, and education.
- The "Download PDF" button calls `window.print()` so the browser print dialog can save as PDF.

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

- **Screen:** Dark theme matching the portfolio.
- **Print:** White background, black text, compact A4 margins, and `print:break-inside-avoid` on experience entries.

```css
@media print {
  body { background: white !important; color: black !important; }
  .resume-page { padding: 0.4in 0.5in !important; }
  @page { size: A4; margin: 0; }
}
```

## Navigation

- The portfolio navbar and hero CTA link to `/resume/`. The navbar label `resume.pdf` opens the HTML resume, not a PDF download.
- The resume page has a "Back to portfolio" link to `/`.

## Independent PDF Asset

[`public/cv_jonathan_peris.pdf`](../public/cv_jonathan_peris.pdf) remains a separately maintained public asset at `/cv_jonathan_peris.pdf`. It is not generated from `data.ts`, and current resume CTAs do not link to it.

The PDF and shared data disagree on the 2023 T-Systems project/client and the XP role description. The owner deferred career reconciliation on 2026-09-17. Confirm authoritative facts before changing either representation; do not treat the PDF and web resume as synchronized.

When updating approved profile facts, also inspect presentation literals in `Portfolio.tsx`, `RootLayout.astro`, `resume.astro`, and `JsonLd.astro`. Shared data does not cover every terminal, hero, metadata, or structured-data string.
