// Map styles and layer paint shared by the native (WineMap.tsx) and web (WineMap.web.tsx) maps,
// so both draw the same thing.
import type { Ref } from 'react';
import type { Bounds } from '../../../core/src/mapnav.ts';
import { colors } from '../theme';

export const WATER = '#B9CCD8';
/** Bundled background only: countries and regions are drawn on top from our own GeoJSON. */
export const OFFLINE_STYLE = {
  version: 8 as const,
  name: 'veraison-offline',
  sources: {},
  layers: [{ id: 'background', type: 'background' as const, paint: { 'background-color': WATER } }],
};
export const ONLINE_STYLE = 'https://tiles.openfreemap.org/styles/liberty';
export type MapStyle = typeof OFFLINE_STYLE | string;

/** Regions are hidden below this zoom so the world and continent views stay clean. */
export const REGION_MINZOOM = 3.5;

export const countryFillPaint = (online: boolean) => ({
  'fill-color': ['case', ['==', ['get', 'focused'], 1], '#EFE4E7', ['get', 'syllabus'], '#E6EADF', '#EEF0EA'],
  'fill-opacity': online ? 0 : 1,
});
export const countryLinePaint = (online: boolean) => ({
  'line-color': online ? colors.wine : '#FFFFFF',
  'line-width': online ? 0.6 : 0.9,
  'line-opacity': online ? 0.4 : 1,
});
export const regionFillPaint = (fillColor: unknown) => ({
  'fill-color': fillColor,
  'fill-opacity': ['match', ['get', 'level'], 'region', 0.18, 'district', 0.38, 0.7],
});
export const regionLinePaint = {
  'line-color': colors.wine,
  'line-width': ['case', ['==', ['get', 'selected'], 1], 2.5, 1],
  'line-opacity': 0.7,
};

export type Camera = { center: [number, number]; zoom: number };
export type Padding = { top: number; bottom: number; left: number; right: number };
export type WineMapHandle = {
  fitBounds(bounds: Bounds, padding: Padding, duration: number): void;
  flyTo(camera: Camera, duration: number): void;
};
export type CountryProps = { iso: string; name: string; syllabus: boolean };
export type RegionProps = { id: string; name: string; level: string };
export type MapLabel = { id: string; name: string; lngLat: [number, number]; on: boolean };
export type FeatureCollection = { type: 'FeatureCollection'; features: unknown[] };

export type WineMapProps = {
  ref?: Ref<WineMapHandle>;
  mapStyle: MapStyle;
  online: boolean;
  initialCamera: Camera;
  countries: FeatureCollection;
  regions: FeatureCollection;
  /** A MapLibre expression; keep it memoised, a new value re-sends the region layer. */
  regionFill: unknown;
  labels: MapLabel[];
  /** Topmost hit only: a region press does not also press the country under it. */
  onCountryPress: (hits: CountryProps[]) => void;
  onRegionPress: (hits: RegionProps[]) => void;
  onLabelPress: (id: string) => void;
  /** The style (street map) failed to load; the screen falls back to offline. */
  onLoadError: () => void;
};
