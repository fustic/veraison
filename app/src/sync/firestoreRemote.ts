// The sync store in Firestore: users/{uid}/items/{kind}~{id}, one document per note,
// study status and review card. Each write is stamped with the server time (syncedAt),
// and downloads page through syncedAt (then document id, as several writes can share a
// time). The rules in app/firestore.rules refuse a write older than the stored copy.
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAfter,
  Timestamp,
  deleteDoc,
  type Firestore,
} from 'firebase/firestore/lite';
import type { Remote, SyncDoc } from '../../../core/src/userdb/sync.ts';

// Small pages: a note with its label photo can be a few hundred kB.
const PAGE = 50;

const keyOf = (d: Pick<SyncDoc, 'kind' | 'id'>) => `${d.kind}~${encodeURIComponent(d.id)}`;

export function firestoreRemote(fs: Firestore, uid: string): Remote {
  const items = collection(fs, 'users', uid, 'items');
  return {
    async pull(cursor) {
      const after = cursor ? (JSON.parse(cursor) as [number, number, string]) : null;
      const q = after
        ? query(items, orderBy('syncedAt'), orderBy(documentId()), startAfter(new Timestamp(after[0], after[1]), after[2]), limit(PAGE))
        : query(items, orderBy('syncedAt'), orderBy(documentId()), limit(PAGE));
      const snap = await getDocs(q);
      let next = cursor;
      const docs: SyncDoc[] = [];
      for (const d of snap.docs) {
        const v = d.data();
        docs.push({ kind: v.kind, id: v.id, updatedAt: v.updatedAt, schemaVersion: v.schemaVersion, data: v.data });
        const t = v.syncedAt as Timestamp | undefined;
        if (t) next = JSON.stringify([t.seconds, t.nanoseconds, d.id]);
      }
      return { docs, cursor: next };
    },

    async push(docs) {
      const results = await Promise.allSettled(
        docs.map((d) =>
          setDoc(doc(items, keyOf(d)), {
            kind: d.kind,
            id: d.id,
            updatedAt: d.updatedAt,
            schemaVersion: d.schemaVersion,
            data: d.data,
            syncedAt: serverTimestamp(),
          }),
        ),
      );
      for (let i = 0; i < results.length; i++) {
        const r = results[i]!;
        if (r.status === 'fulfilled') continue;
        // Refused because the server already holds a newer copy: fine, the next download
        // brings it here. Anything else means the change must stay queued.
        const code = (r.reason as { code?: string }).code;
        if (code === 'permission-denied') {
          const server = await getDoc(doc(items, keyOf(docs[i]!))).catch(() => null);
          const updatedAt = server?.data()?.updatedAt as string | undefined;
          if (updatedAt && updatedAt >= docs[i]!.updatedAt) continue;
        }
        throw r.reason;
      }
    },
  };
}

/** Deletes everything this account stored (for "Delete my account"). */
export async function deleteCloudData(fs: Firestore, uid: string): Promise<number> {
  const items = collection(fs, 'users', uid, 'items');
  let deleted = 0;
  for (;;) {
    const snap = await getDocs(query(items, limit(PAGE)));
    if (snap.empty) return deleted;
    await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
    deleted += snap.size;
  }
}
