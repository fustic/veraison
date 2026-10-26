import { test } from 'node:test';
import assert from 'node:assert/strict';
import { grapes, regions } from '../../content/index.ts';
import { ancestry, boundsOverlap, circleBounds, grapesInRegion, grapesInView, mainlandBounds, regionBounds, uncoveredBounds } from '../src/mapnav.ts';

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

test('grapes in view: only regions overlapping the view, focus grapes first', () => {
  const view: [number, number, number, number] = [-1.5, 44.5, 0.5, 45.6]; // around Bordeaux
  const visible = regions.filter((r) => r.level !== 'country' && boundsOverlap(circleBounds(r), view));
  assert.ok(visible.some((r) => r.id === 'region:fr-bordeaux-pauillac'));
  assert.ok(!visible.some((r) => r.id === 'region:it-piemonte-barolo'));
  const ids = grapesInView(visible, grapes);
  assert.ok(ids.includes('grape:merlot') && ids.includes('grape:cabernet-sauvignon'));
  assert.ok(!ids.includes('grape:nebbiolo'));
  const sauternes = byId.get('region:fr-bordeaux-sauternes')!;
  const ranked = grapesInView(visible, grapes, sauternes);
  const lead = ranked.slice(0, sauternes.principalGrapes.length);
  assert.deepEqual(new Set(lead), new Set(sauternes.principalGrapes.filter((g) => ranked.includes(g))));
});

test('view helpers: covered sheet trims the south edge; views past 180° still overlap', () => {
  const [, s] = uncoveredBounds([0, 40, 10, 50], 0.5);
  assert.ok(s > 40 && s < 50);
  assert.deepEqual(uncoveredBounds([0, 40, 10, 50], 0), [0, 40, 10, 50]);
  assert.ok(boundsOverlap([172, -42, 174, -40], [170, -45, 190, -35]));
  assert.ok(boundsOverlap([-178, -42, -176, -40], [170, -45, 190, -35]));
  assert.ok(!boundsOverlap([10, 40, 12, 42], [20, 40, 30, 50]));
});
