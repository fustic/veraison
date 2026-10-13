// Taste tab: start a note, see your pattern, and every note with what it turned out to be.
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { describeReveal } from '../../../../core/src/reveal.ts';
import { SCALES } from '../../../../core/src/sat.ts';
import { Callout, H1, PrimaryButton } from '../../components';
import { useData } from '../../data/DataProvider';
import { useNotesAndPattern } from '../../data/usePattern';
import { Glass, glassFill } from '../../tasting/parts';
import { Text } from '../../Text';
import { colors, fonts } from '../../theme';

export default function Notes() {
  const { content } = useData();
  const insets = useSafeAreaInsets();
  const { notes, pattern, loaded } = useNotesAndPattern();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, { paddingTop: insets.top + 20 }]}>
      <View style={{ paddingHorizontal: 4, gap: 4 }}>
        <H1 size={32}>Tasting notes</H1>
        <Text style={styles.muted}>Your notes stay on this phone.</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <PrimaryButton title="New tasting note" onPress={() => router.push('/note/new')} />
      </View>

      {pattern ? <Callout kicker={`PATTERN · ${pattern.bias.notes} ${pattern.wineType === 'red' ? 'RED' : 'REVEALED'} NOTES`}>{pattern.sentence}</Callout> : null}

      {loaded && notes.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No notes yet</Text>
          <Text style={styles.muted}>Taste blind, write the note, then reveal the wine. After three revealed wines you will see which calls you tend to get wrong.</Text>
        </View>
      ) : null}

      <View style={{ gap: 8 }}>
        {notes.map((n) => {
          const d = n.reveal ? describeReveal(n.reveal, content, n.revealedProfileId ? content.profileById.get(n.revealedProfileId)?.name : null) : null;
          return (
            <Pressable
              key={n.id}
              accessibilityRole="link"
              onPress={() => router.push({ pathname: '/note/[id]', params: { id: n.id } })}
              style={({ pressed }) => [styles.row, pressed && { opacity: 0.85 }]}
            >
              <View style={styles.glass}>
                <Glass fill={n.colour ? glassFill(n.colour, n.wineType, 1) : '#DAD9D3'} size={26} />
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={styles.title} numberOfLines={1}>
                  {d?.title || n.labelText || 'Blind wine'}
                </Text>
                {d?.subtitle ? (
                  <Text style={styles.sub} numberOfLines={1}>
                    {d.subtitle}
                  </Text>
                ) : null}
                <Text style={styles.meta}>
                  {new Date(n.createdAt).toLocaleDateString()} · {n.colour ?? n.wineType} · {n.aromaCount} aromas
                  {n.quality !== null ? ` · ${SCALES.quality[n.quality]}` : ''}
                </Text>
              </View>
              {!d ? <Text style={styles.badge}>REVEAL</Text> : null}
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { paddingHorizontal: 16, paddingBottom: 32, gap: 14 },
  muted: { fontSize: 14, color: colors.muted, lineHeight: 20 },
  empty: { padding: 18, borderRadius: 18, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, gap: 6 },
  emptyTitle: { fontSize: 16, fontWeight: '600', color: colors.ink },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, paddingRight: 14, borderRadius: 14, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line },
  glass: { width: 44, height: 48, borderRadius: 10, backgroundColor: colors.paper, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: '600', color: colors.ink },
  sub: { fontSize: 13, color: colors.ink },
  meta: { fontSize: 12, color: colors.muted },
  badge: { fontFamily: fonts.mono, fontSize: 10, color: colors.wine, borderWidth: 1, borderColor: colors.wine, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 3, overflow: 'hidden' },
});
