export type Experience = {
  period: string;
  title: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
};

export const PROFILE = {
  name: "Jonathan Peris",
  title: "Software Engineer",
  email: "jperis.silva@gmail.com",
  location: "Itanhaém, São Paulo, Brazil",
  github: "github.com/jonathanperis",
  linkedin: "linkedin.com/in/jonathan-peris",
  website: "jonathanperis.github.io",
  summary:
    "Software Engineer with 12+ years of experience specializing in .NET and Fintech solutions. Proven track record architecting and delivering high-impact, enterprise-grade software. Expertise centered on the modern .NET ecosystem including .NET Core+, ASP.NET Core, Entity Framework, and MAUI. Deeply committed to engineering excellence with CQRS, DDD, Microservices, Hexagonal Architecture, and Cloud-Native principles. Strong DevOps background with Azure, Docker, and CI/CD pipelines.",
};

export const SKILLS = {
  languages: ["C#", "Rust", "Go", "Python", "TypeScript", "JavaScript"],
  backend: [".NET Core+", "ASP.NET Core", "Entity Framework", "MAUI", "Blazor"],
  architecture: ["CQRS", "DDD", "Microservices", "Hexagonal", "Clean Architecture", "SAGA Pattern"],
  cloud: ["Azure", "Azure DevOps", "Docker", "Kubernetes", "CI/CD"],
  databases: ["SQL Server", "PostgreSQL"],
  frontend: ["Blazor", "React", "Next.js", "Angular"],
};

export const EDUCATION = {
  degree: "Bachelor of Technology (BTech)",
  field: "System Analysis and Development",
  institution: "UNIESP — União das Instituições Educacionais do Estado de São Paulo",
  period: "2011 — 2013",
  description:
    "Foundational degree providing comprehensive knowledge in system analysis, software design, and development methodologies.",
};

export const EXPERIENCES: Experience[] = [
  {
    period: "Jul 2023 — Present",
    title: "Software Engineer",
    company: "Derivative Path",
    location: "New York, US · Remote",
    description:
      "Software Engineer on the CAAR team, focused on developing and refining the General Ledger, Hedge Accounting, and Fiscal Calendar modules for the DerivativeEDGE platform. Enabling clients to achieve streamlined financial reporting, accurate hedge accounting, and efficient fiscal period management.",
    tags: ["C#", ".NET 8", "SQL Server", "CQRS", "Azure DevOps", "Clean Architecture"],
  },
  {
    period: "Feb 2023 — Jul 2023",
    title: "Principal .NET Developer",
    company: "T-Systems do Brasil",
    location: "São Bernardo do Campo, BR · Remote",
    description:
      "Spearheaded the critical platform and architecture migration of SGP Eletrônica — vital software for mapping and parameterization of Electronic Control Units (ECUs) within Mercedes-Benz trucks and buses. Ensured seamless transition while modernizing architecture and enhancing capabilities for advanced automotive diagnostics.",
    tags: ["C#", "ASP.NET Core", "Blazor", "Entity Framework", "Azure", "SQL Server"],
  },
  {
    period: "Jun 2021 — Feb 2023",
    title: "Software Engineer",
    company: "KnowFully Learning Group",
    location: "Radnor, PA, US · Remote",
    description:
      "Drove full-cycle development of the ExamReview platform — backend services, infrastructure, and mobile. Engineered the CMS delivering educational materials to thousands of students via LMS. Built the Admin platform for access control and hierarchy structuring. All platforms on Azure with Microservices, CQRS, and full test coverage.",
    tags: ["C#", "Azure", "Microservices", "CQRS", "Xamarin", "Azure DevOps"],
  },
  {
    period: "Jan 2021 — Jun 2021",
    title: "DevOps Engineer",
    company: "XP Inc.",
    location: "Miami, FL, US · Remote",
    description:
      "Ensured reliability of international wire transfers within XP Inc.'s international accounts group. Maintained and enhanced monitoring processes for Brazil-US fund transfers, managing Azure infrastructure and .NET Core microservices leveraging SAGA patterns and message queues for transactional consistency.",
    tags: ["Azure", ".NET Core", "Docker", "SAGA Pattern", "RabbitMQ", "CI/CD"],
  },
  {
    period: "Dec 2019 — Jan 2021",
    title: "Principal .NET Developer",
    company: "T-Systems do Brasil",
    location: "São Bernardo do Campo, BR",
    description:
      "Led design and development of key internal applications in Agile/Scrum. Engineered T-Atendo (helpdesk for Mercedes-Benz factory workers), Multi Manager (resource booking for on-site assets), and T-Entrego (corporate gift distribution platform). All built with .NET Core, Azure, and microservices.",
    tags: ["C#", ".NET Core", "Azure", "Microservices", "REST API", "Scrum"],
  },
  {
    period: "Sep 2018 — Dec 2019",
    title: "Senior .NET Developer",
    company: "T-Systems do Brasil",
    location: "São Bernardo do Campo, BR",
    description:
      "Built specialized applications for factory operations and corporate functions. Developed mileage control systems for Mercedes-Benz trucks and maintained institutional and intranet applications for internal communication and processes.",
    tags: ["C#", ".NET Framework", "SQL Server", "Azure DevOps", "JavaScript", "MVC"],
  },
  {
    period: "May 2017 — Sep 2018",
    title: ".NET Developer",
    company: "5A Attiva / Amil (UnitedHealth Group)",
    location: "São Paulo, BR",
    description:
      "Developed hospital internal control applications and proof of concept projects. 5A Attiva maintains all internal Amil clinical systems in hospitals and clinics across Brazil.",
    tags: ["C#", "ASP.NET MVC", "SQL Server", "Entity Framework", "Healthcare"],
  },
  {
    period: "Oct 2015 — May 2017",
    title: ".NET Developer",
    company: "Sonda IT / Leroy Merlin",
    location: "São Paulo, BR",
    description:
      "Developed the second version of the label generation system for all Leroy Merlin stores and expanded the business operations management system. SONDA is a leader in systems integration and IT services in Latin America.",
    tags: ["C#", "ASP.NET MVC", "Angular", "Web API", "SQL Server"],
  },
  {
    period: "May 2013 — Sep 2015",
    title: ".NET Developer",
    company: "Conecta Serviços",
    location: "São Paulo, BR",
    description:
      "Developed insurance sales applications for major insurers including Zurich, Assurant, Mapfre, and Cardiff. Built integration with SIGEP WEB (Post Office) for ticket issuance and object returns.",
    tags: ["C#", "ASP.NET Web Forms", "WCF", "SQL Server", "API Integration"],
  },
  {
    period: "2011 — 2013",
    title: "Tech Support Professional",
    company: "Sabesp",
    location: "São Paulo, BR",
    description:
      "Technical support for the state water supply and sanitation company. Configured Active Directory, virtual machines, LDAP, and managed backup contingency. Participated in development of the company's process system.",
    tags: ["Active Directory", "Windows Server", "LDAP", "VMware", "Networking"],
  },
];

export type FeaturedProject = {
  slug: string;
  name: string;
  description: string;
  repoUrl: string;
  liveUrl: string;
  lang: string;
  langColor: string;
  tags: string[];
};

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    slug: "speedy-bird-lynx",
    name: "Speedy Bird",
    description:
      "A Flappy Bird clone built with Lynx (ReactLynx + TypeScript) — ByteDance's cross-platform native UI framework. One codebase renders natively on iOS, Android, and Web. Features accelerating difficulty, medal system, and a full CI/CD pipeline via GitHub Actions.",
    repoUrl: "https://github.com/jonathanperis/speedy-bird-lynx",
    liveUrl: "https://jonathanperis.github.io/speedy-bird-lynx/",
    lang: "TypeScript",
    langColor: "#3178c6",
    tags: ["Lynx", "ReactLynx", "TypeScript", "Cross-Platform", "Game Dev"],
  },
  {
    slug: "cpnucleo",
    name: "Cpnucleo",
    description:
      "A full-featured .NET 10 reference implementation — Clean Architecture, DDD, dual REST/gRPC APIs, and 25+ architecture tests enforced at build time. Docs, architecture overview, and API reference available on GitHub Pages.",
    repoUrl: "https://github.com/jonathanperis/cpnucleo",
    liveUrl: "https://jonathanperis.github.io/cpnucleo/",
    lang: "C#",
    langColor: "#178600",
    tags: ["Clean Architecture", ".NET", "Docker", "DI", "Testing"],
  },
  {
    slug: "super-mango-editor",
    name: "Super Mango Editor",
    description:
      "A classic side-scrolling platformer built from scratch with C and SDL2. Compiled to WebAssembly so it runs directly in the browser — no install needed. Features sprite animation, collision detection, and retro-style gameplay.",
    repoUrl: "https://github.com/jonathanperis/super-mango-editor",
    liveUrl: "https://jonathanperis.github.io/super-mango-editor/",
    lang: "C",
    langColor: "#555555",
    tags: ["C", "SDL2", "WebAssembly", "Game Dev", "Emscripten"],
  },
  {
    slug: "rinha2-back-end-dotnet",
    name: "Rinha de Backend 2 — .NET",
    description:
      "My entry for the Rinha de Backend 2024/Q1 challenge — a high-performance concurrency-focused API built in C# with PostgreSQL and Nginx. Designed to handle extreme load under strict resource constraints (1.5 CPU / 550MB RAM).",
    repoUrl: "https://github.com/jonathanperis/rinha2-back-end-dotnet",
    liveUrl: "https://jonathanperis.github.io/rinha2-back-end-dotnet/",
    lang: "C#",
    langColor: "#178600",
    tags: ["C#", "PostgreSQL", "Nginx", "High Performance", "Docker"],
  },
  {
    slug: "rinha2-back-end-k6",
    name: "Rinha de Backend 2 — K6 Load Tests",
    description:
      "Load testing suite for the Rinha de Backend 2024/Q1 challenge using Grafana K6. Simulates realistic concurrent traffic patterns to stress-test API endpoints and validate correctness under heavy load.",
    repoUrl: "https://github.com/jonathanperis/rinha2-back-end-k6",
    liveUrl: "https://jonathanperis.github.io/rinha2-back-end-k6/",
    lang: "JavaScript",
    langColor: "#f1e05a",
    tags: ["K6", "Load Testing", "Grafana", "Performance", "Stress Testing"],
  },
];

export const ROLES = [
  "Software Engineer",
  "Backend Developer",
  ".NET Architect",
  "DevOps Engineer",
];

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/jonathanperis", icon: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z", vb: "0 0 16 16" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jonathan-peris/", icon: "M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z", vb: "0 0 24 24" },
  { label: "X", href: "https://x.com/jperis_silva", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z", vb: "0 0 24 24" },
  { label: "Instagram", href: "https://www.instagram.com/jperis.silva", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z", vb: "0 0 24 24" },
  { label: "Bluesky", href: "https://bsky.app/profile/jperis.bsky.social", icon: "M123.121 33.6637C188.241 82.5526 258.281 181.681 284 234.873C309.719 181.681 379.759 82.5526 444.879 33.6637C491.866-1.61183 568-28.9064 568 72.4712C568 94.5121 556.786 245.393 550.386 268.08C531.07 342.419 462.619 366.009 400.666 354.322C290.091 333.725 256.077 430.817 284 479.373C322.452 544.032 472.537 374.18 549.136 232.822C555.795 220.355 568 232.822 568 232.822V394.97C568 432.129 536.992 462.336 500.478 465.197C430.618 470.641 365.084 434.503 325.471 395.19C305.094 374.984 294.267 362.636 284 356.357C273.733 362.636 262.906 374.984 242.529 395.19C202.916 434.503 137.382 470.641 67.5218 465.197C31.0077 462.336 0 432.129 0 394.97V232.822C0 232.822 12.2046 220.355 18.8639 232.822C95.4628 374.18 245.548 544.032 284 479.373C311.923 430.817 277.909 333.725 167.334 354.322C105.381 366.009 36.9296 342.419 17.6139 268.08C11.2139 245.393 0 94.5121 0 72.4712C0-28.9064 76.1341-1.61183 123.121 33.6637Z", vb: "0 0 568 501" },
  { label: "Workana", href: "https://www.workana.com/freelancer/ce6f665020db70278890e8b1a2136812", icon: "M20 6H4a2 2 0 00-2 2v8a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2zm-8 10a4 4 0 110-8 4 4 0 010 8z", vb: "0 0 24 24" },
];
