# Portfolio Overhaul Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Overhaul `jonathanperis.github.io` while preserving the existing dark terminal/developer aesthetic, improving credibility, conversion, accessibility, and A/B-test readiness.

**Architecture:** Keep the Astro + React + Tailwind structure. Refactor `Portfolio.tsx` into clearer data-driven sections, add semantic/a11y improvements, and introduce lightweight variant hooks without adding a full analytics framework. Preserve the current visual language while replacing generic portfolio patterns with proof-oriented, Jonathan-specific modules.

**Tech Stack:** Astro 6, React 19, TypeScript 6, Tailwind CSS 4, Bun via mise, GitHub Pages static output.

---

## Progress Snapshot

**Repo/path:** `/opt/data/github/jonathanperis/jonathanperis.github.io`

**Branch/ref inspected:** `main`, synced to `origin/main` before critique.

**Working tree before this plan:**
- `?? .impeccable/`
- Plan file being added under `docs/plans/`.

**Prior reports consulted:**
- `.impeccable/critique/2026-05-16T20-49-01Z__src-components-portfolio-tsx.md`

**Evidence checked:**
- Local preview at `http://127.0.0.1:4321/`
- `bun run build` using mise Node 24, passed
- `npx impeccable detect --json src/components/Portfolio.tsx src/pages/index.astro`, returned `[]`
- Impeccable live overlay failed with `Warning: cannot access live`
- Plain Node 20 is unsupported by Astro, use Node 22+; the workspace mise default is Node 24
- `@astrojs/check` should be installed so `bun run lint` runs non-interactively

| Lane | Planning progress | Evidence checked | Implementation status | Validation status |
|---|---:|---|---|---|
| Positioning and copy | 100% | Critique plus user decision: hybrid, no fintech in availability line | Not started | Not started |
| Hero and CTA redesign | 100% | Existing `Portfolio.tsx` hero reviewed | Not started | Not started |
| Proof console and content density | 100% | Current `developer.ts`, About, Stack, Experience reviewed | Not started | Not started |
| Project hierarchy | 100% | `FEATURED_PROJECTS` and GitHub repo feed reviewed | Not started | Not started |
| Accessibility hardening | 100% | Manual and delegated technical assessment | Not started | Not started |
| A/B testing hooks | 100% | Existing Analytics component and static architecture reviewed | Not started | Not started |
| Verification and docs | 100% | Build/lint state reviewed | Not started | Not started |

**Overall planning progress:** Complete. No production code has been changed by this plan.

---

## Acceptance Criteria

1. The availability line does not mention fintech roles.
2. The hero status reads close to: `Open to remote roles and select backend architecture consulting.`
3. Hero has clear CTA hierarchy:
   - Primary: `View resume`
   - Secondary: `Contact on LinkedIn`
   - Tertiary/social: GitHub and other social links
4. Proof appears above the fold via chips or compact proof module.
5. Generic `developer.ts` content is replaced by proof-oriented terminal/editor content.
6. About, Stack, Experience, and Projects become faster to scan.
7. Projects are categorized so professional/backend credibility is not diluted by experiments.
8. Section labels are semantic headings.
9. Keyboard focus is visible across all interactive elements.
10. Terminal overlay has dialog semantics and focus management.
11. Reduced-motion users get simplified behavior.
12. No nested clickable non-interactive elements remain.
13. Build passes with Node 22+ and Bun.
14. A/B test variants can be selected by query param or local deterministic variant helper.

---

## Design Direction

### Preserve
- Near-black graphite background.
- Green terminal accent.
- Mono labels and code/editor references.
- Large serif name as the brand moment.
- Subtle noise, dot grid, and glow.
- Sticky compact nav.
- Hidden terminal easter egg.

### Change
- Availability copy becomes hybrid but not fintech-specific.
- Proof appears earlier.
- CTA path becomes explicit.
- `developer.ts` becomes an evidence artifact, not identity repetition.
- Paragraph-heavy sections become scannable proof modules.
- Tags become secondary support, not the main content.
- Accessibility and motion are production-grade.

### Selected availability copy
Use this as the default unless the user overrides later:

```txt
Open to remote roles and select backend architecture consulting.
```

---

## Task 1: Add explicit design data structures

**Objective:** Move hero proof, CTAs, principles, capability groups, and project categories into `src/lib/data.ts` so the UI is easier to reshape without hardcoded copy scattered in JSX.

**Files:**
- Modify: `src/lib/data.ts`
- Modify later consumers: `src/components/Portfolio.tsx`

**Step 1: Add data exports**

Add near the existing `PROFILE` and `SKILLS` exports:

```ts
export const AVAILABILITY = {
  status: "Open to remote roles and select backend architecture consulting.",
  shortStatus: "Open to remote roles + consulting",
};

export const HERO_PROOF = [
  { label: "12+ yrs", detail: "enterprise software" },
  { label: ".NET + Azure", detail: "backend systems" },
  { label: "Architecture", detail: "CQRS, DDD, cloud-native" },
  { label: "Remote", detail: "Brazil to US teams" },
];

export const ENGINEERING_PRINCIPLES = [
  {
    label: "Reliability first",
    detail: "Systems should fail predictably, recover cleanly, and stay observable.",
  },
  {
    label: "Architecture with pressure",
    detail: "Use CQRS, DDD, and boundaries where they reduce real operational cost.",
  },
  {
    label: "Delivery discipline",
    detail: "CI/CD, tests, and small releases beat heroic deploys.",
  },
];

export const CAPABILITY_GROUPS = [
  {
    label: "Backend",
    command: "stack.backend",
    items: ["C#", ".NET Core+", "ASP.NET Core", "Go", "Rust", "Python"],
  },
  {
    label: "Architecture",
    command: "stack.architecture",
    items: ["CQRS", "DDD", "Microservices", "Hexagonal", "Clean Architecture"],
  },
  {
    label: "Cloud + Delivery",
    command: "stack.delivery",
    items: ["Azure", "Docker", "Kubernetes", "Azure DevOps", "CI/CD"],
  },
  {
    label: "Data",
    command: "stack.data",
    items: ["SQL Server", "PostgreSQL", "Entity Framework"],
  },
];

export const PROJECT_CATEGORIES = [
  {
    label: "Architecture and backend systems",
    slugs: ["cpnucleo", "rinha2-back-end-dotnet"],
  },
  {
    label: "Performance and load testing",
    slugs: ["rinha2-back-end-k6"],
  },
  {
    label: "Games and experiments",
    slugs: ["speedy-bird-lynx", "super-mango-editor"],
  },
];
```

**Step 2: Run type/build check**

Run:

```bash
/opt/data/.local/bin/mise exec -- bun run build
```

Expected: build passes.

**Step 3: Commit if implementing**

```bash
git add src/lib/data.ts
git commit -m "feat: add portfolio overhaul content model"
```

---

## Task 2: Replace hero availability and add CTA hierarchy

**Objective:** Make the top fold communicate hybrid availability and give visitors explicit next actions.

**Files:**
- Modify: `src/components/Portfolio.tsx`
- Modify: `src/lib/data.ts` if CTA URLs need centralization

**Step 1: Update imports**

Change the data import in `Portfolio.tsx` to include the new exports:

```ts
import {
  AVAILABILITY,
  HERO_PROOF,
  ROLES,
  EXPERIENCES,
  SOCIALS,
  FEATURED_PROJECTS,
  SKILLS,
} from "../lib/data";
```

**Step 2: Replace availability badge copy**

Replace the hardcoded `Available for hire` span with:

```tsx
<span className="font-mono text-xs" style={{ color: 'var(--color-violet)' }}>
  {AVAILABILITY.shortStatus}
</span>
```

**Step 3: Add hero CTAs below summary**

Insert before the social icon row:

```tsx
<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
  <a
    href="/resume"
    className="inline-flex items-center justify-center rounded-lg px-4 py-2 font-mono text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
    style={{ color: 'var(--color-bg)', background: 'var(--color-violet)' }}
  >
    View resume
  </a>
  <a
    href="https://www.linkedin.com/in/jonathan-peris/"
    target="_blank"
    rel="noreferrer noopener"
    className="inline-flex items-center justify-center rounded-lg border px-4 py-2 font-mono text-sm font-semibold text-text transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
    style={{ borderColor: 'rgba(74,222,128,0.3)', background: 'var(--color-violet-tint)' }}
  >
    Contact on LinkedIn
  </a>
</div>
```

**Step 4: Move social icons lower emphasis**

Change the social wrapper from `mt-8` to `mt-5` and add `aria-label` to all footer equivalents later.

**Step 5: Run verification**

```bash
/opt/data/.local/bin/mise exec -- bun run build
```

Expected: build passes and hero shows the new status plus two CTAs.

---

## Task 3: Add proof chips above the fold

**Objective:** Surface credibility without forcing visitors to read paragraphs.

**Files:**
- Modify: `src/components/Portfolio.tsx`
- Modify: `src/styles/globals.css`

**Step 1: Add chip markup after hero summary or CTA block**

```tsx
<div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
  {HERO_PROOF.map((item) => (
    <div key={item.label} className="proof-chip">
      <span className="proof-chip-label">{item.label}</span>
      <span className="proof-chip-detail">{item.detail}</span>
    </div>
  ))}
</div>
```

**Step 2: Add styles**

Append to `globals.css`:

```css
.proof-chip {
  border: 1px solid rgba(74, 222, 128, 0.16);
  border-radius: 10px;
  background: rgba(74, 222, 128, 0.045);
  padding: 0.75rem 0.85rem;
}
.proof-chip-label {
  display: block;
  color: var(--color-text);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
}
.proof-chip-detail {
  display: block;
  margin-top: 0.2rem;
  color: var(--color-muted);
  font-size: 0.75rem;
  line-height: 1.35;
}
```

**Step 3: Visual check**

Run preview:

```bash
/opt/data/.local/bin/mise exec -- bun run preview --host 127.0.0.1 --port 4321
```

Expected: proof chips fit desktop and wrap cleanly on mobile.

---

## Task 4: Replace `developer.ts` with proof-oriented artifact

**Objective:** Keep the code/editor aesthetic while making the card prove judgment and fit the hybrid availability strategy.

**Files:**
- Modify: `src/components/Portfolio.tsx`

**Step 1: Rename card label**

Change titlebar label from `developer.ts` to:

```tsx
<span className="font-mono text-xs text-dim">systems.report</span>
```

**Step 2: Replace code body**

Replace the code block object with a command/log-style artifact:

```tsx
<code>
  <span className="text-dim">$</span> <span className="text-text">cat systems.report</span>{"\n"}
  <span className="text-green">status</span><span className="text-dim">:</span> <span className="text-text">{AVAILABILITY.status}</span>{"\n"}
  <span className="text-green">focus</span><span className="text-dim">:</span> <span className="text-text">backend architecture, delivery discipline, reliable systems</span>{"\n"}
  <span className="text-green">runtime</span><span className="text-dim">:</span> <span className="text-text">12+ years across fintech, automotive, EdTech, healthcare, retail</span>{"\n"}
  <span className="text-green">toolchain</span><span className="text-dim">:</span> <span className="text-text">C#, .NET, Azure, Docker, SQL Server, PostgreSQL</span>{"\n"}
  <span className="text-green">mode</span><span className="text-dim">:</span> <span className="text-cyan">remote-first</span>
</code>
```

**Step 3: Confirm no horizontal overflow regression**

Use browser at 320px, 390px, and desktop widths.

Expected: code block scrolls horizontally only if needed, layout does not break.

---

## Task 5: Make SectionLabel semantic and numbered

**Objective:** Keep the current section-label visual style while fixing document outline and adding stronger rhythm.

**Files:**
- Modify: `src/components/Portfolio.tsx`
- Modify: `src/styles/globals.css` if needed

**Step 1: Replace component signature**

```tsx
function SectionLabel({
  children,
  number,
  id,
}: {
  children: ReactNode;
  number: string;
  id?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <h2 id={id} className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-green)' }}>
        <span className="text-dim">{number}</span>
        <span>{children}</span>
      </h2>
      <span className="section-label-line" aria-hidden="true" />
    </div>
  );
}
```

**Step 2: Update usages**

Use exact labels:

```tsx
<SectionLabel number="01" id="about-heading">About</SectionLabel>
<SectionLabel number="02" id="stack-heading">Stack</SectionLabel>
<SectionLabel number="03" id="experience-heading">Experience</SectionLabel>
<SectionLabel number="04" id="projects-heading">Featured Projects</SectionLabel>
<SectionLabel number="05" id="more-projects-heading">More Projects</SectionLabel>
```

**Step 3: Add aria-labelledby on sections**

For example:

```tsx
<section id="about" aria-labelledby="about-heading" className="py-16 scroll-mt-20">
```

**Step 4: Verify outline**

Use browser accessibility snapshot or DevTools.

Expected: one `h1`, then meaningful `h2` section headings, then `h3` entries.

---

## Task 6: Distill About into positioning plus principles

**Objective:** Reduce dense prose and make the About section communicate what Jonathan builds and how he thinks.

**Files:**
- Modify: `src/components/Portfolio.tsx`
- Modify: `src/lib/data.ts`

**Step 1: Replace About paragraphs with two-column layout**

Use this content direction:

```tsx
<div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
  <div className="space-y-4 text-base leading-relaxed text-muted">
    <p>
      I build backend systems that need to stay understandable under pressure: financial modules, enterprise workflows, integrations, and delivery pipelines where correctness matters.
    </p>
    <p>
      My strongest work sits between architecture and execution: shaping boundaries, keeping delivery automated, and making systems easier to operate after they ship.
    </p>
  </div>
  <div className="grid gap-3">
    {ENGINEERING_PRINCIPLES.map((item) => (
      <div key={item.label} className="card p-4">
        <h3 className="font-mono text-sm font-semibold text-text">{item.label}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
      </div>
    ))}
  </div>
</div>
```

**Step 2: Verify tone**

Expected: About reads less like resume prose and more like positioning.

---

## Task 7: Convert Stack to capability matrix

**Objective:** Replace generic skill-card grid with a clearer system-oriented capability matrix.

**Files:**
- Modify: `src/components/Portfolio.tsx`
- Modify: `src/lib/data.ts`

**Step 1: Import `CAPABILITY_GROUPS`**

Add to import list.

**Step 2: Replace Stack section body**

```tsx
<div className="grid gap-3 max-w-5xl">
  {CAPABILITY_GROUPS.map((group, i) => (
    <Reveal key={group.label} delay={i * 60}>
      <div className="card grid gap-4 p-4 md:grid-cols-[180px_1fr] md:items-center">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-dim">{group.label}</p>
          <p className="mt-1 font-mono text-xs text-green">{group.command}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {group.items.map((item) => (
            <span key={item} className="tag">{item}</span>
          ))}
        </div>
      </div>
    </Reveal>
  ))}
</div>
```

**Step 3: Verify visual rhythm**

Expected: stack scans as system capabilities, not a generic tag cloud.

---

## Task 8: Convert Experience to impact snapshots

**Objective:** Make experience entries scannable and outcome-oriented while preserving timeline style.

**Files:**
- Modify: `src/lib/data.ts`
- Modify: `src/components/Portfolio.tsx`

**Step 1: Extend `Experience` type**

```ts
export type Experience = {
  period: string;
  title: string;
  company: string;
  location: string;
  description: string;
  impact?: string[];
  tags: string[];
};
```

**Step 2: Add impact arrays to current and recent roles first**

Start with the first 3 to 5 roles. Example:

```ts
impact: [
  "Develops core financial modules for General Ledger, Hedge Accounting, and Fiscal Calendar workflows.",
  "Works in a clean architecture environment with .NET, SQL Server, CQRS, and Azure DevOps.",
],
```

**Step 3: Render impact bullets when present**

After description:

```tsx
{exp.impact && (
  <ul className="mb-3 space-y-1.5 text-sm text-muted">
    {exp.impact.map((item) => (
      <li key={item} className="flex gap-2">
        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
)}
```

**Step 4: Verify density**

Expected: current role is stronger and easier to scan. Older roles can remain shorter.

---

## Task 9: Categorize Featured Projects

**Objective:** Separate professional/backend credibility from games and experiments without hiding personality.

**Files:**
- Modify: `src/components/Portfolio.tsx`
- Modify: `src/lib/data.ts`

**Step 1: Import `PROJECT_CATEGORIES`**

Add to import list.

**Step 2: Build grouped project rendering**

Inside Projects section, replace single `FEATURED_PROJECTS.map` with category groups:

```tsx
{PROJECT_CATEGORIES.map((category) => {
  const items = category.slugs
    .map((slug) => FEATURED_PROJECTS.find((project) => project.slug === slug))
    .filter(Boolean) as typeof FEATURED_PROJECTS;

  return (
    <div key={category.label} className="mb-8 last:mb-0">
      <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-dim">{category.label}</h3>
      <div className="bento-grid">
        {items.map((fp, i) => {
          // reuse existing card rendering
        })}
      </div>
    </div>
  );
})}
```

**Step 3: Preserve existing card visual style**

Do not redesign cards from scratch in this task. Only regroup and label.

**Step 4: Verify order**

Expected category order:
1. Architecture and backend systems
2. Performance and load testing
3. Games and experiments

---

## Task 10: Fix nested clickable project action

**Objective:** Make the More Projects card actions keyboard-accessible and semantically valid.

**Files:**
- Modify: `src/components/Portfolio.tsx`

**Step 1: Replace outer card anchor with article/card containing separate links**

For More Projects, replace:

```tsx
<a href={p.url} ... className="card card-glow p-5 block group h-full">
```

with:

```tsx
<article className="card card-glow p-5 h-full group">
```

Then make title/source an explicit link:

```tsx
<a href={p.url} target="_blank" rel="noreferrer noopener" className="font-mono text-sm font-semibold text-text transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
  {p.title}
</a>
```

**Step 2: Replace clickable span with anchor**

```tsx
{p.homepageUrl && (
  <a
    href={p.homepageUrl}
    target="_blank"
    rel="noreferrer noopener"
    className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold border rounded-md px-2 py-0.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
    style={{ color: 'var(--color-violet-light)', borderColor: 'rgba(74,222,128,0.3)', background: 'var(--color-violet-tint)' }}
  >
    Visit website
  </a>
)}
```

**Step 3: Verify keyboard**

Tab through More Projects.

Expected: source and website links are both reachable and activate with Enter.

---

## Task 11: Add focus-visible and reduced-motion CSS

**Objective:** Make the site usable for keyboard and motion-sensitive users.

**Files:**
- Modify: `src/styles/globals.css`

**Step 1: Add global focus styling**

Append:

```css
:where(a, button, input, [tabindex]):focus-visible {
  outline: 2px solid var(--color-violet-light);
  outline-offset: 4px;
}
```

**Step 2: Add reduced motion behavior**

Append:

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .reveal {
    opacity: 1;
    transform: none;
  }
}
```

**Step 3: Verify**

Use browser reduced-motion emulation.

Expected: content remains visible and distracting animations are suppressed.

---

## Task 12: Harden terminal dialog semantics

**Objective:** Make the easter egg terminal accessible without removing the feature.

**Files:**
- Modify: `src/components/Portfolio.tsx`

**Step 1: Add dialog attributes to overlay content**

On the terminal panel div, add:

```tsx
role="dialog"
aria-modal="true"
aria-labelledby="terminal-title"
```

On title text:

```tsx
<span id="terminal-title" className="font-mono text-xs text-dim ml-2">jonathan.sh</span>
```

**Step 2: Preserve focus return**

Create a ref for the last focused element before opening:

```ts
const lastFocusedRef = useRef<HTMLElement | null>(null);
```

When opening terminal via Konami, set:

```ts
lastFocusedRef.current = document.activeElement as HTMLElement | null;
setTermOpen(true);
```

When closing, return focus:

```ts
const closeTerminal = useCallback(() => {
  setTermOpen(false);
  setTermHist(['  Welcome to jonathan.sh v2.0', '  Type "help" for commands.', '']);
  requestAnimationFrame(() => lastFocusedRef.current?.focus());
}, []);
```

Replace direct `setTermOpen(false)` close calls with `closeTerminal()` where appropriate.

**Step 3: Add simple focus trap**

On terminal keydown wrapper, if Tab is pressed, cycle between close button and input.

Minimal acceptable implementation:
- Close button has a ref.
- Input already has `termInRef`.
- Tab on input moves to close button.
- Shift+Tab on close button moves to input.

**Step 4: Verify**

Trigger terminal and test:
- Escape closes.
- Tab stays inside terminal.
- Focus returns after close.

---

## Task 13: Hide decorative SVGs and fix footer labels

**Objective:** Reduce accessibility tree noise and make icon-only links robust.

**Files:**
- Modify: `src/components/Portfolio.tsx`

**Step 1: Add `aria-hidden="true"` to decorative SVGs**

For SVG icons inside links that already have visible text, add:

```tsx
aria-hidden="true"
focusable="false"
```

**Step 2: Add `aria-label` to footer social links**

Change footer links to:

```tsx
<a
  key={s.label}
  href={s.href}
  target="_blank"
  rel="noreferrer noopener"
  title={s.label}
  aria-label={s.label}
  className="text-dim transition-colors"
>
```

**Step 3: Verify accessibility snapshot**

Expected: icon-only social links have names and decorative SVGs are not announced as extra content.

---

## Task 14: Add simple A/B variant helper

**Objective:** Allow manual A/B testing without adding runtime dependencies or server infrastructure.

**Files:**
- Modify: `src/components/Portfolio.tsx`

**Step 1: Add variant hook**

```ts
function useVariant(name: string, fallback: 'a' | 'b' = 'a') {
  const [variant, setVariant] = useState<'a' | 'b'>(fallback);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get(name);
    if (raw === 'a' || raw === 'b') {
      setVariant(raw);
      return;
    }
    const stored = window.localStorage.getItem(`jp:${name}`);
    if (stored === 'a' || stored === 'b') {
      setVariant(stored);
      return;
    }
    const assigned = Math.random() < 0.5 ? 'a' : 'b';
    window.localStorage.setItem(`jp:${name}`, assigned);
    setVariant(assigned);
  }, [name]);

  return variant;
}
```

**Step 2: Wire only one initial experiment**

Use `heroProofVariant = useVariant('heroProof', 'b')`.

- Variant `a`: no proof chips.
- Variant `b`: proof chips visible.

Do not wire every proposed test at once. Start with one clean experiment.

**Step 3: Add lightweight event labels if GA is present**

If `window.gtag` exists, send CTA clicks:

```ts
function trackEvent(name: string, params: Record<string, string>) {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.('event', name, params);
}
```

Use on resume and LinkedIn CTAs.

**Step 4: Verify variants**

Open:

```txt
http://127.0.0.1:4321/?heroProof=a
http://127.0.0.1:4321/?heroProof=b
```

Expected: proof chips hide/show accordingly.

---

## Task 15: Mobile and responsive polish

**Objective:** Ensure the updated layout works at narrow widths.

**Files:**
- Modify: `src/components/Portfolio.tsx`
- Modify: `src/styles/globals.css`

**Step 1: Review nav at small widths**

Test widths:
- 320px
- 360px
- 375px
- 390px
- 430px

Expected: no horizontal page scroll and tap targets remain usable.

**Step 2: If nav crowds, hide one secondary link**

Acceptable minimal adjustment:

```tsx
<a key={s} href={`#${s}`} className="hidden font-mono text-xs text-dim hover:text-text transition-colors sm:inline">
```

Keep `resume` visible.

**Step 3: Verify code block and chips**

Expected: code block can scroll internally, proof chips wrap, no page-level horizontal overflow.

---

## Task 16: Update stale repo guidance

**Objective:** Fix documentation drift that says this is a Next.js project even though it is Astro.

**Files:**
- Modify: `CLAUDE.md`
- Optional Modify: `README.md` if it also contains stale framework commands

**Step 1: Update tech stack references**

Replace Next.js references with:

```md
Personal developer portfolio built with Astro 6, React 19, TypeScript 6, and Tailwind CSS 4, deployed as a static site to GitHub Pages.
```

**Step 2: Update command table**

Use:

```md
bun run dev       # Astro dev server
bun run build     # Static output to ./out
bun run preview   # Preview built output
bun run lint      # Astro check
```

**Step 3: Add environment note**

```md
Use Node 22+ for local builds. The workspace mise default is Node 24, and Astro 6 rejects Node 20.
```

**Step 4: Verify docs no longer mention Next.js architecture**

Run:

```bash
rg "Next|next.config|App Router|RSC|Server Components" CLAUDE.md README.md wiki || true
```

Expected: no stale Next.js-only guidance unless historical context is explicitly labeled.

---

## Task 17: Final verification pass

**Objective:** Prove the implementation works and does not regress build, accessibility basics, or responsive behavior.

**Files:**
- No code changes unless verification finds defects

**Step 1: Build**

```bash
/opt/data/.local/bin/mise exec -- bun run build
```

Expected: build passes.

**Step 2: Run detector**

```bash
npx impeccable detect --json src/components/Portfolio.tsx src/pages/index.astro
```

Expected: `[]` or reviewed findings with false positives documented.

**Step 3: Preview**

```bash
/opt/data/.local/bin/mise exec -- bun run preview --host 127.0.0.1 --port 4321
```

Expected: site loads at `http://127.0.0.1:4321/`.

**Step 4: Manual browser checks**

Verify:
- Hero status uses selected copy and does not mention fintech roles.
- Resume CTA works.
- LinkedIn CTA opens LinkedIn.
- Proof chips render for `?heroProof=b` and hide for `?heroProof=a`.
- About is shorter and clearer.
- Stack scans as capabilities.
- Experience contains impact bullets.
- Projects are categorized.
- Tab order works through nav, hero CTAs, social links, projects, footer.
- Terminal opens via Konami, traps focus, and closes with Escape.
- Reduced motion keeps content visible.
- No horizontal page scroll at 320px.

**Step 5: Stop preview server**

Do not leave temporary server running.

**Step 6: Final status**

```bash
git status --short
```

Expected: only intentional files changed.

---

## Suggested Commit Breakdown

If implementing, commit in this order:

1. `feat: add portfolio overhaul content model`
2. `feat: sharpen portfolio hero positioning`
3. `feat: add proof-oriented portfolio sections`
4. `feat: categorize featured portfolio projects`
5. `fix: harden portfolio accessibility interactions`
6. `feat: add portfolio ab variant hook`
7. `docs: update portfolio project guidance`
8. `docs: add portfolio overhaul implementation plan`

---

## Post-Implementation Review Checklist

- [ ] Impeccable critique score improves from 28/40.
- [ ] Availability line does not mention fintech roles.
- [ ] Dark terminal aesthetic is preserved.
- [ ] Top fold feels more credible, not louder.
- [ ] Recruiter path is clear.
- [ ] Engineering-manager proof is easier to find.
- [ ] Keyboard flow is usable.
- [ ] Motion-sensitive users are supported.
- [ ] Mobile nav and content do not overflow.
- [ ] Temporary preview server is stopped.

---

## Execution Handoff

Plan complete and saved. Ready to execute using subagent-driven-development, dispatching a fresh subagent per task with spec compliance review and code quality review before moving to the next task.
