// Pieces shared by the grape, compare, region and reveal screens, following the drafts.
import type { ReactNode } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import type { Aroma } from '../../core/src/content.ts';
import { photoUri, type NotePhoto } from '../../core/src/userdb/photos.ts';
import { AromaIcon } from './AromaIcon';
import { Text } from './Text';
import { colors, fonts } from './theme';

/** Small mono caps label, e.g. WHY IT WORKS. */
export function Kicker({ children, color = colors.muted }: { children: ReactNode; color?: string }) {
  return <Text style={[s.kicker, { color }]}>{children}</Text>;
}

export function H1({ children, size = 28 }: { children: ReactNode; size?: number }) {
  return <Text style={[s.h1, { fontSize: size, lineHeight: size * 1.1 }]}>{children}</Text>;
}

export function H2({ children, color = colors.ink }: { children: ReactNode; color?: string }) {
  return <Text style={[s.h2, { color }]}>{children}</Text>;
}

export function Box({ children, gap = 12, pad = 16, style }: { children: ReactNode; gap?: number; pad?: number; style?: object }) {
  return <View style={[s.box, { gap, padding: pad }, style]}>{children}</View>;
}

/** A link-styled text button (Map →, Compare →). */
export function LinkText({ label, onPress, size = 14 }: { label: string; onPress: () => void; size?: number }) {
  return (
    <Pressable accessibilityRole="link" onPress={onPress} hitSlop={8} style={{ minHeight: 32, justifyContent: 'center' }}>
      <Text style={{ color: colors.wine, fontWeight: '600', fontSize: size }}>{label}</Text>
    </Pressable>
  );
}

export function Tag({ label, tint }: { label: string; tint?: boolean }) {
  return (
    <View style={[s.tag, tint ? { backgroundColor: colors.wineTint, borderColor: colors.wineTint } : null]}>
      <Text style={[s.tagText, tint ? { color: colors.wine, fontWeight: '600' } : null]}>{label}</Text>
    </View>
  );
}

/** factor → effect → result card. */
export function CauseCard({ factor, effect, result, tint }: { factor: string; effect: string; result?: string; tint?: boolean }) {
  return (
    <View style={[s.cause, tint && { backgroundColor: colors.wineTint, borderColor: colors.wineTint }]}>
      <Text style={s.causeText}>
        <Text style={{ fontWeight: '600' }}>{factor}</Text> → {effect}
        {result ? ` → ${result}` : ''}
      </Text>
    </View>
  );
}

/** Five (or n) little segments, filled up to `value` or across a [lo, hi] range. */
export function StepBar({ steps = 5, lo, hi, height = 10, width, dim }: { steps?: number; lo: number | null; hi?: number | null; height?: number; width?: number; dim?: boolean }) {
  const top = hi ?? lo;
  return (
    <View style={{ flexDirection: 'row', gap: 4, width }}>
      {Array.from({ length: steps }, (_, i) => {
        const on = lo !== null && top !== null && i <= top && (hi === undefined ? true : i >= lo);
        return <View key={i} style={{ flex: 1, height, borderRadius: 3, backgroundColor: on ? (dim ? colors.rose : colors.wine) : colors.track }} />;
      })}
    </View>
  );
}

export type TileMode = 'plain' | 'missed';

/** Picture tiles in a grid (3 columns by default). */
export function AromaTiles({
  aromas,
  columns = 3,
  size = 44,
  mode = 'plain',
  onPress,
}: {
  aromas: readonly Aroma[];
  columns?: number;
  size?: number;
  mode?: TileMode;
  onPress?: (a: Aroma) => void;
}) {
  if (!aromas.length) return null;
  return (
    <View style={s.grid}>
      {aromas.map((a) => (
        <View key={a.id} style={[s.cell, { width: `${100 / columns}%` as const }]}>
          <Pressable
            disabled={!onPress}
            onPress={() => onPress?.(a)}
            accessibilityLabel={a.label}
            style={[s.tile, mode === 'missed' ? s.tileMissed : null]}
          >
            <AromaIcon shape={a.icon.shape} c1={a.icon.c1} c2={a.icon.c2} size={size} />
            <Text style={s.tileText}>{a.label}</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

/** Wine-coloured callout used for "the tell" and tasting patterns. */
export function Callout({ kicker, children }: { kicker: string; children: ReactNode }) {
  return (
    <View style={s.callout}>
      <Text style={[s.kicker, { color: colors.wineTint }]}>{kicker}</Text>
      <Text style={s.calloutText}>{children}</Text>
    </View>
  );
}

export function PrimaryButton({ title, onPress, secondary }: { title: string; onPress: () => void; secondary?: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [s.btn, secondary ? s.btnSecondary : s.btnPrimary, pressed && { opacity: 0.85 }]}
    >
      <Text style={[s.btnText, { color: secondary ? colors.ink : '#FFFFFF' }]}>{title}</Text>
    </Pressable>
  );
}

// Line icons from the drafts (24×24, 1.75 stroke).
type IconProps = { color?: string; size?: number };
const line = (color: string) => ({ stroke: color, strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' }) as const;

export function GlassLine({ color = colors.wine, size = 22 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M7 3h10l-1 7a4 4 0 0 1-8 0z" {...line(color)} />
      <Path d="M12 14v7M8 21h8" {...line(color)} />
    </Svg>
  );
}
export function CompareLine({ color = colors.wine, size = 22 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M8 4v16M16 4v16M4 8h8M12 16h8" {...line(color)} />
    </Svg>
  );
}
export function PinLine({ color = colors.wine, size = 22 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={12} cy={10} r={3} {...line(color)} />
      <Path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" {...line(color)} />
    </Svg>
  );
}
export function NotesLine({ color = colors.wine, size = 22 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x={5} y={3} width={14} height={18} rx={2} {...line(color)} />
      <Path d="M9 8h6M9 12h6M9 16h4" {...line(color)} />
    </Svg>
  );
}
export function ThermoLine({ color = colors.ink, size = 22 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0z" {...line(color)} />
    </Svg>
  );
}
export function GrapeLine({ color = colors.ink, size = 22 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={9} cy={9} r={3} {...line(color)} />
      <Circle cx={15} cy={9} r={3} {...line(color)} />
      <Circle cx={12} cy={14.5} r={3} {...line(color)} />
    </Svg>
  );
}
export function LayersLine({ color = colors.ink, size = 22 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M12 3l9 5-9 5-9-5z" {...line(color)} />
      <Path d="M3 13l9 5 9-5" {...line(color)} />
    </Svg>
  );
}

/** A note's label photo, whole (letterboxed when taller than maxHeight). */
export function LabelPhoto({ photo, maxHeight = 420 }: { photo: NotePhoto; maxHeight?: number }) {
  const ratio = photo.width > 0 && photo.height > 0 ? photo.width / photo.height : 4 / 3;
  return (
    <View style={[s.photoFrame, { maxHeight }]}>
      <Image source={{ uri: photoUri(photo) }} accessibilityLabel="Photo of the label" resizeMode="contain" style={{ width: '100%', aspectRatio: ratio, maxHeight }} />
    </View>
  );
}

const s = StyleSheet.create({
  photoFrame: { borderRadius: 14, overflow: 'hidden', backgroundColor: colors.track, alignItems: 'center' },
  kicker: { fontFamily: fonts.mono, fontSize: 11, letterSpacing: 0.9 },
  h1: { fontFamily: fonts.display, color: colors.ink, letterSpacing: -0.2 },
  h2: { fontSize: 17, fontWeight: '600' },
  box: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: 18 },
  tag: { paddingVertical: 5, paddingHorizontal: 10, borderRadius: 999, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line },
  tagText: { fontSize: 13, color: colors.ink },
  cause: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: 14, paddingVertical: 14, paddingHorizontal: 16 },
  causeText: { fontSize: 14, lineHeight: 20, color: colors.ink },
  grid: { flexDirection: 'row', flexWrap: 'wrap', margin: -4 },
  cell: { padding: 4 },
  tile: { backgroundColor: colors.paper, borderRadius: 14, paddingTop: 12, paddingBottom: 10, paddingHorizontal: 6, alignItems: 'center', gap: 6, borderWidth: 1.5, borderColor: 'transparent' },
  tileMissed: { backgroundColor: colors.surface, borderColor: colors.wine, borderStyle: 'dashed' },
  tileText: { fontSize: 13, lineHeight: 16, fontWeight: '500', color: colors.ink, textAlign: 'center' },
  callout: { borderRadius: 18, backgroundColor: colors.wine, paddingVertical: 16, paddingHorizontal: 18, gap: 8 },
  calloutText: { fontSize: 15, lineHeight: 22, color: '#FFFFFF' },
  btn: { height: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12, flex: 1 },
  btnPrimary: { backgroundColor: colors.wine },
  btnSecondary: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line },
  btnText: { fontSize: 15, fontWeight: '600' },
});
