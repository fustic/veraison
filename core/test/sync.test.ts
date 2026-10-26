import { test } from 'node:test';
import assert from 'node:assert/strict';
import { openNodeDb, testDeps } from './nodeDb.ts';
import { fakeServer } from './fakeRemote.ts';
import { migrate, MIGRATIONS } from '../src/userdb/migrations.ts';
import { deleteTastingNote, getGuesses, getTastingNote, listTastingNotes, saveGuesses, saveTastingNote } from '../src/userdb/notes.ts';
import { getStatuses, markSeen, setStudyStatus } from '../src/userdb/progress.ts';
import { getSetting, setSetting } from '../src/userdb/settings.ts';
import { bindAccount, pendingChanges, syncOnce } from '../src/userdb/sync.ts';
import { emptyNote } from '../src/sat.ts';

async function device(uid = 'user-1') {
  const db = openNodeDb();
  await migrate(db);
  await bindAccount(db, uid);
  return db;
}

function note(label: string) {
  const n = emptyNote('red');
  n.labelText = label;
  n.nose.aromaIds = ['aroma:red-cherry'];
  return n;
}

test('a second device gets notes, study progress and guesses from the first', async () => {
  const server = fakeServer();
  const deps = testDeps();
  const a = await device();
  const id = await saveTastingNote(a, note('Wine 1'), deps);
  await saveGuesses(a, id, [{ profileId: 'profile:x', score: 0.8 }] as never, deps);
  await setStudyStatus(a, 'region:fr-bordeaux', 'studied', deps);
  await syncOnce(a, server.remote());
  assert.equal(await pendingChanges(a), 0);

  const b = await device();
  const r = await syncOnce(b, server.remote());
  assert.equal(r.applied, 2);
  assert.equal(r.pushed, 0, 'what came from the server is not sent back');
  assert.equal((await getTastingNote(b, id))?.labelText, 'Wine 1');
  assert.deepEqual((await getTastingNote(b, id))?.nose.aromaIds, ['aroma:red-cherry']);
  assert.equal((await getGuesses(b, id))[0]?.profileId, 'profile:x');
  assert.equal((await getStatuses(b)).get('region:fr-bordeaux')?.status, 'studied');
});

test('edits and deletions travel both ways', async () => {
  const server = fakeServer();
  const deps = testDeps();
  const a = await device();
  const b = await device();
  const id = await saveTastingNote(a, note('Draft'), deps);
  await syncOnce(a, server.remote());
  await syncOnce(b, server.remote());

  deps.tick();
  await saveTastingNote(b, { ...note('Final'), id }, deps);
  await syncOnce(b, server.remote());
  await syncOnce(a, server.remote());
  assert.equal((await getTastingNote(a, id))?.labelText, 'Final');

  deps.tick();
  await deleteTastingNote(a, id, deps);
  await syncOnce(a, server.remote());
  await syncOnce(b, server.remote());
  assert.equal((await listTastingNotes(b)).length, 0);
});

test('offline edits to the same item: the later edit wins on every device', async () => {
  const server = fakeServer();
  const deps = testDeps();
  const a = await device();
  const b = await device();
  await setStudyStatus(a, 'grape:syrah', 'studied', deps);
  deps.tick();
  await setStudyStatus(b, 'grape:syrah', 'mastered', deps);

  // B uploads first; A's older edit must not overwrite it.
  await syncOnce(b, server.remote());
  await syncOnce(a, server.remote());
  assert.equal((await getStatuses(a)).get('grape:syrah')?.status, 'mastered');
  assert.equal(server.get('progress', 'grape:syrah')?.data.row.status, 'mastered');

  // And the other way round: A uploads its older edit first, B still wins.
  const server2 = fakeServer();
  const c = await device();
  const d = await device();
  await setStudyStatus(c, 'grape:merlot', 'studied', deps);
  deps.tick();
  await setStudyStatus(d, 'grape:merlot', 'mastered', deps);
  await syncOnce(c, server2.remote());
  await syncOnce(d, server2.remote());
  await syncOnce(c, server2.remote());
  assert.equal((await getStatuses(c)).get('grape:merlot')?.status, 'mastered');
});

test('a change made while an upload is in flight is uploaded next time', async () => {
  const server = fakeServer();
  const deps = testDeps();
  const a = await device();
  await markSeen(a, 'grape:gamay', deps);
  let once = true;
  const remote = server.remote({
    beforePush: async () => {
      if (!once) return;
      once = false;
      deps.tick();
      await setStudyStatus(a, 'grape:gamay', 'studied', deps);
    },
  });
  await syncOnce(a, remote);
  // The mid-flight change got a new outbox entry, so it was sent in the same sync or stays queued.
  if ((await pendingChanges(a)) > 0) await syncOnce(a, remote);
  assert.equal(server.get('progress', 'grape:gamay')?.data.row.status, 'studied');
});

test('upgrading an existing database queues everything already on it', async () => {
  const db = openNodeDb();
  // Build the schema as it was before sync existed (migration 3).
  for (let v = 0; v < 3; v++) await db.exec(MIGRATIONS[v]!);
  await db.exec('PRAGMA user_version = 3;');
  const deps = testDeps();
  await saveTastingNote(db, note('Old'), deps);
  await markSeen(db, 'grape:pinot-noir', deps);
  await migrate(db);
  assert.equal(await pendingChanges(db), 2);
});

test('signing in with another account uploads this device to that account too', async () => {
  const deps = testDeps();
  const a = await device('user-1');
  await setStudyStatus(a, 'grape:riesling', 'studied', deps);
  await syncOnce(a, fakeServer().remote());
  assert.equal(await pendingChanges(a), 0);
  assert.equal(await bindAccount(a, 'user-1'), false);
  assert.equal(await bindAccount(a, 'user-2'), true);
  assert.equal(await pendingChanges(a), 1);
});

test('settings stay on the device, and documents from newer app versions still apply', async () => {
  const server = fakeServer();
  const deps = testDeps();
  const a = await device();
  await setSetting(a, 'map.online', '0');
  assert.equal(await pendingChanges(a), 0);

  await server.remote().push([
    {
      kind: 'progress',
      id: 'grape:chenin-blanc',
      updatedAt: deps.clock.now(),
      schemaVersion: MIGRATIONS.length + 1,
      data: { row: { content_id: 'grape:chenin-blanc', status: 'studied', view_count: 1, updated_at: deps.clock.now(), future_column: 'x' } },
    },
    // A broken document is skipped, not fatal.
    { kind: 'progress', id: 'grape:bad', updatedAt: deps.clock.now(), schemaVersion: 1, data: { row: { content_id: 'grape:bad', status: 'nonsense' } } },
  ]);
  const r = await syncOnce(a, server.remote());
  assert.equal(r.applied, 1);
  assert.equal((await getStatuses(a)).get('grape:chenin-blanc')?.status, 'studied');
  assert.ok(await getSetting(a, 'sync.cursor'));
});

test('syncing needs an account', async () => {
  const db = openNodeDb();
  await migrate(db);
  await assert.rejects(syncOnce(db, fakeServer().remote()), /Sign in/);
});

test('label photos travel with their note, and older app versions cannot erase them', async () => {
  const { getNotePhoto, setNotePhoto } = await import('../src/userdb/photos.ts');
  const server = fakeServer();
  const deps = testDeps();
  const a = await device();
  const b = await device();
  const id = await saveTastingNote(a, note('Barolo'), deps);
  deps.tick();
  await setNotePhoto(a, id, { mime: 'image/jpeg', width: 1280, height: 960, data: 'AAAA' }, deps);
  await syncOnce(a, server.remote());
  await syncOnce(b, server.remote());
  assert.deepEqual(await getNotePhoto(b, id), { mime: 'image/jpeg', width: 1280, height: 960, data: 'AAAA' });

  // An app from before photos edits the note: its document has no photo, and the photo stays.
  deps.tick();
  const old = structuredClone(server.get('note', id)!);
  delete old.data.photo;
  await server.remote().push([{ ...old, schemaVersion: 4, updatedAt: deps.clock.now(), data: { ...old.data, row: { ...old.data.row, label_text: 'Barolo 2016', updated_at: deps.clock.now() } } }]);
  await syncOnce(b, server.remote());
  assert.equal((await getTastingNote(b, id))?.labelText, 'Barolo 2016');
  assert.ok(await getNotePhoto(b, id), 'photo kept');

  // Removing it on one device removes it everywhere.
  deps.tick();
  await setNotePhoto(b, id, null, deps);
  await syncOnce(b, server.remote());
  await syncOnce(a, server.remote());
  assert.equal(await getNotePhoto(a, id), null);
});

test('photos must be compressed before they are stored', async () => {
  const { setNotePhoto, MAX_PHOTO_BASE64 } = await import('../src/userdb/photos.ts');
  const deps = testDeps();
  const a = await device();
  const id = await saveTastingNote(a, note('Big'), deps);
  await assert.rejects(setNotePhoto(a, id, { mime: 'image/jpeg', width: 4000, height: 3000, data: 'A'.repeat(MAX_PHOTO_BASE64 + 1) }, deps), /too large/);
  await assert.rejects(setNotePhoto(a, id, { mime: 'image/heic', width: 1, height: 1, data: 'A' }, deps), /Unsupported/);
});
