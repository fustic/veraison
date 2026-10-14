// Study tab: theory topics from your notes, grouped by chapter, with study status.
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { H1, Kicker } from '../../components';
import { useData } from '../../data/DataProvider';
import { Text } from '../../Text';
import { colors, statusColors } from '../../theme';

const STATUS_LABEL = { seen: 'Seen', studied: 'Studied', mastered: 'Mastered' } as const;

export default function Study() {
  const { content, statuses } = useData();
  const insets = useSafeAreaInsets();
  const chapters = new Map<string, typeof content.topics>();
  for (const t of content.topics ?? []) chapters.set(t.chapter, [...(chapters.get(t.chapter) ?? []), t]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, { paddingTop: insets.top + 20 }]}>
      <View style={{ paddingHorizontal: 4, gap: 4 }}>
        <H1 size={32}>Study</H1>
        <Text style={styles.muted}>Theory from your notes: the key points and the cause chains to learn for written answers.</Text>
      </View>

      {chapters.size === 0 ? <Text style={styles.muted}>No topics yet.</Text> : null}

      {[...chapters.entries()].map(([chapter, list]) => (
        <View key={chapter} style={{ gap: 8 }}>
          <View style={{ paddingHorizontal: 4 }}>
            <Kicker>{chapter.toUpperCase()}</Kicker>
          </View>
          {list.map((t) => {
            const s = statuses.get(t.id);
            const chains = t.sections.reduce((n, sec) => n + (sec.causes?.length ?? 0), 0);
            return (
              <Pressable
                key={t.id}
                accessibilityRole="link"
                onPress={() => router.push({ pathname: '/topic/[id]', params: { id: t.id } })}
                style={({ pressed }) => [styles.row, pressed && { opacity: 0.85 }]}
              >
                <View style={{ flex: 1, gap: 3 }}>
                  <Text style={styles.title}>{t.title}</Text>
                  <Text style={styles.muted} numberOfLines={2}>
                    {t.summary}
                  </Text>
                  <Text style={styles.meta}>
                    {t.sections.length} sections · {chains} cause chains{t.verified ? '' : ' · draft'}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end', gap: 4 }}>
                  <View style={[styles.dot, { backgroundColor: s ? statusColors[s.status] : statusColors.unseen }]} />
                  <Text style={styles.status}>{s ? STATUS_LABEL[s.status] : 'New'}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { paddingHorizontal: 16, paddingBottom: 32, gap: 16 },
  muted: { fontSize: 13, color: colors.muted, lineHeight: 18 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 14, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line },
  title: { fontSize: 16, fontWeight: '600', color: colors.ink },
  meta: { fontSize: 12, color: colors.muted },
  dot: { width: 10, height: 10, borderRadius: 5 },
  status: { fontSize: 11, color: colors.muted },
});
