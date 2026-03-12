# jonathanperis.github.io

Personal portfolio website for **Jonathan Peris** — a software engineer specializing in robust, scalable back-end systems and full-stack applications using .NET and modern cloud technologies.

🌐 **Live site:** [jonathanperis.github.io](https://jonathanperis.github.io)

---

## About

This is the source code for my personal portfolio and résumé website. It showcases my professional experience, open-source projects, and technical skills. The site is built with a focus on performance, accessibility, and clean design.

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [GitHub Pages](https://pages.github.com/) | Static site hosting |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/jonathanperis/jonathanperis.github.io.git
cd jonathanperis.github.io

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the site running locally.

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Project Structure

```
jonathanperis.github.io/
├── app/
│   ├── layout.tsx      # Root layout with metadata and fonts
│   ├── page.tsx        # Main page (About, Experience, Projects)
│   ├── globals.css     # Global styles and Tailwind directives
│   └── favicon.ico
├── public/             # Static assets (images, CV PDF, favicon)
├── next.config.ts      # Next.js configuration
├── tsconfig.json       # TypeScript configuration
└── package.json
```

## Deployment

The site is automatically deployed to [GitHub Pages](https://pages.github.com/) via GitHub Actions on every push to the `main` branch.

## License

This project is licensed under the **Apache License 2.0** — see the [LICENSE](LICENSE) file for details.

Copyright 2019 Jonathan Peris

---

> Designed & built by [Jonathan Peris](https://jonathanperis.github.io)
