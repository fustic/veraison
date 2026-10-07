// Opens user.db, runs migrations and exposes the database, the content bundle
// and small helpers to every screen.
import { randomUUID } from 'expo-crypto';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import type { Aroma, ContentBundle, Grape, Region, WineProfile } from '../../../core/src/content.ts';
import type { Db, Deps } from '../../../core/src/userdb/db.ts';
import { systemClock } from '../../../core/src/userdb/db.ts';
import { migrate } from '../../../core/src/userdb/migrations.ts';
import { getStatuses, markSeen, type ContentStatus } from '../../../core/src/userdb/progress.ts';
import contentJson from '../generated/content.json';
import { colors } from '../theme';
import { openUserDb } from './expoDb';

type Bundle = ContentBundle & { pending: string[] };

export interface Content extends Bundle {
  aromaById: Map<string, Aroma>;
  grapeById: Map<string, Grape>;
  regionById: Map<string, Region>;
  profileById: Map<string, WineProfile>;
  childrenOf: Map<string | null, Region[]>;
}

function indexContent(b: Bundle): Content {
  const childrenOf = new Map<string | null, Region[]>();
  for (const r of b.regions) {
    const list = childrenOf.get(r.parentId) ?? [];
    list.push(r);
    childrenOf.set(r.parentId, list);
  }
  return {
    ...b,
    aromaById: new Map(b.aromas.map((a) => [a.id, a])),
    grapeById: new Map(b.grapes.map((g) => [g.id, g])),
    regionById: new Map(b.regions.map((r) => [r.id, r])),
    profileById: new Map(b.profiles.map((p) => [p.id, p])),
    childrenOf,
  };
}

interface DataContextValue {
  db: Db;
  deps: Deps;
  content: Content;
  statuses: Map<string, ContentStatus>;
  /** Re-read statuses after a write so maps and lists update. */
  refreshStatuses(): Promise<void>;
  seen(contentId: string): Promise<void>;
}

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [db, setDb] = useState<Db | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<Map<string, ContentStatus>>(new Map());
  const content = useMemo(() => indexContent(contentJson as unknown as Bundle), []);
  const deps = useMemo<Deps>(() => ({ clock: systemClock, newId: () => randomUUID() }), []);

  useEffect(() => {
    (async () => {
      try {
        const opened = await openUserDb();
        await migrate(opened);
        setStatuses(await getStatuses(opened));
        setDb(opened);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    })();
  }, []);

  const refreshStatuses = useCallback(async () => {
    if (db) setStatuses(await getStatuses(db));
  }, [db]);

  const seen = useCallback(
    async (contentId: string) => {
      if (!db) return;
      await markSeen(db, contentId, deps);
      await refreshStatuses();
    },
    [db, deps, refreshStatuses],
  );

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: colors.paper }}>
        <Text style={{ color: colors.wine, fontWeight: '600' }}>Could not open your notes database</Text>
        <Text style={{ color: colors.muted, marginTop: 8 }}>{error}</Text>
      </View>
    );
  }
  if (!db) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.paper }}>
        <ActivityIndicator color={colors.wine} />
      </View>
    );
  }
  return <DataContext.Provider value={{ db, deps, content, statuses, refreshStatuses, seen }}>{children}</DataContext.Provider>;
}

export function useData(): DataContextValue {
  const value = useContext(DataContext);
  if (!value) throw new Error('useData must be used inside <DataProvider>');
  return value;
}

/** Marks a grape, region or aroma as seen when its screen opens. */
export function useMarkSeen(contentId: string | undefined) {
  const { seen } = useData();
  useEffect(() => {
    if (contentId) void seen(contentId);
  }, [contentId, seen]);
}
