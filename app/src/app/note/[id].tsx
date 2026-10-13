// A saved note: the top suggestions, the reveal, and how the note compares with
// the revealed wine's typical profile.
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { describeReveal } from '../../../../core/src/reveal.ts';
import { SCALES, type TastingNote } from '../../../../core/src/sat.ts';
import { scoreProfile } from '../../../../core/src/scorer.ts';
import { deleteTastingNote, getGuesses, getTastingNote } from '../../../../core/src/userdb/notes.ts';
import { useData } from '../../data/DataProvider';
import { colors } from '../../theme';
import { Button, Card, Heading, Muted, Screen, Title } from '../../ui';

export default function NoteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { db, deps, content } = useData();
  const [note, setNote] = useState<TastingNote | null>(null);
  const [guesses, setGuesses] = useState<{ rank: number; profileId: string; score: number }[]>([]);

  const load = useCallback(async () => {
    if (!id) return;
    setNote(await getTastingNote(db, id));
    setGuesses(await getGuesses(db, id));
  }, [db, id]);
  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );

  if (!note) {
    return (
      <Screen>
        <Muted>Loading…</Muted>
      </Screen>
    );
  }

  const revealed = note.revealedProfileId ? content.profileById.get(note.revealedProfileId) : undefined;
  const comparison = revealed ? scoreProfile(note, revealed) : null;
  const described = note.reveal ? describeReveal(note.reveal, content, revealed?.name) : null;
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

  return (
    <Screen>
      <Title>{described?.title || note.labelText || 'Blind wine'}</Title>
      {described?.subtitle ? <Text style={{ fontSize: 15, color: colors.ink }}>{described.subtitle}</Text> : null}
      <Muted>
        {described && note.labelText ? `${note.labelText} · ` : ''}
        {new Date(note.createdAt).toLocaleString()} · {note.appearance.colour ?? note.wineType}
        {note.conclusions.quality !== null ? ` · ${SCALES.quality[note.conclusions.quality]}` : ''}
      </Muted>

      <Card>
        <Heading>Your note suggested</Heading>
        {guesses.length === 0 ? <Muted>No suggestions: add structure and aromas to the note.</Muted> : null}
        {guesses.map((g) => {
          const p = content.profileById.get(g.profileId);
          const correct = note.revealedProfileId === g.profileId;
          return (
            <View key={g.rank} style={{ gap: 4 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 15, fontWeight: '600', color: colors.ink }}>
                  {g.rank} · {p?.name ?? g.profileId}
                </Text>
                {correct ? <Text style={{ color: colors.good, fontWeight: '600' }}>✓ correct</Text> : null}
              </View>
              <View style={{ height: 8, borderRadius: 4, backgroundColor: colors.track }}>
                <View style={{ width: `${Math.round(g.score * 100)}%`, height: 8, borderRadius: 4, backgroundColor: g.rank === 1 ? colors.wine : colors.rose }} />
              </View>
            </View>
          );
        })}
      </Card>

      {revealed && comparison ? (
        <Card>
          <Heading>Your note vs a typical {revealed.name}</Heading>
          {comparison.inRange.length ? <Muted>In range: {comparison.inRange.join(', ')}</Muted> : null}
          {comparison.conflicts.map((c) => (
            <Text key={c.field} style={{ fontSize: 14, color: colors.wine, fontWeight: '600' }}>
              {c.field}: {Math.abs(c.steps)} step{Math.abs(c.steps) === 1 ? '' : 's'} {c.steps > 0 ? 'high' : 'low'}
            </Text>
          ))}
          {comparison.sharedAromas.length ? (
            <Muted>Found: {comparison.sharedAromas.map((a) => content.aromaById.get(a)?.label ?? a).join(', ')}</Muted>
          ) : null}
          {comparison.missedSignatureAromas.length ? (
            <Text style={{ fontSize: 14, color: colors.wine }}>
              Missed: {comparison.missedSignatureAromas.map((a) => content.aromaById.get(a)?.label ?? a).join(', ')}
            </Text>
          ) : null}
        </Card>
      ) : null}

      <Button title={note.reveal ? 'Edit reveal' : 'Reveal the wine'} onPress={openReveal} />
      <Button title="Delete note" kind="secondary" onPress={remove} />
    </Screen>
  );
}
