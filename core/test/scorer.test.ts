import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rankProfiles, scoreProfile, tastingBias } from '../src/scorer.ts';
import { emptyNote, type TastingNoteInput } from '../src/sat.ts';
import type { WineProfile } from '../src/content.ts';

const chianti: WineProfile = {
  id: 'profile:chianti-classico-riserva',
  name: 'Chianti Classico Riserva',
  wineType: 'red',
  grapeIds: ['grape:sangiovese'],
  regionId: 'region:it-tuscany-chianti-classico',
  structure: { sweetness: [0, 0], acidity: [4, 4], tannin: [3, 4], body: [2, 3], alcohol: [1, 2] },
  aromas: { 'aroma:red-cherry': 3, 'aroma:dried-herbs': 2, 'aroma:vanilla': 1 },
  verified: false,
};

const barossa: WineProfile = {
  id: 'profile:barossa-shiraz',
  name: 'Barossa Valley Shiraz',
  wineType: 'red',
  grapeIds: ['grape:syrah'],
  regionId: 'region:au-barossa-valley',
  structure: { sweetness: [0, 0], acidity: [2, 3], tannin: [3, 4], body: [4, 4], alcohol: [2, 2] },
  aromas: { 'aroma:blackberry': 3, 'aroma:black-pepper': 2, 'aroma:vanilla': 2 },
  verified: false,
};

const chablis: WineProfile = {
  id: 'profile:chablis',
  name: 'Chablis',
  wineType: 'white',
  grapeIds: ['grape:chardonnay'],
  regionId: 'region:fr-burgundy-chablis',
  structure: { sweetness: [0, 0], acidity: [4, 4], body: [1, 2] },
  aromas: { 'aroma:lemon': 3, 'aroma:apple': 2 },
  verified: false,
};

function chiantiLikeNote(): TastingNoteInput {
  const n = emptyNote('red');
  n.palate.sweetness = 0;
  n.palate.acidity = 4;
  n.palate.tannin = 3;
  n.palate.body = 2;
  n.palate.alcohol = 1;
  n.nose.aromaIds = ['aroma:red-cherry', 'aroma:dried-herbs'];
  return n;
}

test('ranks the matching profile first and excludes other wine colours', () => {
  const ranked = rankProfiles(chiantiLikeNote(), [barossa, chablis, chianti]);
  assert.equal(ranked.length, 2, 'the white profile is not a candidate for a red note');
  assert.equal(ranked[0]?.profileId, chianti.id);
});

test('explains in-range fields, conflicts and shared aromas', () => {
  const match = scoreProfile(chiantiLikeNote(), barossa);
  assert.ok(match);
  assert.deepEqual(
    match.conflicts.find((c) => c.field === 'acidity'),
    { field: 'acidity', steps: 1 },
    'acidity is one step above Barossa Shiraz',
  );
  assert.deepEqual(
    match.conflicts.find((c) => c.field === 'body'),
    { field: 'body', steps: -2 },
    'body is two steps below',
  );
  assert.deepEqual(match.sharedAromas, []);
  assert.deepEqual(match.missedSignatureAromas, ['aroma:blackberry']);
});

test('an empty note is neutral rather than a perfect match', () => {
  const match = scoreProfile(emptyNote('red'), chianti);
  assert.ok(match);
  assert.equal(match.structureFit, 0.5);
  assert.equal(match.aromaFit, 0.5);
});

test('tasting bias finds a field rated consistently low', () => {
  const notes = [1, 2, 3].map(() => {
    const n = chiantiLikeNote();
    n.palate.tannin = 2; // one step below the [3, 4] range every time
    return { ...n, revealedProfileId: chianti.id };
  });
  const bias = tastingBias(notes, new Map([[chianti.id, chianti]]));
  const tannin = bias.find((b) => b.field === 'tannin');
  assert.deepEqual(tannin, { field: 'tannin', meanSteps: -1, misses: 3, notes: 3 });
  assert.equal(bias[0]?.field, 'tannin', 'the most-missed field comes first');
});
