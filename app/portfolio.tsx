"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import type { GitHubRepo } from "./lib/github";
import { ROLES, EXPERIENCES, SOCIALS, FEATURED_PROJECTS } from "./lib/data";


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

// ─────────────────────────────────────────────────────────────────────────────
// Small components
// ─────────────────────────────────────────────────────────────────────────────

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, shown } = useReveal();
  return <div ref={ref} className={`reveal ${shown ? 'shown' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="font-mono text-xs font-bold uppercase tracking-widest text-green">{children}</span>
      <span className="flex-1 h-px bg-border" />
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
  '   ██║██████╔╝    OS:        Next.js 16 / GitHub Pages',
  '██ ██║██╔═══╝     Shell:     TypeScript 5.x',
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

  // Terminal
  const [termOpen, setTermOpen] = useState(false);
  const [termInput, setTermInput] = useState('');
  const [termHist, setTermHist] = useState<string[]>(['  Welcome to jonathan.sh v2.0', '  Type "help" for commands.', '']);
  const [cmdHist, setCmdHist] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const termEndRef = useRef<HTMLDivElement>(null);
  const termInRef = useRef<HTMLInputElement>(null);
  const konamiRef = useRef<string[]>([]);

  // Konami
  useEffect(() => {
    const K = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    const h = (e: KeyboardEvent) => {
      if (termOpen) return;
      konamiRef.current.push(e.key);
      konamiRef.current = konamiRef.current.slice(-10);
      if (konamiRef.current.join(',') === K.join(',')) { setTermOpen(true); konamiRef.current = []; }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [termOpen]);

  useEffect(() => {
    if (termOpen) { termEndRef.current?.scrollIntoView({ behavior: 'smooth' }); termInRef.current?.focus(); }
  }, [termHist, termOpen]);

  const submit = useCallback(() => {
    if (!termInput.trim()) return;
    const r = runCmd(termInput);
    setCmdHist(p => [...p, termInput]);
    setHistIdx(-1);
    if (r[0] === '__CLEAR__') setTermHist([]);
    else if (r[0] === '__EXIT__') { setTermOpen(false); setTermHist(['  Welcome to jonathan.sh v2.0', '  Type "help" for commands.', '']); }
    else setTermHist(p => [...p, `$ ${termInput}`, ...r]);
    setTermInput('');
  }, [termInput]);

  const termKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') submit();
    else if (e.key === 'Escape') setTermOpen(false);
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (cmdHist.length) { const n = histIdx === -1 ? cmdHist.length - 1 : Math.max(0, histIdx - 1); setHistIdx(n); setTermInput(cmdHist[n]); } }
    else if (e.key === 'ArrowDown') { e.preventDefault(); if (histIdx !== -1) { const n = histIdx + 1; if (n >= cmdHist.length) { setHistIdx(-1); setTermInput(''); } else { setHistIdx(n); setTermInput(cmdHist[n]); } } }
    else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); setTermHist([]); }
  }, [submit, cmdHist, histIdx]);

  return (
    <>
      {/* Scroll progress */}
      <div className="scroll-bar fixed top-0 left-0 right-0 h-[2px] z-50" style={{ transform: `scaleX(${scrollProgress})` }} />

      <div className="relative z-10 mx-auto max-w-3xl px-6 md:px-8">

        {/* ━━ Nav ━━ */}
        <nav className="sticky top-0 z-40 -mx-6 md:-mx-8 px-6 md:px-8 py-4 bg-bg/80 backdrop-blur-lg border-b border-transparent" style={{ borderColor: scrollProgress > 0.02 ? 'var(--color-border)' : 'transparent' }}>
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <a href="/" className="font-mono text-sm font-bold text-text hover:text-green transition-colors">jp<span className="text-green">.</span></a>
            <div className="flex items-center gap-6">
              {["about", "experience", "projects"].map((s) => (
                <a key={s} href={`#${s}`} className="font-mono text-xs text-dim hover:text-text transition-colors">{s}</a>
              ))}
              <a href="/resume" className="font-mono text-xs text-bg bg-green hover:bg-green-dim px-3 py-1 rounded-md transition-colors font-semibold">resume</a>
            </div>
          </div>
        </nav>

        {/* ━━ Hero ━━ */}
        <section className="pt-24 pb-20 md:pt-32 md:pb-28">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green/20 bg-green-tint px-3 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
              </span>
              <span className="font-mono text-xs text-green">Available for hire</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-text leading-[1.1]">
              Jonathan Peris
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 font-mono text-lg md:text-xl h-8">
              <span className="text-green">{typedRole}</span>
              <span className="typing-cursor" />
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-6 text-muted leading-relaxed max-w-xl">
              12+ years building enterprise-grade software with .NET and modern cloud technologies. Specializing in Fintech, clean architecture, and systems that scale.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-8 flex items-center gap-4">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener" aria-label={s.label} title={s.label}
                  className="text-dim hover:text-green transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox={s.vb} fill="currentColor" className="h-5 w-5"><path d={s.icon} /></svg>
                </a>
              ))}
            </div>
          </Reveal>

          {/* Code snippet */}
          <Reveal delay={500}>
            <div className="mt-12 code-block">
              <div className="titlebar">
                <div className="dots"><span className="dot dot-red" /><span className="dot dot-yellow" /><span className="dot dot-green" /></div>
                <span className="font-mono text-xs text-dim">developer.ts</span>
              </div>
              <pre className="p-5 font-mono text-sm leading-relaxed overflow-x-auto">
                <code>
                  <span className="text-purple">const</span> <span className="text-text">developer</span> <span className="text-purple">=</span> {"{\n"}
                  {"  "}<span className="text-text">name</span><span className="text-dim">:</span>       <span className="text-green">&quot;Jonathan Peris&quot;</span>,{"\n"}
                  {"  "}<span className="text-text">role</span><span className="text-dim">:</span>       <span className="text-green">&quot;Software Engineer&quot;</span>,{"\n"}
                  {"  "}<span className="text-text">location</span><span className="text-dim">:</span>   <span className="text-green">&quot;Itanhaém, Brazil&quot;</span>,{"\n"}
                  {"  "}<span className="text-text">experience</span><span className="text-dim">:</span> <span className="text-green">&quot;12+ years&quot;</span>,{"\n"}
                  {"  "}<span className="text-text">focus</span><span className="text-dim">:</span>      [<span className="text-green">&quot;.NET&quot;</span>, <span className="text-green">&quot;Fintech&quot;</span>, <span className="text-green">&quot;Cloud&quot;</span>],{"\n"}
                  {"  "}<span className="text-text">languages</span><span className="text-dim">:</span>  [<span className="text-green">&quot;C#&quot;</span>, <span className="text-green">&quot;Rust&quot;</span>, <span className="text-green">&quot;Go&quot;</span>, <span className="text-green">&quot;Python&quot;</span>],{"\n"}
                  {"  "}<span className="text-text">available</span><span className="text-dim">:</span>  <span className="text-cyan">true</span>,{"\n"}
                  {"}"};
                </code>
              </pre>
            </div>
          </Reveal>
        </section>

        {/* ━━ About ━━ */}
        <section id="about" className="py-16 scroll-mt-20">
          <Reveal><SectionLabel>About</SectionLabel></Reveal>
          <Reveal delay={100}>
            <div className="text-muted leading-relaxed space-y-4">
              <p>
                I specialize in <span className="text-text font-medium">.NET</span> and <span className="text-text font-medium">Fintech</span> — currently building core financial modules for a capital markets platform at <span className="text-text font-medium">Derivative Path</span>.
              </p>
              <p>
                My work spans <span className="text-text font-medium">.NET Core+</span>, <span className="text-text font-medium">ASP.NET Core</span>, <span className="text-text font-medium">Entity Framework</span>, and <span className="text-text font-medium">MAUI</span>. I design systems with <span className="text-text font-medium">CQRS</span>, <span className="text-text font-medium">DDD</span>, <span className="text-text font-medium">Microservices</span>, <span className="text-text font-medium">Hexagonal Architecture</span>, and <span className="text-text font-medium">Cloud-Native</span> principles — always building for durability.
              </p>
              <p>
                I&apos;ve delivered across <span className="text-text font-medium">financial services</span>, <span className="text-text font-medium">automotive</span> (Mercedes-Benz/T-Systems), <span className="text-text font-medium">EdTech</span>, healthcare, retail, and insurance. Strong DevOps background with <span className="text-text font-medium">Azure</span>, <span className="text-text font-medium">Docker</span>, and CI/CD.
              </p>
              <p>
                Beyond .NET, I explore <span className="text-text font-medium">Rust</span>, <span className="text-text font-medium">Go</span>, and <span className="text-text font-medium">Python</span> — driven by curiosity about performance, concurrency, and the next generation of systems.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ━━ Experience ━━ */}
        <section id="experience" className="py-16 scroll-mt-20">
          <Reveal><SectionLabel>Experience</SectionLabel></Reveal>
          <div className="space-y-1">
            {EXPERIENCES.map((exp, i) => (
              <Reveal key={`${exp.company}-${exp.period}`} delay={i * 60}>
                <div className="exp-entry pl-5 py-5 group">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3 mb-1">
                    <h3 className="text-text font-semibold">
                      {exp.title}<span className="text-dim font-normal"> · </span><span className="text-muted font-normal">{exp.company}</span>
                    </h3>
                  </div>
                  <div className="font-mono text-xs text-dim mb-3">
                    {exp.period}<span className="mx-2">·</span>{exp.location}
                  </div>
                  <p className="text-sm text-muted leading-relaxed mb-3">{exp.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map((t) => (<span key={t} className="tag">{t}</span>))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ━━ Featured Projects ━━ */}
        <section id="projects" className="py-16 scroll-mt-20">
          <Reveal><SectionLabel>Featured Projects</SectionLabel></Reveal>
          <div className="space-y-4">
            {FEATURED_PROJECTS.map((fp, i) => (
              <Reveal key={fp.slug} delay={i * 80}>
                <div className="card card-glow p-6 group">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: fp.langColor }} />
                    <h3 className="font-mono text-base font-bold text-text group-hover:text-green transition-colors">{fp.name}</h3>
                    <span className="font-mono text-xs text-dim ml-1">{fp.lang}</span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed mb-4">{fp.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {fp.tags.map((t) => (<span key={t} className="tag">{t}</span>))}
                  </div>
                  <div className="flex items-center gap-3">
                    <a href={fp.repoUrl} target="_blank" rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-green transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                      Source Code
                    </a>
                    <a href={fp.liveUrl} target="_blank" rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-green border border-green/20 bg-green-tint rounded-md px-2.5 py-1 hover:bg-green/20 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                        <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5zm7.25-.182a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V6.56l-5.22 5.22a.75.75 0 11-1.06-1.06l5.22-5.22h-2.44a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                      </svg>
                      Visit website
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ━━ More Projects ━━ */}
        <section className="py-16 scroll-mt-20">
          <Reveal><SectionLabel>More Projects</SectionLabel></Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {projects.filter((p) => !FEATURED_PROJECTS.some((fp) => fp.slug === p.title)).map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <a href={p.url} target="_blank" rel="noreferrer noopener"
                  className="card card-glow p-5 block group h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-dim group-hover:text-green transition-colors">
                      <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5zm10.5-1h-8a1 1 0 00-1 1v6.708A2.486 2.486 0 014.5 9h8.5zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
                    </svg>
                    <span className="font-mono text-sm font-semibold text-text group-hover:text-green transition-colors">{p.title}</span>
                    {p.stars > 0 && (
                      <span className="ml-auto flex items-center gap-1 text-xs text-dim font-mono">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
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
                      <span
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(p.homepageUrl, '_blank'); }}
                        className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-green border border-green/20 bg-green-tint rounded-md px-2 py-0.5 hover:bg-green/20 transition-colors cursor-pointer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                          <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5zm7.25-.182a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V6.56l-5.22 5.22a.75.75 0 11-1.06-1.06l5.22-5.22h-2.44a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                        </svg>
                        Visit website
                      </span>
                    )}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <div className="mt-8 text-center">
              <a href="https://github.com/jonathanperis" target="_blank" rel="noreferrer noopener"
                className="inline-flex items-center gap-2 font-mono text-sm text-muted hover:text-green transition-colors">
                View all on GitHub
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </Reveal>
        </section>

        {/* ━━ Footer ━━ */}
        <footer className="py-16 border-t border-border">
          <Reveal>
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-5">
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener" title={s.label}
                    className="text-dim hover:text-green transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox={s.vb} fill="currentColor" className="h-4 w-4"><path d={s.icon} /></svg>
                  </a>
                ))}
              </div>
              <p className="font-mono text-xs text-dim">
                Built with Next.js + Tailwind. Coded with Claude Code.
              </p>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <p className="font-mono text-[10px] text-dim/30 select-none">{"// ↑↑↓↓←→←→BA"}</p>
            </div>
          </Reveal>
        </footer>
      </div>

      {/* ━━ Terminal ━━ */}
      {termOpen && (
        <div className="fixed inset-0 z-50 terminal-backdrop flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setTermOpen(false); }}>
          <div className="w-full max-w-2xl rounded-xl border border-border overflow-hidden shadow-2xl shadow-green/5">
            <div className="flex items-center gap-2 bg-elevated px-4 py-3 border-b border-border">
              <div className="flex gap-1.5">
                <button onClick={() => setTermOpen(false)} className="h-3 w-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition" aria-label="Close" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-mono text-xs text-dim ml-2">jonathan.sh</span>
              <span className="ml-auto font-mono text-[10px] text-dim/40">ESC to close</span>
            </div>
            <div className="terminal-body p-4 h-96 overflow-y-auto font-mono text-sm bg-bg"
              onClick={() => termInRef.current?.focus()}>
              {termHist.map((line, i) => (
                <div key={i} className={`whitespace-pre-wrap leading-relaxed ${line.startsWith('$') ? 'text-green' : 'text-muted'}`}>{line}</div>
              ))}
              <div className="flex items-center">
                <span className="text-green mr-2 select-none">$</span>
                <input ref={termInRef} autoFocus className="flex-1 bg-transparent outline-none text-text caret-green font-mono text-sm"
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
