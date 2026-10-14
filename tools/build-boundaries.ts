// Turns the EU wine PDO outlines (Candiago et al. 2022, EU_PDO.gpkg) into the region
// outlines the map draws, written to content/boundaries/regions.json (committed, small).
// Regions without an outline keep their placeholder circle.
//
//   npm run map:boundaries                       # uses tools/boundaries/source/EU_PDO.gpkg
//   npm run map:boundaries -- path/to/EU_PDO.gpkg
//   npm run map:boundaries -- --list fr          # print the PDO names for one country
//
// Reads the GeoPackage with node:sqlite, so no GDAL is needed. Handles WGS 84
// (EPSG:4326) and the European LAEA grid (EPSG:3035).

import { DatabaseSync } from 'node:sqlite';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { regions } from '../content/index.ts';
import { PDO_FOR_REGION } from './boundaries/eu-pdo-regions.ts';
import { decodeGpkgGeometry, laeaToLonLat, simplifyRing, type Ring } from './boundaries/geo.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const flag = (name: string) => {
  const i = args.indexOf(name);
  return i >= 0 ? (args[i + 1] ?? '') : null;
};
const listCountry = flag('--list')?.toUpperCase() ?? null;
const outFile = flag('--out') ?? join(ROOT, 'content/boundaries/regions.json');
const namesFile = flag('--names');
const flagValues = new Set([flag('--list'), flag('--out'), namesFile].filter((x) => x !== null));
const src = args.find((a) => !a.startsWith('--') && !flagValues.has(a)) ?? join(ROOT, 'tools/boundaries/source/EU_PDO.gpkg');

const fold = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const db = new DatabaseSync(src, { readOnly: true });
const table = (db.prepare("SELECT table_name FROM gpkg_contents WHERE data_type = 'features' LIMIT 1").get() as { table_name: string }).table_name;
const geomInfo = db.prepare('SELECT column_name, srs_id FROM gpkg_geometry_columns WHERE table_name = ?').get(table) as { column_name: string; srs_id: number };
const columns = (db.prepare(`PRAGMA table_info("${table}")`).all() as { name: string }[]).map((c) => c.name);
const NAME_COLUMNS = ['PDOnam', 'PDO_name', 'PDOname', 'name', 'Name', 'denomination'];
const pickFrom = (cols: string[], ...names: string[]) => cols.find((c) => names.some((n) => c.toLowerCase() === n.toLowerCase()));
const pick = (...names: string[]) => pickFrom(columns, ...names);
const idCol = pick('PDOid', 'PDO_id', 'id');
const countryCol = pick('Country', 'country', 'Country_code', 'CNTR_CODE', 'iso');

/** Minimal CSV reader (comma separated, double-quoted fields). */
function readCsv(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]!;
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') (field += '"'), i++;
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') row.push(field), (field = '');
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(field), (field = '');
      if (row.some((x) => x !== '')) rows.push(row);
      row = [];
    } else field += ch;
  }
  if (field || row.length) row.push(field), rows.push(row);
  const [head, ...body] = rows;
  const keys = (head ?? []).map((k) => k.replace(/^\uFEFF/, '').trim());
  return body.map((r) => Object.fromEntries(keys.map((k, i) => [k, r[i] ?? ''])));
}

// Names live either in the GeoPackage or in the dataset's PDO_EU_id.csv, joined on PDOid.
let nameCol = pick(...NAME_COLUMNS);
const namesById = new Map<string, string>();
if (!nameCol) {
  const csvPath = namesFile ?? join(dirname(src), 'PDO_EU_id.csv');
  if (!idCol || !existsSync(csvPath)) {
    console.error(`No name column in ${table} (columns: ${columns.join(', ')}). Put PDO_EU_id.csv next to the GeoPackage or pass --names.`);
    process.exit(1);
  }
  const csv = readCsv(readFileSync(csvPath, 'utf8'));
  const cols = Object.keys(csv[0] ?? {});
  const csvId = pickFrom(cols, 'PDOid', 'PDO_id', 'id');
  const csvName = pickFrom(cols, ...NAME_COLUMNS);
  if (!csvId || !csvName) {
    console.error(`${csvPath}: need an id and a name column; found ${cols.join(', ')}`);
    process.exit(1);
  }
  for (const r of csv) if (r[csvId] && r[csvName] && !namesById.has(r[csvId]!)) namesById.set(r[csvId]!, r[csvName]!);
  nameCol = '__name';
  console.log(`  names from ${csvPath} (${csvName}, ${namesById.size} PDOs)`);
}
const srs = geomInfo.srs_id;
if (srs !== 4326 && srs !== 3035) {
  console.error(`Unsupported coordinate system EPSG:${srs}. Add it to tools/boundaries/geo.ts.`);
  process.exit(1);
}
console.log(`${src}\n  table ${table}, EPSG:${srs}, name column ${nameCol}${idCol ? `, id column ${idCol}` : ''}${countryCol ? `, country column ${countryCol}` : ''}`);

type Row = Record<string, unknown>;
const rows = (db.prepare(`SELECT * FROM "${table}"`).all() as Row[]).map((r) =>
  nameCol === '__name' ? { ...r, __name: namesById.get(String(r[idCol!])) ?? String(r[idCol!]) } : r,
);

if (listCountry !== null) {
  const names = rows
    .filter((r) => !countryCol || String(r[countryCol]).toUpperCase().startsWith(listCountry) || String(r[idCol ?? '']).toUpperCase().includes(`-${listCountry}-`))
    .map((r) => `${String(r[nameCol])}${idCol ? `  (${String(r[idCol])})` : ''}`)
    .sort((a, b) => a.localeCompare(b));
  console.log(names.join('\n'));
  console.log(`\n${names.length} PDOs`);
  process.exit(0);
}

const byName = new Map<string, Row[]>();
// Some PDOs carry several names ("Pouilly-Fumé / Blanc Fumé de Pouilly"): index each one.
for (const r of rows) {
  const full = String(r[nameCol]);
  const keys = new Set([full, ...full.split(' / ')].map(fold));
  for (const key of keys) byName.set(key, [...(byName.get(key) ?? []), r]);
}
// Prefer the French PDO when several countries share a name.
const lookup = (name: string): Row | undefined => {
  const hits = byName.get(fold(name)) ?? [];
  return hits.find((r) => String(r[idCol ?? ''] ?? '').includes('-FR-') || String(r[countryCol ?? ''] ?? '').toUpperCase().startsWith('FR')) ?? hits[0];
};

const toLonLat = (x: number, y: number): [number, number] => (srs === 3035 ? laeaToLonLat(x, y) : [x, y]);
const levelTolerance: Record<string, number> = { country: 0.01, region: 0.004, district: 0.002, appellation: 0.0008 };

const out: Record<string, { pdo: string[]; geometry: { type: 'MultiPolygon'; coordinates: Ring[][] } }> = {};
const missing: string[] = [];
for (const region of regions) {
  const names = PDO_FOR_REGION[region.id];
  if (!names) continue;
  const polygons: Ring[][] = [];
  const used: string[] = [];
  for (const name of names) {
    const row = lookup(name);
    if (!row) {
      missing.push(`${region.id}: "${name}"`);
      continue;
    }
    used.push(String(row[nameCol]));
    const geometry = decodeGpkgGeometry(row[geomInfo.column_name] as Uint8Array);
    for (const poly of geometry) {
      const rings = poly
        .map((ring) => simplifyRing(ring.map(([x, y]) => toLonLat(x, y)), levelTolerance[region.level] ?? 0.001))
        .filter((r): r is Ring => r !== null);
      if (rings.length && rings[0]) polygons.push(rings);
    }
  }
  if (polygons.length) out[region.id] = { pdo: used, geometry: { type: 'MultiPolygon', coordinates: polygons } };
}

const file = outFile;
mkdirSync(dirname(file), { recursive: true });
writeFileSync(
  file,
  JSON.stringify({
    source: 'Candiago, S. et al. (2022) A geospatial inventory of regulatory information for wine protected designations of origin in Europe. Scientific Data 9, 394. https://doi.org/10.6084/m9.figshare.c.5877659.v1',
    note: 'Outlines are the municipalities each PDO covers, simplified. Generated by tools/build-boundaries.ts; do not edit by hand.',
    regions: out,
  }),
);
const mapped = Object.keys(PDO_FOR_REGION).length;
console.log(`wrote ${Object.keys(out).length} of ${mapped} mapped regions to ${file}`);
if (missing.length) {
  console.log(`\nNot found in the GeoPackage (fix the names in tools/boundaries/eu-pdo-regions.ts; --list fr shows them):`);
  for (const m of missing) console.log(`  ${m}`);
}
