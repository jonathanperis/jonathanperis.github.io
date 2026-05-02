# Resume Page

## Overview

The `/resume` route renders a **print-optimized resume** from the same data that powers the portfolio. No static PDF needed — the resume is always up to date.

## How It Works

- `resume/page.tsx` imports from `lib/data.ts` (the single source of truth)
- Renders: Header, Summary, Technical Skills, Experience (all 10 roles), Education
- "Download PDF" button calls `window.print()` — the browser's print dialog saves as PDF

## Sections

| Section | Data Source |
|---|---|
| Header | `PROFILE.name`, `PROFILE.email`, `PROFILE.location`, etc. |
| Summary | `PROFILE.summary` |
| Technical Skills | `SKILLS` (languages, backend, architecture, cloud, databases, frontend) |
| Experience | `EXPERIENCES[]` (10 entries with title, company, location, description, tags) |
| Education | `EDUCATION` (BTech from UNIESP) |

## Print Styling

The page has dual styles:
- **Screen**: Dark theme matching the portfolio
- **Print**: White background, black text, proper margins, `break-inside-avoid` on experience entries

```css
@media print {
  body { background: white; color: black; }
  .resume-page { padding: 0.4in 0.5in; }
  @page { size: A4; margin: 0; }
}
```

## Navigation

- The "resume" button in the portfolio navbar links to `/resume`
- The resume page has a "Back to portfolio" link
