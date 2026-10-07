import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useData } from '../../data/DataProvider';
import { colors, statusColors } from '../../theme';
import { Muted, Screen, Title } from '../../ui';

export default function Grapes() {
  const { content, statuses } = useData();
  const grapes = [...content.grapes].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Screen>
      <Title>Grapes</Title>
      <Muted>The dot shows whether you have opened a grape yet.</Muted>
      <View style={{ gap: 8 }}>
        {grapes.map((g) => {
          const s = statuses.get(g.id);
          const dot = s ? statusColors[s.status] : statusColors.unseen;
          return (
            <Link key={g.id} href={{ pathname: '/grape/[id]', params: { id: g.id } }} asChild>
              <Pressable
                accessibilityRole="link"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.line,
                  borderWidth: 1,
                  borderRadius: 14,
                  padding: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: dot }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: colors.ink }}>{g.name}</Text>
                  <Text style={{ fontSize: 13, color: colors.muted }}>
                    {g.colour === 'red' ? 'Red' : 'White'} · {g.traits.slice(0, 2).join(', ')}
                  </Text>
                </View>
                {!g.verified ? <Text style={{ fontSize: 11, color: colors.muted }}>draft</Text> : null}
              </Pressable>
            </Link>
          );
        })}
      </View>
    </Screen>
  );
}
