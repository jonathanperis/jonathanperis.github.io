"use client";

import { useEffect, useState, useRef } from "react";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

const EXPERIENCES = [
  {
    period: "Jul 2023 — Present",
    title: "Software Engineer",
    company: "Derivative Path",
    url: "https://www.derivativepath.com/",
    description:
      "Software Engineer on the CAAR team, focused on developing and refining the General Ledger, Hedge Accounting, and Fiscal Calendar modules for the DerivativeEDGE platform. This work enables clients to achieve streamlined financial reporting, accurate hedge accounting, and efficient fiscal period management.",
    tags: ["C#", ".NET", "Azure DevOps", "CQRS", "Fintech", "Hedge Accounting"],
  },
  {
    period: "Feb 2023 — Jul 2023",
    title: "Principal .NET Developer",
    company: "T-Systems do Brasil",
    url: "https://www.t-systems.com/",
    description:
      "Spearheaded the critical platform and architecture migration of SGP Eletrônica, a vital software used for the intricate mapping and parameterization of Electronic Control Units (ECUs) within Mercedes-Benz trucks and buses. Focused on ensuring a seamless transition, modernizing the architecture, and enhancing the platform's capabilities to support advanced automotive diagnostics and configurations.",
    tags: ["C#", "ASP.NET Core", ".NET Core", "Architecture", "Migration"],
  },
  {
    period: "Jun 2021 — Feb 2023",
    title: "Software Engineer",
    company: "KnowFully Learning Group",
    url: "https://www.knowfully.com/",
    description:
      "Contributed to the development, maintenance, and infrastructure of key educational technology platforms. Drove full-cycle development of the ExamReview platform encompassing backend services, infrastructure management, and mobile development. Engineered and maintained the CMS platform delivering educational materials to thousands of students via the LMS. Developed the Admin platform for user access control, hierarchy structuring, and overall LMS governance.",
    tags: ["C#", "Azure", "Azure DevOps", "Microservices", "CQRS", "Unit Testing"],
  },
  {
    period: "Jan 2021 — Jun 2021",
    title: "DevOps Engineer",
    company: "XP Inc.",
    url: "https://www.xpi.com.br/",
    description:
      "Ensured the reliability of international wire transfers within XP Inc.'s international accounts group. Focused on maintaining and enhancing the operational integrity of monitoring processes for Brazil-US fund transfers, managing Azure infrastructure, overseeing .NET Core microservices leveraging SAGA patterns and message queues for transactional consistency, and guaranteeing continuous availability of this vital financial pipeline.",
    tags: ["Azure", ".NET Core", "DevOps", "SAGA Pattern", "Message Queues", "Fintech"],
  },
  {
    period: "Dec 2019 — Jan 2021",
    title: "Principal .NET Developer",
    company: "T-Systems do Brasil",
    url: "https://www.t-systems.com/br/pt/",
    description:
      "Led the design and development of several key internal applications leveraging .NET Core, Azure, and microservices architecture within an Agile/Scrum environment. Engineered T-Atendo, a helpdesk platform supporting Mercedes-Benz factory workers. Developed Multi Manager, a resource booking system for on-site assets. Created T-Entrego, a platform for distributing welcome kits and corporate gifts.",
    tags: ["C#", ".NET Core", "Azure", "Microservices", "REST API", "Scrum"],
  },
  {
    period: "Sep 2018 — Dec 2019",
    title: "Senior .NET Developer",
    company: "T-Systems do Brasil",
    url: "https://www.t-systems.com/br/pt/",
    description:
      "Focused on creating specialized applications to support factory operations and internal corporate functions. Developed mileage control applications for trucks within the Mercedes-Benz factory, enhancing tracking and operational oversight. Built and maintained various institutional and intranet applications to support internal communication and processes.",
    tags: ["C#", ".NET", "Azure DevOps", "Web Applications", "SQL Server"],
  },
  {
    period: "May 2017 — Sep 2018",
    title: ".NET Developer",
    company: "5A Attiva / Amil (UnitedHealth Group)",
    url: "#",
    description:
      "Developed hospital internal control applications and proof of concept projects for prospecting purposes for other consulting clients. 5A Attiva maintains all internal Amil clinical systems in hospitals and clinics across Brazil.",
    tags: ["C#", "ADO.NET", "SQL Server", "Healthcare", "Clinical Systems"],
  },
  {
    period: "Oct 2015 — May 2017",
    title: "Ionic / .NET Developer",
    company: "Sonda IT / Leroy Merlin",
    url: "https://www.sonda.com/br/",
    description:
      "Developed the second version of the label generation system for all Leroy Merlin stores and built the expansion of Leroy Merlin's business operations management system. SONDA is a leader in systems integration and IT services in Latin America.",
    tags: ["C#", "MVC", "Web API", "Angular", "Ionic Framework", "Microservices"],
  },
  {
    period: "May 2013 — Sep 2015",
    title: ".NET Developer",
    company: "Conecta Serviços",
    url: "#",
    description:
      "Developed insurance sales applications for major insurers including Zurich, Assurant, Mapfre, and Cardiff. Built the integration with SIGEP WEB service (Post Office) responsible for issuing tickets for posts and return of objects.",
    tags: ["C#", "Web Forms", "WCF Services", "Insurance", "API Integration"],
  },
  {
    period: "2011 — 2013",
    title: "Tech Support Professional",
    company: "Sabesp",
    url: "https://www.sabesp.com.br/",
    description:
      "Provided technical support for a state company in the water supply and sanitation segment. Configured Active Directory, virtual machines, LDAP, and handled contingency of company backups. Participated in the development of the company's process system.",
    tags: ["Active Directory", "LDAP", "Virtual Machines", "IT Infrastructure"],
  },
];

const PROJECTS = [
  {
    title: "cpnucleo",
    description:
      "A sample solution demonstrating modern .NET best practices — featuring clean architecture, robust testing, dependency injection, and Docker containerization.",
    url: "https://github.com/jonathanperis/cpnucleo",
    tags: ["C#", ".NET", "Clean Architecture", "Docker", "DDD"],
  },
  {
    title: "rinha2-back-end-dotnet",
    description:
      "A high-performance backend implementation for the Rinha de Backend challenge, built with C#, PostgreSQL, and Nginx, designed for maximum concurrency and throughput.",
    url: "https://github.com/jonathanperis/rinha2-back-end-dotnet",
    tags: ["C#", "PostgreSQL", "Nginx", "Performance", "Docker"],
  },
  {
    title: "blazor-mudblazor-starter",
    description:
      "A Blazor starter template using MudBlazor UI framework that you can use as a starting point for your project, with pre-configured components and modern styling.",
    url: "https://github.com/jonathanperis/blazor-mudblazor-starter",
    tags: ["Blazor", "MudBlazor", "C#", ".NET", "WebAssembly"],
  },
  {
    title: "rinha2-back-end-go",
    description:
      "A backend implementation for the Rinha de Backend challenge in Go, exploring high-performance server development with PostgreSQL and Nginx.",
    url: "https://github.com/jonathanperis/rinha2-back-end-go",
    tags: ["Go", "PostgreSQL", "Nginx", "Performance", "Docker"],
  },
  {
    title: "rinha2-back-end-rust",
    description:
      "A backend implementation for the Rinha de Backend challenge in Rust, pushing the limits of performance with PostgreSQL and Nginx.",
    url: "https://github.com/jonathanperis/rinha2-back-end-rust",
    tags: ["Rust", "PostgreSQL", "Nginx", "Performance", "Docker"],
  },
  {
    title: "rinha2-back-end-python",
    description:
      "A backend implementation for the Rinha de Backend challenge in Python, exploring concurrency and throughput with PostgreSQL and Nginx.",
    url: "https://github.com/jonathanperis/rinha2-back-end-python",
    tags: ["Python", "PostgreSQL", "Nginx", "Performance", "Docker"],
  },
  {
    title: "super-mango-game",
    description:
      "A Super Mango Game written in C for learning purposes, exploring game development fundamentals and low-level programming concepts.",
    url: "https://github.com/jonathanperis/super-mango-game",
    tags: ["C", "Game Development", "SDL", "Low-Level Programming"],
  },
];

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number | null = null;
    const latestPositionRef = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      latestPositionRef.x = e.clientX;
      latestPositionRef.y = e.clientY;

      if (animationFrameId === null) {
        animationFrameId = window.requestAnimationFrame(() => {
          setMousePosition({ x: latestPositionRef.x, y: latestPositionRef.y });
          animationFrameId = null;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -60% 0px",
      }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={mainRef}
      className="relative min-h-screen"
      style={{
        background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
      }}
    >
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* Left sidebar - sticky */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-lightest sm:text-5xl">
                <a href="/">Jonathan Peris</a>
              </h1>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-lightest sm:text-xl">
                Software Engineer
              </h2>
              <p className="mt-4 max-w-xs leading-normal text-slate">
                I architect and deliver high-impact, enterprise-grade software
                with .NET, Azure, and modern cloud-native technologies.
              </p>

              {/* Navigation */}
              <nav className="nav hidden lg:block" aria-label="In-page jump links">
                <ul className="mt-16 w-max">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.id}>
                      <a
                        className="group flex items-center py-3"
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const section = document.getElementById(item.id);
                          if (section) {
                            section.scrollIntoView({ behavior: "smooth" });
                            history.pushState(null, "", `#${item.id}`);
                          }
                        }}
                      >
                        <span
                          className={`mr-4 h-px transition-all group-hover:w-16 group-hover:bg-slate-lightest ${
                            activeSection === item.id
                              ? "w-16 bg-slate-lightest"
                              : "w-8 bg-slate"
                          }`}
                        />
                        <span
                          className={`text-xs font-bold uppercase tracking-widest group-hover:text-slate-lightest ${
                            activeSection === item.id
                              ? "text-slate-lightest"
                              : "text-slate"
                          }`}
                        >
                          {item.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Social links */}
            <ul className="ml-1 mt-8 flex items-center gap-5" aria-label="Social media">
              <li>
                <a
                  className="block text-slate hover:text-slate-lightest transition-colors"
                  href="https://github.com/jonathanperis"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub (opens in a new tab)"
                  title="GitHub"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  className="block text-slate hover:text-slate-lightest transition-colors"
                  href="https://www.linkedin.com/in/jonathan-peris/"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn (opens in a new tab)"
                  title="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  className="block text-slate hover:text-slate-lightest transition-colors"
                  href="https://x.com/jperis_silva"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="X / Twitter (opens in a new tab)"
                  title="X / Twitter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  className="block text-slate hover:text-slate-lightest transition-colors"
                  href="https://www.instagram.com/jperis.silva"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Instagram (opens in a new tab)"
                  title="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  className="block text-slate hover:text-slate-lightest transition-colors"
                  href="https://bsky.app/profile/jperis.bsky.social"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Bluesky (opens in a new tab)"
                  title="Bluesky"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 568 501"
                    fill="currentColor"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path d="M123.121 33.6637C188.241 82.5526 258.281 181.681 284 234.873C309.719 181.681 379.759 82.5526 444.879 33.6637C491.866 -1.61183 568 -28.9064 568 72.4712C568 94.5121 556.786 245.393 550.386 268.08C531.07 342.419 462.619 366.009 400.666 354.322C290.091 333.725 256.077 430.817 284 479.373C322.452 544.032 472.537 374.18 549.136 232.822C555.795 220.355 568 232.822 568 232.822V394.97C568 432.129 536.992 462.336 500.478 465.197C430.618 470.641 365.084 434.503 325.471 395.19C305.094 374.984 294.267 362.636 284 356.357C273.733 362.636 262.906 374.984 242.529 395.19C202.916 434.503 137.382 470.641 67.5218 465.197C31.0077 462.336 0 432.129 0 394.97V232.822C0 232.822 12.2046 220.355 18.8639 232.822C95.4628 374.18 245.548 544.032 284 479.373C311.923 430.817 277.909 333.725 167.334 354.322C105.381 366.009 36.9296 342.419 17.6139 268.08C11.2139 245.393 0 94.5121 0 72.4712C0 -28.9064 76.1341 -1.61183 123.121 33.6637Z" />
                  </svg>
                </a>
              </li>
            </ul>
          </header>

          {/* Right content - scrollable */}
          <main className="pt-24 lg:w-1/2 lg:py-24">
            {/* About Section */}
            <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-navy/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-lightest lg:sr-only">
                  About
                </h2>
              </div>
              <div className="text-slate leading-relaxed">
                <p className="mb-4">
                  I&apos;m a Software Engineer with 12+ years of experience building
                  enterprise-grade systems with{" "}
                  <span className="text-slate-lightest">.NET</span> and modern cloud
                  technologies. I specialize in{" "}
                  <span className="text-slate-lightest">Fintech</span> — currently
                  developing General Ledger, Hedge Accounting, and Fiscal Calendar modules
                  at{" "}
                  <span className="text-slate-lightest">Derivative Path</span> for the
                  DerivativeEDGE platform.
                </p>
                <p className="mb-4">
                  My work spans the full .NET ecosystem:{" "}
                  <span className="text-slate-lightest">.NET Core+</span>,{" "}
                  <span className="text-slate-lightest">ASP.NET Core</span>,{" "}
                  <span className="text-slate-lightest">Entity Framework</span>, and{" "}
                  <span className="text-slate-lightest">MAUI</span>. I design systems
                  using{" "}
                  <span className="text-slate-lightest">CQRS</span>,{" "}
                  <span className="text-slate-lightest">DDD</span>,{" "}
                  <span className="text-slate-lightest">Microservices</span>,{" "}
                  <span className="text-slate-lightest">Hexagonal Architecture</span>, and{" "}
                  <span className="text-slate-lightest">Cloud-Native</span> principles
                  — always focused on building software that is scalable, maintainable,
                  and built to last.
                </p>
                <p className="mb-4">
                  Over the years, I&apos;ve delivered solutions across industries — financial
                  services at{" "}
                  <span className="text-slate-lightest">XP Inc.</span>, automotive at{" "}
                  <span className="text-slate-lightest">T-Systems</span> for Mercedes-Benz,
                  educational technology at{" "}
                  <span className="text-slate-lightest">KnowFully</span>, healthcare,
                  retail, and insurance. I also bring strong DevOps experience with{" "}
                  <span className="text-slate-lightest">Azure</span>,{" "}
                  <span className="text-slate-lightest">Docker</span>, and CI/CD pipelines.
                </p>
                <p>
                  Beyond .NET, I actively explore{" "}
                  <span className="text-slate-lightest">Rust</span>,{" "}
                  <span className="text-slate-lightest">Go</span>, and{" "}
                  <span className="text-slate-lightest">Python</span> — driven by
                  curiosity about performance, concurrency, and what the next generation of
                  systems will look like. You can find some of these experiments in my
                  open-source projects below.
                </p>
              </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-navy/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-lightest lg:sr-only">
                  Experience
                </h2>
              </div>
              <div>
                <ol className="group/list">
                  {EXPERIENCES.map((exp) => (
                    <li key={`${exp.company}-${exp.period}`} className="mb-12">
                      <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-navy-light/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

                        <header
                          className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate sm:col-span-2"
                          aria-label={exp.period}
                        >
                          {exp.period}
                        </header>
                        <div className="z-10 sm:col-span-6">
                          <h3 className="font-medium leading-snug text-slate-lightest">
                            <div>
                              {exp.url && exp.url !== "#" ? (
                                <a
                                  className="group/link inline-flex items-baseline text-base font-medium leading-tight text-slate-lightest hover:text-green focus-visible:text-green"
                                  href={exp.url}
                                  target="_blank"
                                  rel="noreferrer noopener"
                                  aria-label={`${exp.title} at ${exp.company} (opens in a new tab)`}
                                >
                                  <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                                  <span>
                                    {exp.title} ·{" "}
                                    <span className="inline-block">
                                      {exp.company}
                                      <ArrowIcon />
                                    </span>
                                  </span>
                                </a>
                              ) : (
                                <span
                                  className="group/link inline-flex items-baseline text-base font-medium leading-tight text-slate-lightest"
                                >
                                  <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                                  <span>
                                    {exp.title} ·{" "}
                                    <span className="inline-block">
                                      {exp.company}
                                    </span>
                                  </span>
                                </span>
                              )}
                            </div>
                          </h3>
                          <p className="mt-2 text-sm leading-normal">
                            {exp.description}
                          </p>
                          <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                            {exp.tags.map((tag) => (
                              <li key={tag} className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-green-tint px-3 py-1 text-xs font-medium leading-5 text-green">
                                  {tag}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-12">
                  <a
                    className="group/link inline-flex items-baseline text-base font-semibold leading-tight text-slate-lightest hover:text-green focus-visible:text-green"
                    href="/cv_jonathan_peris.pdf"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="View Full Resume (opens in a new tab)"
                  >
                    <span>
                      View Full Resume{" "}
                      <ArrowIcon />
                    </span>
                  </a>
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-navy/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-lightest lg:sr-only">
                  Projects
                </h2>
              </div>
              <div>
                <ul className="group/list">
                  {PROJECTS.map((project) => (
                    <li key={project.title} className="mb-12">
                      <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-navy-light/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

                        <div className="z-10 sm:order-2 sm:col-span-6">
                          <h3>
                            <a
                              className="group/link inline-flex items-baseline text-base font-medium leading-tight text-slate-lightest hover:text-green focus-visible:text-green"
                              href={project.url}
                              target="_blank"
                              rel="noreferrer noopener"
                              aria-label={`${project.title} (opens in a new tab)`}
                            >
                              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                              <span>
                                {project.title}{" "}
                                <ArrowIcon />
                              </span>
                            </a>
                          </h3>
                          <p className="mt-2 text-sm leading-normal">
                            {project.description}
                          </p>
                          <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                            {project.tags.map((tag) => (
                              <li key={tag} className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-green-tint px-3 py-1 text-xs font-medium leading-5 text-green">
                                  {tag}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-12">
                  <a
                    className="group/link inline-flex items-baseline text-base font-semibold leading-tight text-slate-lightest hover:text-green focus-visible:text-green"
                    href="https://github.com/jonathanperis"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="View All Projects on GitHub (opens in a new tab)"
                  >
                    <span>
                      View All Projects on GitHub{" "}
                      <ArrowIcon />
                    </span>
                  </a>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="max-w-md pb-16 text-sm text-slate sm:pb-0">
              <p>
                Built with{" "}
                <a
                  href="https://nextjs.org/"
                  className="font-medium text-slate-light hover:text-green focus-visible:text-green"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Next.js
                </a>{" "}
                and{" "}
                <a
                  href="https://tailwindcss.com/"
                  className="font-medium text-slate-light hover:text-green focus-visible:text-green"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Tailwind CSS
                </a>
                . Design heavily inspired by{" "}
                <a
                  href="https://brittanychiang.com/"
                  className="font-medium text-slate-light hover:text-green focus-visible:text-green"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Brittany Chiang
                </a>
                . Coded with AI using{" "}
                <a
                  href="https://docs.anthropic.com/en/docs/claude-code"
                  className="font-medium text-slate-light hover:text-green focus-visible:text-green"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Claude Code
                </a>
                .
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
