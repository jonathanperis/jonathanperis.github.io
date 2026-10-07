# Resume Page

[← Documentation index](index.md)

## Overview

The `/resume/` route renders a **print-optimized resume** from shared portfolio data. The page can be printed or saved to PDF from the browser, and the downloadable `/cv_jonathan_peris.pdf` is a checked-in print of this route.

## How It Works

- `src/pages/resume.astro` imports `PROFILE`, `SKILLS`, `SKILL_GROUPS` (for its key type), `EDUCATION`, `EXPERIENCES`, and `YEARS_OF_EXPERIENCE` from `src/lib/data.ts`.
- The page is wrapped in `RootLayout` with resume-specific title, description, and canonical path (`/resume/`). Canonical, Open Graph, and English alternate URLs all identify this route.
- It renders header, summary, technical skills, all experience entries, and education inside a `<main>` sheet. Email, GitHub, and LinkedIn in the header contact row are real links (`mailto:`/`https://`); location is plain text.
- The "Print / Save as PDF" button (`data-print`) is wired by a small Astro-processed page script, inlined in the HTML (no inline `onclick`), that calls `window.print()`, so the browser print dialog can save as PDF. It also carries `data-track-event="cta_click"` / `data-track-label="resume_print"` for GA4.

## Sections

| Section | Data Source |
|---|---|
| Header | `PROFILE.name`; red title line `PROFILE.title` + " · .NET & Azure" (presentation copy); mono contact row with `PROFILE.email`, `PROFILE.location`, `PROFILE.github`, `PROFILE.linkedin`; short red accent bar |
| Summary | `PROFILE.summary`, with the `${YEARS_OF_EXPERIENCE} years of experience` phrase set in bold when present |
| Technical Skills | Label/value table from `SKILLS`; labels come from `SKILL_LABELS` in the page (Programming, Backend, Architecture, Cloud & DevOps, Databases, Frontend) |
| Experience | `EXPERIENCES[]`: "Title · Company" (company in red), mono period on the right, mono location, one red-dot bullet per sentence of `description` (split on ". " before a capital, so ".NET" never splits), and a mono "Stack:" line from `tags` |
| Education | `EDUCATION`: "Degree — Field", mono period, mono institution, description |

## Print Styling

Print rules live in [`src/pages/resume.astro`](../src/pages/resume.astro), alongside the resume markup. The page has dual styles:

- **Screen:** an A4-width white sheet on the site's paper background, under a black (`sign`) toolbar with "Back to portfolio" and a red "Print / Save as PDF" button. Section heads are small red caps followed by a hairline rule. The mobile layout (`@media screen and (max-width: 760px)`) stacks the skills table and moves dates under titles; it is screen-only because an A4 print area is also narrower than 760px.
- **Print:** the sheet becomes the A4 page (`@page { size: A4; margin: 14mm 17mm }`), in full color (`print-color-adjust: exact`) with the red (line 1) accents kept, at 9.6pt so the current data fits on two pages. Entry headers, locations, and section heads avoid page breaks after them; bullets avoid breaking inside.

## Navigation

- The SiteSign navigation (`Resume`) and the Customer Information "Timetable" row (`Resume`) link to `/resume/`, the HTML resume.
- The resume page has a "Back to portfolio" link to `/`.

## Downloadable PDF

[`public/cv_jonathan_peris.pdf`](../public/cv_jonathan_peris.pdf), served at `/cv_jonathan_peris.pdf`, is a checked-in A4 print of `/resume/`. Since 2026-10-07 it replaces the older, separately written Google Docs CV (still in git history). The Customer Information "Timetable" row links to it as `PDF` (`cta_click` / `info_pdf`).

The build does not regenerate it. After changing `data.ts` resume content or `resume.astro`, rebuild, serve `out/`, and print the route with headless Chrome (real Node first on `PATH`, as for any build):

```sh
bun run build
(cd out && python3 -m http.server 4599) &
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer \
  --virtual-time-budget=6000 --print-to-pdf=public/cv_jonathan_peris.pdf http://localhost:4599/resume/
```

Run these from the repository root (adjust the Chrome path on other systems) and stop the server afterwards. Check that the PDF still fits on two pages.

When updating approved profile facts, also inspect presentation literals in `src/components/` (notably `SiteSign.astro`, the `MetroMap.astro` lede, and `CustomerInfo.astro`), station captions in `src/lib/metro.ts`, `src/lib/terminal-commands.ts`, and `resume.astro`. Metadata descriptions and JSON-LD derive years, employer, and address from `data.ts`, but shared data does not cover every sign, caption, or terminal string. Adding, removing, or renaming a role in `EXPERIENCES` requires a matching `STATIONS` update in `metro.ts`: a new role appears on the map and in the Station Index only once a station references it, and a station whose role is missing fails the build.
