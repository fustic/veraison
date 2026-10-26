import { test } from 'node:test';
import assert from 'node:assert/strict';
import { openNodeDb, testDeps } from './nodeDb.ts';
import { migrate, MIGRATIONS } from '../src/userdb/migrations.ts';
import {
  deleteTastingNote,
  getGuesses,
  getTastingNote,
  listTastingNotes,
  revealWine,
  saveGuesses,
  saveTastingNote,
} from '../src/userdb/notes.ts';
import { coverage, getStatuses, markSeen, setBeenThere, setStudyStatus } from '../src/userdb/progress.ts';
import { exportUserData, importUserData } from '../src/userdb/backup.ts';
import { emptyNote } from '../src/sat.ts';

async function freshDb() {
  const db = openNodeDb();
  await migrate(db);
  return db;
}

test('migrations run once and are idempotent', async () => {
  const db = openNodeDb();
  assert.deepEqual(await migrate(db), { from: 0, to: MIGRATIONS.length });
  assert.deepEqual(await migrate(db), { from: MIGRATIONS.length, to: MIGRATIONS.length });
});

test('saves, reads, updates and soft-deletes a tasting note', async () => {
  const db = await freshDb();
  const deps = testDeps();
  const input = emptyNote('red');
  input.appearance = { clarity: 0, intensity: 1, colour: 'ruby', observations: ['legs'] };
  input.nose.aromaIds = ['aroma:red-cherry', 'aroma:violet', 'aroma:red-cherry'];
  input.palate.acidity = 4;
  input.labelText = 'Wine 2';

  const id = await saveTastingNote(db, input, deps);
  const saved = await getTastingNote(db, id);
  assert.ok(saved);
  assert.equal(saved.appearance.colour, 'ruby');
  assert.deepEqual(saved.appearance.observations, ['legs']);
  assert.deepEqual(saved.nose.aromaIds, ['aroma:red-cherry', 'aroma:violet'], 'duplicates are removed');
  assert.equal(saved.palate.aromaIds, null, 'palate defaults to "same as nose"');

  deps.tick();
  await saveTastingNote(db, { ...input, id, palate: { ...input.palate, aromaIds: ['aroma:vanilla'] } }, deps);
  const updated = await getTastingNote(db, id);
  assert.ok(updated);
  assert.equal(updated.createdAt, saved.createdAt, 'created_at survives an update');
  assert.notEqual(updated.updatedAt, saved.updatedAt);
  assert.deepEqual(updated.palate.aromaIds, ['aroma:vanilla']);

  assert.equal((await listTastingNotes(db)).length, 1);
  await deleteTastingNote(db, id, deps);
  assert.equal(await getTastingNote(db, id), null);
  assert.equal((await listTastingNotes(db)).length, 0);
});

test('stores guesses and the revealed wine', async () => {
  const db = await freshDb();
  const deps = testDeps();
  const id = await saveTastingNote(db, emptyNote('red'), deps);
  await saveGuesses(db, id, [
    { profileId: 'profile:a', score: 0.9 } as never,
    { profileId: 'profile:b', score: 0.5 } as never,
  ]);
  await revealWine(db, id, 'profile:a', deps);
  assert.deepEqual(
    (await getGuesses(db, id)).map((g) => g.profileId),
    ['profile:a', 'profile:b'],
  );
  assert.equal((await getTastingNote(db, id))?.revealedProfileId, 'profile:a');
});

test('tracks what has been seen and computes coverage', async () => {
  const db = await freshDb();
  const deps = testDeps();
  const bordeaux = ['region:fr-bordeaux-pauillac', 'region:fr-bordeaux-margaux', 'region:fr-bordeaux-pomerol'];

  await markSeen(db, 'region:fr-bordeaux-pauillac', deps);
  await markSeen(db, 'region:fr-bordeaux-pauillac', deps);
  await markSeen(db, 'region:fr-bordeaux-margaux', deps);
  await setStudyStatus(db, 'region:fr-bordeaux-margaux', 'mastered', deps);
  await setBeenThere(db, 'region:fr-bordeaux-pauillac', true, deps);

  const statuses = await getStatuses(db, 'region:fr-bordeaux');
  assert.equal(statuses.get('region:fr-bordeaux-pauillac')?.viewCount, 2);
  assert.equal(statuses.get('region:fr-bordeaux-pauillac')?.beenThere, true);

  const cov = coverage(bordeaux, statuses);
  assert.deepEqual(
    { total: cov.total, unseen: cov.unseen, seen: cov.seen, mastered: cov.mastered, unseenIds: cov.unseenIds },
    { total: 3, unseen: 1, seen: 1, mastered: 1, unseenIds: ['region:fr-bordeaux-pomerol'] },
  );
});

test('export and import round-trip, newest row wins', async () => {
  const source = await freshDb();
  const deps = testDeps();
  const note = emptyNote('white');
  note.nose.aromaIds = ['aroma:lemon'];
  const id = await saveTastingNote(source, note, deps);
  await markSeen(source, 'grape:chardonnay', deps);
  const dump = await exportUserData(source, deps.clock.now());

  const target = await freshDb();
  assert.deepEqual(await importUserData(target, dump), { notes: 1, statuses: 1 });
  const copied = await getTastingNote(target, id);
  assert.deepEqual(copied?.nose.aromaIds, ['aroma:lemon']);

  // Importing the same file again changes nothing.
  assert.deepEqual(await importUserData(target, dump), { notes: 0, statuses: 0 });
});

test('backups carry label photos', async () => {
  const { getNotePhoto, setNotePhoto } = await import('../src/userdb/photos.ts');
  const source = await freshDb();
  const deps = testDeps();
  const id = await saveTastingNote(source, emptyNote('red'), deps);
  deps.tick();
  await setNotePhoto(source, id, { mime: 'image/jpeg', width: 800, height: 600, data: 'QkFTRTY0' }, deps);
  const target = await freshDb();
  await importUserData(target, await exportUserData(source, deps.clock.now()));
  assert.equal((await getNotePhoto(target, id))?.data, 'QkFTRTY0');
});

test('settings round-trip and overwrite', async () => {
  const { getSetting, setSetting } = await import('../src/userdb/settings.ts');
  const db = await freshDb();
  assert.equal(await getSetting(db, 'currency'), null);
  await setSetting(db, 'currency', 'CHF');
  await setSetting(db, 'currency', 'EUR');
  assert.equal(await getSetting(db, 'currency'), 'EUR');
});
