// Building blocks for the one-screen tasting note, following the Tasting screen draft:
// segmented wine type, SAT scale grids, colour glasses, toggle pills and picture aroma tiles.
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '../Text';
import Svg, { Path } from 'react-native-svg';
import type { Aroma, AromaLevel } from '../../../core/src/content.ts';
import type { WineType } from '../../../core/src/sat.ts';
import { AromaIcon } from '../AromaIcon';
import { colors, fonts } from '../theme';

export const mono = fonts.mono;

export function SectionTitle({ children }: { children: ReactNode }) {
  return <Text style={s.sectionTitle}>{children}</Text>;
}

export function Panel({ children, gap = 16 }: { children: ReactNode; gap?: number }) {
  return <View style={[s.panel, { gap }]}>{children}</View>;
}

/** White / Rosé / Red on a grey track. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <View style={s.segTrack} accessibilityRole="radiogroup" accessibilityLabel={label}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <Pressable
            key={o.value}
            accessibilityRole="radio"
            accessibilityState={{ selected: on }}
            onPress={() => onChange(o.value)}
            style={[s.segItem, on && s.segItemOn]}
          >
            <Text style={[s.segText, on && s.segTextOn]}>{o.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/**
 * One SAT scale as a grid of equal buttons. Tapping the selected option clears it.
 * `columns` wraps long scales (quality) onto several rows. `hints` adds a small
 * second line under each option (alcohol % brackets).
 */
export function ScaleGrid({
  label,
  options,
  value,
  onChange,
  columns,
  fontSize = 12,
  hints,
}: {
  label: string;
  options: readonly string[];
  value: number | null;
  onChange: (v: number | null) => void;
  columns?: number;
  fontSize?: number;
  hints?: readonly string[];
}) {
  const n = columns ?? options.length;
  return (
    <View style={{ gap: 6 }} accessibilityRole="radiogroup" accessibilityLabel={label}>
      <Text style={s.fieldLabel}>{label}</Text>
      <View style={s.grid}>
        {options.map((o, i) => {
          const on = value === i;
          return (
            <View key={o} style={[s.cell, { width: `${100 / n}%` as const }]}>
              <Pressable
                accessibilityRole="radio"
                accessibilityState={{ selected: on }}
                accessibilityLabel={`${label}: ${o}${hints?.[i] ? `, ${hints[i]}` : ''}`}
                onPress={() => onChange(on ? null : i)}
                style={[s.scaleBtn, on ? s.on : s.off]}
              >
                <Text numberOfLines={2} style={[s.scaleText, { fontSize }, on && s.onText]}>
                  {o}
                </Text>
                {hints?.[i] ? <Text style={[s.scaleHint, on && s.onHint]}>{hints[i]}</Text> : null}
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}

/** A vertical list of long options (readiness for drinking). */
export function OptionList({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: number | null;
  onChange: (v: number | null) => void;
}) {
  return (
    <View style={{ gap: 6 }} accessibilityRole="radiogroup" accessibilityLabel={label}>
      <Text style={s.fieldLabel}>{label}</Text>
      {options.map((o, i) => {
        const on = value === i;
        return (
          <Pressable
            key={o}
            accessibilityRole="radio"
            accessibilityState={{ selected: on }}
            onPress={() => onChange(on ? null : i)}
            style={[s.listBtn, on ? s.on : s.off]}
          >
            <Text style={[s.listText, on && s.onText]}>{o}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function Pill({ label, on, onPress, small }: { label: string; on: boolean; onPress: () => void; small?: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: on }}
      onPress={onPress}
      style={[s.pill, small && { height: 34 }, on ? s.on : s.off]}
    >
      <Text style={[s.pillText, on && s.onText]}>{label}</Text>
    </Pressable>
  );
}

// Glass fills per colour at pale / medium / deep intensity.
const GLASS: Record<string, readonly [string, string, string]> = {
  'lemon-green': ['#F4F6C8', '#E9EE9E', '#D9E070'],
  lemon: ['#FAF3C0', '#F5E57E', '#EED44A'],
  gold: ['#F5DE96', '#E8C35A', '#D9A62E'],
  amber: ['#E8B460', '#D48F2E', '#B8721A'],
  pink: ['#F7C7CF', '#F09AAA', '#E06C83'],
  salmon: ['#F8C9B2', '#F2A88A', '#E48862'],
  orange: ['#F6C98E', '#EDAA5E', '#DD8A3A'],
  purple: ['#8E4A86', '#6A2160', '#4A0F42'],
  ruby: ['#B33A4E', '#8E1B33', '#6B0D22'],
  garnet: ['#A8473E', '#85302A', '#64201C'],
  tawny: ['#B9744A', '#9C5A34', '#7C4524'],
};
const BROWN: Record<WineType, readonly [string, string, string]> = {
  white: ['#B88A4E', '#9A6A30', '#7A4E1E'],
  rose: ['#B88A4E', '#9A6A30', '#7A4E1E'],
  red: ['#93633D', '#74482A', '#563419'],
};

export function glassFill(colour: string, wineType: WineType, intensity: number | null): string {
  const set = colour === 'brown' ? BROWN[wineType] : GLASS[colour];
  return set ? set[intensity ?? 1]! : '#DAD9D3';
}

export function Glass({ fill, size = 36 }: { fill: string; size?: number }) {
  return (
    <Svg width={size} height={(size * 46) / 36} viewBox="0 0 44 56">
      <Path d="M10.6 16 H33.4 C33 26 29.5 32 22 33.5 C14.5 32 11 26 10.6 16 Z" fill={fill} />
      <Path d="M10 6 H34 C35 22 31 32 22 34 C13 32 9 22 10 6 Z" fill="none" stroke="#A9A7AE" strokeWidth={1.5} />
      <Path d="M22 34 V48 M14 50 H30" fill="none" stroke="#A9A7AE" strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

/** Colour choices drawn as glasses, filled to match the chosen intensity. */
export function ColourGlasses({
  colours,
  wineType,
  intensity,
  value,
  onChange,
}: {
  colours: readonly string[];
  wineType: WineType;
  intensity: number | null;
  value: string | null;
  onChange: (c: string | null) => void;
}) {
  return (
    <View style={{ gap: 6 }} accessibilityRole="radiogroup" accessibilityLabel="Colour">
      <Text style={s.fieldLabel}>Colour</Text>
      <View style={s.grid}>
        {colours.map((c) => {
          const on = value === c;
          return (
            <View key={c} style={[s.cell, { width: '20%' }]}>
              <Pressable
                accessibilityRole="radio"
                accessibilityState={{ selected: on }}
                accessibilityLabel={c}
                onPress={() => onChange(on ? null : c)}
                style={[s.tile, { paddingVertical: 6 }, on ? s.tileOn : s.tileOff]}
              >
                <Glass fill={glassFill(c, wineType, intensity)} />
                <Text style={[s.tileText, on && { fontWeight: '600' }]}>{capitalise(c)}</Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const LEVELS: readonly { level: AromaLevel; title: string; sub: string }[] = [
  { level: 'primary', title: 'Primary', sub: 'fruit and floral' },
  { level: 'secondary', title: 'Secondary', sub: 'winemaking' },
  { level: 'tertiary', title: 'Tertiary', sub: 'maturation' },
];
const TAG = { white: 'WHITE', red: 'RED', both: 'WHITE + RED' } as const;

/** Removable chips for the aromas already picked. */
export function PickedAromas({ ids, aromaById, onRemove }: { ids: readonly string[]; aromaById: ReadonlyMap<string, Aroma>; onRemove: (id: string) => void }) {
  if (!ids.length) return null;
  return (
    <View style={s.wrapRow}>
      {ids.map((id) => {
        const a = aromaById.get(id);
        if (!a) return null;
        return (
          <Pressable key={id} accessibilityRole="button" accessibilityLabel={`Remove ${a.label}`} onPress={() => onRemove(id)} style={s.picked}>
            <AromaIcon shape={a.icon.shape} c1={a.icon.c1} c2={a.icon.c2} size={28} />
            <Text style={s.pickedText}>{a.label} ×</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/**
 * The aroma lexicon as picture tiles, grouped Primary / Secondary / Tertiary and by
 * cluster. Only clusters that apply to this wine's colour show unless `showAll`.
 */
export function AromaPicker({
  aromas,
  wineType,
  showAll,
  selected,
  onToggle,
}: {
  aromas: readonly Aroma[];
  wineType: WineType;
  showAll: boolean;
  selected: readonly string[];
  onToggle: (id: string) => void;
}) {
  const colourKey = wineType === 'white' ? 'white' : 'red';
  const chosen = new Set(selected);
  return (
    <>
      {LEVELS.map((lv) => {
        const clusters = new Map<string, Aroma[]>();
        for (const a of aromas) {
          if (a.level !== lv.level) continue;
          if (!showAll && a.appliesTo !== 'both' && a.appliesTo !== colourKey) continue;
          clusters.set(a.cluster, [...(clusters.get(a.cluster) ?? []), a]);
        }
        if (!clusters.size) return null;
        return (
          <View key={lv.level} style={{ gap: 10 }}>
            <View style={s.levelHead}>
              <Text style={s.levelTitle}>{lv.title}</Text>
              <Text style={s.levelSub}>{lv.sub}</Text>
            </View>
            {[...clusters.entries()].map(([name, list]) => (
              <View key={name} style={s.cluster}>
                <View style={s.clusterHead}>
                  <Text style={s.clusterName}>{name}</Text>
                  <Text style={s.clusterTag}>{TAG[list[0]!.appliesTo]}</Text>
                </View>
                <View style={s.grid}>
                  {list.map((a) => {
                    const on = chosen.has(a.id);
                    return (
                      <View key={a.id} style={[s.cell, { width: '25%' }]}>
                        <Pressable
                          accessibilityRole="button"
                          accessibilityState={{ selected: on }}
                          accessibilityLabel={a.label}
                          onPress={() => onToggle(a.id)}
                          style={[s.tile, s.aromaTile, on ? s.tileOn : s.tileOff]}
                        >
                          <AromaIcon shape={a.icon.shape} c1={a.icon.c1} c2={a.icon.c2} size={38} />
                          <Text style={[s.tileText, on && { fontWeight: '600' }]}>{a.label}</Text>
                        </Pressable>
                      </View>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>
        );
      })}
    </>
  );
}

function capitalise(t: string): string {
  return t.charAt(0).toUpperCase() + t.slice(1);
}

const s = StyleSheet.create({
  sectionTitle: { marginHorizontal: 4, fontFamily: fonts.display, fontSize: 24, color: colors.ink, letterSpacing: -0.2 },
  panel: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: 18, padding: 16 },
  fieldLabel: { fontSize: 14, fontWeight: '600', color: colors.ink },

  segTrack: { flexDirection: 'row', backgroundColor: colors.track, borderRadius: 10, padding: 3, gap: 3 },
  segItem: { flex: 1, height: 40, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  segItemOn: { backgroundColor: colors.surface, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 2, shadowOffset: { width: 0, height: 1 } },
  segText: { fontSize: 14, fontWeight: '600', color: colors.muted },
  segTextOn: { color: colors.wine },

  // Grids use percentage cells with 2px padding each side, giving a 4px gap.
  grid: { flexDirection: 'row', flexWrap: 'wrap', margin: -2 },
  cell: { padding: 2 },
  scaleBtn: { minHeight: 44, borderRadius: 10, borderWidth: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 2, paddingVertical: 4 },
  scaleText: { color: colors.ink, textAlign: 'center', lineHeight: 15 },
  on: { backgroundColor: colors.wine, borderColor: colors.wine },
  off: { backgroundColor: colors.surface, borderColor: colors.line },
  onText: { color: '#FFFFFF', fontWeight: '600' },
  scaleHint: { fontSize: 11, lineHeight: 14, color: colors.muted, textAlign: 'center' },
  onHint: { color: '#F3E6EA' },

  listBtn: { minHeight: 44, borderRadius: 10, borderWidth: 1, justifyContent: 'center', paddingHorizontal: 14, paddingVertical: 8 },
  listText: { fontSize: 13, color: colors.ink },

  pill: { height: 36, paddingHorizontal: 12, borderRadius: 999, borderWidth: 1, justifyContent: 'center' },
  pillText: { fontSize: 13, color: colors.ink },
  wrapRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },

  tile: { borderRadius: 12, borderWidth: 2, alignItems: 'center', gap: 2 },
  tileOn: { borderColor: colors.wine, backgroundColor: colors.wineTint },
  tileOff: { borderColor: 'transparent', backgroundColor: colors.paper },
  aromaTile: { minHeight: 88, paddingTop: 8, paddingBottom: 6, paddingHorizontal: 2, gap: 4 },
  tileText: { fontSize: 11, lineHeight: 13, textAlign: 'center', color: colors.ink, fontWeight: '500' },

  picked: {
    height: 38,
    paddingLeft: 4,
    paddingRight: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.wine,
    backgroundColor: colors.wineTint,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pickedText: { fontSize: 13, fontWeight: '600', color: colors.wine },

  levelHead: { flexDirection: 'row', alignItems: 'baseline', gap: 8, paddingTop: 6, paddingHorizontal: 4 },
  levelTitle: { fontSize: 17, fontWeight: '600', color: colors.ink },
  levelSub: { fontSize: 13, color: colors.muted },
  cluster: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: 16, paddingVertical: 14, paddingHorizontal: 12, gap: 10 },
  clusterHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 2 },
  clusterName: { fontSize: 15, fontWeight: '600', color: colors.ink, flexShrink: 1 },
  clusterTag: { fontFamily: mono, fontSize: 10, letterSpacing: 0.6, color: colors.muted },
});
