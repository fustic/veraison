// Keeps user.db in step with the signed-in account: syncs on sign-in, when the app comes
// back to the foreground, and shortly after local changes. Signed out, nothing changes:
// the app works from the device database alone.
import { onAuthStateChanged, type User } from 'firebase/auth';
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { AppState } from 'react-native';
import { bindAccount, pendingChanges, syncOnce } from '../../../core/src/userdb/sync.ts';
import { useData } from '../data/DataProvider';
import { auth, signInWithGoogle, signOut as authSignOut } from './auth';
import { cloud } from './firebaseApp';
import { deleteCloudData, firestoreRemote } from './firestoreRemote';

export interface Account {
  uid: string;
  name: string | null;
  email: string | null;
}

export type SyncStatus = 'signed-out' | 'syncing' | 'synced' | 'error';

interface SyncContextValue {
  account: Account | null;
  /** True until Firebase has said whether someone is signed in. */
  checking: boolean;
  status: SyncStatus;
  lastSyncedAt: string | null;
  error: string | null;
  signIn(): Promise<void>;
  signOut(): Promise<void>;
  syncNow(): Promise<void>;
  /** Deletes the cloud copy and the account; the data on this device stays. */
  deleteAccount(): Promise<void>;
}

const SyncContext = createContext<SyncContextValue | null>(null);

/** How often to look for local changes to upload while the app is open. */
const CHECK_MS = 15_000;

const message = (e: unknown) => (e instanceof Error ? e.message : String(e));

export function SyncProvider({ children }: { children: ReactNode }) {
  const { db, reloadAll } = useData();
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [checking, setChecking] = useState(true);
  const [status, setStatus] = useState<SyncStatus>('signed-out');
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const running = useRef<Promise<void> | null>(null);

  const sync = useCallback((): Promise<void> => {
    const u = auth.currentUser;
    if (!u) return Promise.resolve();
    if (running.current) return running.current;
    const run = (async () => {
      setStatus('syncing');
      try {
        await bindAccount(db, u.uid);
        const r = await syncOnce(db, firestoreRemote(cloud, u.uid));
        if (r.applied > 0) await reloadAll();
        setLastSyncedAt(new Date().toISOString());
        setError(null);
        setStatus('synced');
      } catch (e) {
        setError(message(e));
        setStatus('error');
      } finally {
        running.current = null;
      }
    })();
    running.current = run;
    return run;
  }, [db, reloadAll]);

  useEffect(
    () =>
      onAuthStateChanged(auth, (u) => {
        setUser(u);
        setChecking(false);
        if (u) void sync();
        else setStatus('signed-out');
      }),
    [sync],
  );

  useEffect(() => {
    if (!user) return;
    const sub = AppState.addEventListener('change', (s) => s === 'active' && void sync());
    const timer = setInterval(() => {
      if (AppState.currentState !== 'active' || running.current) return;
      void pendingChanges(db).then((n) => {
        if (n > 0) void sync();
      });
    }, CHECK_MS);
    return () => {
      sub.remove();
      clearInterval(timer);
    };
  }, [user, db, sync]);

  const signIn = useCallback(async () => {
    setError(null);
    try {
      await signInWithGoogle();
    } catch (e) {
      setError(message(e));
    }
  }, []);

  const signOut = useCallback(async () => {
    // Upload what is waiting first, so nothing is left behind on this device only.
    await sync();
    await authSignOut();
    setLastSyncedAt(null);
  }, [sync]);

  const deleteAccount = useCallback(async () => {
    const u = auth.currentUser;
    if (!u) return;
    setError(null);
    try {
      await deleteCloudData(cloud, u.uid);
      await u.delete();
      await authSignOut().catch(() => undefined);
    } catch (e) {
      const code = (e as { code?: string }).code;
      setError(code === 'auth/requires-recent-login' ? 'For safety, sign out and sign in again, then delete the account.' : message(e));
      throw e;
    }
  }, []);

  const account = user ? { uid: user.uid, name: user.displayName, email: user.email } : null;
  return (
    <SyncContext.Provider value={{ account, checking, status, lastSyncedAt, error, signIn, signOut, syncNow: sync, deleteAccount }}>{children}</SyncContext.Provider>
  );
}

export function useSync(): SyncContextValue {
  const value = useContext(SyncContext);
  if (!value) throw new Error('useSync must be used inside <SyncProvider>');
  return value;
}
