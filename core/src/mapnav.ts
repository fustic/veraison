// Map drill-down helpers: the chain of places above a region (for the breadcrumb) and
// the area to frame when a region is opened.

import type { Region } from './content.ts';

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

function circleBounds(r: Region): Bounds {
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
