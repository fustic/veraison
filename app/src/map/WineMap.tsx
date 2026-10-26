// Native map (iOS, Android): MapLibre Native through @maplibre/maplibre-react-native.
// The web build uses WineMap.web.tsx instead; both take the same props (layers.ts).
import { Camera, GeoJSONSource, Layer, Map, Marker, type CameraRef, type StyleSpecification } from '@maplibre/maplibre-react-native';
import { useImperativeHandle, useMemo, useRef } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import type { Bounds } from '../../../core/src/mapnav.ts';
import { Text } from '../Text';
import { colors } from '../theme';
import {
  countryFillPaint,
  countryLinePaint,
  REGION_MINZOOM,
  regionFillPaint,
  regionLinePaint,
  type CountryProps,
  type RegionProps,
  type WineMapProps,
} from './layers';

export function WineMap(props: WineMapProps) {
  const camera = useRef<CameraRef>(null);
  // Press handlers read the latest props through a ref, so the sources can stay memoised.
  const latest = useRef(props);
  latest.current = props;

  // Camera commands sent before the map has loaded are dropped by the native view (opening the
  // map from a region page does exactly that), so keep the latest one and run it on load.
  const ready = useRef(false);
  const pending = useRef<(() => void) | null>(null);
  const run = (cmd: () => void) => {
    if (ready.current) cmd();
    else pending.current = cmd;
  };
  const onReady = () => {
    ready.current = true;
    pending.current?.();
    pending.current = null;
  };

  useImperativeHandle(props.ref, () => ({
    fitBounds: (bounds, padding, duration) => run(() => camera.current?.fitBounds(bounds, { padding, duration })),
    flyTo: (c, duration) => run(() => camera.current?.flyTo({ center: c.center, zoom: c.zoom, duration })),
  }), []);

  // Sources are memoised: the countries file is large, and re-rendering a source
  // re-sends its whole GeoJSON to the native map.
  const countrySource = useMemo(
    () => (
      <GeoJSONSource
        id="countries"
        data={props.countries as never}
        onPress={(e) => latest.current.onCountryPress((e.nativeEvent.features as unknown as { properties: CountryProps }[]).map((f) => f.properties))}
      >
        <Layer id="country-fill" type="fill" paint={countryFillPaint(props.online) as never} />
        <Layer id="country-line" type="line" paint={countryLinePaint(props.online) as never} />
      </GeoJSONSource>
    ),
    [props.countries, props.online],
  );

  const regionSource = useMemo(
    () => (
      <GeoJSONSource
        id="regions"
        data={props.regions as never}
        onPress={(e) => latest.current.onRegionPress((e.nativeEvent.features as unknown as { properties: RegionProps }[]).map((f) => f.properties))}
      >
        <Layer id="region-fill" type="fill" minzoom={REGION_MINZOOM} paint={regionFillPaint(props.regionFill) as never} />
        <Layer id="region-line" type="line" minzoom={REGION_MINZOOM} paint={regionLinePaint as never} />
      </GeoJSONSource>
    ),
    [props.regions, props.regionFill],
  );

  return (
    <Map
      style={StyleSheet.absoluteFill}
      mapStyle={props.mapStyle as StyleSpecification | string}
      logo={false}
      attribution
      compass={false}
      onDidFailLoadingMap={() => latest.current.onLoadError()}
      onDidFinishLoadingMap={onReady}
      onRegionDidChange={(e) => latest.current.onViewChange?.(e.nativeEvent.bounds as Bounds, e.nativeEvent.zoom)}
      onDidFinishLoadingStyle={onReady}
    >
      <Camera ref={camera} initialViewState={props.initialCamera} />
      {countrySource}
      {regionSource}
      {props.labels.map((l) => (
        <Marker key={l.id} lngLat={l.lngLat} anchor="center">
          <Pressable accessibilityRole="button" onPress={() => latest.current.onLabelPress(l.id)} style={[styles.label, l.on && styles.labelOn]}>
            <Text style={[styles.labelText, l.on && { color: '#FFFFFF' }]}>{l.name}</Text>
          </Pressable>
        </Marker>
      ))}
    </Map>
  );
}

const styles = StyleSheet.create({
  label: { paddingHorizontal: 7, paddingVertical: 3, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.92)', borderWidth: 1, borderColor: colors.line },
  labelOn: { backgroundColor: colors.wine, borderColor: colors.wine },
  labelText: { fontSize: 11, fontWeight: '600', color: colors.ink },
});
