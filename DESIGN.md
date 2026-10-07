# DESIGN.md — Jonathan Peris Portfolio (Career Metro Map)

_Implementation status reviewed: 2026-10-07 (source/configuration review). The May 2026 dark-UI overhaul specification is superseded; see [Superseded design](#superseded-design)._

[Documentation index](wiki/index.md) · [Product direction](PRODUCT.md) · [UI source](src/pages/index.astro) · [Components](src/components/) · [Metro model](src/lib/metro.ts) · [Styles](src/styles/globals.css)

## Implementation status

Everything under [Design system](#design-system) through [Accessibility notes](#accessibility-notes) describes shipped source. [Open proposals](#open-proposals) are not implemented. This review checked source, not browser screenshots, contrast measurements, or interaction testing.

| Area | Shipped | Verification gap / proposal |
|---|---|---|
| Visual system | Paper/ink/sign tokens, eight line colors after the São Paulo Metrô, Overpass and Overpass Mono, red "JP" roundel icons | Measured contrast for grey text and white numerals |
| Map | Build-time SVG diagram, line filter, train, "You are here", station and repo links | Hit targets and legibility below 1100px |
| Sections | Station Index, Connections board, Line Guide, Service Notes, Customer Information | Contextual names for repeated board links |
| Terminal | "Control room" native `<dialog>`, same commands and Konami trigger | Browser keyboard and screen-reader checks |
| Motion / focus | Reduced-motion rules, focus-visible outline, CSS-only filter | Full keyboard and reduced-motion validation |

## Design intent

The page reads like transit signage in the Vignelli / São Paulo Metrô tradition: a black station sign, a service-status strip, a schematic map, and departure boards on warm paper. Every metaphor carries data. Stations are real roles, lines are real skill groups or pinned repositories, interchanges are computed from shared skills, and labels stay in plain English.

## Brand attributes

- Senior, not flashy.
- Technical, not cryptic.
- Calm under production pressure.
- Pragmatic architecture over architecture theater.
- Precise, operational, slightly playful.
- Brazilian remote-first engineer comfortable with US teams.

## Design system

### Color tokens

Defined in the `@theme` block of [`src/styles/globals.css`](src/styles/globals.css), so Tailwind utilities such as `bg-sign` and `text-line-1` exist for them.

| Token | Value | Use |
|---|---|---|
| `--color-paper` | `#fbfaf6` | Page background, manifest background |
| `--color-card` | `#ffffff` | Status strip, legend, Customer Information board |
| `--color-ink` | `#151515` | Text, rules, station outlines |
| `--color-sign` | `#161616` | Station sign, section heads, departures board, terminal; theme color |
| `--color-grey` | `#5d5d5a` | Secondary text, captions |
| `--color-hair` | `#d8d6cf` | Hairline dividers |
| `--color-water` | `#d9e6ec` | Coast on the map |

A yellow highlight (`#ffd94d`) is a literal accent for text selection, hovered/focused stations, the lede underline, and `:target` arrival flashes.

### Line colors

Each line has a token `--color-line-N`; any element with `data-line="N"` gets `--line` set to it.

| Line | Name | Color | Roundel numeral | Where |
|---|---|---|---|---|
| 1 | Career | `#e2231a` | white | Map, Station Index, scroll bar, favicon |
| 2 | .NET | `#8f3b97` | white | Map, Line Guide |
| 3 | Azure | `#0455a1` | white | Map, Line Guide; also the focus outline color |
| 4 | Architecture | `#f08a00` | ink | Map, Line Guide |
| 5 | Side Projects | `#007e5e` | white | Map, Connections; also the "Good service" marker |
| 6 | Languages | `#ffc20e` | ink | Line Guide; terminal prompt |
| 7 | Data | `#8d989e` | ink | Line Guide |
| 8 | Frontend | `#00a39a` | ink | Line Guide |

Light line colors (4, 6, 7, 8) carry ink numerals for contrast. Line definitions live in `LINES` in [`src/lib/metro.ts`](src/lib/metro.ts); colors live only in CSS.

### Typography

- **Overpass** (400–900) for everything readable: sign headings at 800–900 weight, body at 400–700. Small uppercase labels use 12px, weight 800, and 0.14–0.16em tracking.
- **Overpass Mono** (400–700) for dates, captions, handles, repository names, and section-head notes.
- Both are self-hosted through the Astro Fonts API with system fallbacks. The terminal body uses the system monospace stack because the `neofetch` art needs box-drawing glyphs Overpass Mono lacks.
- Separator dots are drawn in CSS (`.dsep`) because Overpass sets `·` off-centre; the character stays in the markup for copy/paste.

### Layout

- Content width `--max: 1440px`; side padding `--pad` of 70px, 28px below 1100px, and 18px below 760px.
- Breakpoints: 1100px (map and header), 900px (Connections, Service Notes, Customer Information), 760px (header, status strip, Station Index, Line Guide).
- Wide map art never causes page-level horizontal scroll (`overflow-x: clip` on `html`/`body`).

## Components

| Component | Design |
|---|---|
| `SiteSign` | Black sign band with a thin white top rule; 78px name, bold title and subtitle; line roundels 1–5 (labels for the map filter); arrow nav links: Stations, Connections, Lines, Information, Resume |
| `StatusStrip` | White strip under a 3px ink rule: "Service status" tag, green "Good service" marker, availability, location, mono local time |
| `RouteBullet` | Circular roundel sized in `em`, filled with the line color; decorative unless given a label |
| `SectionHead` | Black sign bar with a roundel (or a symbol slot), 30px heading, mono note |
| `MetroMap` | SVG on a 1440 × 692 viewBox: coast and "Oceano Atlântico" at the origin, 12px routes with concentric rounded corners, white capsules with ink outlines for interchange stations, skill ticks on Azure and Architecture, repo stops on Side Projects, compass and "Diagram not to scale". The title block and legend overlay empty corners and scale with the map using container-query units |
| `StationIndex` | Ordered list, newest first: year column, vertical strip map (Azure, Career, .NET bars with a capsule at each stop), role body, and line roundels with tags. The terminus has a "You are here" badge; education closes the list as "Depot" |
| `Connections` | Departures board on the sign color: Plat., Destination, Language, Board (links), Stars. "Later departures" is a native `<details>` list |
| `LineGuide` | Two-column grid of six lines; each is a horizontal track with stop ticks. Interchange skills get an outlined capsule and "change for N" |
| `ServiceNotes` | Three advisories with a yellow warning triangle, scope (all lines or a line roundel), principle, and an effect line |
| `CustomerInfo` | Bordered two-pane block: "Now boarding" availability board with Based / Works / Timetable (Resume · PDF), and contact rows (label, mono handle, arrow) that invert to black on hover/focus |
| `SiteFooter` | Mono row: diagram note, "Hidden service" Konami hint, copyright |
| `Terminal` | "Control room · jonathan.sh" dialog: sign background, ink border, red offset shadow, yellow prompt |
| `/resume/` | White A4 sheet on paper under a black toolbar; red title line, accent bar, small red caps section heads with hairline rules, skills label/value table, "Title · Company" entries with red company, mono dates/locations, red-dot bullets, and mono "Stack:" lines; prints in color on A4 |

## Interaction rules

- **Line filter** — The legend is a radio group (`#line-all`, `#line-1` … `#line-5`) with visually hidden inputs. `:has()` rules dim every `[data-lines]` element in the map and Station Index that the chosen line does not serve (map elements to 0.12 opacity, others to 0.3). Hovering a legend entry previews a line on the map while "All lines" is selected. Header roundels are labels for the same radios. No JavaScript.
- **Map to detail** — Stations link to `#stn-<id>` Station Index rows and repo stops link to `#repo-<name>` board rows; the target row flashes yellow (a dark olive on the black board) via `:target`. Hover and focus fill the station yellow and underline its name.
- **Train** — A CSS motion-path train rides the Career line once on load and waits before the terminus. It renders only under `@supports (offset-path: …)`.
- **You are here** — A ring pulses around the terminus after the train arrives, only with `prefers-reduced-motion: no-preference`.
- **Clock** — The status strip renders `UTC−3` on the server; a small script shows live `America/Sao_Paulo` time, refreshed every 30 seconds.
- **Scroll progress** — A 2px Career-red bar uses `animation-timeline: scroll()`, with a JavaScript fallback.

## Responsive behavior

- **Below 1100px** — The map's title block and legend stop overlaying and stack above and below it. The map keeps a readable 1180px width inside a horizontal scroller that starts at the right edge ("You are here") through a `direction: rtl` container, with a "Swipe back to 2011" hint. The header name shrinks, and the status strip drops the location.
- **Below 900px** — The Connections table becomes stacked rows; Service Notes and Customer Information become single columns.
- **Below 760px** — The header stacks with wrapping nav; the Station Index moves dates into the body and narrows the strip; Line Guide tracks turn vertical; section-head notes are hidden.

## Accessibility notes

- Landmarks and headings: header nav labeled "Primary navigation", `<main>`, and each section labeled by its `SectionHead` heading.
- The map SVG is `role="group"` with a route label; decorative paths, ticks, the train, and the compass are `aria-hidden`. Each station and repo stop is a link with an `aria-label` (name and period, or repository and language).
- Roundels are decorative unless labeled; header roundels include screen-reader text naming the line. Light lines use ink numerals.
- Focus-visible uses a 3px line-3 blue outline; legend radios show it on their label.
- Content, links, and the line filter work without JavaScript. Dimming changes opacity only, so dimmed elements stay in reading order.
- `prefers-reduced-motion: reduce` shortens animations and transitions to effectively none (the train appears at its resting point), disables the pulse, and turns off smooth scrolling. The scroll bar still tracks scroll position.
- The terminal is a labeled native modal `<dialog>` with browser focus containment, Escape/close/backdrop exit, and focus restoration.

## Open proposals

Still applicable and not implemented:

- Contextual accessible names for repeated board links (e.g. "Source for repo-name" rather than "Source").
- Authored `signal`/`proof` copy for pinned repositories on the Connections board.
- Owner-approved impact statements in the Station Index.
- A visible contact action near the top of the page, tested against the current resume-first header link (see [PRODUCT](PRODUCT.md#open-proposals)).
- Lightweight variant support (query parameter, optional `localStorage` persistence, variant in analytics payloads) if experiments are run.

## QA checklist

Before merging UI changes:

- Run `bun run lint` and `bun run build`.
- With explicit browser-testing authorization, inspect 390px, 768px, 1024px, and 1440px; confirm no page-level horizontal overflow and that the mobile map opens on "You are here".
- Verify the line filter from both the legend and header roundels, station and repo anchor links, and `:target` highlights.
- Verify the resume route, PDF link, external social/project links, and analytics labels.
- Verify the terminal opens with the Konami code, closes, and returns focus.
- Verify reduced-motion behavior and that a removed or renamed role fails the build rather than drawing a ghost station.

## Superseded design

The 2026-05-17 overhaul specification refined the previous dark terminal UI: OKLCH green-black palette, DM Sans and JetBrains Mono, an identity hero with a `deploy-ledger.yaml` card and operating signals, `TRACE NN` section labels, reveal-on-scroll motion, Workbench case-file cards, and a YAML contact packet. The Career Metro Map redesign replaced that UI and its components, so those specifications no longer apply. The original text is available in git history.
