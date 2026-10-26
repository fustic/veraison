// A small still map at the top of a region page: the region filled in wine, the areas
// inside it in rose, neighbouring outlines in grey, and (for anything smaller than a
// country) a corner inset showing where in the country it is. Drawn with SVG from the
// same outlines as the live map, so it works offline and on the web. Tap to open the map.
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import type { Region } from '../../../core/src/content.ts';
import { indexShapes, regionPicture, type ShapeIndex } from '../../../core/src/mappicture.ts';
import { useData } from '../data/DataProvider';
import countriesGeoJson from '../generated/countries.geojson.json';
import regionsGeoJson from '../generated/regions.geojson.json';
import { Text } from '../Text';
import { colors, fonts } from '../theme';
import { WATER } from './layers';

let index: ShapeIndex | null = null;
const shapes = () => (index ??= indexShapes(regionsGeoJson as never, countriesGeoJson as never));

const HEIGHT = 190;

export function RegionMap({ region, onPress }: { region: Region; onPress?: () => void }) {
  const { content } = useData();
  const [width, setWidth] = useState(0);
  const picture = useMemo(() => (width ? regionPicture(shapes(), region, content.childrenOf, width, HEIGHT) : null), [width, region, content]);
  const inset = picture?.inset;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Show ${region.name} on the map`}
      disabled={!onPress}
      onPress={onPress}
      onLayout={(e) => setWidth(Math.round(e.nativeEvent.layout.width))}
      style={({ pressed }) => [styles.frame, pressed && { opacity: 0.85 }]}
    >
      {picture ? (
        <Svg width={width} height={HEIGHT} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <Rect x={0} y={0} width={width} height={HEIGHT} fill={picture.sea ? WATER : colors.land} />
          {picture.land.map((c, i) => (
            <Path key={`land-${c.id}-${i}`} d={c.d} fill={colors.land} stroke="#FFFFFF" strokeWidth={1} fillRule="evenodd" />
          ))}
          {picture.context.map((s) => (
            <Path key={s.id} d={s.d} fill="none" stroke={colors.muted} strokeOpacity={0.35} strokeWidth={0.75} />
          ))}
          {picture.focus.map((s, i) => (
            <Path key={`focus-${s.id}-${i}`} d={s.d} fill={colors.wine} fillOpacity={0.22} fillRule="evenodd" stroke={colors.wine} strokeWidth={1.75} strokeDasharray={s.rough ? '5 3' : undefined} />
          ))}
          {picture.inside.map((s) => (
            <Path key={s.id} d={s.d} fill={colors.rose} fillOpacity={0.16} fillRule="evenodd" stroke={colors.rose} strokeWidth={0.9} strokeDasharray={s.rough ? '4 3' : undefined} />
          ))}
        </Svg>
      ) : null}
      {inset ? (
        <View style={[styles.inset, { width: inset.size, height: inset.size }]}>
          <Svg width={inset.size} height={inset.size}>
            {inset.land.map((c, i) => (
              <Path key={`inset-${i}`} d={c.d} fill={colors.land} stroke={colors.muted} strokeOpacity={0.5} strokeWidth={0.75} fillRule="evenodd" />
            ))}
            {inset.box[2] < 6 && inset.box[3] < 6 ? (
              <Circle cx={inset.box[0] + inset.box[2] / 2} cy={inset.box[1] + inset.box[3] / 2} r={3.5} fill={colors.wine} />
            ) : (
              <Rect x={inset.box[0]} y={inset.box[1]} width={inset.box[2]} height={inset.box[3]} fill={colors.wine} fillOpacity={0.15} stroke={colors.wine} strokeWidth={1.25} />
            )}
          </Svg>
        </View>
      ) : null}
      {onPress ? (
        <View style={styles.open}>
          <Text style={styles.openText}>MAP ›</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  frame: { height: HEIGHT, borderRadius: 18, overflow: 'hidden', backgroundColor: WATER, borderWidth: 1, borderColor: colors.line },
  inset: { position: 'absolute', top: 10, right: 10, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.85)', borderWidth: 1, borderColor: colors.line, overflow: 'hidden', pointerEvents: 'none' },
  open: { position: 'absolute', right: 10, bottom: 10, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, pointerEvents: 'none' },
  openText: { fontFamily: fonts.mono, fontSize: 11, letterSpacing: 0.8, color: colors.wine },
});
