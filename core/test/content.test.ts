// Sanity checks that the real seed content behaves: textbook notes should rank
// their own profile first. If you retune a profile and one of these fails,
// the scorer would now mislead you in practice too.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { profiles } from '../../content/index.ts';
import { rankProfiles } from '../src/scorer.ts';
import { emptyNote } from '../src/sat.ts';

test('a textbook Chablis note ranks Chablis first', () => {
  const n = emptyNote('white');
  Object.assign(n.appearance, { intensity: 0 });
  Object.assign(n.nose, { intensity: 2, aromaIds: ['aroma:apple', 'aroma:lemon', 'aroma:wet-stones'] });
  Object.assign(n.palate, { sweetness: 0, acidity: 4, body: 1, alcohol: 1, finish: 2 });
  assert.equal(rankProfiles(n, profiles)[0]?.profileId, 'profile:chablis');
});

test('a textbook Sancerre note ranks Sancerre first', () => {
  const n = emptyNote('white');
  Object.assign(n.nose, { intensity: 4, aromaIds: ['aroma:gooseberry', 'aroma:grass', 'aroma:grapefruit'] });
  Object.assign(n.palate, { sweetness: 0, acidity: 4, body: 1, alcohol: 1 });
  assert.equal(rankProfiles(n, profiles)[0]?.profileId, 'profile:sancerre');
});

test('a textbook Pauillac note ranks Pauillac first', () => {
  const n = emptyNote('red');
  Object.assign(n.appearance, { intensity: 2 });
  Object.assign(n.nose, { intensity: 3, aromaIds: ['aroma:blackcurrant', 'aroma:cedar', 'aroma:vanilla'] });
  Object.assign(n.palate, { sweetness: 0, acidity: 4, tannin: 4, body: 3, alcohol: 1, finish: 4 });
  assert.equal(rankProfiles(n, profiles)[0]?.profileId, 'profile:pauillac');
});

test('a light, juicy red with banana ranks Beaujolais above Burgundy', () => {
  const n = emptyNote('red');
  Object.assign(n.appearance, { intensity: 0 });
  Object.assign(n.nose, { intensity: 3, aromaIds: ['aroma:raspberry', 'aroma:banana', 'aroma:red-cherry'] });
  Object.assign(n.palate, { sweetness: 0, acidity: 3, tannin: 1, body: 1, alcohol: 1 });
  const ranked = rankProfiles(n, profiles).map((m) => m.profileId);
  assert.ok(ranked.indexOf('profile:beaujolais-cru') < ranked.indexOf('profile:cote-de-nuits-village'));
});
