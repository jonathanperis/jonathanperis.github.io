---
name: Portfolio Site Architecture
description: Next.js 16 static export, GitHub GraphQL API integration, terminal UI theme, SEO strategy
type: project
---

## Rendering Strategy

- **Server Components (RSC)**: `app/page.tsx` is async — fetches GitHub pinned repos at build time via GraphQL
- **Client Components**: `Portfolio` (main UI), `ResumePage` (print-optimized) use `"use client"`
- **Static export**: `output: "export"` in next.config.ts — no server at runtime, deployed to GitHub Pages

**Why:** Build-time data fetching means the site is pure static HTML/CSS/JS. No runtime server needed.

**How to apply:** All dynamic data must be fetched at build time. If adding new dynamic content, add it to `lib/github.ts` or `lib/data.ts`.

## GitHub API Integration

`lib/github.ts` fetches pinned repos via GraphQL with `GITHUB_TOKEN`:
- Query: `user.pinnedItems` (first 12 repositories)
- Fields: name, description, stargazerCount, primaryLanguage, url
- **Fallback**: Hardcoded `FALLBACK_REPOS` array if API fails
- **Exclusion**: `EXCLUDE_REPOS` array filters out the profile repo itself

## Data Architecture

`lib/data.ts` exports all static content:
- `PROFILE` — name, email, location, social links
- `SKILLS` — categorized technology list
- `EXPERIENCES` — 10 professional roles (2011-present)
- `FEATURED_PROJECTS` — 5 highlighted projects
- `ROLES` — typing animation strings
- `SOCIALS` — platform links
- `EDUCATION` — BTech from UNIESP

## UI Features

- Terminal easter egg with CLI emulator (Konami code trigger)
- Typing animation via custom `useTyping()` hook
- Scroll progress indicator via `useScrollProgress()`
- Fade-in animations via `useReveal()` (IntersectionObserver)
- Dark terminal aesthetic with green accent color
- Print-optimized resume at `/resume` with A4 CSS
