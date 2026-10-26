// Today: what to do next. Follows the Today draft; the spaced-review card becomes a
// tasting-notes card until flashcards exist.
import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Region } from '../../../../core/src/content.ts';
import { describeReveal } from '../../../../core/src/reveal.ts';
import { coverage } from '../../../../core/src/userdb/progress.ts';
import { CompareLine, GlassLine, H1, Kicker, NotesLine, PinLine, PrimaryButton } from '../../components';
import { useData } from '../../data/DataProvider';
import { useNotesAndPattern } from '../../data/usePattern';
import { syncLine } from '../../names';
import { useSync } from '../../sync/SyncProvider';
import { Text } from '../../Text';
import { colors, fonts } from '../../theme';

function greeting(): string {
  const h = new Date().getHours();
  return h < 5 ? 'Good evening' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
}

export default function Today() {
  const { content, statuses } = useData();
  const insets = useSafeAreaInsets();
  const { notes, pattern } = useNotesAndPattern();
  const { account, status, lastSyncedAt } = useSync();

  // The chapter to continue: the top-level region of the most recently opened region.
  const topOf = (r: Region): Region => {
    let cur = r;
    for (let i = 0; i < 10 && cur.parentId; i++) {
      const parent = content.regionById.get(cur.parentId);
      if (!parent || parent.level === 'country') break;
      cur = parent;
    }
    return cur;
  };
  const lastRegion = [...statuses.values()]
    .filter((s) => s.contentId.startsWith('region:') && s.lastSeenAt)
    .sort((a, b) => (b.lastSeenAt ?? '').localeCompare(a.lastSeenAt ?? ''))
    .map((s) => content.regionById.get(s.contentId))
    .find((r) => r !== undefined && r.level !== 'country');
  const chapter = lastRegion ? topOf(lastRegion) : content.regions.find((r) => r.level === 'region');
  const descendants = (id: string): Region[] => (content.childrenOf.get(id) ?? []).flatMap((c) => [c, ...descendants(c.id)]);
  const chapterParts = chapter ? [chapter, ...descendants(chapter.id)] : [];
  const checked = chapterParts.filter((r) => statuses.get(r.id)?.checkedAgainstBook).length;

  const grapes = coverage(content.grapes.map((g) => g.id), statuses);
  const regions = coverage(content.regions.filter((r) => r.level !== 'country').map((r) => r.id), statuses);
  const beenThere = [...statuses.values()].filter((s) => s.beenThere).length;

  const revealed = notes.filter((n) => n.reveal);
  const last = notes[0];
  const lastName = last?.reveal ? describeReveal(last.reveal, content).title : (last?.labelText ?? 'a blind wine');

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, { paddingTop: insets.top + 20 }]}>
      <View style={styles.header}>
        <View style={{ gap: 4, flex: 1 }}>
          <H1 size={32}>{greeting()}</H1>
          <Text style={styles.sub}>WSET Level 3 · study companion</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={account ? `Account, ${syncLine(status, lastSyncedAt)}` : 'Sign in to sync'}
          onPress={() => router.push('/account')}
          style={({ pressed }) => [styles.accountChip, pressed && { opacity: 0.8 }]}
        >
          {account ? <View style={[styles.syncDot, { backgroundColor: status === 'error' ? colors.wine : status === 'synced' ? colors.good : colors.line }]} /> : null}
          <Text style={styles.accountText}>{account ? (account.name ?? account.email ?? 'ACCOUNT').split(' ')[0]!.toUpperCase() : 'SIGN IN'}</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Kicker>TASTING NOTES</Kicker>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
          <Text style={styles.big}>{notes.length}</Text>
          <Text style={styles.bigLabel}>{notes.length === 1 ? 'note' : 'notes'}</Text>
        </View>
        <Text style={styles.sub}>
          {notes.length ? `${revealed.length} revealed · last: ${lastName}` : 'Taste blind, then reveal the wine to calibrate.'}
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 4 }}>
          <PrimaryButton title="New tasting note" onPress={() => router.push('/note/new')} />
        </View>
      </View>

      {chapter ? (
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Kicker>{lastRegion ? 'CONTINUE CHAPTER' : 'START HERE'}</Kicker>
            <Pressable accessibilityRole="link" hitSlop={8} onPress={() => router.push({ pathname: '/map', params: { focus: chapter.id } })}>
              <Text style={styles.link}>Open map →</Text>
            </Pressable>
          </View>
          <Pressable accessibilityRole="link" onPress={() => router.push({ pathname: '/region/[id]', params: { id: chapter.id } })}>
            <Text style={styles.chapter}>{chapter.name}</Text>
          </Pressable>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${chapterParts.length ? Math.round((checked / chapterParts.length) * 100) : 0}%` }]} />
          </View>
          <Text style={styles.small}>
            {checked} of {chapterParts.length} {chapterParts.length === 1 ? 'region' : 'regions'} checked against your book
          </Text>
        </View>
      ) : null}

      <View style={styles.quickGrid}>
        <Quick icon={<CompareLine />} label="Compare grapes" onPress={() => router.push('/compare')} />
        <Quick icon={<PinLine />} label="Study map" onPress={() => router.push('/map')} />
        <Quick icon={<NotesLine />} label="Your notes" onPress={() => router.push('/notes')} />
        <Quick icon={<GlassLine />} label="Grapes" onPress={() => router.push('/grapes')} />
      </View>

      <View style={styles.card}>
        <Kicker>WHAT YOU HAVE SEEN</Kicker>
        <Stat label="Grapes opened" value={`${grapes.total - grapes.unseen} of ${grapes.total}`} />
        <Stat label="Regions opened" value={`${regions.total - regions.unseen} of ${regions.total}`} />
        <Stat label="Mastered" value={`${grapes.mastered + regions.mastered}`} />
        <Stat label="Been there" value={`${beenThere}`} />
      </View>

      {pattern ? (
        <Pressable accessibilityRole="link" onPress={() => router.push('/notes')} style={styles.pattern}>
          <Kicker color={colors.wine}>YOUR TASTING PATTERN</Kicker>
          <Text style={styles.patternText}>{pattern.sentence}</Text>
          <Text style={styles.link}>See the notes →</Text>
        </Pressable>
      ) : null}
    </ScrollView>
  );
}

function Quick({ icon, label, onPress }: { icon: ReactNode; label: string; onPress: () => void }) {
  return (
    <View style={styles.quickCell}>
      <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.quick, pressed && { opacity: 0.8 }]}>
        {icon}
        <Text style={styles.quickText}>{label}</Text>
      </Pressable>
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.rowBetween}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { paddingHorizontal: 16, paddingBottom: 32, gap: 14 },
  sub: { fontSize: 15, color: colors.muted, lineHeight: 21 },
  header: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingHorizontal: 4, paddingBottom: 4 },
  accountChip: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface },
  accountText: { fontFamily: fonts.mono, fontSize: 11, letterSpacing: 0.8, color: colors.wine },
  syncDot: { width: 7, height: 7, borderRadius: 4 },
  small: { fontSize: 13, color: colors.muted },
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: 18, padding: 18, gap: 10 },
  big: { fontFamily: fonts.display, fontSize: 40, lineHeight: 44, color: colors.ink },
  bigLabel: { fontSize: 17, fontWeight: '600', color: colors.ink },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  link: { fontSize: 14, fontWeight: '600', color: colors.wine },
  chapter: { fontFamily: fonts.display, fontSize: 22, color: colors.ink },
  track: { height: 8, borderRadius: 4, backgroundColor: colors.track, overflow: 'hidden' },
  fill: { height: 8, borderRadius: 4, backgroundColor: colors.wine },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', margin: -5 },
  quickCell: { width: '50%', padding: 5 },
  quick: { height: 64, paddingHorizontal: 14, borderRadius: 14, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, flexDirection: 'row', alignItems: 'center', gap: 10 },
  quickText: { fontSize: 14, fontWeight: '600', color: colors.ink, flexShrink: 1 },
  statLabel: { fontSize: 15, color: colors.ink },
  statValue: { fontSize: 15, fontWeight: '600', color: colors.ink },
  pattern: { borderRadius: 18, backgroundColor: colors.wineTint, paddingVertical: 16, paddingHorizontal: 18, gap: 6 },
  patternText: { fontSize: 15, lineHeight: 21, fontWeight: '600', color: colors.ink },
});
