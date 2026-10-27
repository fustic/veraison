// Account: sign in to sync notes and study progress across devices, see when the last
// sync ran, sign out, or delete the account and its cloud copy.
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Box, H1, Kicker, PrimaryButton } from '../components';
import { syncLine } from '../names';
import { useSync } from '../sync/SyncProvider';
import { Text } from '../Text';
import { colors } from '../theme';

export default function AccountScreen() {
  const { account, checking, status, lastSyncedAt, error, signIn, signOut, syncNow, deleteAccount } = useSync();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [busy, setBusy] = useState(false);

  const run = (fn: () => Promise<void>) => async () => {
    setBusy(true);
    try {
      await fn();
    } catch {
      // Shown through `error`.
    } finally {
      setBusy(false);
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={{ gap: 6, paddingHorizontal: 4 }}>
        <Kicker>SYNC</Kicker>
        <H1 size={32}>Account</H1>
      </View>

      {checking ? (
        <Text style={styles.muted}>Checking…</Text>
      ) : account ? (
        <>
          <Box gap={10} pad={18}>
            <Kicker>SIGNED IN</Kicker>
            <Text style={styles.name}>{account.name ?? account.email ?? 'Google account'}</Text>
            {account.name && account.email ? <Text style={styles.muted}>{account.email}</Text> : null}
            <View style={styles.statusRow}>
              <View style={[styles.dot, { backgroundColor: status === 'error' ? colors.wine : status === 'synced' ? colors.good : colors.line }]} />
              <Text style={styles.body}>{syncLine(status, lastSyncedAt)}</Text>
            </View>
            <Text style={styles.muted}>Notes, study progress and review cards sync with every device signed in to this account. Settings stay on each device.</Text>
          </Box>
          <View style={styles.buttons}>
            <PrimaryButton secondary title={status === 'syncing' ? 'Syncing…' : 'Sync now'} onPress={() => void syncNow()} />
            <PrimaryButton secondary title="Sign out" onPress={run(signOut)} />
          </View>
          <Text style={styles.muted}>Signing out keeps everything on this device.</Text>

          <View style={styles.danger}>
            <Text style={styles.subhead}>Delete account</Text>
            <Text style={styles.muted}>
              Deletes the synced copy and the account. Your notes on this device stay, and you can sign in again later to start a new account.
            </Text>
            <Pressable
              accessibilityRole="button"
              disabled={busy}
              onPress={confirmDelete ? run(deleteAccount) : () => setConfirmDelete(true)}
              style={({ pressed }) => [styles.deleteBtn, confirmDelete && styles.deleteBtnArmed, pressed && { opacity: 0.85 }]}
            >
              <Text style={[styles.deleteText, confirmDelete && { color: '#FFFFFF' }]}>{busy ? 'Deleting…' : confirmDelete ? 'Tap again to delete' : 'Delete my account'}</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <Box gap={10} pad={18}>
            <Text style={styles.body}>
              Sign in to keep your tasting notes and study progress on all your devices: this one, the web app at veraison.ivanovs.de, and any other phone you sign in on.
            </Text>
            <Text style={styles.muted}>Without an account everything stays on this device, as now. What is already here is uploaded when you first sign in.</Text>
          </Box>
          <View style={styles.buttons}>
            <PrimaryButton title={busy ? 'Opening Google…' : 'Sign in with Google'} onPress={run(signIn)} />
          </View>
          <Text style={styles.muted}>Sign in with Apple is coming.</Text>
        </>
      )}

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { padding: 16, paddingBottom: 40, gap: 16 },
  name: { fontSize: 18, fontWeight: '600', color: colors.ink },
  body: { fontSize: 14, lineHeight: 20, color: colors.ink },
  muted: { fontSize: 13, lineHeight: 18, color: colors.muted, paddingHorizontal: 4 },
  subhead: { fontSize: 15, fontWeight: '600', color: colors.ink },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  buttons: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  error: { fontSize: 13, lineHeight: 18, color: colors.wine, paddingHorizontal: 4 },
  danger: { marginTop: 12, gap: 8, padding: 16, borderRadius: 18, borderWidth: 1, borderColor: colors.line },
  deleteBtn: { alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: colors.wine },
  deleteBtnArmed: { backgroundColor: colors.wine },
  deleteText: { fontSize: 14, fontWeight: '600', color: colors.wine },
});
