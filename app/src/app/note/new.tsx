// One-screen tasting note: appearance, nose, palate, conclusions, following the Tasting
// screen draft. A sticky bar jumps between sections; aromas are picture tiles.
import { router } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { checkConclusions, complexityFromAromas, suggestQuality } from '../../../../core/src/coach.ts';
import { COLOURS, emptyNote, SCALES, type Observation, type TastingNoteInput, type WineType } from '../../../../core/src/sat.ts';
import { rankProfiles } from '../../../../core/src/scorer.ts';
import { saveGuesses, saveTastingNote } from '../../../../core/src/userdb/notes.ts';
import { useData } from '../../data/DataProvider';
import {
  AromaPicker,
  ColourGlasses,
  mono,
  OptionList,
  Panel,
  PickedAromas,
  Pill,
  ScaleGrid,
  SectionTitle,
  Segmented,
} from '../../tasting/parts';
import { colors } from '../../theme';

const FIVE = ['Low', 'Med−', 'Med', 'Med+', 'High'];
const WINE_TYPES = [
  { value: 'white', label: 'White' },
  { value: 'rose', label: 'Rosé' },
  { value: 'red', label: 'Red' },
] as const satisfies readonly { value: WineType; label: string }[];
const OBSERVATIONS: readonly [Observation, string][] = [
  ['legs', 'Legs / tears'],
  ['deposit', 'Deposit'],
  ['petillance', 'Pétillance'],
  ['bubbles', 'Bubbles'],
];
const READINESS = ['Too young', 'Can drink now, but has potential for ageing', 'Drink now: not suitable for ageing', 'Too old'];
const QUALITY = ['Faulty', 'Poor', 'Acceptable', 'Good', 'Very good', 'Outstanding'];
const SECTIONS = ['Appearance', 'Nose', 'Palate', 'Conclusions'] as const;
type Section = (typeof SECTIONS)[number];

export default function NewNote() {
  const { db, deps, content } = useData();
  const insets = useSafeAreaInsets();
  const [note, setNote] = useState<TastingNoteInput>(() => emptyNote('red'));
  const [showAll, setShowAll] = useState(false);
  const [dirty, setDirty] = useState(false);
  const elapsed = useElapsed();

  const scroll = useRef<ScrollView>(null);
  const offsets = useRef<Partial<Record<Section, number>>>({});
  const mainY = useRef(0);
  const navH = useRef(56);

  const set = (fn: (n: TastingNoteInput) => void) => {
    setDirty(true);
    setNote((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as TastingNoteInput;
      fn(next);
      return next;
    });
  };
  const toggle = (list: string[], id: string) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  const typeName = { white: 'white', rose: 'rosé', red: 'red' }[note.wineType];
  const palateAromas = note.palate.aromaIds;
  const tastedAromas = palateAromas ?? note.nose.aromaIds;

  const advice = useMemo(
    () =>
      suggestQuality({
        finish: note.palate.finish,
        flavourIntensity: note.palate.flavourIntensity,
        complexity: complexityFromAromas([...note.nose.aromaIds, ...tastedAromas], content.aromaById),
        balanced: null,
        faulty: note.nose.condition === 1,
      }),
    [note, tastedAromas, content.aromaById],
  );
  const warnings = checkConclusions(note, advice);

  const exit = () => {
    if (!dirty) return router.back();
    Alert.alert('Discard this note?', 'Nothing has been saved yet.', [
      { text: 'Keep tasting', style: 'cancel' },
      { text: 'Discard', style: 'destructive', onPress: () => router.back() },
    ]);
  };

  const save = async () => {
    const id = await saveTastingNote(db, note, deps);
    await saveGuesses(db, id, rankProfiles(note, content.profiles));
    router.replace({ pathname: '/note/[id]', params: { id } });
  };

  const jump = (section: Section) => {
    const y = offsets.current[section];
    if (y !== undefined) scroll.current?.scrollTo({ y: Math.max(0, mainY.current + y - navH.current - 8), animated: true });
  };
  const mark = (section: Section) => (e: { nativeEvent: { layout: { y: number } } }) => {
    offsets.current[section] = e.nativeEvent.layout.y;
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView ref={scroll} stickyHeaderIndices={[1]} contentContainerStyle={{ paddingBottom: insets.bottom + 24 }} keyboardShouldPersistTaps="handled">
        {/* 0: top bar */}
        <View style={styles.topBar}>
          <Pressable accessibilityRole="button" onPress={exit} hitSlop={8} style={styles.exit}>
            <Text style={styles.exitText}>Exit</Text>
          </Pressable>
          <Text style={styles.timer} accessibilityLabel={`Time spent ${elapsed}`}>
            Tasting · {elapsed}
          </Text>
        </View>

        {/* 1: sticky section bar */}
        <View style={styles.nav} onLayout={(e) => (navH.current = e.nativeEvent.layout.height)}>
          {SECTIONS.map((sec) => (
            <Pressable key={sec} accessibilityRole="button" onPress={() => jump(sec)} style={styles.navItem}>
              <Text style={styles.navText}>{sec}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.main} onLayout={(e) => (mainY.current = e.nativeEvent.layout.y)}>
          <TextInput
            placeholder="Label or sample number (optional)"
            placeholderTextColor={colors.muted}
            value={note.labelText ?? ''}
            onChangeText={(t) => set((n) => void (n.labelText = t || null))}
            style={styles.input}
          />

          {/* Appearance */}
          <View onLayout={mark('Appearance')} style={styles.section}>
            <SectionTitle>Appearance</SectionTitle>
            <Panel>
              <Segmented
                label="Wine type"
                options={WINE_TYPES}
                value={note.wineType}
                onChange={(t) =>
                  set((n) => {
                    n.wineType = t;
                    if (n.appearance.colour && !COLOURS[t].includes(n.appearance.colour)) n.appearance.colour = null;
                    if (t !== 'red') n.palate.tannin = null;
                  })
                }
              />
              <ScaleGrid label="Clarity" options={['Clear', 'Hazy']} fontSize={13} value={note.appearance.clarity} onChange={(v) => set((n) => void (n.appearance.clarity = v))} />
              <ScaleGrid
                label="Intensity"
                options={['Pale', 'Medium', 'Deep']}
                fontSize={13}
                value={note.appearance.intensity}
                onChange={(v) => set((n) => void (n.appearance.intensity = v))}
              />
              <ColourGlasses
                colours={COLOURS[note.wineType]}
                wineType={note.wineType}
                intensity={note.appearance.intensity}
                value={note.appearance.colour}
                onChange={(c) => set((n) => void (n.appearance.colour = c))}
              />
              <View style={styles.wrapRow} accessibilityLabel="Other observations">
                {OBSERVATIONS.map(([key, label]) => (
                  <Pill
                    key={key}
                    label={label}
                    on={note.appearance.observations.includes(key)}
                    onPress={() => set((n) => void (n.appearance.observations = toggle(n.appearance.observations, key) as Observation[]))}
                  />
                ))}
              </View>
            </Panel>
          </View>

          {/* Nose */}
          <View onLayout={mark('Nose')} style={styles.section}>
            <SectionTitle>Nose</SectionTitle>
            <Panel gap={14}>
              <ScaleGrid label="Condition" options={['Clean', 'Unclean']} value={note.nose.condition} onChange={(v) => set((n) => void (n.nose.condition = v))} />
              <ScaleGrid
                label="Intensity"
                options={['Light', 'Med−', 'Medium', 'Med+', 'Pronounced']}
                value={note.nose.intensity}
                onChange={(v) => set((n) => void (n.nose.intensity = v))}
              />
              <ScaleGrid
                label="Development"
                options={['Youthful', 'Developing', 'Fully developed', 'Tired']}
                value={note.nose.development}
                onChange={(v) => set((n) => void (n.nose.development = v))}
              />
            </Panel>

            <View style={styles.filterRow}>
              <Text style={styles.filterNote}>{showAll ? 'Showing aromas for all wines' : `Showing aromas for ${typeName} wine`}</Text>
              <Pill small label={showAll ? `Only ${typeName}` : 'Show all'} on={false} onPress={() => setShowAll((v) => !v)} />
            </View>
            <PickedAromas ids={note.nose.aromaIds} aromaById={content.aromaById} onRemove={(id) => set((n) => void (n.nose.aromaIds = toggle(n.nose.aromaIds, id)))} />
            <AromaPicker
              aromas={content.aromas}
              wineType={note.wineType}
              showAll={showAll}
              selected={note.nose.aromaIds}
              onToggle={(id) => set((n) => void (n.nose.aromaIds = toggle(n.nose.aromaIds, id)))}
            />
          </View>

          {/* Palate */}
          <View onLayout={mark('Palate')} style={styles.section}>
            <SectionTitle>Palate</SectionTitle>
            <Panel gap={14}>
              <ScaleGrid
                label="Sweetness"
                options={['Dry', 'Off-dry', 'Med-dry', 'Med-sw', 'Sweet', 'Lusc.']}
                value={note.palate.sweetness}
                onChange={(v) => set((n) => void (n.palate.sweetness = v))}
              />
              <ScaleGrid label="Acidity" options={FIVE} value={note.palate.acidity} onChange={(v) => set((n) => void (n.palate.acidity = v))} />
              {note.wineType === 'red' ? (
                <ScaleGrid label="Tannin" options={FIVE} value={note.palate.tannin} onChange={(v) => set((n) => void (n.palate.tannin = v))} />
              ) : null}
              <ScaleGrid label="Alcohol" options={['Low', 'Medium', 'High']} value={note.palate.alcohol} onChange={(v) => set((n) => void (n.palate.alcohol = v))} />
              <ScaleGrid label="Body" options={['Light', 'Med−', 'Med', 'Med+', 'Full']} value={note.palate.body} onChange={(v) => set((n) => void (n.palate.body = v))} />
              <ScaleGrid
                label="Flavour intensity"
                options={['Light', 'Med−', 'Med', 'Med+', 'Pron.']}
                value={note.palate.flavourIntensity}
                onChange={(v) => set((n) => void (n.palate.flavourIntensity = v))}
              />
              <ScaleGrid label="Finish" options={['Short', 'Med−', 'Med', 'Med+', 'Long']} value={note.palate.finish} onChange={(v) => set((n) => void (n.palate.finish = v))} />
              <View style={styles.flavourRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.flavourTitle}>Flavour characteristics</Text>
                  <Text style={styles.flavourSub}>{palateAromas ? 'Picked separately for the palate' : 'Same as the nose, unless you change them'}</Text>
                </View>
                <Pill
                  small
                  label={palateAromas ? 'Same as nose' : 'Edit'}
                  on={false}
                  onPress={() => set((n) => void (n.palate.aromaIds = n.palate.aromaIds ? null : [...n.nose.aromaIds]))}
                />
              </View>
            </Panel>
            {palateAromas ? (
              <>
                <PickedAromas
                  ids={palateAromas}
                  aromaById={content.aromaById}
                  onRemove={(id) => set((n) => void (n.palate.aromaIds = toggle(n.palate.aromaIds ?? [], id)))}
                />
                <AromaPicker
                  aromas={content.aromas}
                  wineType={note.wineType}
                  showAll={showAll}
                  selected={palateAromas}
                  onToggle={(id) => set((n) => void (n.palate.aromaIds = toggle(n.palate.aromaIds ?? [], id)))}
                />
              </>
            ) : null}
          </View>

          {/* Conclusions */}
          <View onLayout={mark('Conclusions')} style={styles.section}>
            <SectionTitle>Conclusions</SectionTitle>
            <Panel gap={14}>
              <ScaleGrid
                label="Quality level"
                options={QUALITY}
                columns={3}
                fontSize={13}
                value={note.conclusions.quality}
                onChange={(v) => set((n) => void (n.conclusions.quality = v))}
              />
              <View style={[styles.coach, { backgroundColor: advice.suggested !== null ? colors.wineTint : colors.track }]}>
                <Text style={styles.coachLabel}>QUALITY COACH · BALANCE, LENGTH, INTENSITY, COMPLEXITY</Text>
                <Text style={styles.coachText}>
                  {advice.suggested !== null ? `Suggests ${SCALES.quality[advice.suggested]}. ` : ''}
                  {advice.reasons.join(' ')}
                </Text>
                {warnings.map((w) => (
                  <Text key={w} style={[styles.coachText, { color: colors.wine, fontWeight: '600' }]}>
                    {w}
                  </Text>
                ))}
              </View>
              <OptionList label="Readiness for drinking" options={READINESS} value={note.conclusions.readiness} onChange={(v) => set((n) => void (n.conclusions.readiness = v))} />
            </Panel>
          </View>

          <Pressable accessibilityRole="button" onPress={save} style={({ pressed }) => [styles.finish, pressed && { opacity: 0.85 }]}>
            <Text style={styles.finishText}>Finish and reveal</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

/** mm:ss since the screen opened; the exam allows about 15 minutes per wine. */
function useElapsed(): string {
  const [start] = useState(() => Date.now());
  const [now, setNow] = useState(start);
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const sec = Math.floor((now - start) / 1000);
  return `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  topBar: { paddingTop: 8, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  exit: { minHeight: 44, justifyContent: 'center' },
  exitText: { fontSize: 15, fontWeight: '600', color: colors.wine },
  timer: { fontFamily: mono, fontSize: 13, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8, overflow: 'hidden', backgroundColor: colors.ink, color: '#FFFFFF' },
  nav: {
    flexDirection: 'row',
    gap: 4,
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.paper,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  navItem: { flex: 1, minHeight: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line },
  navText: { fontSize: 12, fontWeight: '600', color: colors.ink },
  main: { paddingTop: 16, paddingHorizontal: 16, gap: 22 },
  input: { backgroundColor: colors.surface, borderColor: colors.line, borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, height: 44, fontSize: 15, color: colors.ink },
  section: { gap: 12 },
  wrapRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  filterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8, paddingHorizontal: 4 },
  filterNote: { fontSize: 13, color: colors.muted, flexShrink: 1 },
  flavourRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.track },
  flavourTitle: { fontSize: 14, fontWeight: '600', color: colors.ink },
  flavourSub: { fontSize: 13, color: colors.muted },
  coach: { borderRadius: 14, paddingVertical: 12, paddingHorizontal: 14, gap: 4 },
  coachLabel: { fontFamily: mono, fontSize: 11, letterSpacing: 0.6, color: colors.wine },
  coachText: { fontSize: 14, lineHeight: 20, color: colors.ink },
  finish: { height: 52, borderRadius: 14, backgroundColor: colors.wine, alignItems: 'center', justifyContent: 'center' },
  finishText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
