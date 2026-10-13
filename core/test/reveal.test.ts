import { test } from 'node:test';
import assert from 'node:assert/strict';
import { grapes, profiles, regions } from '../../content/index.ts';
import { describeReveal, matchRevealToProfile } from '../src/reveal.ts';
import { emptyNote, emptyReveal, type WineReveal } from '../src/sat.ts';
import { migrate } from '../src/userdb/migrations.ts';
import { getTastingNote, listTastingNotes, revealWine, saveReveal, saveTastingNote } from '../src/userdb/notes.ts';
import { openNodeDb, testDeps } from './nodeDb.ts';

const regionById = new Map(regions.map((r) => [r.id, r]));
const names = { grapeById: new Map(grapes.map((g) => [g.id, g])), regionById };
const reveal = (r: Partial<WineReveal>): WineReveal => ({ ...emptyReveal(), ...r });

test('a revealed Pauillac blend links to the Pauillac profile', () => {
  const r = reveal({ grapes: ['grape:cabernet-sauvignon', 'grape:merlot'], region: 'region:fr-bordeaux-pauillac' });
  assert.equal(matchRevealToProfile(r, 'red', profiles, regionById), 'profile:pauillac');
});

test('a generic Bordeaux links to Bordeaux rouge, not a specific commune', () => {
  const r = reveal({ grapes: ['grape:merlot'], region: 'region:fr-bordeaux' });
  assert.equal(matchRevealToProfile(r, 'red', profiles, regionById), 'profile:bordeaux-rouge');
});

test('no profile when the grapes contradict it or the region is unknown', () => {
  const wrongGrape = reveal({ grapes: ['grape:pinot-noir'], region: 'region:fr-bordeaux-pauillac' });
  assert.equal(matchRevealToProfile(wrongGrape, 'red', profiles, regionById), null);
  const freeText = reveal({ grapes: ['Corvina'], region: 'Valpolicella' });
  assert.equal(matchRevealToProfile(freeText, 'red', profiles, regionById), null);
  const wrongColour = reveal({ region: 'region:fr-bordeaux-pauillac' });
  assert.equal(matchRevealToProfile(wrongColour, 'white', profiles, regionById), null);
});

test('free-text grapes do not block a region match', () => {
  const r = reveal({ grapes: ['Petit Verdot', 'grape:cabernet-sauvignon'], region: 'region:fr-bordeaux-pauillac' });
  assert.equal(matchRevealToProfile(r, 'red', profiles, regionById), 'profile:pauillac');
});

test('describes a revealed wine for lists and headers', () => {
  const r = reveal({
    grapes: ['grape:cabernet-sauvignon', 'grape:merlot'],
    producer: 'Château Example',
    vintage: 2016,
    region: 'region:fr-bordeaux-pauillac',
    price: 95,
    currency: 'CHF',
  });
  const d = describeReveal(r, names);
  assert.equal(d.title, 'Pauillac 2016');
  assert.equal(d.subtitle, 'Château Example · Cabernet Sauvignon, Merlot · France · CHF 95');

  const nv = describeReveal(reveal({ grapes: ['Glera'], nonVintage: true, country: 'it' }), names);
  assert.equal(nv.title, 'Glera NV');
  assert.equal(nv.subtitle, 'Italy');
});

test('saves, reads, lists and clears a reveal', async () => {
  const db = openNodeDb();
  await migrate(db);
  const deps = testDeps();
  const id = await saveTastingNote(db, emptyNote('red'), deps);
  assert.equal((await getTastingNote(db, id))!.reveal, null);

  await saveReveal(
    db,
    id,
    reveal({ grapes: [' grape:merlot ', 'grape:merlot', ''], producer: '  ', vintage: 2019, region: 'region:fr-bordeaux', price: 24, currency: 'EUR', abv: 13.5 }),
    'profile:bordeaux-rouge',
    deps,
  );
  const note = (await getTastingNote(db, id))!;
  assert.deepEqual(note.reveal, {
    grapes: ['grape:merlot'],
    producer: null,
    vintage: 2019,
    nonVintage: false,
    country: null,
    region: 'region:fr-bordeaux',
    price: 24,
    currency: 'EUR',
    abv: 13.5,
  });
  assert.equal(note.revealedProfileId, 'profile:bordeaux-rouge');
  assert.equal((await listTastingNotes(db))[0]!.reveal?.vintage, 2019);

  // Re-saving the note body keeps the reveal.
  await saveTastingNote(db, { ...note, labelText: 'Wine 2' }, deps);
  assert.equal((await getTastingNote(db, id))!.reveal?.region, 'region:fr-bordeaux');

  await saveReveal(db, id, null, null, deps);
  const cleared = (await getTastingNote(db, id))!;
  assert.equal(cleared.reveal, null);
  assert.equal(cleared.revealedProfileId, null);
});

test('the older profile-only reveal still marks the note as revealed', async () => {
  const db = openNodeDb();
  await migrate(db);
  const deps = testDeps();
  const id = await saveTastingNote(db, emptyNote('white'), deps);
  await revealWine(db, id, 'profile:chablis', deps);
  const note = (await getTastingNote(db, id))!;
  assert.equal(note.revealedProfileId, 'profile:chablis');
  assert.deepEqual(note.reveal?.grapes, []);
});

test('regionCountry reads country ids and sub-region ids', async () => {
  const { regionCountry } = await import('../src/reveal.ts');
  assert.equal(regionCountry('region:fr'), 'fr');
  assert.equal(regionCountry('region:fr-bordeaux-pauillac'), 'fr');
  assert.equal(regionCountry('Valpolicella'), null);
});
