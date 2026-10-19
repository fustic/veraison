import { test } from 'node:test';
import assert from 'node:assert/strict';
import { grapes, regions } from '../../content/index.ts';
import { ancestry, grapesInRegion, mainlandBounds, regionBounds } from '../src/mapnav.ts';

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

test('grapes in a region: its own principal grapes first, sub-regions included', () => {
  const nemea = grapesInRegion(byId.get('region:gr-nemea')!, childrenOf, grapes);
  assert.deepEqual(nemea, ['grape:agiorgitiko']);
  const greece = grapesInRegion(byId.get('region:gr')!, childrenOf, grapes);
  for (const g of ['grape:agiorgitiko', 'grape:xinomavro', 'grape:assyrtiko']) assert.ok(greece.includes(g), g);
  assert.ok(!greece.includes('grape:nebbiolo'));
  const bordeaux = grapesInRegion(byId.get('region:fr-bordeaux')!, childrenOf, grapes);
  assert.equal(new Set(bordeaux).size, bordeaux.length);
  assert.ok(bordeaux.indexOf('grape:merlot') < bordeaux.indexOf('grape:muscadelle'));
});
