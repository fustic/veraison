import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SCALES } from '../../../../core/src/sat.ts';
import { listTastingNotes, type NoteSummary } from '../../../../core/src/userdb/notes.ts';
import { useData } from '../../data/DataProvider';
import { colors } from '../../theme';
import { Button, Muted, Screen, Title } from '../../ui';

export default function Notes() {
  const { db, content } = useData();
  const [notes, setNotes] = useState<NoteSummary[]>([]);

  useFocusEffect(
    useCallback(() => {
      void listTastingNotes(db).then(setNotes);
    }, [db]),
  );

  return (
    <Screen>
      <Title>Tasting notes</Title>
      <Button title="New tasting note" onPress={() => router.push('/note/new')} />
      {notes.length === 0 ? <Muted>No notes yet. Your notes stay on this phone.</Muted> : null}
      <View style={{ gap: 8 }}>
        {notes.map((n) => (
          <Pressable
            key={n.id}
            accessibilityRole="link"
            onPress={() => router.push({ pathname: '/note/[id]', params: { id: n.id } })}
            style={{ backgroundColor: colors.surface, borderColor: colors.line, borderWidth: 1, borderRadius: 14, padding: 14, gap: 4 }}
          >
            <Text style={{ fontSize: 16, fontWeight: '600', color: colors.ink }}>
              {n.labelText || (n.revealedProfileId ? content.profileById.get(n.revealedProfileId)?.name : null) || 'Blind wine'}
            </Text>
            <Text style={{ fontSize: 13, color: colors.muted }}>
              {new Date(n.createdAt).toLocaleDateString()} · {n.colour ?? n.wineType} · {n.aromaCount} aromas
              {n.quality !== null ? ` · ${SCALES.quality[n.quality]}` : ''}
              {n.revealedProfileId ? ' · revealed' : ''}
            </Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}
