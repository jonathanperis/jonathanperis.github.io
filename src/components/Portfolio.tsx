import { useEffect, useState, useRef, useCallback } from "react";
import type { ReactNode, KeyboardEvent } from "react";
import type { GitHubRepo } from "../lib/github";
import {
  AVAILABILITY,
  CAPABILITY_GROUPS,
  ENGINEERING_PRINCIPLES,
  EXPERIENCES,
  FEATURED_PROJECTS,
  HERO_PROOF,
  PROJECT_CATEGORIES,
  ROLES,
  SOCIALS,
} from "../lib/data";


// ─────────────────────────────────────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────────────────────────────────────

function useTyping(strings: string[], speed = 80, deleteSpeed = 40, pause = 2200) {
  const [text, setText] = useState('');
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[idx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length === current.length) {
          setTimeout(() => setDeleting(true), pause);
          return;
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) {
          setDeleting(false);
          setIdx((i) => (i + 1) % strings.length);
        }
      }
    }, deleting ? deleteSpeed : speed);
    return () => clearTimeout(timeout);
  }, [text, idx, deleting, strings, speed, deleteSpeed, pause]);

  return text;
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); obs.unobserve(el); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, shown };
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const h = () => { const t = document.documentElement.scrollHeight - window.innerHeight; setP(t > 0 ? window.scrollY / t : 0); };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return p;
}

function useVariant(name: string, fallback: 'a' | 'b' = 'a') {
  const [variant, setVariant] = useState<'a' | 'b'>(fallback);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get(name);
    const key = `jp:${name}`;

    if (raw === 'a' || raw === 'b') {
      try { window.localStorage.setItem(key, raw); } catch { /* Storage may be unavailable in restricted browsers. */ }
      setVariant(raw);
      return;
    }

    let stored: string | null = null;
    try { stored = window.localStorage.getItem(key); } catch { stored = null; }

    if (stored === 'a' || stored === 'b') {
      setVariant(stored);
      return;
    }

    try { window.localStorage.setItem(key, fallback); } catch { /* Storage may be unavailable in restricted browsers. */ }
    setVariant(fallback);
  }, [fallback, name]);

  return variant;
}

function trackEvent(name: string, params: Record<string, string>) {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.('event', name, params);
}

// ─────────────────────────────────────────────────────────────────────────────
// Small components
// ─────────────────────────────────────────────────────────────────────────────

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, shown } = useReveal();
  return <div ref={ref} className={`reveal ${shown ? 'shown' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

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

// ─────────────────────────────────────────────────────────────────────────────
// Terminal easter egg
// ─────────────────────────────────────────────────────────────────────────────

const NEOFETCH = [
  '',
  '   ██╗██████╗     jonathan@dev',
  '   ██║██╔══██╗    ──────────────────',
  '   ██║██████╔╝    OS:        Astro 6 / GitHub Pages',
  '██ ██║██╔═══╝     Shell:     TypeScript 6.x',
  '╚███╔╝██║         Uptime:    12+ years in tech',
  ' ╚══╝ ╚═╝         Packages:  React 19, Tailwind v4',
  '                   Languages: C#, Rust, Go, Python, TS',
  '                   Location:  Itanhaém, Brazil 🇧🇷',
  '',
];

function runCmd(cmd: string): string[] {
  const c = cmd.trim().toLowerCase();
  const map: Record<string, string[]> = {
    help: ['', '  help · about · skills · contact · neofetch', '  ls · cat about.txt · git log · whoami · pwd · date', '  sudo hire me · rm -rf / · clear · exit', ''],
    whoami: ['jonathan.peris — Software Engineer @ Derivative Path'],
    neofetch: NEOFETCH,
    pwd: ['/home/jonathan/portfolio'],
    date: [new Date().toString()],
    ls: ['about.txt  experience/  projects/  resume.pdf  .easter-egg'],
    'cat about.txt': ['', 'Software Engineer · 12+ years · .NET & Fintech', 'Currently building financial software @ Derivative Path', 'Exploring Rust, Go, Python on the side', ''],
    about: ['', '  Jonathan Peris — Software Engineer', '  12+ years · .NET · Fintech · Cloud', '  Itanhaém, Brazil → Working remote for US companies', '', '  "A Vingança nunca é plena, mata a alma e a envenena."', '  — Seu Madruga', ''],
    skills: ['', '  Languages    C#, Rust, Go, Python, TypeScript', '  Backend      .NET Core+, ASP.NET Core, EF Core, MAUI', '  Arch         CQRS, DDD, Microservices, Hexagonal, Clean', '  Cloud        Azure, Docker, Kubernetes, CI/CD', '  DB           SQL Server, PostgreSQL', '  Frontend     Blazor, React/Next.js, Angular', ''],
    contact: ['', '  GitHub     github.com/jonathanperis', '  LinkedIn   linkedin.com/in/jonathan-peris', '  Email      jperis.silva@gmail.com', '  X          x.com/jperis_silva', ''],
    'git log': ['', ...EXPERIENCES.slice(0, 5).map((e, i) => `  ${String(i).padStart(2)} ${e.period.split(' — ')[0].padEnd(14)} ${e.title} @ ${e.company}`), '  ... +5 more', ''],
    'sudo hire me': ['', '  [sudo] password for recruiter: ********', '  ✓ Verified.', '', '  Offer letter generated.', '  → linkedin.com/in/jonathan-peris', ''],
    'rm -rf /': ['', '  rm: nice try. this terminal has plot armor.', ''],
    'cat .easter-egg': ['', '  🎮 You found me!', '  Congrats, you\'re thorough. That\'s a great quality.', ''],
  };
  if (map[c]) return map[c];
  if (c.startsWith('echo ')) return [cmd.trim().slice(5)];
  if (c.startsWith('sudo ')) return [`  permission denied: ${cmd.trim().slice(5)}`];
  if (c.startsWith('cd ')) return [`  bash: cd: ${cmd.trim().slice(3)}: No such file or directory`];
  if (c === 'clear') return ['__CLEAR__'];
  if (c === 'exit' || c === 'quit') return ['__EXIT__'];
  return [`  bash: ${cmd.trim().split(' ')[0]}: command not found`];
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

export default function Portfolio({ projects }: { projects: GitHubRepo[] }) {
  const typedRole = useTyping(ROLES);
  const scrollProgress = useScrollProgress();
  const heroProofVariant = useVariant('heroProof', 'b');

  // Terminal
  const [termOpen, setTermOpen] = useState(false);
  const [termInput, setTermInput] = useState('');
  const [termHist, setTermHist] = useState<string[]>(['  Welcome to jonathan.sh v2.0', '  Type "help" for commands.', '']);
  const [cmdHist, setCmdHist] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const termEndRef = useRef<HTMLDivElement>(null);
  const termInRef = useRef<HTMLInputElement>(null);
  const termCloseRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const konamiRef = useRef<string[]>([]);

  // Konami
  useEffect(() => {
    const K = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    const h = (e: globalThis.KeyboardEvent) => {
      if (termOpen) return;
      konamiRef.current.push(e.key);
      konamiRef.current = konamiRef.current.slice(-10);
      if (konamiRef.current.join(',') === K.join(',')) {
        lastFocusedRef.current = document.activeElement as HTMLElement | null;
        setTermOpen(true);
        konamiRef.current = [];
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [termOpen]);

  useEffect(() => {
    if (termOpen) { termEndRef.current?.scrollIntoView({ behavior: 'smooth' }); termInRef.current?.focus(); }
  }, [termHist, termOpen]);

  const closeTerminal = useCallback(() => {
    setTermOpen(false);
    setTermHist(['  Welcome to jonathan.sh v2.0', '  Type "help" for commands.', '']);
    requestAnimationFrame(() => lastFocusedRef.current?.focus());
  }, []);

  const submit = useCallback(() => {
    if (!termInput.trim()) return;
    const r = runCmd(termInput);
    setCmdHist(p => [...p, termInput]);
    setHistIdx(-1);
    if (r[0] === '__CLEAR__') setTermHist([]);
    else if (r[0] === '__EXIT__') closeTerminal();
    else setTermHist(p => [...p, `$ ${termInput}`, ...r]);
    setTermInput('');
  }, [closeTerminal, termInput]);

  const termKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') submit();
    else if (e.key === 'Escape') closeTerminal();
    else if (e.key === 'Tab') {
      e.preventDefault();
      termCloseRef.current?.focus();
    }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (cmdHist.length) { const n = histIdx === -1 ? cmdHist.length - 1 : Math.max(0, histIdx - 1); setHistIdx(n); setTermInput(cmdHist[n]); } }
    else if (e.key === 'ArrowDown') { e.preventDefault(); if (histIdx !== -1) { const n = histIdx + 1; if (n >= cmdHist.length) { setHistIdx(-1); setTermInput(''); } else { setHistIdx(n); setTermInput(cmdHist[n]); } } }
    else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); setTermHist([]); }
  }, [closeTerminal, submit, cmdHist, histIdx]);

  const trapCloseKey = useCallback((e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      termInRef.current?.focus();
    } else if (e.key === 'Escape') {
      closeTerminal();
    }
  }, [closeTerminal]);

  return (
    <>
      {/* Scroll progress */}
      <div className="scroll-bar fixed top-0 left-0 right-0 h-[2px] z-50" style={{ transform: `scaleX(${scrollProgress})` }} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">

        {/* ━━ Nav ━━ */}
        <nav className="sticky top-0 z-40 -mx-6 md:-mx-12 px-6 md:px-12 py-4 bg-bg/80 backdrop-blur-lg border-b border-transparent" style={{ borderColor: scrollProgress > 0.02 ? 'var(--color-border)' : 'transparent' }}>
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <a href="/" className="font-mono text-sm font-bold text-text hover:text-violet transition-colors">jp<span style={{ color: 'var(--color-violet)' }}>.</span></a>
            <div className="flex items-center gap-6">
              {["about", "experience", "projects"].map((s) => (
                <a key={s} href={`#${s}`} className="hidden font-mono text-xs text-dim hover:text-text transition-colors sm:inline">{s}</a>
              ))}
              <a href="/resume" className="font-mono text-xs text-bg px-3 py-1 rounded-md transition-colors font-semibold" style={{ color: 'var(--color-bg)', background: 'var(--color-violet)' }} onMouseOver={e => e.currentTarget.style.background = 'var(--color-violet-dim)'} onMouseOut={e => e.currentTarget.style.background = 'var(--color-violet)'}>resume</a>
            </div>
          </div>
        </nav>

        {/* ━━ Hero ━━ */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-visible max-w-4xl" aria-labelledby="hero-heading">
          <div className="hero-glow" aria-hidden="true" />
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1" style={{ borderColor: 'rgba(74,222,128,0.2)', backgroundColor: 'var(--color-violet-tint)' }}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ backgroundColor: 'var(--color-violet)' }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--color-violet)' }} />
              </span>
              <span className="font-mono text-xs" style={{ color: 'var(--color-violet)' }}>{AVAILABILITY.shortStatus}</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 id="hero-heading" style={{ fontFamily: 'var(--font-display)' }} className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-text leading-[1.05]">
              Jonathan Peris
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 font-mono text-lg md:text-xl h-8">
              <span style={{ color: 'var(--color-green)' }}>{typedRole}</span>
              <span className="typing-cursor" />
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-6 text-muted leading-relaxed max-w-xl text-base">
              12+ years building enterprise-grade software with .NET and modern cloud technologies. Focused on clean architecture, delivery discipline, and systems that scale.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/resume"
                onClick={() => trackEvent('portfolio_cta_click', { cta: 'resume', location: 'hero' })}
                className="inline-flex items-center justify-center rounded-lg px-4 py-2 font-mono text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                style={{ color: 'var(--color-bg)', background: 'var(--color-violet)' }}
              >
                View resume
              </a>
              <a
                href="https://www.linkedin.com/in/jonathan-peris/"
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => trackEvent('portfolio_cta_click', { cta: 'linkedin', location: 'hero' })}
                className="inline-flex items-center justify-center rounded-lg border px-4 py-2 font-mono text-sm font-semibold text-text transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                style={{ borderColor: 'rgba(74,222,128,0.3)', background: 'var(--color-violet-tint)' }}
              >
                Contact on LinkedIn
              </a>
            </div>
          </Reveal>
          {heroProofVariant === 'b' && (
            <Reveal delay={450}>
              <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {HERO_PROOF.map((item) => (
                  <div key={item.label} className="proof-chip">
                    <span className="proof-chip-label">{item.label}</span>
                    <span className="proof-chip-detail">{item.detail}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
          <Reveal delay={500}>
            <div className="mt-5 flex items-center gap-4 group">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener" aria-label={s.label} title={s.label}
                  className="text-dim transition-colors duration-300" onMouseOver={e => e.currentTarget.style.color = 'var(--color-violet)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-dim)'}>
                  <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox={s.vb} fill="currentColor" className="h-5 w-5"><path d={s.icon} /></svg>
                </a>
              ))}
            </div>
          </Reveal>

          {/* Code snippet */}
          <Reveal delay={600}>
            <div className="mt-12 code-block code-block-accent">
              <div className="titlebar">
                <div className="dots"><span className="dot dot-red" /><span className="dot dot-yellow" /><span className="dot dot-green" /></div>
                <span className="font-mono text-xs text-dim">systems.report</span>
              </div>
              <pre className="p-5 font-mono text-sm leading-relaxed overflow-x-auto">
                <code>
                  <span className="text-dim">$</span> <span className="text-text">cat systems.report</span>{"\n"}
                  <span className="text-green">status</span><span className="text-dim">:</span> <span className="text-text">{AVAILABILITY.status}</span>{"\n"}
                  <span className="text-green">focus</span><span className="text-dim">:</span> <span className="text-text">backend architecture, delivery discipline, reliable systems</span>{"\n"}
                  <span className="text-green">runtime</span><span className="text-dim">:</span> <span className="text-text">12+ years across fintech, automotive, EdTech, healthcare, retail</span>{"\n"}
                  <span className="text-green">toolchain</span><span className="text-dim">:</span> <span className="text-text">C#, .NET, Azure, Docker, SQL Server, PostgreSQL</span>{"\n"}
                  <span className="text-green">mode</span><span className="text-dim">:</span> <span className="text-cyan">remote-first</span>
                </code>
              </pre>
            </div>
          </Reveal>
        </section>

        {/* ━━ About ━━ */}
        <section id="about" aria-labelledby="about-heading" className="py-16 scroll-mt-20">
          <Reveal><SectionLabel number="01" id="about-heading">About</SectionLabel></Reveal>
          <Reveal delay={100}>
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
          </Reveal>
        </section>

        {/* ━━ Stack ━━ */}
        <section id="stack" aria-labelledby="stack-heading" className="py-16 scroll-mt-20">
          <Reveal><SectionLabel number="02" id="stack-heading">Stack</SectionLabel></Reveal>
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
        </section>

        {/* ━━ Experience ━━ */}
        <section id="experience" aria-labelledby="experience-heading" className="py-16 scroll-mt-20">
          <Reveal><SectionLabel number="03" id="experience-heading">Experience</SectionLabel></Reveal>
          <div className="relative pl-4 space-y-1 max-w-4xl">
            {EXPERIENCES.map((exp, i) => (
              <Reveal key={`${exp.company}-${exp.period}`} delay={i * 60}>
                <div className={`exp-entry group ${i === 0 ? 'exp-entry-current' : 'py-5'}`}>
                  <span className={`exp-dot ${i === 0 ? 'exp-dot-active' : ''}`} />
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3 mb-1">
                    <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-text font-bold text-lg">
                      {exp.title}<span className="text-dim font-normal text-base"> · </span><span className="text-muted font-normal text-base">{exp.company}</span>
                    </h3>
                  </div>
                  <div className="font-mono text-xs text-dim mb-3">
                    {exp.period}<span className="mx-2">·</span>{exp.location}
                  </div>
                  <p className="text-sm text-muted leading-relaxed mb-3">{exp.description}</p>
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
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map((t) => (<span key={t} className="tag">{t}</span>))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ━━ Featured Projects ━━ */}
        <section id="projects" aria-labelledby="projects-heading" className="py-16 scroll-mt-20">
          <Reveal><SectionLabel number="04" id="projects-heading">Featured Projects</SectionLabel></Reveal>
          {PROJECT_CATEGORIES.map((category) => {
            const items = category.slugs
              .map((slug) => FEATURED_PROJECTS.find((project) => project.slug === slug))
              .filter((project): project is typeof FEATURED_PROJECTS[number] => Boolean(project));

            return (
              <div key={category.label} className="mb-8 last:mb-0">
                <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-dim">{category.label}</h3>
                <div className="bento-grid">
                  {items.map((fp, i) => {
                    const colSpan = i % 3 === 0 ? 'bento-col-7' : i % 3 === 1 ? 'bento-col-5' : 'bento-col-12';
                    const isWide = i % 3 === 2;
                    return (
                      <Reveal key={fp.slug} delay={i * 80} className={colSpan}>
                  <div className="bento-card h-full group">
                    <div className="project-card-accent" style={{ background: fp.langColor }} />
                    <div className={`p-6 h-full flex flex-col ${isWide ? 'md:flex-row md:gap-6 md:items-center' : ''}`}>
                      <div className={isWide ? 'flex-1' : 'flex-1'}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: fp.langColor }} />
                          <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-lg font-bold text-text transition-colors" onMouseOver={e => e.currentTarget.style.color = 'var(--color-violet-light)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-text)'}>{fp.name}</h3>
                          <span className="font-mono text-xs text-dim ml-1">{fp.lang}</span>
                        </div>
                        <p className="text-sm text-muted leading-relaxed mb-4">{fp.description}</p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {fp.tags.map((t) => (<span key={t} className="tag">{t}</span>))}
                        </div>
                      </div>
                      <div className={`flex items-center gap-3 mt-auto pt-4 ${isWide ? 'md:flex-col md:items-end md:justify-center md:pt-0' : ''}`}>
                        <a href={fp.repoUrl} target="_blank" rel="noreferrer noopener"
                          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors" onMouseOver={e => e.currentTarget.style.color = 'var(--color-text)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-muted)'}>
                          <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                          </svg>
                          Source Code
                        </a>
                        <a href={fp.liveUrl} target="_blank" rel="noreferrer noopener"
                          className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold border rounded-md px-2.5 py-1 transition-colors"
                          style={{ color: 'var(--color-violet-light)', borderColor: 'rgba(74,222,128,0.3)', background: 'var(--color-violet-tint)' }}
                          onMouseOver={e => e.currentTarget.style.background = 'rgba(74,222,128,0.15)'}
                          onMouseOut={e => e.currentTarget.style.background = 'var(--color-violet-tint)'}>
                          <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                            <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5zm7.25-.182a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V6.56l-5.22 5.22a.75.75 0 11-1.06-1.06l5.22-5.22h-2.44a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                          </svg>
                          Visit website
                        </a>
                      </div>
                    </div>
                  </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>

        {/* ━━ More Projects ━━ */}
        <section aria-labelledby="more-projects-heading" className="py-16 scroll-mt-20">
          <Reveal><SectionLabel number="05" id="more-projects-heading">More Projects</SectionLabel></Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {projects.filter((p) => !FEATURED_PROJECTS.some((fp) => fp.slug === p.title) && p.title !== '.github').map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <article className="card card-glow p-5 h-full group">
                  <div className="flex items-center gap-2 mb-2">
                    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-dim transition-colors flex-shrink-0" onMouseOver={e => e.currentTarget.style.color = 'var(--color-violet)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-dim)'}>
                      <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5zm10.5-1h-8a1 1 0 00-1 1v6.708A2.486 2.486 0 014.5 9h8.5zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
                    </svg>
                    <a href={p.url} target="_blank" rel="noreferrer noopener" className="font-mono text-sm font-semibold text-text transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" onMouseOver={e => e.currentTarget.style.color = 'var(--color-violet)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-text)'}>{p.title}</a>
                    {p.stars > 0 && (
                      <span className="ml-auto flex items-center gap-1 text-xs text-dim font-mono">
                        <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
                          <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                        </svg>
                        {p.stars}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted leading-relaxed mb-3">{p.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.langColor || '#888' }} />
                      <span className="text-xs text-dim font-mono">{p.lang}</span>
                    </div>
                    {p.homepageUrl && (
                      <a
                        href={p.homepageUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold border rounded-md px-2 py-0.5 transition-colors cursor-pointer"
                        style={{ color: 'var(--color-violet-light)', borderColor: 'rgba(74,222,128,0.3)', background: 'var(--color-violet-tint)' }}
                        onMouseOver={e => e.currentTarget.style.background = 'rgba(74,222,128,0.15)'}
                        onMouseOut={e => e.currentTarget.style.background = 'var(--color-violet-tint)'}
                      >
                        <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                          <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5zm7.25-.182a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V6.56l-5.22 5.22a.75.75 0 11-1.06-1.06l5.22-5.22h-2.44a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                        </svg>
                        Visit website
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <div className="mt-8 text-center">
              <a href="https://github.com/jonathanperis" target="_blank" rel="noreferrer noopener"
                className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors" onMouseOver={e => e.currentTarget.style.color = 'var(--color-violet-light)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-muted)'}>
                View all on GitHub
                <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </Reveal>
        </section>

        {/* ━━ Footer ━━ */}
        <footer className="pt-8 pb-16 relative">
          <div className="footer-line mb-8" />
          <Reveal>
            <div className="relative text-center space-y-4">
              <div className="flex items-center justify-center gap-6">
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener" title={s.label} aria-label={s.label}
                    className="text-dim transition-colors" onMouseOver={e => e.currentTarget.style.color = 'var(--color-violet-light)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-dim)'}>
                    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox={s.vb} fill="currentColor" className="h-5 w-5"><path d={s.icon} /></svg>
                  </a>
                ))}
              </div>
              <p className="font-mono text-xs text-dim">
                Built with ❤️ by{' '}
                <a href="https://github.com/jonathanperis" target="_blank" rel="noreferrer noopener" className="font-bold text-dim transition-colors" onMouseOver={e => e.currentTarget.style.color = 'var(--color-violet-light)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-dim)'}>Me</a>
                {' '}and my{' '}
                <a href="https://claude.ai/" target="_blank" rel="noreferrer noopener" className="font-bold text-dim transition-colors" onMouseOver={e => e.currentTarget.style.color = 'var(--color-violet-light)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-dim)'}>24/7 Intern</a>
              </p>
              <p className="font-mono text-[10px] text-dim/30 select-none">{"// ↑↑↓↓←→←→BA"}</p>
            </div>
          </Reveal>
        </footer>
      </div>

      {/* ━━ Terminal ━━ */}
      {termOpen && (
        <div className="fixed inset-0 z-50 terminal-backdrop flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeTerminal(); }}>
          <div className="w-full max-w-2xl rounded-xl border border-border overflow-hidden shadow-2xl shadow-violet/5" role="dialog" aria-modal="true" aria-labelledby="terminal-title">
            <div className="flex items-center gap-2 bg-elevated px-4 py-3 border-b border-border">
              <div className="flex gap-1.5">
                <button ref={termCloseRef} onClick={closeTerminal} onKeyDown={trapCloseKey} className="h-3 w-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition" aria-label="Close terminal" />
                <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <span id="terminal-title" className="font-mono text-xs text-dim ml-2">jonathan.sh</span>
              <span className="ml-auto font-mono text-[10px] text-dim/40">ESC to close</span>
            </div>
            <div className="terminal-body p-4 h-96 overflow-y-auto font-mono text-sm bg-bg"
              onClick={() => termInRef.current?.focus()}>
              {termHist.map((line, i) => (
                <div key={i} className={`whitespace-pre-wrap leading-relaxed ${line.startsWith('$') ? 'text-green' : 'text-muted'}`}>{line}</div>
              ))}
              <div className="flex items-center">
                <span className="text-green mr-2 select-none">$</span>
                <input ref={termInRef} autoFocus aria-label="Terminal command" className="flex-1 bg-transparent outline-none text-text caret-green font-mono text-sm"
                  value={termInput} onChange={(e) => setTermInput(e.target.value)} onKeyDown={termKey}
                  spellCheck={false} autoComplete="off" autoCapitalize="off" />
              </div>
              <div ref={termEndRef} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
