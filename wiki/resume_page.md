# Resume Page

## Overview

The `/resume` route renders a **print-optimized resume** from the same data that powers the portfolio. No generated PDF needs to be kept in sync; the page can be printed or saved to PDF from the browser.

## How It Works

- `src/pages/resume.astro` imports `PROFILE`, `SKILLS`, `EDUCATION`, and `EXPERIENCES` from `src/lib/data.ts`.
- The page is wrapped in `RootLayout` with resume-specific title, description, and canonical path (`/resume`).
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

The page has dual styles:

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

- The portfolio navbar and hero CTA link to `/resume`.
- The resume page has a "Back to portfolio" link to `/`.
