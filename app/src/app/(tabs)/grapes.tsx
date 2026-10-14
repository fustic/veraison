// Grapes tab: every grape in the study content, red then white, with a fruit picture,
// its study status and a shortcut to compare look-alikes.
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AromaIcon } from '../../AromaIcon';
import { CompareLine, H1, Kicker } from '../../components';
import { useData } from '../../data/DataProvider';
import { Text } from '../../Text';
import { colors, statusColors } from '../../theme';

const STATUS_LABEL = { seen: 'Seen', studied: 'Studied', mastered: 'Mastered' } as const;

export default function Grapes() {
  const { content, statuses } = useData();
  const insets = useSafeAreaInsets();
  const sorted = [...content.grapes].sort((a, b) => a.name.localeCompare(b.name));
  const groups = [
    { title: 'RED', list: sorted.filter((g) => g.colour === 'red') },
    { title: 'WHITE', list: sorted.filter((g) => g.colour === 'white') },
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, { paddingTop: insets.top + 20 }]}>
      <View style={{ paddingHorizontal: 4, gap: 4 }}>
        <H1 size={32}>Grapes</H1>
        <Text style={styles.muted}>{content.grapes.length} grapes so far. More arrive with each chapter.</Text>
      </View>

      <Pressable accessibilityRole="button" onPress={() => router.push('/compare')} style={styles.compare}>
        <CompareLine />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>Compare two grapes</Text>
          <Text style={styles.muted}>Structure side by side, shared and unique aromas, the tell</Text>
        </View>
        <Text style={styles.chev}>›</Text>
      </Pressable>

      {groups.map((g) =>
        g.list.length ? (
          <View key={g.title} style={{ gap: 8 }}>
            <View style={{ paddingHorizontal: 4 }}>
              <Kicker>{g.title}</Kicker>
            </View>
            {g.list.map((grape) => {
              const s = statuses.get(grape.id);
              // The grape's signature fruit at normal ripeness stands for it in the list.
              const fruit = grape.aromas.find((a) => a.ripeness === 'ripe') ?? grape.aromas[0];
              const aroma = fruit ? content.aromaById.get(fruit.aromaId) : undefined;
              return (
                <Pressable
                  key={grape.id}
                  accessibilityRole="link"
                  onPress={() => router.push({ pathname: '/grape/[id]', params: { id: grape.id } })}
                  style={({ pressed }) => [styles.row, pressed && { opacity: 0.85 }]}
                >
                  <View style={styles.icon}>
                    {aroma ? <AromaIcon shape={aroma.icon.shape} c1={aroma.icon.c1} c2={aroma.icon.c2} size={34} /> : null}
                  </View>
                  <View style={{ flex: 1, gap: 2 }}>
                    <Text style={styles.name}>{grape.name}</Text>
                    <Text style={styles.muted} numberOfLines={1}>
                      {grape.traits.join(' · ')}
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
        ) : null,
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { paddingHorizontal: 16, paddingBottom: 32, gap: 16 },
  muted: { fontSize: 13, color: colors.muted, lineHeight: 18 },
  compare: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, borderRadius: 16, backgroundColor: colors.wineTint },
  chev: { fontSize: 24, color: colors.wine },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, paddingRight: 16, borderRadius: 14, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line },
  icon: { width: 48, height: 48, borderRadius: 12, backgroundColor: colors.paper, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: '600', color: colors.ink },
  dot: { width: 10, height: 10, borderRadius: 5 },
  status: { fontSize: 11, color: colors.muted },
});
