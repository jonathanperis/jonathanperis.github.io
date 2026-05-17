import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import type { GitHubRepo } from "../lib/github";
import {
  AVAILABILITY,
  ENGINEERING_PRINCIPLES,
  EXPERIENCES,
  OPERATING_SIGNALS,
  PROFILE,
  SKILLS,
  SOCIALS,
} from "../lib/data";

// ─────────────────────────────────────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, shown };
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progress;
}

function trackEvent(name: string, params: Record<string, string>) {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", name, params);
}

// ─────────────────────────────────────────────────────────────────────────────
// Small components
// ─────────────────────────────────────────────────────────────────────────────

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, shown } = useReveal();
  return (
    <div ref={ref} className={`reveal ${shown ? "shown" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function SectionLabel({ id, number, children }: { id: string; number: string; children: ReactNode }) {
  return (
    <div className="section-ruler">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-dim">trace {number}</p>
      <h2 id={id} className="section-heading">
        {children}
      </h2>
    </div>
  );
}

function SocialLink({ social, compact = false }: { social: (typeof SOCIALS)[number]; compact?: boolean }) {
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={social.label}
      title={social.label}
      className={compact ? "icon-link compact" : "icon-link"}
      onClick={() => trackEvent("social_click", { label: social.label })}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={social.vb} fill="currentColor" aria-hidden="true">
        <path d={social.icon} />
      </svg>
      {!compact && <span>{social.label}</span>}
    </a>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Terminal easter egg
// ─────────────────────────────────────────────────────────────────────────────

const NEOFETCH = [
  "",
  "   ██╗██████╗     jonathan@workstation",
  "   ██║██╔══██╗    runtime:   Astro 6 / React 19",
  "   ██║██████╔╝    shell:     TypeScript 6.x",
  "██ ██║██╔═══╝     uptime:    12+ years in production code",
  "╚███╔╝██║         region:    Brazil, remote-first",
  " ╚══╝ ╚═╝         focus:     backend systems, delivery, reliability",
  "",
];

function runCmd(cmd: string): string[] {
  const c = cmd.trim().toLowerCase();
  const map: Record<string, string[]> = {
    help: ["", "  help · about · stack · contact · neofetch", "  ls · cat availability.txt · git log · whoami · pwd · date", "  sudo hire me · clear · exit", ""],
    whoami: ["jonathan.peris", "software engineer", "backend architecture and reliable delivery"],
    neofetch: NEOFETCH,
    pwd: ["/home/jonathan/portfolio"],
    date: [new Date().toString()],
    ls: ["availability.txt  architecture/  experience.log  projects/  resume.pdf"],
    "cat availability.txt": [AVAILABILITY.full],
    about: ["", "  Jonathan Peris", "  Software Engineer, 12+ years", "  C#, .NET, Azure, CQRS, DDD", "  Remote from Brazil", ""],
    stack: ["", "  backend      C#, .NET Core+, ASP.NET Core", "  architecture CQRS, DDD, microservices, hexagonal", "  delivery     Azure, Docker, Kubernetes, CI/CD", "  data         SQL Server, PostgreSQL", ""],
    contact: ["", "  GitHub     github.com/jonathanperis", "  LinkedIn   linkedin.com/in/jonathan-peris", "  Email      jperis.silva@gmail.com", ""],
    "git log": ["", ...EXPERIENCES.slice(0, 5).map((e, i) => `  ${String(i).padStart(2, "0")} ${e.period.split(" — ")[0].padEnd(9)} ${e.title} @ ${e.company}`), "  ... +5 earlier commits", ""],
    "sudo hire me": ["", "  [sudo] password for recruiter: ********", "  access granted", "  route opened: linkedin.com/in/jonathan-peris", ""],
  };

  if (map[c]) return map[c];
  if (c.startsWith("echo ")) return [cmd.trim().slice(5)];
  if (c === "clear") return ["__CLEAR__"];
  if (c === "exit" || c === "quit") return ["__EXIT__"];
  return [`  command not found: ${cmd.trim().split(" ")[0]}`];
}

const SKILL_GROUPS: Array<{ key: keyof typeof SKILLS; label: string; path: string }> = [
  { key: "backend", label: "backend runtime", path: "/stack/backend" },
  { key: "architecture", label: "architecture", path: "/stack/boundaries" },
  { key: "cloud", label: "delivery", path: "/stack/delivery" },
  { key: "databases", label: "data", path: "/stack/data" },
  { key: "languages", label: "languages", path: "/stack/languages" },
  { key: "frontend", label: "interface", path: "/stack/interface" },
];

function projectLane(project: GitHubRepo) {
  const text = `${project.title} ${project.description} ${project.lang}`.toLowerCase();
  if (text.includes("rinha") || text.includes("k6") || text.includes("performance")) return "load path";
  if (text.includes("clean") || text.includes(".net") || text.includes("blazor")) return "system design";
  if (text.includes("game") || text.includes("sdl") || text.includes("lynx") || text.includes("mango")) return "runtime lab";
  return "field note";
}

export default function Portfolio({ projects }: { projects: GitHubRepo[] }) {
  const scrollProgress = useScrollProgress();
  const pinnedRepos = useMemo(() => projects.filter((project) => project.pinned), [projects]);
  const otherRepos = useMemo(() => projects.filter((project) => !project.pinned), [projects]);

  const [termOpen, setTermOpen] = useState(false);
  const [termInput, setTermInput] = useState("");
  const [termHist, setTermHist] = useState<string[]>(["  jonathan.sh ready", "  Type \"help\" for commands.", ""]);
  const [cmdHist, setCmdHist] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const termEndRef = useRef<HTMLDivElement>(null);
  const termInRef = useRef<HTMLInputElement>(null);
  const termCloseRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const konamiRef = useRef<string[]>([]);

  useEffect(() => {
    const K = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (termOpen) return;
      konamiRef.current.push(e.key);
      konamiRef.current = konamiRef.current.slice(-10);
      if (konamiRef.current.join(",") === K.join(",")) {
        lastFocusedRef.current = document.activeElement as HTMLElement | null;
        setTermOpen(true);
        konamiRef.current = [];
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [termOpen]);

  useEffect(() => {
    if (!termOpen) return;
    termEndRef.current?.scrollIntoView({ behavior: "smooth" });
    termInRef.current?.focus();
  }, [termHist, termOpen]);

  const closeTerminal = useCallback(() => {
    setTermOpen(false);
    setTermHist(["  jonathan.sh ready", "  Type \"help\" for commands.", ""]);
    requestAnimationFrame(() => lastFocusedRef.current?.focus());
  }, []);

  const submit = useCallback(() => {
    if (!termInput.trim()) return;
    const result = runCmd(termInput);
    setCmdHist((prev) => [...prev, termInput]);
    setHistIdx(-1);
    if (result[0] === "__CLEAR__") setTermHist([]);
    else if (result[0] === "__EXIT__") closeTerminal();
    else setTermHist((prev) => [...prev, `$ ${termInput}`, ...result]);
    setTermInput("");
  }, [closeTerminal, termInput]);

  const termKey = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") submit();
      else if (e.key === "Escape") closeTerminal();
      else if (e.key === "Tab") {
        e.preventDefault();
        termCloseRef.current?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (cmdHist.length) {
          const next = histIdx === -1 ? cmdHist.length - 1 : Math.max(0, histIdx - 1);
          setHistIdx(next);
          setTermInput(cmdHist[next]);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (histIdx !== -1) {
          const next = histIdx + 1;
          if (next >= cmdHist.length) {
            setHistIdx(-1);
            setTermInput("");
          } else {
            setHistIdx(next);
            setTermInput(cmdHist[next]);
          }
        }
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        setTermHist([]);
      }
    },
    [closeTerminal, cmdHist, histIdx, submit],
  );

  return (
    <>
      <div className="scroll-bar fixed top-0 left-0 right-0 h-[2px] z-50" style={{ transform: `scaleX(${scrollProgress})` }} />

      <div className="site-shell relative z-10">
        <nav className="route-nav" aria-label="Primary navigation">
          <a href="/" className="route-mark" aria-label="Jonathan Peris home">
            jp<span>.</span>
          </a>
          <div className="route-links">
            <a href="#profile">/profile</a>
            <a href="#trace">/trace</a>
            <a href="#workbench">/workbench</a>
            <a href="/resume" className="route-resume" onClick={() => trackEvent("cta_click", { label: "nav_resume" })}>
              resume.pdf
            </a>
          </div>
        </nav>

        <main>
          <section className="kernel-hero" aria-labelledby="hero-title">
            <div className="scanline" aria-hidden="true" />
            <Reveal className="hero-copy">
              <p className="status-pill"><span aria-hidden="true" />{AVAILABILITY.short}</p>
              <h1 id="hero-title">Jonathan Peris</h1>
              <p className="role-line"><span>Backend architecture / .NET / Azure</span><span className="typing-cursor" aria-hidden="true" /></p>
              <p className="hero-lede">
                I build backend systems that can be understood, operated, and changed after they meet production traffic.
              </p>
              <div className="hero-actions">
                <a href="/resume" className="primary-action" onClick={() => trackEvent("cta_click", { label: "hero_resume" })}>View resume</a>
                <a href="https://www.linkedin.com/in/jonathan-peris/" target="_blank" rel="noreferrer noopener" className="secondary-action" onClick={() => trackEvent("cta_click", { label: "hero_linkedin" })}>Contact on LinkedIn</a>
              </div>
              <div className="signal-strip" aria-label="Operating signals">
                {OPERATING_SIGNALS.map((signal) => (
                  <span key={signal.label}><b>{signal.label}</b>{signal.value}</span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={140} className="hero-console-wrap">
              <div className="hero-console" aria-label="Build ledger summary">
                <div className="console-top">
                  <span>deploy-ledger.yaml</span>
                  <span className="console-state">healthy</span>
                </div>
                <pre>{`operator: ${PROFILE.name}\nlocation: ${PROFILE.location}\nstatus: ${AVAILABILITY.full}\nfocus:\n  - backend architecture\n  - delivery discipline\n  - reliable systems\nruntime:\n  years: 12+\n  stack: C# / .NET / Azure / SQL\n  mode: remote-first`}</pre>
              </div>
            </Reveal>
          </section>

          <div className="section-bridge" aria-hidden="true">
            <span>scroll</span><span>/profile packet follows</span>
          </div>

          <section id="profile" className="content-section split-section" aria-labelledby="profile-heading">
            <Reveal>
              <SectionLabel id="profile-heading" number="01">Profile packet</SectionLabel>
            </Reveal>
            <Reveal delay={100} className="packet-card">
              <p>
                My best work sits between architecture and execution: defining boundaries, shipping with tests, and keeping systems legible for the next engineer who has to debug them.
              </p>
              <p>
                The record spans financial platforms, automotive operations, education, healthcare, retail, insurance, and infrastructure work. The common thread is boring reliability, clean ownership, and enough curiosity to keep improving the runtime.
              </p>
            </Reveal>
            <div className="principle-grid">
              {ENGINEERING_PRINCIPLES.map((principle, index) => (
                <Reveal key={principle.title} delay={index * 70}>
                  <article className="principle-row">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{principle.title}</h3>
                      <p>{principle.body}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="content-section" aria-labelledby="stack-heading">
            <Reveal>
              <SectionLabel id="stack-heading" number="02">Capability map</SectionLabel>
            </Reveal>
            <div className="capability-grid">
              {SKILL_GROUPS.map(({ key, label, path }, index) => (
                <Reveal key={key} delay={index * 45}>
                  <article className="capability-row">
                    <p>{path}</p>
                    <h3>{label}</h3>
                    <div>
                      {SKILLS[key].map((skill) => <span key={skill}>{skill}</span>)}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="trace" className="content-section" aria-labelledby="trace-heading">
            <Reveal>
              <SectionLabel id="trace-heading" number="03">Experience trace</SectionLabel>
            </Reveal>
            <div className="trace-list">
              {EXPERIENCES.map((exp, index) => (
                <Reveal key={`${exp.company}-${exp.period}`} delay={index * 45}>
                  <article className={index === 0 ? "trace-entry current" : "trace-entry"}>
                    <div className="trace-meta">
                      <span>{String(index).padStart(2, "0")}</span>
                      <time>{exp.period}</time>
                    </div>
                    <div className="trace-body">
                      <h3>{exp.title} <span>@ {exp.company}</span></h3>
                      <p className="trace-location">{exp.location}</p>
                      <p>{exp.description}</p>
                      <div>{exp.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="workbench" className="content-section" aria-labelledby="workbench-heading">
            <Reveal>
              <SectionLabel id="workbench-heading" number="04">Workbench</SectionLabel>
            </Reveal>
            <div className="workbench-grid">
              {pinnedRepos.map((project, index) => (
                <Reveal key={project.title} delay={index * 70}>
                  <article className="workbench-card">
                    <div className="card-head">
                      <span style={{ backgroundColor: project.langColor }} aria-hidden="true" />
                      <p>{projectLane(project)}</p>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.description || "Repository note pending."}</p>
                    <div className="project-tags">
                      {project.stars > 0 && <span>{project.stars} stars</span>}
                      {project.lang && <span>{project.lang}</span>}
                      <span>Pinned on GitHub</span>
                    </div>
                    <div className="project-actions">
                      <a href={project.url} target="_blank" rel="noreferrer noopener">Source</a>
                      {project.pagesUrl && <a href={project.pagesUrl} target="_blank" rel="noreferrer noopener">Live</a>}
                      {project.homepageUrl && project.homepageUrl !== project.pagesUrl && <a href={project.homepageUrl} target="_blank" rel="noreferrer noopener">Homepage</a>}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={320}>
              <div className="repo-ledger-heading">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-dim">public repository ledger</p>
                <h3>Other GitHub repos</h3>
                <p>Fetched at build time from GitHub, excluding pinned Workbench repos, this portfolio, profile metadata, collaborator repos, and forks. Pages links resolve from each repository's live GitHub Pages site.</p>
              </div>
            </Reveal>
            <div className="repo-table" role="list">
              {otherRepos.map((project, index) => (
                <Reveal key={project.title} delay={index * 35}>
                  <article role="listitem" className="repo-row">
                    <a href={project.url} target="_blank" rel="noreferrer noopener">{project.title}</a>
                    <p>{project.description || "Repository note pending."}</p>
                    <div>
                      {project.stars > 0 && <span>{project.stars} stars</span>}
                      {project.lang && <span>{project.lang}</span>}
                      {project.pagesUrl && <a href={project.pagesUrl} target="_blank" rel="noreferrer noopener">GitHub Pages</a>}
                      {project.homepageUrl && project.homepageUrl !== project.pagesUrl && <a href={project.homepageUrl} target="_blank" rel="noreferrer noopener">homepage</a>}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal delay={otherRepos.length * 35 + 120}>
              <a href="https://github.com/jonathanperis" target="_blank" rel="noreferrer noopener" className="github-tail">View all repositories on GitHub</a>
            </Reveal>
          </section>
        </main>

        <footer className="site-footer">
          <div className="footer-socials">
            {SOCIALS.map((social) => <SocialLink key={social.label} social={social} compact />)}
          </div>
          <p>Built as a small systems manual. Hidden shell: ↑↑↓↓←→←→BA</p>
        </footer>
      </div>

      {termOpen && (
        <div className="terminal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) closeTerminal(); }}>
          <div className="terminal-dialog" role="dialog" aria-modal="true" aria-label="Interactive terminal">
            <div className="terminal-titlebar">
              <div className="window-dots" aria-hidden="true"><span /><span /><span /></div>
              <span>jonathan.sh</span>
              <button
                type="button"
                ref={termCloseRef}
                onClick={closeTerminal}
                onKeyDown={(e) => {
                  if (e.key === "Tab") {
                    e.preventDefault();
                    termInRef.current?.focus();
                  } else if (e.key === "Escape") closeTerminal();
                }}
              >
                Close
              </button>
            </div>
            <div className="terminal-body" onClick={() => termInRef.current?.focus()}>
              {termHist.map((line, index) => <div key={`${line}-${index}`} className={line.startsWith("$") ? "cmd-line" : "out-line"}>{line}</div>)}
              <div className="terminal-input-row">
                <span aria-hidden="true">$</span>
                <input
                  ref={termInRef}
                  autoFocus
                  value={termInput}
                  onChange={(e) => setTermInput(e.target.value)}
                  onKeyDown={termKey}
                  aria-label="Terminal command"
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                />
              </div>
              <div ref={termEndRef} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
