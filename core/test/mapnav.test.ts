import { test } from 'node:test';
import assert from 'node:assert/strict';
import { regions } from '../../content/index.ts';
import { ancestry, mainlandBounds, regionBounds } from '../src/mapnav.ts';

const byId = new Map(regions.map((r) => [r.id, r]));
const childrenOf = new Map<string | null, typeof regions>();
for (const r of regions) childrenOf.set(r.parentId, [...(childrenOf.get(r.parentId) ?? []), r]);

test('ancestry runs from the country down to the appellation', () => {
  assert.deepEqual(
    ancestry('region:fr-bordeaux-pauillac', byId).map((r) => r.name),
    ['France', 'Bordeaux', 'Haut-Médoc', 'Pauillac'],
  );
});

test('a region frame contains all its sub-regions', () => {
  const [w, s, e, n] = regionBounds(byId.get('region:fr-bordeaux')!, childrenOf);
  for (const c of childrenOf.get('region:fr-bordeaux') ?? []) {
    const [lon, lat] = c.centroid;
    assert.ok(lon > w && lon < e && lat > s && lat < n, `${c.name} inside Bordeaux frame`);
  }
});

test('mainland bounds ignore small islands', () => {
  const geometry = {
    type: 'MultiPolygon',
    coordinates: [
      [[[0, 0], [10, 0], [10, 10], [0, 10], [0, 0]]],
      [[[50, 50], [51, 50], [51, 51], [50, 51], [50, 50]]],
    ],
  };
  assert.deepEqual(mainlandBounds(geometry), [0, 0, 10, 10]);
});
