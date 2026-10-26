import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { regions } from '../../content/index.ts';
import { indexShapes, regionPicture } from '../src/mappicture.ts';

const gen = new URL('../../app/src/generated/', import.meta.url);
const idx = indexShapes(JSON.parse(readFileSync(new URL('regions.geojson.json', gen), 'utf8')), JSON.parse(readFileSync(new URL('countries.geojson.json', gen), 'utf8')));
const byId = new Map(regions.map((r) => [r.id, r]));
const childrenOf = new Map<string | null, typeof regions>();
for (const r of regions) childrenOf.set(r.parentId, [...(childrenOf.get(r.parentId) ?? []), r]);
const picture = (id: string) => regionPicture(idx, byId.get(id)!, childrenOf, 358, 190);

test('every region page gets a picture with the region drawn', () => {
  for (const r of regions) {
    const p = picture(r.id);
    assert.ok(p.focus.length > 0 || p.inside.length > 0, `${r.id} draws something`);
  }
});

test('a country picture fills in its regions, with no inset', () => {
  const p = picture('region:fr');
  assert.ok(p.inside.length > 50);
  assert.equal(p.inset, null);
  assert.ok(p.sea);
});

test('small pictures drop the coarse coastline but keep the sea round islands', () => {
  const pauillac = picture('region:fr-bordeaux-pauillac');
  assert.equal(pauillac.sea, false);
  assert.equal(pauillac.land.length, 0);
  assert.ok(pauillac.inset);
  assert.ok(pauillac.context.some((o) => o.id === 'region:fr-bordeaux-saint-julien'));
  assert.equal(picture('region:gr-santorini').sea, true);
});
