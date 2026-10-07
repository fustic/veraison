// One-screen tasting note: appearance, nose, palate, conclusions.
// Functional first version; the picture tiles from the design come with react-native-svg next.
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import type { Aroma } from '../../../../core/src/content.ts';
import { checkConclusions, complexityFromAromas, suggestQuality } from '../../../../core/src/coach.ts';
import { COLOURS, emptyNote, SCALES, type TastingNoteInput, type WineType } from '../../../../core/src/sat.ts';
import { rankProfiles } from '../../../../core/src/scorer.ts';
import { saveGuesses, saveTastingNote } from '../../../../core/src/userdb/notes.ts';
import { useData } from '../../data/DataProvider';
import { colors } from '../../theme';
import { Button, Card, Chip, Heading, Label, Muted, ScalePicker, Screen, Title } from '../../ui';

const SHORT = {
  five: ['Low', 'Med−', 'Med', 'Med+', 'High'],
  intensity: ['Light', 'Med−', 'Med', 'Med+', 'Pron.'],
  body: ['Light', 'Med−', 'Med', 'Med+', 'Full'],
  finish: ['Short', 'Med−', 'Med', 'Med+', 'Long'],
  sweetness: ['Dry', 'Off-dry', 'Med-dry', 'Med-sw', 'Sweet', 'Lusc.'],
};

export default function NewNote() {
  const { db, deps, content } = useData();
  const [note, setNote] = useState<TastingNoteInput>(() => emptyNote('red'));
  const [showAll, setShowAll] = useState(false);

  const set = (fn: (n: TastingNoteInput) => void) =>
    setNote((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as TastingNoteInput;
      fn(next);
      return next;
    });

  const aromaGroups = useMemo(() => {
    const colourKey = note.wineType === 'white' ? 'white' : 'red';
    const groups = new Map<string, Aroma[]>();
    for (const a of content.aromas) {
      if (!showAll && a.appliesTo !== 'both' && a.appliesTo !== colourKey) continue;
      const key = `${a.level}|${a.cluster}`;
      groups.set(key, [...(groups.get(key) ?? []), a]);
    }
    return [...groups.entries()];
  }, [content.aromas, note.wineType, showAll]);

  const advice = suggestQuality({
    finish: note.palate.finish,
    flavourIntensity: note.palate.flavourIntensity,
    complexity: complexityFromAromas(note.nose.aromaIds, content.aromaById),
    balanced: null,
    faulty: note.nose.condition === 1,
  });
  const warnings = checkConclusions(note, advice);

  const toggleAroma = (id: string) =>
    set((n) => {
      n.nose.aromaIds = n.nose.aromaIds.includes(id) ? n.nose.aromaIds.filter((x) => x !== id) : [...n.nose.aromaIds, id];
    });

  const save = async () => {
    const id = await saveTastingNote(db, note, deps);
    await saveGuesses(db, id, rankProfiles(note, content.profiles));
    router.replace({ pathname: '/note/[id]', params: { id } });
  };

  return (
    <Screen>
      <Title>Tasting note</Title>
      <TextInput
        placeholder="Label or sample number (optional)"
        placeholderTextColor={colors.muted}
        value={note.labelText ?? ''}
        onChangeText={(t) => set((n) => void (n.labelText = t || null))}
        style={{ backgroundColor: colors.surface, borderColor: colors.line, borderWidth: 1, borderRadius: 12, padding: 12, fontSize: 15 }}
      />

      <Heading>Appearance</Heading>
      <Card>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {(['white', 'rose', 'red'] as WineType[]).map((t) => (
            <Chip
              key={t}
              label={t === 'rose' ? 'Rosé' : t[0]!.toUpperCase() + t.slice(1)}
              on={note.wineType === t}
              onPress={() =>
                set((n) => {
                  n.wineType = t;
                  n.appearance.colour = null;
                  if (t !== 'red') n.palate.tannin = null;
                })
              }
            />
          ))}
        </View>
        <ScalePicker label="Clarity" options={['Clear', 'Hazy']} value={note.appearance.clarity} onChange={(v) => set((n) => void (n.appearance.clarity = v))} />
        <ScalePicker label="Intensity" options={['Pale', 'Medium', 'Deep']} value={note.appearance.intensity} onChange={(v) => set((n) => void (n.appearance.intensity = v))} />
        <Text style={{ fontSize: 14, fontWeight: '600', color: colors.ink }}>Colour</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {COLOURS[note.wineType].map((c) => (
            <Chip key={c} label={c} on={note.appearance.colour === c} onPress={() => set((n) => void (n.appearance.colour = n.appearance.colour === c ? null : c))} />
          ))}
        </View>
      </Card>

      <Heading>Nose</Heading>
      <Card>
        <ScalePicker label="Condition" options={['Clean', 'Unclean']} value={note.nose.condition} onChange={(v) => set((n) => void (n.nose.condition = v))} />
        <ScalePicker label="Intensity" options={SHORT.intensity} value={note.nose.intensity} onChange={(v) => set((n) => void (n.nose.intensity = v))} />
        <ScalePicker
          label="Development"
          options={['Youthful', 'Developing', 'Fully dev.', 'Tired']}
          value={note.nose.development}
          onChange={(v) => set((n) => void (n.nose.development = v))}
        />
      </Card>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Muted>{showAll ? 'All aromas' : `Aromas for ${note.wineType === 'white' ? 'white' : 'red'} wine`}</Muted>
        <Chip label={showAll ? 'Filter' : 'Show all'} onPress={() => setShowAll((v) => !v)} />
      </View>
      {aromaGroups.map(([key, list]) => {
        const [level, cluster] = key.split('|');
        return (
          <Card key={key} style={{ padding: 14 }}>
            <Label>
              {level} · {cluster}
            </Label>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              {list.map((a) => (
                <Chip key={a.id} label={a.label} on={note.nose.aromaIds.includes(a.id)} onPress={() => toggleAroma(a.id)} />
              ))}
            </View>
          </Card>
        );
      })}

      <Heading>Palate</Heading>
      <Card>
        <ScalePicker label="Sweetness" options={SHORT.sweetness} value={note.palate.sweetness} onChange={(v) => set((n) => void (n.palate.sweetness = v))} />
        <ScalePicker label="Acidity" options={SHORT.five} value={note.palate.acidity} onChange={(v) => set((n) => void (n.palate.acidity = v))} />
        {note.wineType === 'red' ? (
          <ScalePicker label="Tannin" options={SHORT.five} value={note.palate.tannin} onChange={(v) => set((n) => void (n.palate.tannin = v))} />
        ) : null}
        <ScalePicker label="Alcohol" options={['Low', 'Medium', 'High']} value={note.palate.alcohol} onChange={(v) => set((n) => void (n.palate.alcohol = v))} />
        <ScalePicker label="Body" options={SHORT.body} value={note.palate.body} onChange={(v) => set((n) => void (n.palate.body = v))} />
        <ScalePicker
          label="Flavour intensity"
          options={SHORT.intensity}
          value={note.palate.flavourIntensity}
          onChange={(v) => set((n) => void (n.palate.flavourIntensity = v))}
        />
        <ScalePicker label="Finish" options={SHORT.finish} value={note.palate.finish} onChange={(v) => set((n) => void (n.palate.finish = v))} />
        <Muted>Flavour characteristics: same as the nose.</Muted>
      </Card>

      <Heading>Conclusions</Heading>
      <Card>
        <ScalePicker
          label="Quality"
          options={['Faulty', 'Poor', 'Accept.', 'Good', 'V. good', 'Outst.']}
          value={note.conclusions.quality}
          onChange={(v) => set((n) => void (n.conclusions.quality = v))}
        />
        <Card tint style={{ padding: 12, gap: 4 }}>
          <Label>Quality coach</Label>
          <Text style={{ fontSize: 14, color: colors.ink }}>
            {advice.suggested !== null ? `Suggests: ${SCALES.quality[advice.suggested]}. ` : ''}
            {advice.reasons.join(' ')}
          </Text>
          {warnings.map((w) => (
            <Text key={w} style={{ fontSize: 13, color: colors.wine }}>
              {w}
            </Text>
          ))}
        </Card>
        <Text style={{ fontSize: 14, fontWeight: '600', color: colors.ink }}>Readiness for drinking</Text>
        {SCALES.readiness.map((r, i) => (
          <Chip key={r} label={r} on={note.conclusions.readiness === i} onPress={() => set((n) => void (n.conclusions.readiness = n.conclusions.readiness === i ? null : i))} />
        ))}
      </Card>

      <Button title="Save and see suggestions" onPress={save} />
    </Screen>
  );
}
