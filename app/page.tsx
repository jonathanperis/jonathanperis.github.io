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
    title: ".NET Developer / .NET Architect",
    company: "Derivative Path Inc.",
    url: "https://www.derivativepath.com/",
    description:
      "Developed OTC interest rate & FX derivatives platform leveraging expertise from top Wall Street firms. Streamlined technology facilitates regulatory compliance & hedge accounting, enabling broader market participation and managing billions in notional value. Migrated all applications (8 solutions, 200+ projects) to .NET 8. Implemented new pipelines migrating from Jenkins/Octopus Deploy to Azure DevOps. Built custom pipeline tasks for DB backup/shrink and isolated environment deployments.",
    tags: ["C#", ".NET 8", "Azure DevOps", "CQRS", "Microservices", "Hedge Accounting"],
  },
  {
    period: "Feb 2023 — Jul 2023",
    title: "Tech Lead / .NET Architect",
    company: "T-Systems / Volkswagen Group",
    url: "https://www.t-systems.com/",
    description:
      "Led architecture and development of the migration of the VTLog project. Migrated a 20-year-old WinForms application to Blazor WASM and REST API services on the cloud. Rethought and developed the solution using modern design patterns. Implemented backend APIs using CQRS to isolate and achieve full test coverage on the entire business logic.",
    tags: ["C#", "Blazor WASM", "REST API", "CQRS", "Architecture", "Unit Testing"],
  },
  {
    period: "Jun 2021 — Feb 2023",
    title: ".NET Developer / .NET Architect",
    company: "KnowFully Learning Group",
    url: "https://www.knowfully.com/",
    description:
      "Developed and maintained the ExamReview platform (including infrastructure and mobile development), the CMS platform that feeds all content for thousands of students on LMS, and the Admin platform for access administration and hierarchy structuring. One of the most used undergraduate courses on the platform is the CPA, used by millions of people throughout the year. All platforms hosted on Azure, using Microservices with CQRS and Saga Pattern, with full unit test coverage.",
    tags: ["C#", "Azure", "CQRS", "Microservices", "Saga Pattern", "Unit Testing"],
  },
  {
    period: "Jan 2021 — Jun 2021",
    title: ".NET Developer / .NET Architect",
    company: "XP Investments US",
    url: "https://www.xpi.com.br/",
    description:
      "Maintained and built new functionalities for the automation robot handling international transfers between XP accounts through Pershing's Netx360 platform. XP Investments is one of the largest independent brokers in Brazil. Implemented with Saga Pattern.",
    tags: ["C#", "RPA Automation", "Saga Pattern", "Financial Services"],
  },
  {
    period: "Sep 2018 — Jan 2021",
    title: ".NET Developer / .NET Architect",
    company: "T-Systems / Mercedes-Benz",
    url: "https://www.t-systems.com/br/pt/",
    description:
      "Developed institutional and intranet apps for T-Systems, the official Mercedes-Benz worldwide IT support company. Led a team as Squad Leader on best coding practices and smart solutions. Organised all visual improvement of internal apps and websites. Participated in the implementation of Scrum methodology.",
    tags: ["C#", "Web API", "Web Applications", "Squad Leadership", "Scrum"],
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
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
                .NET Developer / .NET Architect
              </h2>
              <p className="mt-4 max-w-xs leading-normal text-slate">
                I build robust, scalable back-end systems and full-stack
                applications using .NET, Azure, and modern cloud technologies.
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
                          document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
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
                  href="https://bsky.app/profile/jperis.bsky.social"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Bluesky (opens in a new tab)"
                  title="Bluesky"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.2-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z"/>
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
                  As an experienced .NET developer and architect, I have a strong track
                  record of delivering high-quality software solutions across financial
                  services, education, and enterprise environments. My main skills include{" "}
                  <span className="text-slate-lightest">C#</span>,{" "}
                  <span className="text-slate-lightest">.NET</span>,{" "}
                  <span className="text-slate-lightest">ASP.NET</span>,{" "}
                  <span className="text-slate-lightest">Entity Framework</span>,{" "}
                  <span className="text-slate-lightest">Azure</span>, and{" "}
                  <span className="text-slate-lightest">Architecture</span>.
                </p>
                <p className="mb-4">
                  I have extensive knowledge of various software development patterns and
                  architectures, including{" "}
                  <span className="text-slate-lightest">CQRS</span>,{" "}
                  <span className="text-slate-lightest">Microservices</span>,{" "}
                  <span className="text-slate-lightest">Saga Pattern</span>, and{" "}
                  <span className="text-slate-lightest">Clean Architecture</span>. I also
                  have good working knowledge of{" "}
                  <span className="text-slate-lightest">LINQ</span>,{" "}
                  <span className="text-slate-lightest">T-SQL</span>,{" "}
                  <span className="text-slate-lightest">REST APIs</span>,{" "}
                  <span className="text-slate-lightest">Docker &amp; Kubernetes</span>,{" "}
                  <span className="text-slate-lightest">Azure DevOps</span>,{" "}
                  <span className="text-slate-lightest">Google Cloud</span>, and{" "}
                  <span className="text-slate-lightest">Unit Testing</span>.
                </p>
                <p className="mb-4">
                  Currently at{" "}
                  <span className="text-slate-lightest">Derivative Path Inc.</span>, I
                  work on OTC interest rate &amp; FX derivatives platforms managing billions
                  in notional value, having migrated 8 solutions with 200+ projects to
                  .NET 8 and modernized the entire CI/CD pipeline from Jenkins/Octopus
                  Deploy to Azure DevOps.
                </p>
                <p>
                  I thrive in fast-paced environments where I can work collaboratively
                  with cross-functional teams. Strong interpersonal skills, excellent
                  problem solving abilities, and a creative approach to technical
                  challenges make me an effective team member and leader.
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
                  {EXPERIENCES.map((exp, i) => (
                    <li key={i} className="mb-12">
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
                  {PROJECTS.map((project, i) => (
                    <li key={i} className="mb-12">
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
