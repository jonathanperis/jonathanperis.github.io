---
version: alpha
name: Jonathan Peris Developer Portfolio
description: "Systems-console portfolio for a senior backend engineer: precise, dark, operational, and proof-oriented."
colors:
  primary: "#4ADE80"
  background: "#08120D"
  surface: "#101C15"
  elevated: "#17271D"
  border: "#294333"
  border-strong: "#3B604A"
  text: "#EEF8F0"
  muted: "#B2C8B9"
  dim: "#758B7C"
  accent: "#4ADE80"
  accent-light: "#86EFAC"
  accent-dim: "#22C55E"
  cyan: "#22D3EE"
  purple: "#C084FC"
  amber: "#F59E0B"
  rose: "#FB7185"
typography:
  display:
    fontFamily: DM Sans
    fontSize: 4rem
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.06em"
  h1:
    fontFamily: DM Sans
    fontSize: 3.5rem
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.05em"
  h2:
    fontFamily: DM Sans
    fontSize: 2rem
    fontWeight: 750
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  body:
    fontFamily: DM Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0em"
  small-mono:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  sm: 6px
  md: 12px
  lg: 18px
  xl: 28px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
components:
  page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.muted}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: 24px
  card-hover:
    backgroundColor: "{colors.elevated}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.sm}"
    padding: 12px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.accent-light}"
    rounded: "{rounded.sm}"
    padding: 12px
  button-secondary-hover:
    backgroundColor: "{colors.elevated}"
    textColor: "{colors.accent}"
    rounded: "{rounded.sm}"
    padding: 12px
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.accent-light}"
    rounded: "{rounded.sm}"
    padding: 8px
  chip-muted:
    backgroundColor: "{colors.background}"
    textColor: "{colors.dim}"
    rounded: "{rounded.sm}"
    padding: 8px
  card-outline:
    backgroundColor: "{colors.border}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: 16px
  card-outline-hover:
    backgroundColor: "{colors.border-strong}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: 16px
  terminal:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: 16px
  terminal-prompt:
    backgroundColor: "{colors.background}"
    textColor: "{colors.accent-dim}"
    rounded: "{rounded.sm}"
    padding: 4px
  tag-cyan:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.cyan}"
    rounded: "{rounded.sm}"
    padding: 8px
  tag-purple:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.purple}"
    rounded: "{rounded.sm}"
    padding: 8px
  tag-amber:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.amber}"
    rounded: "{rounded.sm}"
    padding: 8px
  tag-rose:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.rose}"
    rounded: "{rounded.sm}"
    padding: 8px
---

## Overview

This design system supports `PRODUCT.md`: a proof-oriented portfolio for Jonathan Peris, a senior backend/platform engineer. The interface should feel like an operating console, deployment ledger, trace viewer, or systems manual — not like a generic portfolio template.

The visual mood is dark green-black, precise, calm, and technical. It should communicate engineering maturity: clear hierarchy, restrained motion, strong text contrast, and small operational details that reward technical visitors without slowing down recruiters.

The strongest design idea is **developer-ish but not gimmicky**: routes, manifests, chips, ledgers, traces, shell affordances, and repository cards are welcome; fake danger, hacker-roleplay, neon overload, and illegible cyberpunk effects are not.

## Colors

- **Background (`#08120D`)** anchors the site in a dark operational workspace.
- **Surface (`#101C15`)** and **elevated (`#17271D`)** separate cards, panels, and terminal areas without bright boxes.
- **Text (`#EEF8F0`)** is used for important copy and headings.
- **Muted (`#B2C8B9`)** is the default long-form reading color.
- **Dim (`#758B7C`)** is reserved for metadata, timestamps, route labels, and secondary captions.
- **Accent (`#4ADE80`)** is the primary interaction and status color. It implies healthy systems, deploy readiness, and availability.
- **Accent light (`#86EFAC`)** can highlight hover states, active labels, and emphasized links.
- **Cyan, purple, amber, and rose** are supporting syntax/status colors. Use sparingly for language dots, stack tags, or code-like semantics.

Use the accent color as a precision instrument, not a flood fill. Large panels should stay dark; green should mark state, focus, and the most important calls to action.

## Typography

Use **DM Sans** for both display and body text. The brand should feel modern, legible, and engineered rather than editorial or ornamental.

Use **JetBrains Mono** for:

- route-style labels (`/profile`, `/trace`, `/workbench`),
- metadata and timestamps,
- shell content,
- manifest/YAML snippets,
- small tags and status chips.

Large headings should be compact and assertive, with tight negative tracking. Avoid decorative serif display type for this version; the product direction is operational clarity, not magazine polish.

## Layout

The layout should read like a technical dossier:

1. **Hero / command surface:** immediate name, availability, role, remote context, resume/contact CTAs, and a manifest-like proof panel.
2. **Profile packet:** concise summary of Jonathan's value proposition and operating principles.
3. **Capability map:** stack grouped by language, backend, architecture, cloud, data, and frontend.
4. **Experience trace:** chronological production history with the current role visually elevated.
5. **Workbench:** curated featured projects before dynamic repository tail.
6. **Repository tail and footer:** more proof, socials, and shell/easter-egg affordances.

Spacing should be generous enough to feel calm, but dense enough to preserve a systems-console rhythm. Prefer grids, ledgers, and cards over large decorative illustrations.

## Elevation & Depth

Depth is subtle and mostly structural:

- 1px borders for cards and panels.
- Low-opacity green glows only on hero atmosphere, active states, and hover emphasis.
- Noise/dot overlays may add texture, but must stay quiet and never reduce text readability.
- Avoid glassmorphism that makes text sit on unstable backgrounds.

Hover states can lift a card with a stronger border and shadow, but the base page should remain still and professional.

## Shapes

Use mostly rectangular cards with modest rounding:

- `6px` for chips, buttons, and compact tags.
- `12px` for cards and code panels.
- `18px` to `28px` for large hero/terminal surfaces.

Do not use pill shapes everywhere. Reserve pills for availability/status indicators and high-level signals.

## Components

### Navigation

Navigation may use route-like labels and should stay sticky. Keep the resume/contact path visible and obvious.

### Hero manifest / deploy ledger

The hero proof panel may resemble YAML, a deploy ledger, or a terminal card. It should contain truthful product signals: experience, current lane, location/remote fit, availability, and key stack.

### Cards

Cards should be information-dense but not cramped. Each card needs a clear title, metadata, and one concise proof statement. Featured project cards can use language color accents, but the surrounding panel should remain in the main palette.

### Tags and chips

Tags are metadata, not decoration. Use them to make stack and domain fit scannable. Avoid turning every noun into a chip.

### Terminal / shell

The shell is a progressive enhancement and personality layer. It must not be the only way to access resume, contact, stack, or availability information. Keyboard behavior should be predictable: `Enter` submits, `Escape` closes, and focus is visible.

### CTAs

Primary CTA: resume/contact/hire path. Secondary CTA: GitHub, LinkedIn, project links, or open shell. CTAs should use clear verbs and preserve native link behavior.

## Do's and Don'ts

### Do

- Make seniority, .NET/backend depth, remote readiness, and availability visible immediately.
- Use operational metaphors: traces, manifests, ledgers, workbench, status, signals.
- Keep claims tied to proof: current role, project links, stack groups, and work history.
- Keep contrast high and body copy readable on dark backgrounds.
- Use CSS-first motion and respect reduced-motion preferences when adding new animation.
- Keep frequently edited content in `src/lib/data.ts`.

### Don't

- Don't make the site feel like a crypto, hacker, cyberpunk, or gaming landing page.
- Don't hide contact or resume behind easter eggs.
- Don't overuse neon green, blur, scanlines, or fake terminal noise.
- Don't inflate claims beyond what `PRODUCT.md`, work history, and repositories support.
- Don't replace human clarity with clever labels; route-style copy must still be understandable.
- Don't introduce heavy runtime dependencies for purely decorative effects.
