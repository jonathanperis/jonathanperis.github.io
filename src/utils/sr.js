import scrollReveal from 'scrollreveal';

const isSSR = typeof window === 'undefined';
const sr = isSSR ? null : scrollReveal();

export default sr;
