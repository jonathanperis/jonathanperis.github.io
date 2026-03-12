# Jonathan Peris - Personal Portfolio

[![Netlify Status](https://api.netlify.com/api/v1/badges/1963b488-7b78-48c9-9e2d-6fb5e47ab3af/deploy-status)](https://app.netlify.com/sites/jonathanperis/deploys)

Personal portfolio website built with [Gatsby](https://www.gatsbyjs.org/), based on the design by [Brittany Chiang](https://brittanychiang.com).

![demo](https://jonathanperis.github.io/assets/images/profile-image-sharing.jpg)

## 🛠 Installation & Setup

1. Install the Gatsby CLI

   ```sh
   npm install -g gatsby-cli
   ```

2. Install and use the correct version of Node using [NVM](https://github.com/nvm-sh/nvm)

   ```sh
   nvm install
   ```

3. Install dependencies

   ```sh
   npm install
   ```

4. Start the development server

   ```sh
   npm start
   ```

## 🚀 Building and Running for Production

1. Generate a full static production build

   ```sh
   npm run build
   ```

2. Preview the site as it will appear once deployed

   ```sh
   npm run serve
   ```

## 🎨 Color Reference

| Color          | Hex                                                                |
| -------------- | ------------------------------------------------------------------ |
| Navy           | ![#0a192f](https://via.placeholder.com/10/0a192f?text=+) `#0a192f` |
| Light Navy     | ![#112240](https://via.placeholder.com/10/112240?text=+) `#112240` |
| Lightest Navy  | ![#233554](https://via.placeholder.com/10/233554?text=+) `#233554` |
| Slate          | ![#8892b0](https://via.placeholder.com/10/8892b0?text=+) `#8892b0` |
| Light Slate    | ![#a8b2d1](https://via.placeholder.com/10/a8b2d1?text=+) `#a8b2d1` |
| Lightest Slate | ![#ccd6f6](https://via.placeholder.com/10/ccd6f6?text=+) `#ccd6f6` |
| White          | ![#e6f1ff](https://via.placeholder.com/10/e6f1ff?text=+) `#e6f1ff` |
| Green          | ![#64ffda](https://via.placeholder.com/10/64ffda?text=+) `#64ffda` |

## 📁 Project Structure

```
├── content/                # Markdown content
│   ├── featured/          # Featured projects
│   └── jobs/              # Work experience
├── src/
│   ├── components/        # React components
│   │   ├── icons/         # SVG icons
│   │   ├── sections/      # Page sections (Hero, About, Jobs, etc.)
│   │   ├── footer.js      # Footer component
│   │   ├── head.js        # SEO/Meta head component
│   │   └── layout.js      # Main layout wrapper
│   ├── images/            # Image assets
│   ├── pages/             # Gatsby pages
│   ├── styles/            # Global styles and theme
│   │   ├── GlobalStyle.js # Global CSS
│   │   ├── mixins.js      # Reusable style mixins
│   │   ├── theme.js       # Theme configuration
│   │   ├── TransitionStyles.js
│   │   └── PrismStyles.js # Code syntax highlighting
│   ├── utils/             # Utility functions
│   └── config.js          # Site configuration
├── static/                # Static files
├── gatsby-config.js       # Gatsby configuration
├── gatsby-node.js         # Gatsby Node APIs
├── gatsby-browser.js      # Gatsby browser APIs
└── gatsby-ssr.js          # Gatsby SSR APIs
```

## 🗂️ Adding Content

### Adding a New Job

Create a new folder in `content/jobs/` with an `index.md` file:

```markdown
---
date: '2023-01-01'
title: 'Software Engineer'
company: 'Company Name'
location: 'City, Country'
range: 'January 2023 - Present'
url: 'https://company.com/'
---

- Job responsibility 1
- Job responsibility 2
- Job responsibility 3
```

### Adding a Featured Project

Create a new folder in `content/featured/` with an `index.md` file:

```markdown
---
date: '2023-01-01'
title: 'Project Name'
cover: './project-image.png'
github: 'https://github.com/username/repo'
external: 'https://project-url.com'
tech:
  - React
  - Node.js
  - PostgreSQL
---

Project description goes here.
```

## 🔧 Configuration

Edit `src/config.js` to update:
- Email address
- Social media links
- Navigation links
- Site colors

## 📝 Tech Stack

- **Framework**: [Gatsby](https://www.gatsbyjs.org/)
- **UI**: [React](https://reactjs.org/)
- **Styling**: [styled-components](https://styled-components.com/)
- **Animations**: [animejs](https://animejs.com/) & [scrollreveal](https://scrollrevealjs.org/)
- **Code Highlighting**: [PrismJS](https://prismjs.com/)
- **Deployment**: [GitHub Pages](https://pages.github.com/)

## 🎓 Credits

Design inspired by [Brittany Chiang](https://brittanychiang.com)'s v4 portfolio.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.
