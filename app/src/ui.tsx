// Small building blocks shared by the screens. Styling follows the screen drafts.
import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import { Text } from './Text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius, space } from './theme';

export function Screen({ children, scroll = true }: { children: ReactNode; scroll?: boolean }) {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      {scroll ? <ScrollView contentContainerStyle={styles.content}>{children}</ScrollView> : children}
    </SafeAreaView>
  );
}

export function Title({ children }: { children: ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

export function Heading({ children }: { children: ReactNode }) {
  return <Text style={styles.heading}>{children}</Text>;
}

export function Muted({ children }: { children: ReactNode }) {
  return <Text style={styles.muted}>{children}</Text>;
}

export function Label({ children }: { children: ReactNode }) {
  return <Text style={styles.label}>{children}</Text>;
}

export function Card({ children, tint, style }: { children: ReactNode; tint?: boolean; style?: ViewStyle }) {
  return <View style={[styles.card, tint && styles.cardTint, style]}>{children}</View>;
}

export function Button({ title, onPress, kind = 'primary' }: { title: string; onPress: () => void; kind?: 'primary' | 'secondary' }) {
  const primary = kind === 'primary';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.button, primary ? styles.buttonPrimary : styles.buttonSecondary, pressed && { opacity: 0.85 }]}
    >
      <Text style={[styles.buttonText, { color: primary ? '#FFFFFF' : colors.ink }]}>{title}</Text>
    </Pressable>
  );
}

/** One row of SAT options, e.g. Low · Med− · Med · Med+ · High. */
export function ScalePicker({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: number | null;
  onChange: (index: number | null) => void;
}) {
  return (
    <View style={{ gap: space(1.5) }} accessibilityRole="radiogroup" accessibilityLabel={label}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={{ flexDirection: 'row', gap: space(1) }}>
        {options.map((o, i) => {
          const on = value === i;
          return (
            <Pressable
              key={o}
              accessibilityRole="radio"
              accessibilityState={{ selected: on }}
              onPress={() => onChange(on ? null : i)}
              style={[styles.option, on && styles.optionOn]}
            >
              <Text numberOfLines={2} style={[styles.optionText, on && styles.optionTextOn]}>
                {o}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export function Chip({ label, on, onPress }: { label: string; on?: boolean; onPress?: () => void }) {
  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityState={onPress ? { selected: !!on } : undefined}
      onPress={onPress}
      style={[styles.chip, on && styles.optionOn]}
    >
      <Text style={[styles.chipText, on && styles.optionTextOn]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { padding: space(4), gap: space(3.5), paddingBottom: space(10) },
  title: { fontFamily: fonts.display, fontSize: 32, lineHeight: 36, color: colors.ink, letterSpacing: -0.3 },
  heading: { fontSize: 17, fontWeight: '600', color: colors.ink },
  muted: { fontSize: 14, color: colors.muted, lineHeight: 20 },
  label: { fontFamily: fonts.mono, fontSize: 11, letterSpacing: 0.9, color: colors.muted, textTransform: 'uppercase' },
  card: { backgroundColor: colors.surface, borderColor: colors.line, borderWidth: 1, borderRadius: radius.lg, padding: space(4), gap: space(2.5) },
  cardTint: { backgroundColor: colors.wineTint, borderColor: colors.wineTint },
  button: { minHeight: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: space(4) },
  buttonPrimary: { backgroundColor: colors.wine },
  buttonSecondary: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line },
  buttonText: { fontSize: 16, fontWeight: '600' },
  fieldLabel: { fontSize: 14, fontWeight: '600', color: colors.ink },
  option: {
    flex: 1,
    minHeight: 44,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  optionOn: { backgroundColor: colors.wine, borderColor: colors.wine },
  optionText: { fontSize: 12, color: colors.ink, textAlign: 'center' },
  optionTextOn: { color: '#FFFFFF', fontWeight: '600' },
  chip: { minHeight: 36, paddingHorizontal: space(3), borderRadius: 999, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, justifyContent: 'center' },
  chipText: { fontSize: 13, color: colors.ink },
});
