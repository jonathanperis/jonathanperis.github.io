import { EXPERIENCES, SKILLS, type Experience } from "./data";
import type { Point } from "./metro-geometry";

/**
 * Metro-map model of the portfolio. Content (roles, periods, tags, skills) comes from data.ts;
 * this file only adds the map vocabulary: which lines exist, which stations they serve, and where
 * each station sits on the hand-drawn diagram.
 */

export type LineId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type Line = {
  id: LineId;
  name: string;
  /** Short description shown next to the line name. */
  kind: string;
  /** Skill group carried by the line, if it is a skills line. */
  skills?: keyof typeof SKILLS;
};

/** Lines 1–5 are drawn on the map; 6–8 only appear in the Line Guide. Colors live in globals.css (--line-N). */
export const LINES: Record<LineId, Line> = {
  1: { id: 1, name: "Career", kind: "every role since 2011" },
  2: { id: 2, name: ".NET", kind: "backend", skills: "backend" },
  3: { id: 3, name: "Azure", kind: "cloud / delivery", skills: "cloud" },
  4: { id: 4, name: "Architecture", kind: "architecture", skills: "architecture" },
  5: { id: 5, name: "Side Projects", kind: "pinned on GitHub" },
  6: { id: 6, name: "Languages", kind: "languages", skills: "languages" },
  7: { id: 7, name: "Data", kind: "databases", skills: "databases" },
  8: { id: 8, name: "Frontend", kind: "frontend", skills: "frontend" },
};

export const MAP_LINES: LineId[] = [1, 2, 3, 4, 5];

/** Lines that carry a skill group, in Line Guide order. */
export const GUIDE_LINES = ([2, 3, 4, 6, 7, 8] as const).map((id) => LINES[id]);

type Label = { x: number; y: number; anchor?: "start" | "end" };

export type Station = {
  id: string;
  /** Name on the map. */
  short: string;
  /** Name in the Station Index. */
  name: string;
  /** Roles at this stop, newest first. */
  roles: Experience[];
  lines: LineId[];
  /** Small caption under the map label. */
  caption: string;
  map: {
    at: Point;
    /** Direction of travel through the station: east or north-east. */
    dir: "E" | "NE";
    /** Lines crossed, as offsets from the Career line in line-spacing units (-1 = Azure above, 1 = .NET below). */
    span: [number, number];
    label?: Label;
  };
};

/** Finds a role in data.ts; a typo or a removed role fails the build instead of drawing a ghost station. */
function role(company: string, periodStart: string): Experience {
  const match = EXPERIENCES.find((e) => e.company === company && e.period.startsWith(periodStart));
  if (!match) throw new Error(`[metro] No experience for ${company} starting ${periodStart}`);
  return match;
}

/** Stations from origin to terminus. Coordinates are in the map's 1440-wide viewBox. */
export const STATIONS: Station[] = [
  {
    id: "sabesp",
    short: "Sabesp",
    name: "Sabesp",
    roles: [role("Sabesp", "2011")],
    lines: [1],
    caption: "2011 · Tech Support",
    map: { at: [96, 560], dir: "E", span: [0, 0], label: { x: 80, y: 524 } },
  },
  {
    id: "conecta",
    short: "Conecta Serviços",
    name: "Conecta Serviços",
    roles: [role("Conecta Serviços", "May 2013")],
    lines: [1, 2],
    caption: "2013 · .NET line begins",
    map: { at: [232, 560], dir: "E", span: [0, 1], label: { x: 216, y: 608 } },
  },
  {
    id: "sonda",
    short: "Sonda IT",
    name: "Sonda IT / Leroy Merlin",
    roles: [role("Sonda IT / Leroy Merlin", "Oct 2015")],
    lines: [1, 2],
    caption: "2015 · Leroy Merlin",
    map: { at: [360, 500], dir: "NE", span: [0, 1], label: { x: 338, y: 476, anchor: "end" } },
  },
  {
    id: "amil",
    short: "5A Attiva / Amil",
    name: "5A Attiva / Amil",
    roles: [role("5A Attiva / Amil (UnitedHealth Group)", "May 2017")],
    lines: [1, 2],
    caption: "2017 · UnitedHealth",
    map: { at: [480, 440], dir: "E", span: [0, 1], label: { x: 500, y: 404, anchor: "end" } },
  },
  {
    id: "t-systems-brasil",
    short: "T-Systems do Brasil",
    name: "T-Systems do Brasil",
    roles: [role("T-Systems do Brasil", "Dec 2019"), role("T-Systems do Brasil", "Sep 2018")],
    lines: [1, 2, 3, 4],
    caption: "2018 — 2021 · Azure joins",
    map: { at: [650, 440], dir: "E", span: [-1, 1], label: { x: 634, y: 488 } },
  },
  {
    id: "xp",
    short: "XP Inc.",
    name: "XP Inc.",
    roles: [role("XP Inc.", "Jan 2021")],
    lines: [1, 2, 3, 4],
    caption: "2021 · Miami",
    map: { at: [880, 320], dir: "E", span: [-1, 1], label: { x: 864, y: 368 } },
  },
  {
    id: "knowfully",
    short: "KnowFully",
    name: "KnowFully Learning Group",
    roles: [role("KnowFully Learning Group", "Jun 2021")],
    lines: [1, 2, 3, 4],
    caption: "2021 — 2023",
    map: { at: [980, 320], dir: "E", span: [-1, 1], label: { x: 1000, y: 276 } },
  },
  {
    id: "t-systems",
    short: "T-Systems",
    name: "T-Systems do Brasil",
    roles: [role("T-Systems do Brasil", "Feb 2023")],
    lines: [1, 2, 3],
    caption: "2023 · Principal .NET",
    map: { at: [1100, 320], dir: "E", span: [-1, 1], label: { x: 1084, y: 368 } },
  },
  {
    id: "derivative-path",
    short: "Derivative Path",
    name: "Derivative Path",
    roles: [role("Derivative Path", "Jul 2023")],
    lines: [1, 2, 3, 4, 5],
    caption: "",
    map: { at: [1230, 320], dir: "E", span: [-1, 1] },
  },
];

export const TERMINUS = STATIONS[STATIONS.length - 1];

/** "May 2013 — Sep 2015" → ["May 2013", "Sep 2015"]; a station spanning several roles runs from the oldest start to the newest end. */
export function stationPeriod(station: Station): [string, string] {
  const newest = station.roles[0].period.split(" — ");
  const oldest = station.roles[station.roles.length - 1].period.split(" — ");
  return [oldest[0], newest[1] ?? newest[0]];
}

/** Every tag used at a station, without repeats, in data.ts order. */
export const stationTags = (station: Station) => [...new Set(station.roles.flatMap((r) => r.tags))];

/** Skills that sit on more than one Line Guide line become interchanges ("Blazor: change for 8"). */
export function interchangesFor(line: Line): Map<string, LineId[]> {
  const result = new Map<string, LineId[]>();
  if (!line.skills) return result;
  for (const skill of SKILLS[line.skills]) {
    const others = GUIDE_LINES.filter((l) => l.id !== line.id && l.skills && SKILLS[l.skills].includes(skill)).map((l) => l.id);
    if (others.length) result.set(skill, others);
  }
  return result;
}
