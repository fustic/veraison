// Small geometry helpers for the boundary tools: GeoPackage geometry decoding,
// EPSG:3035 (ETRS89 LAEA Europe) → WGS 84, and ring simplification.

export type Ring = [number, number][];

/** Polygons (each a list of rings) from a GeoPackage geometry blob (Polygon or MultiPolygon). */
export function decodeGpkgGeometry(blob: Uint8Array): Ring[][] {
  const view = new DataView(blob.buffer, blob.byteOffset, blob.byteLength);
  if (blob[0] !== 0x47 || blob[1] !== 0x50) throw new Error('not a GeoPackage geometry');
  const flags = blob[3]!;
  const envelope = [0, 32, 48, 48, 64][(flags >> 1) & 0b111] ?? 0;
  let o = 8 + envelope;
  const polygons: Ring[][] = [];

  const readGeometry = () => {
    const little = view.getUint8(o) === 1;
    o += 1;
    const raw = view.getUint32(o, little);
    o += 4;
    // EWKB marks Z/M/SRID with high bits; ISO WKB adds 1000 (Z), 2000 (M) or 3000 (ZM).
    const base = raw & 0x0fffffff;
    const iso = Math.floor(base / 1000);
    const hasZ = (raw & 0x80000000) !== 0 || iso === 1 || iso === 3;
    const hasM = (raw & 0x40000000) !== 0 || iso === 2 || iso === 3;
    if (raw & 0x20000000) o += 4; // EWKB SRID
    const type = base % 1000;
    const dims = 2 + (hasZ ? 1 : 0) + (hasM ? 1 : 0);
    const readRing = (): Ring => {
      const n = view.getUint32(o, little);
      o += 4;
      const ring: Ring = [];
      for (let i = 0; i < n; i++) {
        ring.push([view.getFloat64(o, little), view.getFloat64(o + 8, little)]);
        o += 8 * dims;
      }
      return ring;
    };
    if (type === 3) {
      const n = view.getUint32(o, little);
      o += 4;
      const rings: Ring[] = [];
      for (let i = 0; i < n; i++) rings.push(readRing());
      polygons.push(rings);
    } else if (type === 6 || type === 7) {
      const n = view.getUint32(o, little);
      o += 4;
      for (let i = 0; i < n; i++) readGeometry();
    } else {
      throw new Error(`unsupported WKB geometry type ${type}`);
    }
  };
  readGeometry();
  return polygons;
}

// EPSG:3035 parameters (GRS 80 ellipsoid).
const A = 6378137;
const F = 1 / 298.257222101;
const E2 = 2 * F - F * F;
const E = Math.sqrt(E2);
const LAT0 = (52 * Math.PI) / 180;
const LON0 = (10 * Math.PI) / 180;
const FE = 4321000;
const FN = 3210000;

function qOf(phi: number): number {
  const s = Math.sin(phi);
  return (1 - E2) * (s / (1 - E2 * s * s) - (1 / (2 * E)) * Math.log((1 - E * s) / (1 + E * s)));
}
const QP = qOf(Math.PI / 2);
const BETA0 = Math.asin(qOf(LAT0) / QP);
const RQ = A * Math.sqrt(QP / 2);
const D = (A * (Math.cos(LAT0) / Math.sqrt(1 - E2 * Math.sin(LAT0) ** 2))) / (RQ * Math.cos(BETA0));

/** Lambert azimuthal equal-area (EPSG:3035) easting/northing → [longitude, latitude] in degrees. */
export function laeaToLonLat(x: number, y: number): [number, number] {
  const dx = x - FE;
  const dy = y - FN;
  const rho = Math.sqrt((dx / D) ** 2 + (D * dy) ** 2);
  if (rho === 0) return [10, 52];
  const c = 2 * Math.asin(rho / (2 * RQ));
  const beta = Math.asin(Math.cos(c) * Math.sin(BETA0) + (D * dy * Math.sin(c) * Math.cos(BETA0)) / rho);
  const lon = LON0 + Math.atan2(dx * Math.sin(c), D * rho * Math.cos(BETA0) * Math.cos(c) - D * D * dy * Math.sin(BETA0) * Math.sin(c));
  // Authalic latitude → geodetic latitude (series).
  const lat =
    beta +
    (E2 / 3 + (31 * E2 ** 2) / 180 + (517 * E2 ** 3) / 5040) * Math.sin(2 * beta) +
    ((23 * E2 ** 2) / 360 + (251 * E2 ** 3) / 3780) * Math.sin(4 * beta) +
    ((761 * E2 ** 3) / 45360) * Math.sin(6 * beta);
  return [(lon * 180) / Math.PI, (lat * 180) / Math.PI];
}

function perpDistance(p: [number, number], a: [number, number], b: [number, number]): number {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy);
  if (len === 0) return Math.hypot(p[0] - a[0], p[1] - a[1]);
  return Math.abs(dy * p[0] - dx * p[1] + b[0] * a[1] - b[1] * a[0]) / len;
}

/** Douglas–Peucker simplification (tolerance in degrees), rounded to ~10 m. Null if the ring collapses. */
export function simplifyRing(ring: Ring, tolerance: number): Ring | null {
  if (ring.length < 4) return null;
  const keep = new Uint8Array(ring.length);
  keep[0] = 1;
  keep[ring.length - 1] = 1;
  const stack: [number, number][] = [[0, ring.length - 1]];
  while (stack.length) {
    const [i, j] = stack.pop()!;
    let best = -1;
    let dist = 0;
    for (let k = i + 1; k < j; k++) {
      const d = perpDistance(ring[k]!, ring[i]!, ring[j]!);
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
  const out: Ring = [];
  for (let i = 0; i < ring.length; i++) {
    if (!keep[i]) continue;
    const p: [number, number] = [+ring[i]![0].toFixed(4), +ring[i]![1].toFixed(4)];
    const last = out[out.length - 1];
    if (!last || last[0] !== p[0] || last[1] !== p[1]) out.push(p);
  }
  return out.length >= 4 ? out : null;
}
