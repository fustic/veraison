// Compare two grapes, following the Pinot Noir vs Gamay draft: structure as dots on a
// shared grid (rows that differ are tinted), aromas both share or only one has, and
// the tell to check next.
import { Stack, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { compareGrapes, defaultPair, gridColumn, type Climate } from '../../../core/src/compare.ts';
import type { Aroma, Grape } from '../../../core/src/content.ts';
import { AromaTiles, Box, Callout, H1, H2 } from '../components';
import { useData } from '../data/DataProvider';
import { FIVE_HEAD } from '../names';
import { Pill, Segmented } from '../tasting/parts';
import { Text } from '../Text';
import { colors, fonts } from '../theme';

const ROW_LABEL: Record<string, string> = { acidity: 'Acidity', tannin: 'Tannin', body: 'Body', alcohol: 'Alcohol', noseIntensity: 'Intensity' };

function DotA() {
  return <View style={styles.dotA} />;
}
function DotB() {
  return <View style={styles.dotB} />;
}

export default function CompareScreen() {
  const params = useLocalSearchParams<{ a?: string; b?: string }>();
  const { content } = useData();
  const fallback = useMemo(() => defaultPair(content.grapes), [content.grapes]);
  const [aId, setA] = useState(params.a && content.grapeById.has(params.a) ? params.a : fallback?.[0].id);
  const [bId, setB] = useState(params.b && content.grapeById.has(params.b) ? params.b : fallback?.[1].id);
  const [climateA, setClimateA] = useState<Climate>('cool');
  const [climateB, setClimateB] = useState<Climate>('cool');
  const [picking, setPicking] = useState<'a' | 'b' | null>(null);

  const a = aId ? content.grapeById.get(aId) : undefined;
  const b = bId ? content.grapeById.get(bId) : undefined;
  if (!a || !b) {
    return (
      <View style={[styles.screen, { padding: 16 }]}>
        <Text>Add at least two grapes to the content to compare them.</Text>
      </View>
    );
  }
  const c = compareGrapes(a, b, climateA, climateB);
  const aromas = (ids: string[]): Aroma[] => ids.flatMap((id) => content.aromaById.get(id) ?? []);

  const pickerFor = (side: 'a' | 'b') => {
    const current = side === 'a' ? a : b;
    const other = side === 'a' ? b : a;
    const climate = side === 'a' ? climateA : climateB;
    const setClimate = side === 'a' ? setClimateA : setClimateB;
    const choices = [...content.grapes].filter((g) => g.id !== other.id).sort((x, y) => Number(y.colour === other.colour) - Number(x.colour === other.colour) || x.name.localeCompare(y.name));
    return (
      <Box gap={12}>
        <Segmented
          label="Climate"
          options={[
            { value: 'cool', label: 'Cool climate' },
            { value: 'warm', label: 'Warm climate' },
          ]}
          value={climate}
          onChange={setClimate}
        />
        <View style={styles.wrap}>
          {choices.map((g: Grape) => (
            <Pill
              key={g.id}
              small
              label={g.name}
              on={g.id === current.id}
              onPress={() => {
                (side === 'a' ? setA : setB)(g.id);
                setPicking(null);
              }}
            />
          ))}
        </View>
      </Box>
    );
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: '' }} />
      <View style={{ paddingHorizontal: 4 }}>
        <H1>
          {a.name} vs {b.name}
        </H1>
      </View>

      <View style={styles.pickers}>
        <Pressable accessibilityRole="button" accessibilityLabel={`Change ${a.name}`} onPress={() => setPicking(picking === 'a' ? null : 'a')} style={[styles.picker, picking === 'a' && styles.pickerOn]}>
          <DotA />
          <Text numberOfLines={1} style={styles.pickerText}>
            {a.name} · {climateA}
          </Text>
          <Text style={styles.caret}>▾</Text>
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel={`Change ${b.name}`} onPress={() => setPicking(picking === 'b' ? null : 'b')} style={[styles.picker, picking === 'b' && styles.pickerOn]}>
          <DotB />
          <Text numberOfLines={1} style={styles.pickerText}>
            {b.name} · {climateB}
          </Text>
          <Text style={styles.caret}>▾</Text>
        </Pressable>
      </View>
      {picking ? pickerFor(picking) : null}

      <Box gap={10}>
        <View style={styles.gridRow}>
          <View style={styles.labelCol} />
          {FIVE_HEAD.map((h) => (
            <Text key={h} style={styles.head}>
              {h}
            </Text>
          ))}
        </View>
        {c.rows.map((r) => {
          const differs = r.gap > 0;
          const colA = r.a !== null ? gridColumn(r.field, r.a) : null;
          const colB = r.b !== null ? gridColumn(r.field, r.b) : null;
          return (
            <View key={r.field} style={[styles.gridRow, differs && styles.rowDiffers]}>
              <Text style={[styles.rowLabel, differs && { color: colors.wine, fontWeight: '600' }]}>{ROW_LABEL[r.field]}</Text>
              {[0, 1, 2, 3, 4].map((i) => (
                <View key={i} style={[styles.cellBox, { backgroundColor: differs ? colors.surface : colors.paper }]}>
                  {colA === i ? <DotA /> : null}
                  {colB === i ? <DotB /> : null}
                </View>
              ))}
            </View>
          );
        })}
        <Text style={styles.note}>{c.summary}</Text>
      </Box>

      <Box gap={8}>
        {c.both.length ? (
          <>
            <Text style={[styles.groupTitle, { color: colors.muted }]}>Both</Text>
            <AromaTiles aromas={aromas(c.both)} size={40} />
          </>
        ) : null}
        <View style={styles.groupHead}>
          <DotA />
          <Text style={[styles.groupTitle, { color: colors.wine }]}>Only {a.name}</Text>
        </View>
        {c.onlyA.length ? <AromaTiles aromas={aromas(c.onlyA)} size={40} /> : <Text style={styles.note}>Nothing that {b.name} lacks.</Text>}
        <View style={styles.groupHead}>
          <DotB />
          <Text style={[styles.groupTitle, { color: '#A63F64' }]}>Only {b.name}</Text>
        </View>
        {c.onlyB.length ? <AromaTiles aromas={aromas(c.onlyB)} size={40} /> : <Text style={styles.note}>Nothing that {a.name} lacks.</Text>}
      </Box>

      {c.tells.length ? (
        <Callout kicker="THE TELL · CHECK THIS NEXT">{c.tells.join(' ')}</Callout>
      ) : (
        <Box>
          <H2>No look-alike note yet</H2>
          <Text style={styles.note}>Add one to lookAlikes in content/grapes to get a tell here.</Text>
        </Box>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { padding: 16, paddingBottom: 40, gap: 14 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  pickers: { flexDirection: 'row', gap: 8 },
  picker: { flex: 1, height: 48, borderRadius: 12, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12 },
  pickerOn: { borderColor: colors.wine },
  pickerText: { flex: 1, fontSize: 14, fontWeight: '600', color: colors.ink },
  caret: { fontSize: 12, color: colors.muted },
  dotA: { width: 14, height: 14, borderRadius: 7, backgroundColor: colors.wine },
  dotB: { width: 14, height: 14, borderRadius: 7, borderWidth: 3, borderColor: colors.rose, backgroundColor: colors.surface },
  gridRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rowDiffers: { backgroundColor: colors.wineTint, marginHorizontal: -8, paddingHorizontal: 8, paddingVertical: 6, borderRadius: 10 },
  labelCol: { width: 76 },
  rowLabel: { width: 76, fontSize: 14, color: colors.ink },
  head: { flex: 1, textAlign: 'center', fontFamily: fonts.mono, fontSize: 10, color: colors.muted },
  cellBox: { flex: 1, height: 28, borderRadius: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 3 },
  note: { fontSize: 13, lineHeight: 19, color: colors.muted },
  groupHead: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  groupTitle: { fontSize: 14, fontWeight: '600' },
});
