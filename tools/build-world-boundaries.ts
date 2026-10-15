// Outlines for Australia, New Zealand, Chile, Argentina and South Africa, written to
// content/boundaries/world.json (committed, small). Sources in tools/boundaries/source/:
//   au/{zones,regions,subregions}.geojson  Wine Australia GI feature service (CC BY 4.0)
//   nz/<GI>.json                           IPONZ GI register data files (ESRI JSON)
//   gb/<ISO>-<ADM>.geojson                 geoBoundaries gbOpen, simplified (CC BY 3.0 IGO)
// Which shapes make up each region: tools/boundaries/world-regions.ts.
//
//   npm run map:world

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { regions } from '../content/index.ts';
import { simplifyRing, toleranceFor, type Ring } from './boundaries/geo.ts';
import { APPROXIMATE, WORLD, type Pick } from './boundaries/world-regions.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'tools/boundaries/source');
const outFile = join(ROOT, 'content/boundaries/world.json');
const COUNTRIES = ['au', 'nz', 'cl', 'ar', 'za'];

type Polygon = [number, number][][];
type Shape = { name: string; state: string; polygons: Polygon[] };

const fold = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
/** Some geoBoundaries names are UTF-8 read as Latin-1 ("RegiÃ³n"); undo that. */
const fixText = (s: string) => (/Ã|Â/.test(s) ? Buffer.from(s, 'latin1').toString('utf8') : s);

function geojsonPolygons(g: { type: string; coordinates: unknown }): Polygon[] {
  if (g.type === 'Polygon') return [g.coordinates as Polygon];
  if (g.type === 'MultiPolygon') return g.coordinates as Polygon[];
  return [];
}

const signedArea = (ring: [number, number][]) => ring.reduce((a, [x, y], i) => { const [x2, y2] = ring[(i + 1) % ring.length]!; return a + x * y2 - x2 * y; }, 0) / 2;
function inRing([x, y]: [number, number], ring: [number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i]!, [xj, yj] = ring[j]!;
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/** ESRI JSON rings: outer rings run clockwise, holes anticlockwise. */
function esriPolygons(rings: [number, number][][]): Polygon[] {
  const outers = rings.filter((r) => signedArea(r) < 0).map((r) => [r] as Polygon);
  if (!outers.length) return rings.map((r) => [r]);
  for (const hole of rings.filter((r) => signedArea(r) > 0)) outers.find((o) => inRing(hole[0]!, o[0]!))?.push(hole);
  return outers;
}

const cache = new Map<string, Shape[]>();
function load(src: Pick['src']): Shape[] {
  if (cache.has(src)) return cache.get(src)!;
  let shapes: Shape[] = [];
  if (src.startsWith('au-')) {
    const file = join(SRC, 'au', `${{ 'au-zone': 'zones', 'au-region': 'regions', 'au-subregion': 'subregions' }[src as 'au-zone']}.geojson`);
    const d = JSON.parse(readFileSync(file, 'utf8')) as { features: { properties: Record<string, string>; geometry: { type: string; coordinates: unknown } }[] };
    shapes = d.features.map((f) => ({ name: f.properties.GI_NAME ?? '', state: f.properties.STATE ?? '', polygons: geojsonPolygons(f.geometry) }));
  } else if (src !== 'nz') {
    const d = JSON.parse(readFileSync(join(SRC, 'gb', `${src}.geojson`), 'utf8')) as { features: { properties: { shapeName: string }; geometry: { type: string; coordinates: unknown } }[] };
    shapes = d.features.map((f) => ({ name: fixText(f.properties.shapeName), state: '', polygons: geojsonPolygons(f.geometry) }));
  }
  cache.set(src, shapes);
  return shapes;
}

function nzFile(stem: string): Shape[] {
  const file = join(SRC, 'nz', `${stem}.json`);
  if (!existsSync(file)) return [];
  const d = JSON.parse(readFileSync(file, 'utf8')) as { features: { attributes: Record<string, string>; geometry: { rings: [number, number][][] } }[] };
  return d.features.map((f) => ({ name: f.attributes.GI_Name ?? stem, state: '', polygons: esriPolygons(f.geometry.rings) }));
}

const centre = (p: Polygon): [number, number] => {
  const ring = p[0]!;
  return [ring.reduce((a, q) => a + q[0], 0) / ring.length, ring.reduce((a, q) => a + q[1], 0) / ring.length];
};

function resolve(pick: Pick): Shape[] {
  if (pick.src === 'nz') return pick.names.flatMap(nzFile);
  const all = load(pick.src);
  let hits = 'state' in pick && pick.state ? all.filter((s) => s.state === pick.state && !(pick.exclude ?? []).some((n) => fold(n) === fold(s.name))) : all.filter((s) => (pick.names ?? []).some((n) => fold(n) === fold(s.name)));
  if ('within' in pick && pick.within) {
    const parent = load(pick.src.replace(/ADM\d$/, 'ADM1') as Pick['src']).find((s) => fold(s.name) === fold(pick.within!));
    if (parent) hits = hits.filter((s) => s.polygons.some((p) => parent.polygons.some((q) => inRing(centre(p), q[0]!))));
  }
  return hits;
}

function defaults(id: string, name: string): Pick[] {
  if (id.startsWith('region:au-')) return [{ src: 'au-region', names: [name] }, { src: 'au-subregion', names: [name] }];
  if (id.startsWith('region:nz-')) return [{ src: 'nz', names: [name.replace(/[’']/g, '').replace(/\s+/g, '_')] }];
  return [];
}

const raw = new Map<string, { from: string[]; polygons: Polygon[] }>();
const missing: string[] = [];
const ours = regions.filter((r) => r.level !== 'country' && COUNTRIES.some((c) => r.id.startsWith(`region:${c}-`)));
for (const region of ours) {
  const shapes = (WORLD[region.id] ?? defaults(region.id, region.name)).flatMap(resolve);
  if (shapes.length) raw.set(region.id, { from: [...new Set(shapes.map((s) => s.name))], polygons: shapes.flatMap((s) => s.polygons) });
}
// Regions with no shape of their own: the outlines of the regions inside them.
const childrenOf = new Map<string, string[]>();
for (const r of regions) if (r.parentId) childrenOf.set(r.parentId, [...(childrenOf.get(r.parentId) ?? []), r.id]);
const inside = (id: string): { from: string[]; polygons: Polygon[] }[] => (childrenOf.get(id) ?? []).flatMap((k) => (raw.has(k) ? [raw.get(k)!] : inside(k)));
for (const region of [...ours].reverse()) {
  if (raw.has(region.id)) continue;
  const parts = inside(region.id);
  if (parts.length) raw.set(region.id, { from: parts.flatMap((p) => p.from), polygons: parts.flatMap((p) => p.polygons) });
  else missing.push(region.id);
}

const out: Record<string, { from: string[]; approximate?: true; geometry: { type: 'MultiPolygon'; coordinates: Ring[][] } }> = {};
for (const region of ours) {
  const r = raw.get(region.id);
  if (!r) continue;
  const tol = toleranceFor(region.level, r.polygons);
  const coordinates = r.polygons
    .map((p) => p.map((ring) => simplifyRing(ring, tol)).filter((x): x is Ring => x !== null))
    .filter((rings) => rings.length > 0 && rings[0]);
  if (coordinates.length) out[region.id] = { from: r.from, ...(APPROXIMATE.has(region.id) ? { approximate: true as const } : {}), geometry: { type: 'MultiPolygon', coordinates } };
}

writeFileSync(
  outFile,
  JSON.stringify({
    source:
      'Australia: Geographical Indications of Australia © Wine Australia (CC BY 4.0). New Zealand: IPONZ Geographical Indications Register. Chile, Argentina, South Africa: geoBoundaries gbOpen (CC BY 3.0 IGO), grouped by Chile’s Decree 464, Argentina’s INV IG list and, approximately, South Africa’s Wine of Origin districts.',
    note: 'Simplified. Generated by tools/build-world-boundaries.ts; do not edit by hand.',
    regions: out,
  }),
);
console.log(`wrote ${Object.keys(out).length} outlines to ${outFile} (${[...APPROXIMATE].filter((id) => out[id]).length} approximate)`);
if (missing.length) console.log(`No outline (circle kept):\n  ${missing.join('\n  ')}`);
