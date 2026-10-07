/**
 * Pixel-art sprites for the RPG prototype, drawn as character grids for PixelArt.astro.
 * Colors follow the PICO-8 16-color palette, plus a few character tones.
 */

export const PICO = {
  ink: "#0b0d1a",
  navy: "#1d2b53",
  plum: "#7e2553",
  leaf: "#008751",
  rust: "#ab5236",
  stone: "#5f574f",
  mist: "#c2c3c7",
  paper: "#fff1e8",
  red: "#ff004d",
  orange: "#ffa300",
  yellow: "#ffec27",
  green: "#00e436",
  sky: "#29adff",
  lavender: "#83769c",
  pink: "#ff77a8",
  peach: "#ffccaa",
} as const;

export type Sprite = { rows: readonly string[]; palette: Record<string, string> };

/** Jonathan: dark hair, beard, green hoodie with drawstrings, holding an open laptop (lid and logo face the viewer). */
export const HERO: Sprite = {
  palette: {
    K: PICO.ink,
    H: "#2a1a14",
    h: "#4a3226",
    S: "#d08b5b",
    s: "#a8653a",
    B: "#3b2418",
    G: "#00b543",
    g: PICO.leaf,
    L: PICO.mist,
    l: PICO.stone,
    W: PICO.sky,
    w: PICO.paper,
    P: PICO.navy,
    O: PICO.stone,
  },
  rows: [
    "......KKKKKKKK......",
    ".....KHHHHHHHHK.....",
    "....KHHhHHHHhHHK....",
    "....KHHHHHHHHHHK....",
    "....KHSSSSSSSSHK....",
    "....KSSSSSSSSSSK....",
    "....KSKKSSSSKKSK....",
    "...KsSSSSSSSSSSsK...",
    "....KSSSSssSSSSK....",
    "....KBSSSSSSSSBK....",
    "....KBBBSKKSBBBK....",
    ".....KBBBBBBBBK.....",
    "......KKBBBBKK......",
    ".....KGGKSSKGGK.....",
    "...KKGGGGKKGGGGKK...",
    "..KGGGGGwGGwGGGGGK..",
    "..KGgGGGwGGwGGGgGK..",
    "..KGKKKKKKKKKKKKGK..",
    "..KGKLLLLLLLLLLKGK..",
    "..KSKLLLLWWLLLLKSK..",
    "..KSKLLLLWWLLLLKSK..",
    "...KKllllllllllKK...",
    "....KPPPPPPPPPPK....",
    "....KPPPPKKPPPPK....",
    "....KPPPK..KPPPK....",
    "....KOOOK..KOOOK....",
    "....KKKKK..KKKKK....",
  ],
};

export const HEART: Sprite = {
  palette: { R: PICO.red, r: PICO.peach },
  rows: [
    ".RR.RR.",
    "RrRRRRR",
    "RRRRRRR",
    ".RRRRR.",
    "..RRR..",
    "...R...",
  ],
};

export const SCROLL: Sprite = {
  palette: { T: PICO.peach, t: PICO.rust, n: PICO.stone },
  rows: [
    ".tTTTTt",
    "..TnnT.",
    "..TTTT.",
    "..TnnT.",
    "..TTTT.",
    ".tTTTTt",
  ],
};

export const CHEST: Sprite = {
  palette: { o: PICO.rust, d: "#6b3a1f", Y: PICO.yellow },
  rows: [
    ".dddddd.",
    "dooooood",
    "dddYYddd",
    "dooYYood",
    "dooooood",
    "dddddddd",
  ],
};

export const SWORD: Sprite = {
  palette: { W: PICO.mist, w: PICO.paper, Y: PICO.yellow, b: PICO.rust },
  rows: [
    "......WW",
    ".....WwW",
    "....WwW.",
    "...WwW..",
    "Y.WwW...",
    ".YwW....",
    ".bY.....",
    "b..Y....",
  ],
};

export const SPELLBOOK: Sprite = {
  palette: { V: PICO.plum, v: PICO.pink, Y: PICO.yellow, T: PICO.paper },
  rows: [
    "VVVVVVV.",
    "VvvvvvVT",
    "VvYYvvVT",
    "VvYYvvVT",
    "VvvvvvVT",
    "VvvvvvVT",
    "VVVVVVVT",
    ".TTTTTTT",
  ],
};

export const SHIELD: Sprite = {
  palette: { U: PICO.sky, u: PICO.navy, w: PICO.paper, Y: PICO.yellow },
  rows: [
    "UUUUUUUU",
    "UwwUUuuU",
    "UwUUUUuU",
    "UUUYYUUU",
    "UUUYYUUU",
    ".UUUUUu.",
    "..UUUu..",
    "...UU...",
  ],
};

export const DATABASE: Sprite = {
  palette: { A: PICO.mist, a: PICO.stone, G: PICO.green },
  rows: [
    ".AAAAAA.",
    "AaaaaaaA",
    ".AAAAAA.",
    "AAAAAAAA",
    "AGAAAAAA",
    "AAAAAAAA",
    "AGAAAAAA",
    ".AAAAAA.",
  ],
};

export const MONITOR: Sprite = {
  palette: { M: PICO.stone, m: PICO.navy, G: PICO.green },
  rows: [
    "MMMMMMMM",
    "MmmmmmmM",
    "MmGGmmmM",
    "MmmGGmmM",
    "MmGGmmmM",
    "MmmmmmmM",
    "MMMMMMMM",
    "..MMMM..",
  ],
};
