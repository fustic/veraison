// Full region page: why it works, climate and soils, grapes, label terms, iconic
// producers, the areas inside it, and your progress (studied, checked, been there).
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ancestry } from '../../../../core/src/mapnav.ts';
import { countryName, regionCountry } from '../../../../core/src/reveal.ts';
import { setBeenThere, setCheckedAgainstBook, setStudyStatus, type StudyStatus } from '../../../../core/src/userdb/progress.ts';
import { GrapeIcon } from '../../GrapeIcon';
import { Box, CauseCard, H1, H2, Kicker, PrimaryButton, Tag } from '../../components';
import { useData, useMarkSeen } from '../../data/DataProvider';
import { prettyId } from '../../names';
import { Pill } from '../../tasting/parts';
import { Text } from '../../Text';
import { colors } from '../../theme';

export default function RegionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { content, statuses, db, deps, refreshStatuses } = useData();
  const region = id ? content.regionById.get(id) : undefined;
  useMarkSeen(region?.id);

  if (!region) {
    return (
      <View style={[styles.screen, styles.content]}>
        <H1>Not found</H1>
        <Text style={styles.muted}>{id} is not in the study content yet.</Text>
      </View>
    );
  }

  const chain = ancestry(region.id, content.regionById);
  const climate = [...chain].reverse().find((r) => r.climate)?.climate;
  const kids = content.childrenOf.get(region.id) ?? [];
  const where = [...chain.slice(0, -1).map((r) => r.name), chain.length <= 1 ? countryName(regionCountry(region.id)) : null].filter(Boolean).join(' › ');
  const status = statuses.get(region.id);
  // Grapes that list this region among their main regions, with that grape's style note.
  const grapeNotes = content.grapes.flatMap((g) => g.regions.filter((r) => r.regionId === region.id).map((r) => ({ grape: g, note: r })));

  const update = async (fn: () => Promise<void>) => {
    await fn();
    await refreshStatuses();
  };

  const grapeRow = (ids: string[], title: string) =>
    ids.length ? (
      <View style={{ gap: 8 }}>
        <Text style={styles.subhead}>{title}</Text>
        {ids.map((g) => {
          const grape = content.grapeById.get(g);
          return (
            <Pressable
              key={g}
              disabled={!grape}
              accessibilityRole={grape ? 'link' : undefined}
              onPress={() => grape && router.push({ pathname: '/grape/[id]', params: { id: g } })}
              style={styles.grapeRow}
            >
              <View style={styles.icon}>{grape ? <GrapeIcon colour={grape.berryColour} size={32} /> : null}</View>
              <Text style={[styles.grapeName, !grape && { color: colors.muted }]}>{grape?.name ?? prettyId(g)}</Text>
              <Text style={grape ? styles.chev : styles.soon}>{grape ? '›' : 'SOON'}</Text>
            </Pressable>
          );
        })}
      </View>
    ) : null;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: '' }} />
      <View style={{ gap: 6, paddingHorizontal: 4 }}>
        {where ? <Kicker>{where.toUpperCase()}</Kicker> : null}
        <H1 size={34}>{region.name}</H1>
        <View style={styles.wrap}>
          {climate ? <Tag label={`${climate.type} ${climate.influence}`} tint /> : null}
          {region.labelTerms.map((t) => (
            <Tag key={t} label={t} />
          ))}
          {!region.verified ? <Tag label="Draft" /> : null}
        </View>
      </View>

      {region.why.length ? (
        <View style={{ gap: 10 }}>
          <View style={{ paddingHorizontal: 4 }}>
            <H2>Why it works</H2>
          </View>
          {region.why.map((w) => (
            <CauseCard key={w.factor} {...w} />
          ))}
        </View>
      ) : null}

      {region.soils || region.principalGrapes.length || region.otherGrapes.length ? (
        <Box gap={14} pad={18}>
          {region.soils ? (
            <View style={{ gap: 4 }}>
              <Text style={styles.subhead}>Soils</Text>
              <Text style={styles.body}>{region.soils}</Text>
            </View>
          ) : null}
          {grapeRow(region.principalGrapes, 'Principal grapes')}
          {grapeRow(region.otherGrapes, 'Also grown')}
        </Box>
      ) : null}

      {grapeNotes.length ? (
        <View style={{ gap: 10 }}>
          <View style={{ paddingHorizontal: 4 }}>
            <H2>Style here</H2>
          </View>
          {grapeNotes.map(({ grape, note }) => (
            <View key={grape.id} style={styles.card}>
              <Text style={styles.grapeName}>{grape.name}</Text>
              <Text style={styles.body}>{note.style}</Text>
              {note.producers.length ? (
                <Text style={styles.muted}>
                  <Text style={{ fontWeight: '600', color: colors.ink }}>Iconic: </Text>
                  {note.producers.join(', ')}
                </Text>
              ) : null}
            </View>
          ))}
        </View>
      ) : null}

      {region.producers.length ? (
        <Box gap={6} pad={18}>
          <H2>Iconic producers</H2>
          <Text style={styles.body}>{region.producers.join(', ')}</Text>
        </Box>
      ) : null}

      {kids.length ? (
        <View style={{ gap: 8 }}>
          <View style={{ paddingHorizontal: 4 }}>
            <H2>Inside {region.name}</H2>
          </View>
          {kids.map((k) => {
            const s = statuses.get(k.id);
            return (
              <Pressable key={k.id} accessibilityRole="link" onPress={() => router.push({ pathname: '/region/[id]', params: { id: k.id } })} style={styles.kid}>
                <View style={{ flex: 1, gap: 2 }}>
                  <Text style={styles.grapeName}>{k.name}</Text>
                  <Text style={styles.muted}>
                    {[k.level, k.principalGrapes.slice(0, 3).map((g) => content.grapeById.get(g)?.name ?? prettyId(g)).join(', ')].filter(Boolean).join(' · ')}
                  </Text>
                </View>
                {s?.beenThere ? <Tag label="Been" /> : null}
                <Text style={styles.chev}>›</Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}

      <View style={{ flexDirection: 'row' }}>
        <PrimaryButton secondary title="Show on map" onPress={() => router.navigate({ pathname: '/map', params: { focus: region.id } })} />
      </View>

      <View style={styles.progress}>
        <Kicker color={colors.wine}>YOUR PROGRESS</Kicker>
        <View style={styles.wrap}>
          {(['seen', 'studied', 'mastered'] as StudyStatus[]).map((s) => (
            <Pill key={s} small label={s.charAt(0).toUpperCase() + s.slice(1)} on={status?.status === s} onPress={() => update(() => setStudyStatus(db, region.id, s, deps))} />
          ))}
        </View>
        <View style={styles.wrap}>
          <Pill
            small
            label={status?.checkedAgainstBook ? '✓ Checked against my book' : 'Checked against my book'}
            on={!!status?.checkedAgainstBook}
            onPress={() => update(() => setCheckedAgainstBook(db, region.id, !status?.checkedAgainstBook, deps))}
          />
          <Pill small label={status?.beenThere ? '✓ I have been there' : 'I have been there'} on={!!status?.beenThere} onPress={() => update(() => setBeenThere(db, region.id, !status?.beenThere, deps))} />
        </View>
        {!region.verified ? <Text style={styles.muted}>This entry is a draft. Fix anything that differs from your book in content/regions.</Text> : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { padding: 16, paddingBottom: 40, gap: 16 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  muted: { fontSize: 13, lineHeight: 18, color: colors.muted },
  body: { fontSize: 14, lineHeight: 20, color: colors.ink },
  subhead: { fontSize: 14, fontWeight: '600', color: colors.muted },
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: 14, paddingVertical: 14, paddingHorizontal: 16, gap: 6 },
  grapeRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  icon: { width: 40, height: 40, borderRadius: 10, backgroundColor: colors.paper, alignItems: 'center', justifyContent: 'center' },
  grapeName: { flex: 1, fontSize: 15, fontWeight: '600', color: colors.ink },
  chev: { fontSize: 22, color: colors.wine },
  soon: { fontFamily: 'IBMPlexMono-Medium', fontSize: 10, color: colors.muted },
  kid: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, borderRadius: 14, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line },
  progress: { borderRadius: 18, backgroundColor: colors.wineTint, padding: 16, gap: 10 },
});
