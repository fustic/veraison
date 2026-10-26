// In-memory stand-in for the Firestore sync store: newer document wins, and the server
// stamps each write with an increasing sequence that pull pages through.
import type { Remote, SyncDoc } from '../src/userdb/sync.ts';

export function fakeServer(pageSize = 3) {
  let seq = 0;
  const docs = new Map<string, { doc: SyncDoc; at: number }>();
  let pushes = 0;
  return {
    docs,
    get pushes() {
      return pushes;
    },
    get(kind: string, id: string) {
      return docs.get(`${kind}/${id}`)?.doc;
    },
    remote(hooks: { beforePush?: () => Promise<void> } = {}): Remote {
      return {
        async pull(cursor) {
          const from = cursor ? Number(cursor) : 0;
          const page = [...docs.values()].filter((d) => d.at > from).sort((a, b) => a.at - b.at).slice(0, pageSize);
          return { docs: page.map((d) => structuredClone(d.doc)), cursor: page.length ? String(page[page.length - 1]!.at) : cursor };
        },
        async push(list) {
          await hooks.beforePush?.();
          for (const doc of list) {
            pushes++;
            const key = `${doc.kind}/${doc.id}`;
            const cur = docs.get(key);
            if (cur && cur.doc.updatedAt > doc.updatedAt) continue;
            docs.set(key, { doc: structuredClone(doc), at: ++seq });
          }
        },
      };
    },
  };
}
