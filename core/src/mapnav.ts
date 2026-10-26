// Map drill-down helpers: the chain of places above a region (for the breadcrumb) and
// the area to frame when a region is opened.

import type { Grape, Region } from './content.ts';

export type Bounds = [west: number, south: number, east: number, north: number];

/** Region and all its parents, outermost first: France › Bordeaux › Pauillac. */
export function ancestry(regionId: string, regionById: ReadonlyMap<string, Region>): Region[] {
  const chain: Region[] = [];
  let cur = regionById.get(regionId);
  for (let guard = 0; cur && guard < 12; guard++) {
    chain.unshift(cur);
    cur = cur.parentId ? regionById.get(cur.parentId) : undefined;
  }
  return chain;
}

/** Hand-set frames for countries whose outline spans far-off islands or would frame badly. */
export const COUNTRY_VIEW: Readonly<Record<string, Bounds>> = {
  nz: [166, -47.5, 179, -34],
  it: [6.5, 36.5, 18.6, 47.1],
  gr: [19.5, 34.8, 28.3, 41.8],
  au: [112, -44, 154, -10],
};

/** Bounding box of a region's placeholder circle. */
export function circleBounds(r: Region): Bounds {
  const [lon, lat] = r.centroid;
  const dLat = r.radiusKm / 110.574;
  const dLon = r.radiusKm / (111.32 * Math.cos((lat * Math.PI) / 180));
  return [lon - dLon, lat - dLat, lon + dLon, lat + dLat];
}

/** The area covering a region and every region inside it, with a margin. */
export function regionBounds(region: Region, childrenOf: ReadonlyMap<string | null, readonly Region[]>, margin = 0.15): Bounds {
  const all: Region[] = [];
  const walk = (r: Region) => {
    all.push(r);
    for (const c of childrenOf.get(r.id) ?? []) walk(c);
  };
  walk(region);
  // A country's own circle is a rough stand-in; prefer the regions inside it when there are any.
  const parts = region.level === 'country' && all.length > 1 ? all.slice(1) : all;
  let [w, s, e, n] = circleBounds(parts[0]!);
  for (const r of parts.slice(1)) {
    const b = circleBounds(r);
    w = Math.min(w, b[0]);
    s = Math.min(s, b[1]);
    e = Math.max(e, b[2]);
    n = Math.max(n, b[3]);
  }
  const mx = (e - w) * margin;
  const my = (n - s) * margin;
  return [w - mx, s - my, e + mx, n + my];
}

/** Bounding box of the largest polygon of a GeoJSON country (skips overseas islands). */
export function mainlandBounds(geometry: { type: string; coordinates: unknown }): Bounds | null {
  const polys = (geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates) as [number, number][][][];
  let best: { area: number; ring: [number, number][] } | null = null;
  for (const poly of polys) {
    const ring = poly[0];
    if (!ring) continue;
    let area = 0;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) area += (ring[j]![0] + ring[i]![0]) * (ring[j]![1] - ring[i]![1]);
    area = Math.abs(area / 2);
    if (!best || area > best.area) best = { area, ring };
  }
  if (!best) return null;
  let [w, s, e, n] = [Infinity, Infinity, -Infinity, -Infinity];
  for (const [x, y] of best.ring) {
    w = Math.min(w, x);
    s = Math.min(s, y);
    e = Math.max(e, x);
    n = Math.max(n, y);
  }
  return [w, s, e, n];
}

/**
 * Grapes grown in a region or anywhere inside it, most important first: principal grapes
 * of the region itself, then grapes that lead in its sub-regions, then the rest. Ties go to
 * the grape found in more sub-regions, then by name.
 */
export function grapesInRegion(
  region: Region,
  childrenOf: ReadonlyMap<string | null, readonly Region[]>,
  grapes: readonly Grape[],
): string[] {
  const score = new globalThis.Map<string, { weight: number; places: number }>();
  const add = (id: string, weight: number) => {
    const cur = score.get(id) ?? { weight: 0, places: 0 };
    score.set(id, { weight: Math.max(cur.weight, weight), places: cur.places + 1 });
  };
  const inside = new Set<string>();
  const walk = (r: Region, depth: number) => {
    inside.add(r.id);
    for (const g of r.principalGrapes) add(g, depth === 0 ? 3 : 2);
    for (const g of r.otherGrapes) add(g, 1);
    for (const c of childrenOf.get(r.id) ?? []) walk(c, depth + 1);
  };
  walk(region, 0);
  // Grape pages can name a region the region page does not list.
  for (const g of grapes) for (const gr of g.regions) if (inside.has(gr.regionId)) add(g.id, 1);
  const known = new globalThis.Map(grapes.map((g) => [g.id, g.name]));
  return [...score.entries()]
    .filter(([id]) => known.has(id))
    .sort(([a, x], [b, y]) => y.weight - x.weight || y.places - x.places || known.get(a)!.localeCompare(known.get(b)!))
    .map(([id]) => id);
}

const mercY = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (Math.max(-85, Math.min(85, lat)) * Math.PI) / 360));
const latOf = (y: number) => (360 / Math.PI) * Math.atan(Math.exp(y)) - 90;

/**
 * The part of the map the user can actually see when the bottom `covered` fraction of the
 * map view (0–1) is hidden behind a sheet. Works in Web Mercator, as the map is drawn.
 */
export function uncoveredBounds([w, s, e, n]: Bounds, covered: number): Bounds {
  const f = Math.max(0, Math.min(0.95, covered));
  const yn = mercY(n);
  const ys = mercY(s);
  return [w, latOf(yn - (yn - ys) * (1 - f)), e, n];
}

/** Whether two boxes overlap; the view may run past ±180° longitude. */
export function boundsOverlap(box: Bounds, view: Bounds): boolean {
  if (box[1] > view[3] || box[3] < view[1]) return false;
  if (view[2] - view[0] >= 360) return true;
  return [-360, 0, 360].some((d) => box[0] + d <= view[2] && box[2] + d >= view[0]);
}

/**
 * Grapes of the regions inside the visible part of the map, most relevant first: the
 * focused region's own principal grapes, then by how many visible regions grow them
 * (principal counts double), then by name.
 */
export function grapesInView(
  visible: readonly Region[],
  grapes: readonly Grape[],
  focus?: Region,
): string[] {
  const score = new globalThis.Map<string, number>();
  const add = (id: string, w: number) => score.set(id, (score.get(id) ?? 0) + w);
  const ids = new Set(visible.map((r) => r.id));
  for (const r of visible) {
    for (const g of r.principalGrapes) add(g, 2);
    for (const g of r.otherGrapes) add(g, 1);
  }
  // Grape pages can name a region the region page does not list.
  for (const g of grapes) for (const gr of g.regions) {
    const r = ids.has(gr.regionId) ? visible.find((x) => x.id === gr.regionId) : undefined;
    if (r && !r.principalGrapes.includes(g.id) && !r.otherGrapes.includes(g.id)) add(g.id, 1);
  }
  const first = new Set(focus?.principalGrapes ?? []);
  const name = new globalThis.Map(grapes.map((g) => [g.id, g.name]));
  return [...score.keys()]
    .filter((id) => name.has(id))
    .sort((a, b) => Number(first.has(b)) - Number(first.has(a)) || score.get(b)! - score.get(a)! || name.get(a)!.localeCompare(name.get(b)!));
}
