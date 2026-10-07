/** Build-time geometry for the career metro map: 45°/90° polylines with rounded corners and parallel offsets. */

export type Point = readonly [number, number];

/** Stroke width of every map line. */
export const LINE_WIDTH = 12;
/** Centre-to-centre spacing of lines running side by side. */
export const LINE_SPACING = 16;
/** Corner radius of the reference line; parallel lines get concentric radii. */
const CORNER_RADIUS = 34;

const sub = (a: Point, b: Point): Point => [a[0] - b[0], a[1] - b[1]];
const add = (a: Point, b: Point): Point => [a[0] + b[0], a[1] + b[1]];
const scale = (a: Point, k: number): Point => [a[0] * k, a[1] * k];
const fmt = (p: Point) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`;

export function unit(v: Point): Point {
  const length = Math.hypot(v[0], v[1]);
  return [v[0] / length, v[1] / length];
}

/** Normal of a direction; with SVG's downward y axis it points "down" (south) for an eastbound line. */
export const normal = (u: Point): Point => [-u[1], u[0]];

type Segment = { from: Point; to: Point; dir: Point };

function intersect(a: Segment, b: Segment): Point {
  const cross = a.dir[0] * b.dir[1] - a.dir[1] * b.dir[0];
  if (Math.abs(cross) < 1e-9) return a.to;
  const t = ((b.from[0] - a.from[0]) * b.dir[1] - (b.from[1] - a.from[1]) * b.dir[0]) / cross;
  return [a.from[0] + a.dir[0] * t, a.from[1] + a.dir[1] * t];
}

/** The polyline shifted sideways by `distance`, keeping every corner mitred. */
export function offsetPolyline(points: Point[], distance: number): Point[] {
  const segments: Segment[] = points.slice(1).map((to, i) => {
    const from = points[i];
    const dir = unit(sub(to, from));
    const shift = scale(normal(dir), distance);
    return { from: add(from, shift), to: add(to, shift), dir };
  });
  return [
    segments[0].from,
    ...segments.slice(1).map((segment, i) => intersect(segments[i], segment)),
    segments[segments.length - 1].to,
  ];
}

/**
 * SVG path for a polyline with arc corners. `offset` is how far this line sits from the reference line,
 * so bundled lines turn on concentric arcs instead of overlapping.
 */
export function roundedPath(points: Point[], offset = 0): string {
  let d = `M${fmt(points[0])}`;
  for (let i = 1; i < points.length - 1; i++) {
    const corner = points[i];
    const inDir = unit(sub(corner, points[i - 1]));
    const outDir = unit(sub(points[i + 1], corner));
    const turnsRight = inDir[0] * outDir[1] - inDir[1] * outDir[0] > 0;
    const angle = Math.acos(Math.max(-1, Math.min(1, inDir[0] * outDir[0] + inDir[1] * outDir[1])));
    const radius = turnsRight ? CORNER_RADIUS - offset : CORNER_RADIUS + offset;
    const cut = radius * Math.tan(angle / 2);
    d += ` L${fmt(sub(corner, scale(inDir, cut)))}`;
    d += ` A${radius.toFixed(1)},${radius.toFixed(1)} 0 0 ${turnsRight ? 1 : 0} ${fmt(add(corner, scale(outDir, cut)))}`;
  }
  return `${d} L${fmt(points[points.length - 1])}`;
}

/**
 * Interchange capsule across lines that pass `at` heading `dir`, spanning offsets `from`..`to`
 * (in LINE_SPACING units along the normal). Returns rect attributes for an SVG <rect>.
 */
export function capsule(at: Point, dir: Point, from: number, to: number, radius = 9.5) {
  const n = normal(dir);
  const centre = add(at, scale(n, ((from + to) / 2) * LINE_SPACING));
  const length = (to - from) * LINE_SPACING + 2 * radius;
  const rotation = (Math.atan2(n[1], n[0]) * 180) / Math.PI - 90;
  return {
    x: -radius,
    y: Number((-length / 2).toFixed(1)),
    width: 2 * radius,
    height: Number(length.toFixed(1)),
    rx: radius,
    transform: `translate(${fmt(centre)}) rotate(${Math.round(rotation)})`,
  };
}

/** Short stop marker sticking out of a line on one side (`side` = 1 or -1 along the normal). */
export function tick(at: Point, dir: Point, side: 1 | -1, length = 9) {
  const n = normal(dir);
  const a = add(at, scale(n, side * (LINE_WIDTH / 2 - 1)));
  const b = add(at, scale(n, side * (LINE_WIDTH / 2 + length)));
  return { x1: a[0], y1: a[1], x2: b[0], y2: b[1] };
}
