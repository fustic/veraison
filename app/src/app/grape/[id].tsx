import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { Ripeness, StructureRanges } from '../../../../core/src/content.ts';
import { SCALES, type StructureField } from '../../../../core/src/sat.ts';
import { setCheckedAgainstBook, setStudyStatus, type StudyStatus } from '../../../../core/src/userdb/progress.ts';
import { useData, useMarkSeen } from '../../data/DataProvider';
import { colors } from '../../theme';
import { Card, Chip, Heading, Label, Muted, Screen, Title } from '../../ui';

const FIELDS: { field: StructureField; label: string }[] = [
  { field: 'acidity', label: 'Acidity' },
  { field: 'tannin', label: 'Tannin' },
  { field: 'body', label: 'Body' },
  { field: 'alcohol', label: 'Alcohol' },
  { field: 'noseIntensity', label: 'Intensity' },
];

const RIPENESS: { key: Ripeness; label: string }[] = [
  { key: 'less', label: 'Less ripe' },
  { key: 'ripe', label: 'Ripe' },
  { key: 'very', label: 'Very ripe' },
];

function StructureBars({ ranges, red }: { ranges: StructureRanges; red: boolean }) {
  return (
    <View style={{ gap: 12 }}>
      {FIELDS.filter((f) => red || f.field !== 'tannin').map(({ field, label }) => {
        const range = ranges[field];
        const steps = SCALES[field].length;
        return (
          <View key={field} style={{ gap: 6 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 14, color: colors.ink }}>{label}</Text>
              <Text style={{ fontSize: 12, color: colors.muted }}>
                {range ? (range[0] === range[1] ? SCALES[field][range[0]] : `${SCALES[field][range[0]]} – ${SCALES[field][range[1]]}`) : '—'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              {Array.from({ length: steps }, (_, i) => (
                <View
                  key={i}
                  style={{
                    flex: 1,
                    height: 10,
                    borderRadius: 3,
                    backgroundColor: range && i >= range[0] && i <= range[1] ? colors.wine : range && i < range[0] ? '#C9A3B0' : colors.track,
                  }}
                />
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
}

export default function GrapeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { content, db, deps, statuses, refreshStatuses } = useData();
  const grape = id ? content.grapeById.get(id) : undefined;
  const [climate, setClimate] = useState<'cool' | 'warm'>('cool');
  const [ripeness, setRipeness] = useState<Ripeness>('ripe');
  useMarkSeen(grape?.id);

  if (!grape) {
    return (
      <Screen>
        <Title>Not found</Title>
        <Muted>{id} is not in the content yet.</Muted>
      </Screen>
    );
  }

  const status = statuses.get(grape.id);
  const fruit = grape.aromas.filter((a) => a.ripeness === ripeness);
  const other = grape.aromas.filter((a) => !a.ripeness).map((a) => content.aromaById.get(a.aromaId)).filter((a) => a !== undefined);
  const secondary = other.filter((a) => a.level !== 'tertiary');
  const tertiary = other.filter((a) => a.level === 'tertiary');

  const setStatus = async (s: StudyStatus) => {
    await setStudyStatus(db, grape.id, s, deps);
    await refreshStatuses();
  };
  const toggleChecked = async () => {
    await setCheckedAgainstBook(db, grape.id, !status?.checkedAgainstBook, deps);
    await refreshStatuses();
  };

  return (
    <Screen>
      <Stack.Screen options={{ title: grape.name }} />
      <View style={{ gap: 10 }}>
        <Title>{grape.name}</Title>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          <Chip label={grape.colour === 'red' ? 'Red' : 'White'} on />
          {grape.traits.map((t) => (
            <Chip key={t} label={t} />
          ))}
        </View>
      </View>

      <Card>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Heading>Structure</Heading>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <Chip label="Cool" on={climate === 'cool'} onPress={() => setClimate('cool')} />
            <Chip label="Warm" on={climate === 'warm'} onPress={() => setClimate('warm')} />
          </View>
        </View>
        <StructureBars ranges={grape.structure[climate]} red={grape.colour === 'red'} />
      </Card>

      <Card>
        <Heading>Fruit by ripeness</Heading>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {RIPENESS.map((r) => (
            <Chip key={r.key} label={r.label} on={ripeness === r.key} onPress={() => setRipeness(r.key)} />
          ))}
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {fruit.map((a) => (
            <Chip key={a.aromaId} label={content.aromaById.get(a.aromaId)?.label ?? a.aromaId} />
          ))}
        </View>
        {secondary.length ? <Muted>Also: {secondary.map((a) => a.label).join(', ')}</Muted> : null}
        {tertiary.length ? <Muted>With age: {tertiary.map((a) => a.label).join(', ')}</Muted> : null}
      </Card>

      <View style={{ gap: 8 }}>
        <Heading>Why it tastes this way</Heading>
        {grape.why.map((w) => (
          <Card key={w.factor} style={{ padding: 14 }}>
            <Text style={{ fontSize: 14, color: colors.ink, lineHeight: 20 }}>
              <Text style={{ fontWeight: '700' }}>{w.factor}</Text> → {w.effect}
              {w.result ? ` → ${w.result}` : ''}
            </Text>
          </Card>
        ))}
      </View>

      <View style={{ gap: 8 }}>
        <Heading>Main regions</Heading>
        {[...grape.regions]
          .sort((a, b) => a.styleLevel - b.styleLevel)
          .map((r) => {
            const region = content.regionById.get(r.regionId);
            return (
              <Card key={r.regionId} style={{ padding: 14, gap: 6 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: colors.ink }}>{region?.name ?? prettyId(r.regionId)}</Text>
                  {!region ? <Text style={{ fontSize: 12, color: colors.muted }}>coming soon</Text> : null}
                </View>
                <View style={{ flexDirection: 'row', gap: 3, width: 120 }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <View key={i} style={{ flex: 1, height: 6, borderRadius: 2, backgroundColor: i <= r.styleLevel ? colors.wine : colors.track }} />
                  ))}
                </View>
                <Text style={{ fontSize: 14, color: colors.ink, lineHeight: 20 }}>{r.style}</Text>
                {r.producers.length ? <Muted>Iconic: {r.producers.join(', ')}</Muted> : null}
              </Card>
            );
          })}
        {grape.alsoGrownIn?.length ? <Muted>Also: {grape.alsoGrownIn.join(', ')}</Muted> : null}
      </View>

      <Card>
        <Heading>Looks like</Heading>
        {grape.lookAlikes.map((l) => (
          <View key={l.grapeId} style={{ gap: 2 }}>
            <Text style={{ fontSize: 15, fontWeight: '600', color: colors.ink }}>{content.grapeById.get(l.grapeId)?.name ?? prettyId(l.grapeId)}</Text>
            <Muted>{l.tell}</Muted>
          </View>
        ))}
      </Card>

      <Card tint>
        <Label>Your progress</Label>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {(['seen', 'studied', 'mastered'] as const).map((s) => (
            <Chip key={s} label={s} on={status?.status === s} onPress={() => setStatus(s)} />
          ))}
        </View>
        <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: !!status?.checkedAgainstBook }} onPress={toggleChecked}>
          <Text style={{ fontSize: 14, color: colors.wine, fontWeight: '600' }}>
            {status?.checkedAgainstBook ? '✓ Checked against my book' : 'Mark as checked against my book'}
          </Text>
        </Pressable>
        {!grape.verified ? <Muted>This entry is a draft. Fix anything that differs from your book in content/grapes.</Muted> : null}
      </Card>
    </Screen>
  );
}

function prettyId(id: string): string {
  const slug = id.split(':')[1] ?? id;
  return slug
    .replace(/^[a-z]{2}-/, '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
