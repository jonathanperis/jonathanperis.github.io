const theme = {
  colors: {
    darkNavy: '#020c1b',
    navy: '#0a192f',
    lightNavy: '#112240',
    lightestNavy: '#233554',
    navyShadow: 'rgba(2,12,27,0.7)',
    darkSlate: '#495670',
    slate: '#8892b0',
    lightSlate: '#a8b2d1',
    lightestSlate: '#ccd6f6',
    white: '#e6f1ff',
    green: '#64ffda',
    greenTint: 'rgba(100,255,218,0.1)',
    pink: '#f57dff',
    blue: '#57cbff',
  },

  fonts: {
    Calibre:
      'Calibre, Inter, San Francisco, SF Pro Text, -apple-system, system-ui, sans-serif',
    SFMono: 'SF Mono, Fira Code, Fira Mono, Roboto Mono, monospace',
  },

  fontSizes: {
    xxs: '12px',
    xs: '13px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '22px',
    h3: '32px',
  },

  easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  transition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',

  borderRadius: '4px',
  navHeight: '100px',
  navScrollHeight: '70px',
  margin: '20px',

  tabHeight: 42,
  tabWidth: 120,

  loaderDelay: `6`,

  hamburgerWidth: 30,
  hamBefore: `top 0.1s ease-in 0.25s, opacity 0.1s ease-in`,
  hamBeforeActive: `top 0.1s ease-out, opacity 0.1s ease-out 0.12s`,
  hamAfter: `bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19)`,
  hamAfterActive: `bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s`,
};

export default theme;
