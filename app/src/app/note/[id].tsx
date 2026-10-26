// A saved note, following the Reveal draft: what the note suggested (with a line on
// why), how it compares with the revealed wine's typical profile, the aromas you found
// and missed, your recurring pattern, and your note itself.
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import type { Aroma } from '../../../../core/src/content.ts';
import { gridColumn } from '../../../../core/src/compare.ts';
import { checkAlcohol, explainGuess } from '../../../../core/src/explain.ts';
import { describeReveal } from '../../../../core/src/reveal.ts';
import { SCALES, structureOf, STRUCTURE_FIELDS, type StructureField, type TastingNote } from '../../../../core/src/sat.ts';
import { scoreProfile } from '../../../../core/src/scorer.ts';
import { deleteTastingNote, getGuesses, getTastingNote } from '../../../../core/src/userdb/notes.ts';
import { getNotePhoto, type NotePhoto } from '../../../../core/src/userdb/photos.ts';
import { AromaTiles, Box, Callout, H1, H2, Kicker, LabelPhoto, PrimaryButton } from '../../components';
import { useData } from '../../data/DataProvider';
import { useNotesAndPattern } from '../../data/usePattern';
import { stepWord } from '../../names';
import { glassFill, Glass } from '../../tasting/parts';
import { Text } from '../../Text';
import { colors } from '../../theme';

const ROW_LABEL: Record<StructureField, string> = {
  appearanceIntensity: 'Colour',
  noseIntensity: 'Nose',
  sweetness: 'Sweetness',
  acidity: 'Acidity',
  tannin: 'Tannin',
  alcohol: 'Alcohol',
  body: 'Body',
  flavourIntensity: 'Flavour',
  finish: 'Finish',
};

export default function NoteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { db, deps, content, dataVersion } = useData();
  const [note, setNote] = useState<TastingNote | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [guesses, setGuesses] = useState<{ rank: number; profileId: string; score: number }[]>([]);
  const [photo, setPhoto] = useState<NotePhoto | null>(null);
  const { pattern } = useNotesAndPattern();

  const load = useCallback(async () => {
    if (!id) return;
    try {
      setNote(await getTastingNote(db, id));
      setGuesses(await getGuesses(db, id));
      setPhoto(await getNotePhoto(db, id));
    } finally {
      setLoaded(true);
    }
  }, [db, id, dataVersion]);
  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );

  if (!note) {
    return (
      <View style={styles.screen}>
        <Text style={[styles.muted, { padding: 16 }]}>{loaded ? 'This note no longer exists.' : 'Loading…'}</Text>
      </View>
    );
  }

  const label = (aid: string) => content.aromaById.get(aid)?.label ?? aid;
  const revealed = note.revealedProfileId ? content.profileById.get(note.revealedProfileId) : undefined;
  const match = revealed ? scoreProfile(note, revealed) : null;
  const described = note.reveal ? describeReveal(note.reveal, content, revealed?.name) : null;
  const values = structureOf(note);
  const aromasOf = (ids: readonly string[]): Aroma[] => ids.flatMap((a) => content.aromaById.get(a) ?? []);
  const abv = note.reveal?.abv != null ? checkAlcohol(note.palate.alcohol, note.reveal.abv) : null;
  const when = new Date(note.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  const kicker = [note.labelText?.toUpperCase(), note.reveal ? 'REVEALED' : 'NOT REVEALED YET', when.toUpperCase()].filter(Boolean).join(' · ');

  const openReveal = () => router.push({ pathname: '/note/reveal/[id]', params: { id: note.id } });
  const remove = () =>
    Alert.alert('Delete this note?', undefined, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteTastingNote(db, note.id, deps);
          router.back();
        },
      },
    ]);

  // Rows for the comparison: fields the profile has a range for (tannin only for reds).
  const rows = revealed ? STRUCTURE_FIELDS.filter((f) => revealed.structure[f] && (f !== 'tannin' || note.wineType === 'red')) : [];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={{ gap: 4, paddingHorizontal: 4 }}>
        <Kicker>{kicker}</Kicker>
        <H1>{described?.title ?? note.labelText ?? 'Blind wine'}</H1>
        {described?.subtitle ? <Text style={styles.sub}>{described.subtitle}</Text> : null}
      </View>

      {photo ? <LabelPhoto photo={photo} /> : null}

      {!note.reveal ? (
        <View style={{ flexDirection: 'row' }}>
          <PrimaryButton title="Reveal the wine" onPress={openReveal} />
        </View>
      ) : null}

      <Box gap={12}>
        <H2>Your note suggested</H2>
        {guesses.length === 0 ? <Text style={styles.muted}>No suggestions: add structure and aromas to the note.</Text> : null}
        {guesses.map((g) => {
          const p = content.profileById.get(g.profileId);
          const correct = note.revealedProfileId === g.profileId;
          return (
            <View key={g.rank} style={{ gap: 6 }}>
              <View style={styles.rowBetween}>
                <Text style={styles.guessName}>
                  {g.rank} · {p?.name ?? g.profileId}
                </Text>
                {correct ? <Text style={styles.correct}>✓ correct</Text> : null}
              </View>
              <View style={styles.track}>
                <View style={[styles.fill, { width: `${Math.round(g.score * 100)}%`, backgroundColor: g.rank === 1 ? colors.wine : colors.rose }]} />
              </View>
              {p ? <Text style={styles.muted}>{explainGuess(note, p, label)}</Text> : null}
            </View>
          );
        })}
      </Box>

      {revealed && match ? (
        <Box gap={10}>
          <H2>Your note vs a typical {revealed.name}</H2>
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={styles.you} />
              <Text style={styles.legendText}>You</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={styles.rangeSwatch} />
              <Text style={styles.legendText}>Typical range</Text>
            </View>
          </View>
          {rows.map((f) => {
            const range = revealed.structure[f]!;
            const v = values[f];
            const conflict = match.conflicts.find((c) => c.field === f);
            const n = SCALES[f].length;
            const cols = n === 5 ? 5 : n === 6 ? 6 : 5;
            const colOf = (x: number) => (n === 6 ? x : gridColumn(f, x));
            return (
              <View key={f} style={styles.cmpRow}>
                <Text style={[styles.cmpLabel, conflict && { color: colors.wine, fontWeight: '600' }]}>{ROW_LABEL[f]}</Text>
                {Array.from({ length: cols }, (_, i) => {
                  const inRange = i >= colOf(range[0]) && i <= colOf(range[1]);
                  return (
                    <View key={i} style={[styles.cmpCell, { backgroundColor: inRange ? '#E7C9D3' : colors.paper }]}>
                      {v !== null && colOf(v) === i ? <View style={styles.you} /> : null}
                    </View>
                  );
                })}
                <Text style={[styles.cmpVerdict, { color: v === null ? colors.muted : conflict ? colors.wine : colors.good }]}>
                  {v === null ? '—' : conflict ? `${Math.abs(conflict.steps)} step${Math.abs(conflict.steps) === 1 ? '' : 's'} ${conflict.steps > 0 ? 'high' : 'low'}` : '✓ match'}
                </Text>
              </View>
            );
          })}
          {abv ? (
            <Text style={[styles.muted, abv.match === false && { color: colors.wine, fontWeight: '600' }]}>
              Label says {note.reveal?.abv}% = {abv.labelWord} alcohol
              {abv.saidWord ? (abv.match ? `; you said ${abv.saidWord}.` : `; you said ${abv.saidWord}.`) : '.'}
            </Text>
          ) : null}

          {match.sharedAromas.length ? (
            <View style={styles.divided}>
              <Text style={[styles.groupTitle, { color: colors.good }]}>You found</Text>
              <AromaTiles aromas={aromasOf(match.sharedAromas)} size={40} />
            </View>
          ) : null}
          {match.missedSignatureAromas.length ? (
            <View style={[styles.divided, !match.sharedAromas.length ? null : { borderTopWidth: 0, paddingTop: 4 }]}>
              <Text style={[styles.groupTitle, { color: colors.wine }]}>You missed</Text>
              <AromaTiles aromas={aromasOf(match.missedSignatureAromas)} size={40} mode="missed" />
            </View>
          ) : null}
        </Box>
      ) : note.reveal ? (
        <Box gap={6}>
          <H2>No typical profile to compare with</H2>
          <Text style={styles.muted}>This wine is not in the study profiles yet. Edit the reveal to pick the closest one, or keep it as a record.</Text>
          {abv ? (
            <Text style={[styles.muted, abv.match === false && { color: colors.wine, fontWeight: '600' }]}>
              Label says {note.reveal.abv}% = {abv.labelWord} alcohol{abv.saidWord ? `; you said ${abv.saidWord}.` : '.'}
            </Text>
          ) : null}
        </Box>
      ) : null}

      {pattern && note.reveal ? <Callout kicker={`PATTERN · ${pattern.bias.notes} ${pattern.wineType === 'red' ? 'RED' : 'REVEALED'} NOTES`}>{pattern.sentence}</Callout> : null}

      <Box gap={10}>
        <H2>Your note</H2>
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          {note.appearance.colour ? <Glass fill={glassFill(note.appearance.colour, note.wineType, note.appearance.intensity)} size={30} /> : null}
          <Text style={[styles.body, { flex: 1 }]}>
            {[
              note.appearance.clarity === 1 ? 'Hazy' : null,
              note.appearance.intensity !== null ? SCALES.appearanceIntensity[note.appearance.intensity] : null,
              note.appearance.colour,
              note.nose.development !== null ? SCALES.development[note.nose.development] : null,
            ]
              .filter(Boolean)
              .join(' · ') || 'No appearance recorded'}
          </Text>
        </View>
        {note.nose.aromaIds.length ? <AromaTiles aromas={aromasOf(note.nose.aromaIds)} columns={4} size={34} /> : null}
        <Text style={styles.body}>
          {(['sweetness', 'acidity', 'tannin', 'alcohol', 'body', 'flavourIntensity', 'finish'] as const)
            .filter((f) => values[f] !== null)
            .map((f) => `${ROW_LABEL[f]} ${stepWord(f, values[f]!)}`)
            .join(' · ') || 'No palate recorded'}
        </Text>
        {note.conclusions.quality !== null || note.conclusions.readiness !== null ? (
          <Text style={styles.body}>
            {[note.conclusions.quality !== null ? `Quality: ${SCALES.quality[note.conclusions.quality]}` : null, note.conclusions.readiness !== null ? SCALES.readiness[note.conclusions.readiness] : null]
              .filter(Boolean)
              .join(' · ')}
          </Text>
        ) : null}
      </Box>

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <PrimaryButton secondary title="Delete note" onPress={remove} />
        <PrimaryButton title={note.reveal ? 'Edit reveal' : 'Reveal the wine'} onPress={openReveal} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { padding: 16, paddingBottom: 40, gap: 14 },
  sub: { fontSize: 14, color: colors.muted, lineHeight: 20 },
  muted: { fontSize: 13, lineHeight: 19, color: colors.muted },
  body: { fontSize: 14, lineHeight: 20, color: colors.ink },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  guessName: { fontSize: 14, fontWeight: '600', color: colors.ink, flexShrink: 1 },
  correct: { fontSize: 14, fontWeight: '600', color: colors.good },
  track: { height: 8, borderRadius: 4, backgroundColor: colors.track },
  fill: { height: 8, borderRadius: 4 },
  legendRow: { flexDirection: 'row', gap: 14 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendText: { fontSize: 12, color: colors.muted },
  you: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.ink },
  rangeSwatch: { width: 16, height: 10, borderRadius: 3, backgroundColor: '#E7C9D3' },
  cmpRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  cmpLabel: { width: 70, fontSize: 14, color: colors.ink },
  cmpCell: { flex: 1, height: 24, borderRadius: 5, alignItems: 'center', justifyContent: 'center' },
  cmpVerdict: { width: 72, fontSize: 12, fontWeight: '600', textAlign: 'right' },
  divided: { gap: 8, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.track },
  groupTitle: { fontSize: 14, fontWeight: '600' },
});
