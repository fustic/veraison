// A study topic: summary, then each section's key points, cause chains and links to the
// grapes and regions it mentions, with your progress at the end.
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { setCheckedAgainstBook, setStudyStatus, type StudyStatus } from '../../../../core/src/userdb/progress.ts';
import { Box, CauseCard, H1, H2, Kicker } from '../../components';
import { useData, useMarkSeen } from '../../data/DataProvider';
import { prettyId } from '../../names';
import { Pill } from '../../tasting/parts';
import { Text } from '../../Text';
import { colors } from '../../theme';

export default function TopicScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { content, statuses, db, deps, refreshStatuses } = useData();
  const topic = id ? content.topicById.get(id) : undefined;
  useMarkSeen(topic?.id);

  if (!topic) {
    return (
      <View style={[styles.screen, styles.content]}>
        <H1>Not found</H1>
        <Text style={styles.muted}>{id} is not in the study content yet.</Text>
      </View>
    );
  }

  const status = statuses.get(topic.id);
  const update = async (fn: () => Promise<void>) => {
    await fn();
    await refreshStatuses();
  };

  const linkName = (l: string) => content.grapeById.get(l)?.name ?? content.regionById.get(l)?.name ?? content.topicById.get(l)?.title ?? prettyId(l);
  const open = (l: string) => {
    if (content.grapeById.has(l)) router.push({ pathname: '/grape/[id]', params: { id: l } });
    else if (content.regionById.has(l)) router.push({ pathname: '/region/[id]', params: { id: l } });
    else if (content.topicById.has(l)) router.push({ pathname: '/topic/[id]', params: { id: l } });
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: '' }} />
      <View style={{ gap: 6, paddingHorizontal: 4 }}>
        <Kicker>{topic.chapter.toUpperCase()}</Kicker>
        <H1 size={32}>{topic.title}</H1>
        <Text style={styles.summary}>{topic.summary}</Text>
      </View>

      {topic.sections.map((sec) => (
        <Box key={sec.heading} gap={10} pad={18}>
          <H2>{sec.heading}</H2>
          {sec.points.map((p) => (
            <View key={p} style={styles.point}>
              <View style={styles.bullet} />
              <Text style={styles.body}>{p}</Text>
            </View>
          ))}
          {sec.causes?.length ? (
            <View style={{ gap: 8, paddingTop: 4 }}>
              <Kicker color={colors.wine}>WHY IT MATTERS</Kicker>
              {sec.causes.map((c) => (
                <CauseCard key={c.factor} {...c} tint />
              ))}
            </View>
          ) : null}
          {sec.links?.length ? (
            <View style={styles.wrap}>
              {sec.links.map((l) => {
                const known = content.grapeById.has(l) || content.regionById.has(l) || content.topicById.has(l);
                return (
                  <Pressable key={l} disabled={!known} accessibilityRole={known ? 'link' : undefined} onPress={() => open(l)} style={[styles.link, !known && { opacity: 0.55 }]}>
                    <Text style={styles.linkText}>
                      {linkName(l)}
                      {known ? ' →' : ' · soon'}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ) : null}
        </Box>
      ))}

      <View style={styles.progress}>
        <Kicker color={colors.wine}>YOUR PROGRESS</Kicker>
        <View style={styles.wrap}>
          {(['seen', 'studied', 'mastered'] as StudyStatus[]).map((s) => (
            <Pill key={s} small label={s.charAt(0).toUpperCase() + s.slice(1)} on={status?.status === s} onPress={() => update(() => setStudyStatus(db, topic.id, s, deps))} />
          ))}
        </View>
        <View style={styles.wrap}>
          <Pill
            small
            label={status?.checkedAgainstBook ? '✓ Checked against my book' : 'Checked against my book'}
            on={!!status?.checkedAgainstBook}
            onPress={() => update(() => setCheckedAgainstBook(db, topic.id, !status?.checkedAgainstBook, deps))}
          />
        </View>
        {!topic.verified ? <Text style={styles.muted}>Draft from your notes. Fix anything that differs from your book in content/topics.</Text> : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { padding: 16, paddingBottom: 40, gap: 14 },
  muted: { fontSize: 13, lineHeight: 18, color: colors.muted },
  summary: { fontSize: 15, lineHeight: 22, color: colors.ink },
  body: { flex: 1, fontSize: 14, lineHeight: 21, color: colors.ink },
  point: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.wine, marginTop: 8 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  link: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 999, backgroundColor: colors.wineTint },
  linkText: { fontSize: 13, fontWeight: '600', color: colors.wine },
  progress: { borderRadius: 18, backgroundColor: colors.wineTint, padding: 16, gap: 10 },
});
