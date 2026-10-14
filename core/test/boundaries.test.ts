import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decodeGpkgGeometry, laeaToLonLat, simplifyRing } from '../../tools/boundaries/geo.ts';

test('EPSG:3035 inverse matches the IOGP Guidance Note 7-2 example', () => {
  // 50°N 5°E ↔ E 3962799.45, N 2999718.85
  const [lon, lat] = laeaToLonLat(3962799.45, 2999718.85);
  assert.ok(Math.abs(lon - 5) < 1e-6, `lon ${lon}`);
  assert.ok(Math.abs(lat - 50) < 1e-6, `lat ${lat}`);
});

/** A GeoPackage blob: GP header (no envelope, little endian) + WKB MultiPolygon. */
function gpkgMultiPolygon(rings: [number, number][][][]): Uint8Array {
  const parts: number[] = [];
  const buf = new ArrayBuffer(8 + 9 + rings.reduce((n, poly) => n + 9 + poly.reduce((m, r) => m + 4 + r.length * 16, 0), 0));
  const v = new DataView(buf);
  let o = 0;
  v.setUint8(o++, 0x47); v.setUint8(o++, 0x50); v.setUint8(o++, 0); v.setUint8(o++, 1); // magic, version, flags (LE, no envelope)
  v.setInt32(o, 4326, true); o += 4;
  v.setUint8(o++, 1); v.setUint32(o, 6, true); o += 4; v.setUint32(o, rings.length, true); o += 4;
  for (const poly of rings) {
    v.setUint8(o++, 1); v.setUint32(o, 3, true); o += 4; v.setUint32(o, poly.length, true); o += 4;
    for (const ring of poly) {
      v.setUint32(o, ring.length, true); o += 4;
      for (const [x, y] of ring) { v.setFloat64(o, x, true); v.setFloat64(o + 8, y, true); o += 16; }
    }
  }
  void parts;
  return new Uint8Array(buf);
}

test('decodes a GeoPackage MultiPolygon', () => {
  const square: [number, number][] = [[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]];
  const polys = decodeGpkgGeometry(gpkgMultiPolygon([[square], [square.map(([x, y]) => [x + 5, y] as [number, number])]]));
  assert.equal(polys.length, 2);
  assert.deepEqual(polys[1]![0]![1], [6, 0]);
});

test('simplification keeps corners and drops near-collinear points', () => {
  const ring: [number, number][] = [[0, 0], [0.5, 0.00001], [1, 0], [1, 1], [0, 1], [0, 0]];
  assert.deepEqual(simplifyRing(ring, 0.001), [[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]);
});
