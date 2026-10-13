// Builds app/src/generated/countries.geojson.json from Natural Earth admin-0 countries
// (public domain, naturalearthdata.com). Rounds coordinates and keeps only the fields
// the map needs, so the world and Europe views work offline.
//
//   node tools/build-countries.ts path/to/ne_50m_admin_0_countries.geojson
//
// The generated file is committed; rerun only to change detail or fields.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { COUNTRIES } from '../core/src/reveal.ts';

type Ring = [number, number][];
type Geometry = { type: 'Polygon'; coordinates: Ring[] } | { type: 'MultiPolygon'; coordinates: Ring[][] };
interface Feature {
  properties: Record<string, unknown>;
  geometry: Geometry;
}

const src = process.argv[2];
if (!src) {
  console.error('usage: node tools/build-countries.ts ne_50m_admin_0_countries.geojson');
  process.exit(1);
}
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'app', 'src', 'generated', 'countries.geojson.json');
const DIGITS = 2;
/** Douglas–Peucker tolerance in degrees (about 4 km). */
const TOLERANCE = 0.04;
const syllabus = new Set(COUNTRIES.map(([c]) => c));

function perpDistance(p: [number, number], a: [number, number], b: [number, number]): number {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy);
  if (len === 0) return Math.hypot(p[0] - a[0], p[1] - a[1]);
  return Math.abs(dy * p[0] - dx * p[1] + b[0] * a[1] - b[1] * a[0]) / len;
}

function simplify(points: Ring, tolerance: number): Ring {
  if (points.length < 3) return points;
  const keep = new Uint8Array(points.length);
  keep[0] = 1;
  keep[points.length - 1] = 1;
  const stack: [number, number][] = [[0, points.length - 1]];
  while (stack.length) {
    const [i, j] = stack.pop()!;
    let best = -1;
    let dist = 0;
    for (let k = i + 1; k < j; k++) {
      const d = perpDistance(points[k]!, points[i]!, points[j]!);
      if (d > dist) {
        dist = d;
        best = k;
      }
    }
    if (best > 0 && dist > tolerance) {
      keep[best] = 1;
      stack.push([i, best], [best, j]);
    }
  }
  return points.filter((_, i) => keep[i]);
}

function cleanRing(ring: Ring): Ring | null {
  const out: Ring = [];
  for (const [x, y] of simplify(ring, TOLERANCE)) {
    const p: [number, number] = [+x.toFixed(DIGITS), +y.toFixed(DIGITS)];
    const last = out[out.length - 1];
    if (!last || last[0] !== p[0] || last[1] !== p[1]) out.push(p);
  }
  return out.length >= 4 ? out : null;
}

function cleanPolygon(rings: Ring[]): Ring[] | null {
  const outer = cleanRing(rings[0]!);
  if (!outer) return null;
  return [outer, ...rings.slice(1).map(cleanRing).filter((r): r is Ring => r !== null)];
}

const data = JSON.parse(readFileSync(src, 'utf8')) as { features: Feature[] };
const features = data.features.flatMap((f) => {
  const p = f.properties;
  const iso = String(p.ISO_A2_EH && p.ISO_A2_EH !== '-99' ? p.ISO_A2_EH : p.ISO_A2).toLowerCase();
  const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  const kept = polys.map(cleanPolygon).filter((x): x is Ring[] => x !== null);
  if (!kept.length) return [];
  return [
    {
      type: 'Feature',
      properties: { iso, name: String(p.NAME ?? p.ADMIN), syllabus: syllabus.has(iso), continent: String(p.CONTINENT ?? '') },
      geometry: kept.length === 1 ? { type: 'Polygon', coordinates: kept[0] } : { type: 'MultiPolygon', coordinates: kept },
    },
  ];
});

writeFileSync(OUT, JSON.stringify({ type: 'FeatureCollection', features }));
console.log(`wrote ${features.length} countries to app/src/generated/countries.geojson.json`);
