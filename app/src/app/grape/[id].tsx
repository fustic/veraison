// Grape page, following the Pinot Noir draft: structure by climate, fruit by ripeness
// as pictures, oak and age notes, why it tastes this way, regions from lighter to
// fuller with iconic producers, and look-alikes that open the comparison.
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import type { Aroma, Grape, Ripeness, StructureRanges } from '../../../../core/src/content.ts';
import { countryName, regionCountry } from '../../../../core/src/reveal.ts';
import { SCALES, type StructureField } from '../../../../core/src/sat.ts';
import { setCheckedAgainstBook, setStudyStatus, type StudyStatus } from '../../../../core/src/userdb/progress.ts';
import { AromaTiles, Box, CauseCard, H1, H2, Kicker, LinkText, StepBar, Tag } from '../../components';
import { useData, useMarkSeen } from '../../data/DataProvider';
import { prettyId, rangeWord } from '../../names';
import { Pill, Segmented } from '../../tasting/parts';
import { Text } from '../../Text';
import { colors, fonts } from '../../theme';

const FIELDS: { field: StructureField; label: string }[] = [
  { field: 'acidity', label: 'Acidity' },
  { field: 'tannin', label: 'Tannin' },
  { field: 'body', label: 'Body' },
  { field: 'alcohol', label: 'Alcohol' },
  { field: 'noseIntensity', label: 'Intensity' },
];
const RIPENESS = [
  { value: 'less', label: 'Less ripe' },
  { value: 'ripe', label: 'Ripe' },
  { value: 'very', label: 'Very ripe' },
] as const satisfies readonly { value: Ripeness; label: string }[];

/** "high acidity, low – medium− tannin, light – medium− body" from a set of ranges. */
function summarise(ranges: StructureRanges, red: boolean): string {
  const parts: string[] = [];
  for (const f of ['acidity', 'tannin', 'body', 'alcohol'] as const) {
    if (f === 'tannin' && !red) continue;
    const r = ranges[f];
    if (r) parts.push(`${rangeWord(f, r).toLowerCase()} ${f}`);
  }
  return parts.join(', ');
}

type GrapeAroma = Grape['aromas'][number];

export default function GrapeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { content, db, deps, statuses, refreshStatuses } = useData();
  const grape = id ? content.grapeById.get(id) : undefined;
  const [climate, setClimate] = useState<'cool' | 'warm'>('cool');
  const [ripeness, setRipeness] = useState<Ripeness>('ripe');
  useMarkSeen(grape?.id);

  if (!grape) {
    return (
      <View style={[styles.screen, styles.content]}>
        <H1>Not found</H1>
        <Text style={styles.muted}>{id} is not in the study content yet.</Text>
      </View>
    );
  }

  const red = grape.colour === 'red';
  const aromasOf = (keep: (g: GrapeAroma, a: Aroma) => boolean): Aroma[] =>
    grape.aromas.flatMap((g) => {
      const a = content.aromaById.get(g.aromaId);
      return a && keep(g, a) ? [a] : [];
    });
  const fruit = aromasOf((g) => g.ripeness === ripeness);
  const primaryOther = aromasOf((g, a) => !g.ripeness && a.level === 'primary');
  const winemaking = aromasOf((g, a) => !g.ripeness && a.level === 'secondary');
  const aged = aromasOf((g, a) => !g.ripeness && a.level === 'tertiary');
  const hasOak = winemaking.some((a) => a.cluster === 'Oak');

  const regions = [...grape.regions].sort((a, b) => a.styleLevel - b.styleLevel);
  const regionName = (rid: string) => content.regionById.get(rid)?.name ?? prettyId(rid);
  const coolNames = regions.filter((r) => r.styleLevel <= 2).slice(0, 2).map((r) => regionName(r.regionId));
  const warmNames = regions.filter((r) => r.styleLevel >= 4).slice(-2).map((r) => regionName(r.regionId));
  const climateNote =
    climate === 'cool'
      ? `${coolNames.length ? `Cool sites such as ${coolNames.join(' or ')}` : 'Cool sites'}: ${summarise(grape.structure.cool, red)}.`
      : `${warmNames.length ? `Warmer sites such as ${warmNames.join(' or ')}` : 'Warmer sites and sunny vintages'}: ${summarise(grape.structure.warm, red)}.`;

  const status = statuses.get(grape.id);
  const setStatus = async (s: StudyStatus) => {
    await setStudyStatus(db, grape.id, s, deps);
    await refreshStatuses();
  };
  const toggleChecked = async () => {
    await setCheckedAgainstBook(db, grape.id, !status?.checkedAgainstBook, deps);
    await refreshStatuses();
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: '' }} />
      <View style={{ gap: 10, paddingHorizontal: 4 }}>
        <H1 size={36}>{grape.name}</H1>
        {grape.synonyms?.length ? <Text style={styles.muted}>Also called {grape.synonyms.join(', ')}</Text> : null}
        <View style={styles.wrap}>
          <Tag label={red ? 'Red' : 'White'} tint />
          {grape.traits.map((t) => (
            <Tag key={t} label={t} />
          ))}
          {!grape.verified ? <Tag label="Draft" /> : null}
        </View>
      </View>

      <Box gap={14} pad={18}>
        <View style={styles.rowBetween}>
          <H2>Structure</H2>
          <View style={{ width: 150 }}>
            <Segmented
              label="Climate"
              options={[
                { value: 'cool', label: 'Cool' },
                { value: 'warm', label: 'Warm' },
              ]}
              value={climate}
              onChange={setClimate}
            />
          </View>
        </View>
        {FIELDS.filter((f) => red || f.field !== 'tannin').map(({ field, label }) => {
          const r = grape.structure[climate][field];
          return (
            <View key={field} style={{ gap: 6 }}>
              <View style={styles.rowBetween}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: colors.ink }}>{label}</Text>
                <Text style={styles.monoSmall}>{rangeWord(field, r)}</Text>
              </View>
              <StepBar steps={SCALES[field].length} lo={r ? r[0] : null} hi={r ? r[1] : null} />
            </View>
          );
        })}
        <Text style={styles.note}>{climateNote}</Text>
      </Box>

      <Box gap={14} pad={18}>
        <H2>Fruit by ripeness</H2>
        <Segmented label="Ripeness" options={RIPENESS} value={ripeness} onChange={setRipeness} />
        {fruit.length ? <AromaTiles aromas={fruit} /> : <Text style={styles.muted}>No fruit notes listed at this ripeness.</Text>}
        {primaryOther.length ? (
          <View style={styles.divided}>
            <Text style={styles.subhead}>Also typical</Text>
            <AromaTiles aromas={primaryOther} />
          </View>
        ) : null}
        {winemaking.length ? (
          <View style={styles.divided}>
            <Text style={styles.subhead}>{hasOak ? 'From oak and winemaking' : 'From winemaking'}</Text>
            <AromaTiles aromas={winemaking} />
          </View>
        ) : null}
        {aged.length ? (
          <View style={styles.divided}>
            <Text style={styles.subhead}>With age</Text>
            <AromaTiles aromas={aged} />
          </View>
        ) : null}
      </Box>

      <View style={{ gap: 10 }}>
        <View style={{ paddingHorizontal: 4 }}>
          <H2>Why it tastes this way</H2>
        </View>
        {grape.why.map((w) => (
          <CauseCard key={w.factor} {...w} />
        ))}
      </View>

      <View style={{ gap: 10 }}>
        <View style={{ paddingHorizontal: 4, gap: 2 }}>
          <H2>Main regions</H2>
          <Text style={styles.small}>Ordered from lighter and more savoury to riper and fuller</Text>
        </View>
        {regions.map((r) => {
          const region = content.regionById.get(r.regionId);
          const parent = region?.parentId ? content.regionById.get(region.parentId) : undefined;
          const where = [parent && parent.level !== 'country' ? parent.name : null, countryName(regionCountry(r.regionId))].filter(Boolean).join(' · ');
          return (
            <View key={r.regionId} style={styles.regionCard}>
              <View style={[styles.rowBetween, { alignItems: 'baseline', gap: 8 }]}>
                <Text style={styles.regionName}>{regionName(r.regionId)}</Text>
                <Text style={styles.small}>{where}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={styles.monoTiny}>LIGHTER</Text>
                <StepBar lo={r.styleLevel - 1} height={6} width={120} />
                <Text style={styles.monoTiny}>FULLER</Text>
              </View>
              <Text style={styles.body}>{r.style}</Text>
              <View style={[styles.rowBetween, { gap: 8 }]}>
                {r.producers.length ? (
                  <Text style={[styles.small, { flex: 1 }]}>
                    <Text style={{ fontWeight: '600', color: colors.ink }}>Iconic: </Text>
                    {r.producers.join(', ')}
                  </Text>
                ) : (
                  <View style={{ flex: 1 }} />
                )}
                {region ? (
                  <LinkText label="Region →" size={13} onPress={() => router.push({ pathname: '/region/[id]', params: { id: region.id } })} />
                ) : (
                  <Text style={styles.monoTiny}>COMING SOON</Text>
                )}
              </View>
            </View>
          );
        })}
        {grape.alsoGrownIn?.length ? (
          <View style={{ gap: 8, paddingHorizontal: 4, paddingTop: 4 }}>
            <Text style={styles.small}>Also on the syllabus</Text>
            <View style={styles.wrap}>
              {grape.alsoGrownIn.map((x) => (
                <Tag key={x} label={x} />
              ))}
            </View>
          </View>
        ) : null}
      </View>

      {grape.lookAlikes.length ? (
        <Box gap={12} pad={18}>
          <H2>Looks like</H2>
          {grape.lookAlikes.map((l) => {
            const other = content.grapeById.get(l.grapeId);
            return (
              <Pressable
                key={l.grapeId}
                disabled={!other}
                accessibilityRole={other ? 'link' : undefined}
                onPress={() => other && router.push({ pathname: '/compare', params: { a: grape.id, b: other.id } })}
                style={styles.lookAlike}
              >
                <View style={styles.rowBetween}>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: colors.ink }}>{other?.name ?? prettyId(l.grapeId)}</Text>
                  {other ? <Text style={{ fontSize: 14, fontWeight: '600', color: colors.wine }}>Compare →</Text> : <Text style={styles.monoTiny}>COMING SOON</Text>}
                </View>
                <Text style={[styles.body, { color: colors.muted }]}>{l.tell}</Text>
              </Pressable>
            );
          })}
        </Box>
      ) : null}

      <View style={styles.progress}>
        <Kicker color={colors.wine}>YOUR PROGRESS</Kicker>
        <View style={styles.wrap}>
          {(['seen', 'studied', 'mastered'] as const).map((s) => (
            <Pill key={s} small label={s.charAt(0).toUpperCase() + s.slice(1)} on={status?.status === s} onPress={() => setStatus(s)} />
          ))}
        </View>
        <View style={styles.wrap}>
          <Pill small label={status?.checkedAgainstBook ? '✓ Checked against my book' : 'Mark as checked against my book'} on={!!status?.checkedAgainstBook} onPress={toggleChecked} />
        </View>
        {!grape.verified ? <Text style={styles.small}>This entry is a draft. Fix anything that differs from your book in content/grapes.</Text> : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { padding: 16, paddingBottom: 40, gap: 16 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  muted: { fontSize: 14, color: colors.muted, lineHeight: 20 },
  small: { fontSize: 13, color: colors.muted, lineHeight: 18 },
  note: { fontSize: 13, lineHeight: 19, color: colors.muted },
  body: { fontSize: 14, lineHeight: 20, color: colors.ink },
  subhead: { fontSize: 14, fontWeight: '600', color: colors.muted },
  divided: { gap: 8, paddingTop: 14, borderTopWidth: 1, borderTopColor: colors.track },
  monoSmall: { fontFamily: fonts.mono, fontSize: 12, color: colors.muted },
  monoTiny: { fontFamily: fonts.mono, fontSize: 10, color: colors.muted },
  regionCard: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: 14, paddingVertical: 14, paddingHorizontal: 16, gap: 8 },
  regionName: { fontSize: 16, fontWeight: '600', color: colors.ink, flexShrink: 1 },
  lookAlike: { padding: 14, borderRadius: 12, backgroundColor: colors.paper, gap: 4 },
  progress: { borderRadius: 18, backgroundColor: colors.wineTint, padding: 16, gap: 10 },
});
