import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { coverage } from '../../../../core/src/userdb/progress.ts';
import { getTastingNote, listTastingNotes } from '../../../../core/src/userdb/notes.ts';
import { tastingBias } from '../../../../core/src/scorer.ts';
import { useData } from '../../data/DataProvider';
import { colors } from '../../theme';
import { Button, Card, Label, Muted, Screen, Title } from '../../ui';

export default function Today() {
  const { db, content, statuses } = useData();
  const [noteCount, setNoteCount] = useState(0);
  const [biasLine, setBiasLine] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const notes = await listTastingNotes(db, { limit: 200 });
        setNoteCount(notes.length);
        const revealed = notes.filter((n) => n.revealedProfileId);
        if (revealed.length >= 3) {
          const full = (await Promise.all(revealed.map((n) => getTastingNote(db, n.id)))).filter((n) => n !== null);
          const top = tastingBias(full, content.profileById)[0];
          if (top && top.misses >= 2) {
            const dir = top.meanSteps > 0 ? 'high' : 'low';
            setBiasLine(`Across ${top.notes} revealed wines you rate ${top.field} ${dir} in ${top.misses} of them.`);
            return;
          }
        }
        setBiasLine(null);
      })();
    }, [db, content]),
  );

  const regions = coverage(
    content.regions.filter((r) => r.level !== 'country').map((r) => r.id),
    statuses,
  );
  const grapes = coverage(
    content.grapes.map((g) => g.id),
    statuses,
  );

  return (
    <Screen>
      <View style={{ gap: 4 }}>
        <Title>Good evening</Title>
        <Muted>WSET Level 3 · France slice</Muted>
      </View>

      <Card>
        <Label>Tasting notes</Label>
        <Text style={{ fontSize: 34, fontWeight: '700', color: colors.ink }}>{noteCount}</Text>
        <Button title="New tasting note" onPress={() => router.push('/note/new')} />
      </Card>

      <Card>
        <Label>What you have seen</Label>
        <Text style={{ fontSize: 15, color: colors.ink }}>
          Grapes: {grapes.total - grapes.unseen} of {grapes.total}
        </Text>
        <Text style={{ fontSize: 15, color: colors.ink }}>
          Regions: {regions.total - regions.unseen} of {regions.total} · {regions.mastered} mastered
        </Text>
        <Muted>Open a grape or tap a region on the map to mark it seen.</Muted>
      </Card>

      {biasLine ? (
        <Card tint>
          <Label>Your tasting pattern</Label>
          <Text style={{ fontSize: 15, fontWeight: '600', color: colors.ink }}>{biasLine}</Text>
        </Card>
      ) : null}
    </Screen>
  );
}
