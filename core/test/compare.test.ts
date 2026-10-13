import { test } from 'node:test';
import assert from 'node:assert/strict';
import { grapes } from '../../content/index.ts';
import { compareGrapes, defaultPair, gridColumn } from '../src/compare.ts';

const byId = new Map(grapes.map((g) => [g.id, g]));
const pinot = byId.get('grape:pinot-noir')!;
const gamay = byId.get('grape:gamay')!;
const cab = byId.get('grape:cabernet-sauvignon')!;
const chardonnay = byId.get('grape:chardonnay')!;

test('Pinot Noir vs Gamay: shared and unique aromas, and the tell', () => {
  const c = compareGrapes(pinot, gamay, 'cool', 'cool');
  assert.ok(c.both.includes('aroma:red-cherry'));
  assert.ok(c.onlyB.includes('aroma:banana'), 'banana is a Gamay tell');
  assert.ok(c.onlyA.includes('aroma:mushroom'));
  assert.ok(c.tells.length >= 1);
  assert.ok(c.summary.length > 0);
});

test('Pinot Noir vs Cabernet Sauvignon: structure separates them on tannin', () => {
  const c = compareGrapes(pinot, cab, 'cool', 'cool');
  const tannin = c.rows.find((r) => r.field === 'tannin')!;
  assert.ok(tannin.gap >= 1);
  assert.match(c.summary, /Cabernet Sauvignon is .* higher in tannin|tannin/);
});

test('red vs white comparison leaves tannin out', () => {
  const c = compareGrapes(pinot, chardonnay, 'cool', 'cool');
  assert.equal(c.rows.some((r) => r.field === 'tannin'), false);
});

test('alcohol (3 steps) maps onto the five-wide grid', () => {
  assert.deepEqual([0, 1, 2].map((v) => gridColumn('alcohol', v)), [0, 2, 4]);
  assert.equal(gridColumn('acidity', 3), 3);
});

test('default pair is a grape and one of its look-alikes', () => {
  const [a, b] = defaultPair(grapes)!;
  assert.ok(a.lookAlikes.some((l) => l.grapeId === b.id));
});
