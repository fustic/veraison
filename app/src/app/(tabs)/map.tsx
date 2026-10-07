// Milestone 1 map test. Renders the region polygons from the bundled GeoJSON on a
// style with no network sources, so it must work in airplane mode. The "Online"
// switch swaps in the OpenFreeMap street basemap to compare.
//
// Written against the @maplibre/maplibre-react-native v10 API. If `npx expo install`
// brings a newer major version, check its migration guide for renamed components.
import MapLibreGL from '@maplibre/maplibre-react-native';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import regionsGeoJson from '../../generated/regions.geojson.json';
import { useData } from '../../data/DataProvider';
import { colors, statusColors } from '../../theme';
import { Button, Chip } from '../../ui';

const OFFLINE_STYLE = {
  version: 8,
  name: 'veraison-offline',
  sources: {},
  layers: [{ id: 'background', type: 'background', paint: { 'background-color': colors.land } }],
};
const ONLINE_STYLE = 'https://tiles.openfreemap.org/styles/liberty';

const BORDEAUX: [number, number] = [-0.45, 44.95];

type Feature = { properties: { id: string; name: string; level: string } };

export default function MapScreen() {
  const { content, statuses, seen } = useData();
  const [online, setOnline] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  // Attach each region's study status so the layer can colour it.
  const shape = useMemo(() => {
    const fc = regionsGeoJson as unknown as { type: 'FeatureCollection'; features: (Feature & Record<string, unknown>)[] };
    return {
      ...fc,
      features: fc.features.map((f) => ({
        ...f,
        properties: { ...f.properties, status: statuses.get(f.properties.id)?.status ?? 'unseen' },
      })),
    };
  }, [statuses]);

  const region = selected ? content.regionById.get(selected) : undefined;

  return (
    <View style={{ flex: 1, backgroundColor: colors.land }}>
      <MapLibreGL.MapView style={{ flex: 1 }} mapStyle={online ? ONLINE_STYLE : JSON.stringify(OFFLINE_STYLE)} logoEnabled={false} attributionEnabled>
        <MapLibreGL.Camera defaultSettings={{ centerCoordinate: BORDEAUX, zoomLevel: 7.6 }} />
        <MapLibreGL.ShapeSource
          id="regions"
          shape={shape as never}
          onPress={(e) => {
            // Smallest polygon first: an appellation sits on top of its district.
            const hit = (e.features as unknown as Feature[]).sort((a, b) => rank(b.properties.level) - rank(a.properties.level))[0];
            if (hit) {
              setSelected(hit.properties.id);
              void seen(hit.properties.id);
            }
          }}
        >
          <MapLibreGL.FillLayer
            id="region-fill"
            style={{
              fillColor: ['match', ['get', 'status'], 'mastered', statusColors.mastered, 'studied', statusColors.studied, 'seen', statusColors.seen, statusColors.unseen],
              fillOpacity: ['match', ['get', 'level'], 'region', 0.15, 'district', 0.35, 0.75],
            }}
          />
          <MapLibreGL.LineLayer id="region-line" style={{ lineColor: colors.wine, lineWidth: 1, lineOpacity: 0.6 }} />
        </MapLibreGL.ShapeSource>
      </MapLibreGL.MapView>

      <SafeAreaView edges={['top']} style={StyleSheet.absoluteFill} pointerEvents="box-none">
        <View style={styles.toolbar} pointerEvents="box-none">
          <Text style={styles.toolbarTitle}>Map test · placeholder shapes</Text>
          <Chip label={online ? 'Online basemap' : 'Offline'} on={online} onPress={() => setOnline((v) => !v)} />
        </View>
      </SafeAreaView>

      {region ? (
        <View style={styles.sheet}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Text style={styles.sheetTitle}>{region.name}</Text>
            <Pressable accessibilityRole="button" onPress={() => setSelected(null)}>
              <Text style={{ color: colors.wine, fontWeight: '600' }}>Close</Text>
            </Pressable>
          </View>
          {region.climate ? (
            <Text style={styles.sheetMeta}>
              {region.climate.type} {region.climate.influence}
            </Text>
          ) : null}
          {region.why.slice(0, 2).map((w) => (
            <Text key={w.factor} style={styles.why}>
              <Text style={{ fontWeight: '700' }}>{w.factor}</Text> → {w.effect}
              {w.result ? ` → ${w.result}` : ''}
            </Text>
          ))}
          {region.principalGrapes.length ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              {region.principalGrapes.map((g) => {
                const grape = content.grapeById.get(g);
                return grape ? (
                  <Chip key={g} label={grape.name} onPress={() => router.push({ pathname: '/grape/[id]', params: { id: g } })} />
                ) : null;
              })}
            </View>
          ) : null}
          {region.producers.length ? <Text style={styles.sheetMeta}>Iconic: {region.producers.join(', ')}</Text> : null}
          <Button title="Done" kind="secondary" onPress={() => setSelected(null)} />
        </View>
      ) : null}
    </View>
  );
}

function rank(level: string): number {
  return { country: 0, region: 1, district: 2, appellation: 3 }[level] ?? 0;
}

const styles = StyleSheet.create({
  toolbar: {
    margin: 16,
    padding: 10,
    paddingLeft: 14,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toolbarTitle: { fontSize: 14, fontWeight: '600', color: colors.ink },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderTopWidth: 1,
    borderColor: colors.line,
    padding: 16,
    gap: 10,
  },
  sheetTitle: { fontSize: 24, fontWeight: '700', color: colors.ink },
  sheetMeta: { fontSize: 14, color: colors.muted },
  why: { fontSize: 14, lineHeight: 20, color: colors.ink, backgroundColor: colors.wineTint, padding: 10, borderRadius: 12, overflow: 'hidden' },
});
