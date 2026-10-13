import { test } from 'node:test';
import assert from 'node:assert/strict';
import { aromas, profiles } from '../../content/index.ts';
import { checkAlcohol, explainGuess } from '../src/explain.ts';
import { emptyNote } from '../src/sat.ts';

const label = (id: string) => aromas.find((a) => a.id === id)?.label ?? id;
const pauillac = profiles.find((p) => p.id === 'profile:pauillac')!;

test('a note that fits says so and names what you found', () => {
  const n = emptyNote('red');
  const s = pauillac.structure;
  n.palate.acidity = s.acidity?.[0] ?? null;
  n.palate.tannin = s.tannin?.[0] ?? null;
  n.palate.body = s.body?.[0] ?? null;
  n.nose.aromaIds = Object.keys(pauillac.aromas).slice(0, 2);
  const line = explainGuess(n, pauillac, label);
  assert.match(line, /^Fits your structure, and you found /);
});

test('a light, low-tannin note says the wine would show higher tannin', () => {
  const n = emptyNote('red');
  n.palate.tannin = 0;
  n.palate.body = 0;
  const line = explainGuess(n, pauillac, label);
  assert.match(line, /^Would show higher (tannin|body)/);
});

test('label alcohol check', () => {
  assert.deepEqual(checkAlcohol(2, 13.5), { labelStep: 1, labelWord: 'medium', saidWord: 'high', match: false });
  assert.equal(checkAlcohol(2, 14.5).match, true);
  assert.equal(checkAlcohol(null, 12).match, null);
});
