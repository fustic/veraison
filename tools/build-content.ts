// Validates /content and compiles it for the app.
//
//   npm run content:check   validate only
//   npm run content:build   validate, then write app/src/generated/{content.json,regions.geojson}
//
// Errors stop the build. Warnings list references to content that is planned but not written
// yet (e.g. a look-alike grape outside France) — the app shows those as "coming soon".

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ContentBundle, Range, StructureRanges } from '../core/src/content.ts';
import { SCALES, type StructureField } from '../core/src/sat.ts';
import { aromas, grapes, profiles, regions, topics } from '../content/index.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'app', 'src', 'generated');

const errors: string[] = [];
const warnings: string[] = [];

const ids = new Map<string, string>();
function register(kind: string, id: string, prefix: string) {
  if (!id.startsWith(prefix)) errors.push(`${kind} id "${id}" must start with "${prefix}"`);
  if (!/^[a-z]+:[a-z0-9-]+$/.test(id)) errors.push(`${kind} id "${id}" may only use lowercase letters, digits and hyphens`);
  if (ids.has(id)) errors.push(`duplicate id "${id}" (${ids.get(id)} and ${kind})`);
  ids.set(id, kind);
}

aromas.forEach((a) => register('aroma', a.id, 'aroma:'));
grapes.forEach((g) => register('grape', g.id, 'grape:'));
regions.forEach((r) => register('region', r.id, 'region:'));
profiles.forEach((p) => register('profile', p.id, 'profile:'));
topics.forEach((t) => register('topic', t.id, 'topic:'));

const has = (id: string) => ids.has(id);
const pending = new Set<string>();
function ref(from: string, id: string, required: boolean) {
  if (has(id)) return;
  if (required) errors.push(`${from} → unknown "${id}"`);
  else pending.add(id);
}

function checkRanges(from: string, ranges: StructureRanges) {
  for (const [field, range] of Object.entries(ranges) as [StructureField, Range][]) {
    const max = SCALES[field].length - 1;
    const [lo, hi] = range;
    if (!Number.isInteger(lo) || !Number.isInteger(hi) || lo < 0 || hi > max || lo > hi) {
      errors.push(`${from}: ${field} range [${lo}, ${hi}] is outside 0..${max} or reversed`);
    }
  }
}

for (const g of grapes) {
  if (!/^#[0-9A-Fa-f]{6}$/.test(g.berryColour ?? '')) errors.push(`${g.id}: berryColour must be a #RRGGBB colour`);
  checkRanges(`${g.id} cool`, g.structure.cool);
  checkRanges(`${g.id} warm`, g.structure.warm);
  g.aromas.forEach((a) => ref(g.id, a.aromaId, true));
  g.lookAlikes.forEach((l) => ref(`${g.id} look-alike`, l.grapeId, false));
  g.regions.forEach((r) => ref(`${g.id} region`, r.regionId, false));
  if (g.aromas.filter((a) => a.ripeness).length === 0) warnings.push(`${g.id} has no ripeness-tagged fruit aromas`);
}

for (const r of regions) {
  if (r.parentId !== null) ref(`${r.id} parent`, r.parentId, true);
  [...r.principalGrapes, ...r.otherGrapes].forEach((g) => ref(`${r.id} grape`, g, false));
  const [lon, lat] = r.centroid;
  if (Math.abs(lon) > 180 || Math.abs(lat) > 90) errors.push(`${r.id}: centroid [${lon}, ${lat}] is not a valid [longitude, latitude]`);
}

for (const p of profiles) {
  checkRanges(p.id, p.structure);
  ref(`${p.id} region`, p.regionId, true);
  p.grapeIds.forEach((g) => ref(`${p.id} grape`, g, true));
  Object.keys(p.aromas).forEach((a) => ref(`${p.id} aroma`, a, true));
}

for (const t of topics) {
  if (!t.sections.length) errors.push(`${t.id}: a topic needs at least one section`);
  for (const sec of t.sections) {
    if (!sec.points.length && !sec.causes?.length) errors.push(`${t.id} › ${sec.heading}: empty section`);
    // Links to topics must exist; grapes and regions may be planned ("coming soon").
    sec.links?.forEach((l) => ref(`${t.id} › ${sec.heading}`, l, l.startsWith('topic:')));
  }
}

if (pending.size) warnings.push(`Not written yet (shown as "coming soon"): ${[...pending].sort().join(', ')}`);
const unverified = [...grapes, ...regions, ...profiles, ...topics].filter((x) => !x.verified).length;
warnings.push(`${unverified} entries still marked verified: false — check them against your book.`);

for (const w of warnings) console.warn(`warning: ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`error: ${e}`);
  console.error(`\n${errors.length} error(s). Nothing written.`);
  process.exit(1);
}

const body = { aromas, grapes, regions, profiles, topics, pending: [...pending].sort() };
const version = createHash('sha256').update(JSON.stringify(body)).digest('hex').slice(0, 12);
const bundle: ContentBundle & { pending: string[] } = { version, ...body };

console.log(
  `ok: ${aromas.length} aromas, ${grapes.length} grapes, ${regions.length} regions, ${profiles.length} profiles, ${topics.length} topics (version ${version})`,
);
if (process.argv.includes('--check')) process.exit(0);

// Real outlines from every file in content/boundaries/ (regions.json from npm run
// map:boundaries, us.json from npm run map:us, …) where they exist; a placeholder circle
// for every other region.
type Outline = { type: 'MultiPolygon'; coordinates: [number, number][][][] };
const BOUNDARIES = join(ROOT, 'content', 'boundaries');
const outlines: Record<string, { geometry: Outline; approximate?: boolean }> = {};
if (existsSync(BOUNDARIES))
  for (const file of readdirSync(BOUNDARIES).filter((f) => f.endsWith('.json')).sort())
    Object.assign(outlines, (JSON.parse(readFileSync(join(BOUNDARIES, file), 'utf8')) as { regions: Record<string, { geometry: Outline; approximate?: boolean }> }).regions);

function circle([lon, lat]: readonly [number, number], radiusKm: number, steps = 48): [number, number][] {
  const ring: [number, number][] = [];
  const dLat = radiusKm / 110.574;
  const dLon = radiusKm / (111.32 * Math.cos((lat * Math.PI) / 180));
  for (let i = 0; i <= steps; i++) {
    const t = (2 * Math.PI * i) / steps;
    ring.push([+(lon + dLon * Math.cos(t)).toFixed(5), +(lat + dLat * Math.sin(t)).toFixed(5)]);
  }
  return ring;
}

function bbox(geometry: Outline): [number, number, number, number] {
  let [w, s, e, n] = [Infinity, Infinity, -Infinity, -Infinity];
  for (const poly of geometry.coordinates)
    for (const [x, y] of poly[0] ?? []) {
      w = Math.min(w, x);
      s = Math.min(s, y);
      e = Math.max(e, x);
      n = Math.max(n, y);
    }
  return [w, s, e, n];
}

for (const id of Object.keys(outlines)) if (!regions.some((r) => r.id === id)) console.warn(`warning: content/boundaries/ has an outline for unknown ${id}`);

const geojson = {
  type: 'FeatureCollection',
  features: regions
    .filter((r) => r.level !== 'country')
    .map((r) => {
      const outline = outlines[r.id]?.geometry;
      return {
        type: 'Feature',
        id: r.id,
        properties: {
          id: r.id,
          name: r.name,
          level: r.level,
          parentId: r.parentId,
          climate: r.climate?.type ?? null,
          placeholder: !outline,
          approximate: !!outlines[r.id]?.approximate,
          bbox: outline ? bbox(outline) : null,
        },
        geometry: outline ?? { type: 'Polygon', coordinates: [circle(r.centroid, r.radiusKm)] },
      };
    }),
};
const outlined = geojson.features.filter((f) => !f.properties.placeholder).length;

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, 'content.json'), JSON.stringify(bundle));
writeFileSync(join(OUT_DIR, 'regions.geojson.json'), JSON.stringify(geojson));
console.log(`wrote app/src/generated/content.json and regions.geojson.json (${outlined} real outlines, ${geojson.features.length - outlined} placeholder circles)`);
