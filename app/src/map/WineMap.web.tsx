// Web map: MapLibre GL JS in a plain <div>. Same props and layers as the native WineMap.tsx,
// so the map screen itself is shared across platforms.
import 'maplibre-gl/dist/maplibre-gl.css';
import { Map as MLMap, Marker, type GeoJSONSource, type StyleSpecification } from 'maplibre-gl';
import { useEffect, useImperativeHandle, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, fonts } from '../theme';
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

type Paint = Record<string, unknown>;
const LAYERS = ['region-fill', 'country-fill'];

/** Adds our sources and layers; called again after every style (re)load. */
function install(m: MLMap, p: WineMapProps) {
  if (m.getSource('countries')) return;
  m.addSource('countries', { type: 'geojson', data: p.countries as never });
  m.addSource('regions', { type: 'geojson', data: p.regions as never });
  m.addLayer({ id: 'country-fill', type: 'fill', source: 'countries', paint: countryFillPaint(p.online) as never });
  m.addLayer({ id: 'country-line', type: 'line', source: 'countries', paint: countryLinePaint(p.online) as never });
  m.addLayer({ id: 'region-fill', type: 'fill', source: 'regions', minzoom: REGION_MINZOOM, paint: regionFillPaint(p.regionFill) as never });
  m.addLayer({ id: 'region-line', type: 'line', source: 'regions', minzoom: REGION_MINZOOM, paint: regionLinePaint as never });
}

function setPaint(m: MLMap, layer: string, paint: Paint) {
  if (!m.getLayer(layer)) return;
  for (const [k, v] of Object.entries(paint)) m.setPaintProperty(layer, k, v as never);
}

export function WineMap(props: WineMapProps) {
  const div = useRef<HTMLDivElement>(null);
  const map = useRef<MLMap | null>(null);
  const latest = useRef(props);
  latest.current = props;
  const styleReady = useRef(false);
  const firstStyle = useRef(props.mapStyle);

  // Keep the latest camera command until the style has loaded and the container has its size
  // (opening the map from a region page asks to zoom before either has happened).
  const pending = useRef<(() => void) | null>(null);
  const run = (cmd: () => void) => {
    if (styleReady.current) cmd();
    else pending.current = cmd;
  };

  useImperativeHandle(props.ref, () => ({
    fitBounds: (b, padding, duration) => run(() => map.current?.fitBounds([[b[0], b[1]], [b[2], b[3]]], { padding, duration })),
    flyTo: (c, duration) => run(() => map.current?.flyTo({ center: c.center, zoom: c.zoom, duration })),
  }), []);

  // Create the map once.
  useEffect(() => {
    const m = new MLMap({
      container: div.current!,
      style: props.mapStyle as StyleSpecification | string,
      center: props.initialCamera.center,
      zoom: props.initialCamera.zoom,
      attributionControl: { compact: true },
      dragRotate: false,
      pitchWithRotate: false,
    });
    m.touchZoomRotate.disableRotation();
    map.current = m;

    m.on('style.load', () => {
      styleReady.current = true;
      install(m, latest.current);
      m.resize();
      pending.current?.();
      pending.current = null;
    });
    // An error before the style has loaded means the street map is unreachable.
    m.on('error', () => {
      if (!styleReady.current) latest.current.onLoadError();
    });
    // Topmost hit only, as on native: regions sit above countries.
    m.on('click', (e) => {
      const hits = m.queryRenderedFeatures(e.point, { layers: LAYERS.filter((l) => m.getLayer(l)) });
      const regions = hits.filter((f) => f.layer.id === 'region-fill').map((f) => f.properties as RegionProps);
      if (regions.length) return latest.current.onRegionPress(regions);
      const countries = hits.filter((f) => f.layer.id === 'country-fill').map((f) => f.properties as CountryProps);
      if (countries.length) latest.current.onCountryPress(countries);
    });
    const reportView = () => {
      const b = m.getBounds();
      latest.current.onViewChange?.([b.getWest(), b.getSouth(), b.getEast(), b.getNorth()], m.getZoom());
    };
    m.on('moveend', reportView);
    m.once('load', reportView);
    m.on('mousemove', (e) => {
      const n = m.queryRenderedFeatures(e.point, { layers: LAYERS.filter((l) => m.getLayer(l)) }).length;
      m.getCanvas().style.cursor = n ? 'pointer' : '';
    });

    // The container can change size without the window resizing (the sheet, the tab bar).
    const ro = new ResizeObserver(() => m.resize());
    ro.observe(div.current!);
    return () => {
      ro.disconnect();
      m.remove();
      map.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Street map on or off: reload the style; our layers are added back on style.load.
  useEffect(() => {
    const m = map.current;
    if (!m || props.mapStyle === firstStyle.current) return;
    firstStyle.current = props.mapStyle;
    styleReady.current = false;
    m.setStyle(props.mapStyle as StyleSpecification | string, { diff: false });
  }, [props.mapStyle]);

  useEffect(() => {
    (map.current?.getSource('countries') as GeoJSONSource | undefined)?.setData(props.countries as never);
  }, [props.countries]);
  useEffect(() => {
    (map.current?.getSource('regions') as GeoJSONSource | undefined)?.setData(props.regions as never);
  }, [props.regions]);
  useEffect(() => {
    const m = map.current;
    if (!m) return;
    setPaint(m, 'country-fill', countryFillPaint(props.online));
    setPaint(m, 'country-line', countryLinePaint(props.online));
  }, [props.online]);
  useEffect(() => {
    if (map.current) setPaint(map.current, 'region-fill', regionFillPaint(props.regionFill));
  }, [props.regionFill]);

  // Name labels as DOM markers.
  useEffect(() => {
    const m = map.current;
    if (!m) return;
    const markers = props.labels.map((l) => {
      const el = document.createElement('button');
      el.type = 'button';
      el.textContent = l.name;
      Object.assign(el.style, {
        padding: '3px 7px',
        borderRadius: '999px',
        border: `1px solid ${l.on ? colors.wine : colors.line}`,
        background: l.on ? colors.wine : 'rgba(255,255,255,0.92)',
        color: l.on ? '#FFFFFF' : colors.ink,
        font: `600 11px ${fonts.semibold}, -apple-system, system-ui, sans-serif`,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      });
      el.addEventListener('click', (ev) => {
        ev.stopPropagation();
        latest.current.onLabelPress(l.id);
      });
      return new Marker({ element: el, anchor: 'center' }).setLngLat(l.lngLat).addTo(m);
    });
    return () => markers.forEach((mk) => mk.remove());
  }, [props.labels]);

  return (
    <View style={StyleSheet.absoluteFill}>
      <div ref={div} style={{ position: 'absolute', inset: 0 }} />
    </View>
  );
}
