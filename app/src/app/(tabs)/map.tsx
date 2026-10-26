// Study map: world → Europe → country → region → appellation, following the map drafts.
// Works offline: countries come from bundled Natural Earth outlines and regions from the
// study content (placeholder circles until real boundaries are imported). The street
// basemap from OpenFreeMap can be switched on when online.
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Region } from '../../../../core/src/content.ts';
import { ancestry, boundsOverlap, circleBounds, grapesInRegion, grapesInView, mainlandBounds, regionBounds, uncoveredBounds, type Bounds } from '../../../../core/src/mapnav.ts';
import { COUNTRIES, countryName, regionCountry } from '../../../../core/src/reveal.ts';
import { setStudyStatus } from '../../../../core/src/userdb/progress.ts';
import { getSetting, setSetting } from '../../../../core/src/userdb/settings.ts';
import { OFFLINE_STYLE, ONLINE_STYLE, WATER, type CountryProps, type RegionProps, type WineMapHandle } from '../../map/layers';
import { WineMap } from '../../map/WineMap';
import { GrapeLine, H1, Kicker, LayersLine, PrimaryButton, ThermoLine } from '../../components';
import { useData } from '../../data/DataProvider';
import countriesGeoJson from '../../generated/countries.geojson.json';
import regionsGeoJson from '../../generated/regions.geojson.json';
import { prettyId } from '../../names';
import { Pill } from '../../tasting/parts';
import { Text } from '../../Text';
import { colors, fonts, statusColors } from '../../theme';

const CLIMATE_COLOURS = { cool: '#7FA7C9', moderate: '#8DBE8A', warm: '#E3A857', hot: '#D0623E' } as const;
const WORLD = { center: [12, 28] as [number, number], zoom: 0.6 };

type ZoneId = 'europe' | 'na' | 'sa' | 'za' | 'oc';
const ZONES: { id: ZoneId; label: string; bounds: Bounds }[] = [
  { id: 'europe', label: 'Europe', bounds: [-11, 35, 30, 60] },
  { id: 'na', label: 'USA · Canada', bounds: [-128, 25, -65, 52] },
  { id: 'sa', label: 'Chile · Argentina', bounds: [-78, -46, -56, -22] },
  { id: 'za', label: 'South Africa', bounds: [16.5, -35, 22, -31.5] },
  { id: 'oc', label: 'Australia · NZ', bounds: [112, -47, 179, -12] },
];
const ZONE_OF: Record<string, ZoneId> = {
  fr: 'europe', it: 'europe', es: 'europe', pt: 'europe', de: 'europe', at: 'europe', ch: 'europe', hu: 'europe', gr: 'europe', gb: 'europe',
  us: 'na', ca: 'na', ar: 'sa', cl: 'sa', za: 'za', au: 'oc', nz: 'oc',
};
const OLD_WORLD = COUNTRIES.filter(([c]) => ZONE_OF[c] === 'europe');
const NEW_WORLD = COUNTRIES.filter(([c]) => ZONE_OF[c] !== 'europe');

/** What each syllabus country covers, for the zone lists. */
const COUNTRY_AREAS: Record<string, string> = {
  fr: 'Bordeaux, Burgundy, Rhône, Loire, Alsace…',
  it: 'Piemonte, Veneto, Tuscany, Campania, Sicily…',
  es: 'Rioja, Ribera del Duero, Priorat, Rías Baixas…',
  de: 'Mosel, Rheingau, Pfalz, Baden…',
  pt: 'Vinho Verde, Douro, Dão, Alentejo…',
  at: 'Wachau, Kamptal, Burgenland…',
  hu: 'Tokaj',
  gr: 'Naoussa, Nemea, Santorini',
  ch: 'Valais, Vaud',
  gb: 'England (sparkling)',
  us: 'Napa, Sonoma, Willamette Valley, Washington…',
  ca: 'Niagara Peninsula, Okanagan Valley',
  ar: 'Mendoza, Salta',
  cl: 'Casablanca, Maipo, Colchagua…',
  za: 'Stellenbosch, Swartland, Walker Bay…',
  au: 'Barossa, Hunter, Yarra, Coonawarra, Margaret River…',
  nz: 'Marlborough, Central Otago, Hawke’s Bay…',
};

/** Frames for countries whose wine regions are not all on the largest landmass. */
const COUNTRY_BOUNDS: Record<string, Bounds> = {
  nz: [166, -47.5, 179, -34],
  it: [6.5, 36.5, 18.6, 47.1],
  gr: [19.5, 34.8, 28.3, 41.8],
  au: [112, -44, 154, -10],
};

/** Regions whose outline only approximates the official boundary (see tools/boundaries/world-regions.ts). */
const APPROXIMATE = new Set(
  (regionsGeoJson as unknown as { features: { properties: { id: string; approximate?: boolean } }[] }).features.filter((f) => f.properties.approximate).map((f) => f.properties.id),
);

type Focus = { kind: 'world' } | { kind: 'zone'; id: ZoneId } | { kind: 'country'; iso: string } | { kind: 'region'; id: string };
type Colouring = 'status' | 'climate' | 'grape';

type CountryFeature = { properties: { iso: string; name: string; syllabus: boolean }; geometry: { type: string; coordinates: unknown } };
type RegionFeature = { properties: { id: string; name: string; level: string } };

export default function MapScreen() {
  const { content, statuses, seen, db, deps, refreshStatuses } = useData();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ focus?: string }>();
  const camera = useRef<WineMapHandle>(null);
  const [focus, setFocus] = useState<Focus>({ kind: 'world' });
  // Street basemap on by default; falls back to the offline map when it cannot load.
  const [online, setOnlineState] = useState(true);
  const [offlineNote, setOfflineNote] = useState(false);
  const setOnline = (on: boolean) => {
    setOnlineState(on);
    setOfflineNote(false);
    void setSetting(db, 'map.online', on ? '1' : '0');
  };
  const [colouring, setColouring] = useState<Colouring>('status');
  const [grapeId, setGrapeId] = useState<string | null>(null);
  // Grape chips list the grapes of the regions in view unless the user asks for all of them.
  const [allGrapes, setAllGrapes] = useState(false);
  const [view, setView] = useState<Bounds | null>(null);
  const { height: screenH } = useWindowDimensions();
  // Sheet height lives in a ref: changing it must not re-render the map.
  const sheetH = useRef(320);
  const fitPending = useRef(false);
  const lastMarkerTap = useRef(0);
  const [collapsed, setCollapsed] = useState(false);

  const countries = countriesGeoJson as unknown as { type: 'FeatureCollection'; features: CountryFeature[] };
  const countryByIso = useMemo(() => {
    // Some codes cover several features (Australia's islands); keep the largest one.
    const m = new globalThis.Map<string, CountryFeature>();
    for (const f of countries.features) {
      const prev = m.get(f.properties.iso);
      if (!prev || JSON.stringify(f.geometry).length > JSON.stringify(prev.geometry).length) m.set(f.properties.iso, f);
    }
    return m;
  }, [countries]);

  useEffect(() => {
    void getSetting(db, 'map.online').then((v) => v === '0' && setOnlineState(false));
  }, [db]);

  // Bounding boxes of the real outlines (with a margin), for framing the camera.
  const outlineBounds = useMemo(() => {
    const m = new globalThis.Map<string, Bounds>();
    const fc = regionsGeoJson as unknown as { features: { properties: { id: string; bbox: Bounds | null } }[] };
    for (const f of fc.features) {
      const b = f.properties.bbox;
      if (!b) continue;
      const mx = (b[2] - b[0]) * 0.1;
      const my = (b[3] - b[1]) * 0.1;
      m.set(f.properties.id, [b[0] - mx, b[1] - my, b[2] + mx, b[3] + my]);
    }
    return m;
  }, []);

  const hasContent = (iso: string) => content.regionById.has(`region:${iso}`);
  const openRegion = (id: string) => {
    setFocus({ kind: 'region', id });
    setCollapsed(false);
    void seen(id);
  };
  // Map press handlers read the latest values through a ref, so the sources can be memoised.
  const live = useRef({ openRegion, openCountry: (_iso: string) => {}, focus, regionLevel: undefined as string | undefined });
  const openCountry = (iso: string) => (hasContent(iso) ? openRegion(`region:${iso}`) : setFocus({ kind: 'country', iso }));

  // Deep link from other screens: /map?focus=region:fr-bordeaux. The param is cleared
  // once used, so opening the same region again from elsewhere still moves the map.
  // The map may still be hidden behind the screen transition when the link arrives, so fit
  // once more after the transition; WineMap holds the command until the map has loaded.
  useEffect(() => {
    if (params.focus && content.regionById.has(params.focus)) {
      openRegion(params.focus);
      router.setParams({ focus: undefined });
      // No cleanup: clearing the param re-runs this effect, which would cancel the timer.
      setTimeout(() => fitRef.current(), 600);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.focus]);

  const region = focus.kind === 'region' ? content.regionById.get(focus.id) : undefined;
  const chain = region ? ancestry(region.id, content.regionById) : [];
  const iso = focus.kind === 'country' ? focus.iso : region ? regionCountry(region.id) : null;
  live.current = { openRegion, openCountry, focus, regionLevel: region?.level };

  // Each region's outline box (its circle's box when it has no outline), for the view test.
  const regionBoxes = useMemo(() => {
    const fc = regionsGeoJson as unknown as { features: { properties: { id: string; bbox: Bounds | null } }[] };
    const box = new globalThis.Map(fc.features.map((f) => [f.properties.id, f.properties.bbox]));
    return [...content.regionById.values()].filter((r) => r.level !== 'country').map((r) => ({ region: r, box: box.get(r.id) ?? circleBounds(r) }));
  }, [content]);
  // Grapes of what is on screen: regions overlapping the part of the map not hidden by the sheet.
  // Before the map has reported its view, fall back to the focused region.
  const localGrapes = useMemo(() => {
    if (!view) return region ? grapesInRegion(region, content.childrenOf, content.grapes) : [];
    const seen = uncoveredBounds(view, (collapsed ? 64 : sheetH.current) / screenH);
    return grapesInView(regionBoxes.filter((x) => boundsOverlap(x.box, seen)).map((x) => x.region), content.grapes, region);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, region, regionBoxes, collapsed, screenH, content]);
  useEffect(() => setAllGrapes(false), [focus]);
  const filtered = localGrapes.length > 0 && localGrapes.length < content.grapes.length && !allGrapes;
  // The selected grape stays visible even when it does not grow in the focused region.
  const chipIds = filtered
    ? grapeId && !localGrapes.includes(grapeId) ? [grapeId, ...localGrapes] : localGrapes
    : content.grapes.map((g) => g.id);
  const zone: ZoneId | null = focus.kind === 'zone' ? focus.id : iso ? (ZONE_OF[iso] ?? null) : null;

  // Move the camera when the focus changes, leaving room for the sheet. The new sheet
  // may lay out a moment later with a different height; that triggers one more fit.
  const fit = () => {
    const padding = { top: insets.top + 76, bottom: (collapsed ? 64 : sheetH.current) + 16, left: 24, right: 72 };
    let bounds: Bounds | null = null;
    if (focus.kind === 'zone') bounds = ZONES.find((z) => z.id === focus.id)!.bounds;
    const country = iso ? countryByIso.get(iso) : undefined;
    const countryBounds = iso ? (COUNTRY_BOUNDS[iso] ?? (country ? mainlandBounds(country.geometry) : null)) : null;
    if (focus.kind === 'country') bounds = countryBounds;
    if (focus.kind === 'region' && region) {
      const outline = outlineBounds.get(region.id);
      bounds = region.level === 'country' && countryBounds ? countryBounds : outline ?? regionBounds(region, content.childrenOf);
    }
    if (bounds) camera.current?.fitBounds(bounds, padding, 900);
    else camera.current?.flyTo(WORLD, 900);
  };
  const fitRef = useRef(fit);
  fitRef.current = fit;
  useEffect(() => {
    fit();
    fitPending.current = true;
    const t = setTimeout(() => (fitPending.current = false), 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus, collapsed]);

  // Regions in the focused area get name labels on the map.
  const labelled: Region[] = useMemo(() => {
    if (!region) return [];
    const kids = content.childrenOf.get(region.id) ?? [];
    if (kids.length) return kids;
    return region.parentId ? (content.childrenOf.get(region.parentId) ?? []) : [];
  }, [region, content.childrenOf]);

  // Attach status, climate and grape match to each region circle.
  const regionShape = useMemo(() => {
    const fc = regionsGeoJson as unknown as { type: 'FeatureCollection'; features: (RegionFeature & Record<string, unknown>)[] };
    const grape = grapeId ? content.grapeById.get(grapeId) : undefined;
    const grapeRegions = new Set(grape?.regions.map((r) => r.regionId) ?? []);
    return {
      ...fc,
      features: fc.features.map((f) => {
        const r = content.regionById.get(f.properties.id);
        const climate = r ? [...ancestry(r.id, content.regionById)].reverse().find((x) => x.climate)?.climate?.type : undefined;
        const match = !grapeId || !r ? 0 : r.principalGrapes.includes(grapeId) || grapeRegions.has(r.id) ? 2 : r.otherGrapes.includes(grapeId) ? 1 : 0;
        return {
          ...f,
          properties: {
            ...f.properties,
            status: statuses.get(f.properties.id)?.status ?? 'unseen',
            climate: climate ?? 'none',
            match,
            selected: region?.id === f.properties.id ? 1 : 0,
          },
        };
      }),
    };
  }, [statuses, grapeId, region?.id, content]);

  const countryShape = useMemo(
    () => ({
      ...countries,
      features: countries.features.map((f) => ({
        ...f,
        properties: { ...f.properties, syllabus: f.properties.syllabus || f.properties.iso in ZONE_OF, focused: f.properties.iso === iso ? 1 : 0 },
      })),
    }),
    [countries, iso],
  );

  const fillColor =
    colouring === 'climate'
      ? ['match', ['get', 'climate'], 'cool', CLIMATE_COLOURS.cool, 'moderate', CLIMATE_COLOURS.moderate, 'warm', CLIMATE_COLOURS.warm, 'hot', CLIMATE_COLOURS.hot, '#C8C6BE']
      : colouring === 'grape'
        ? ['match', ['get', 'match'], 2, colors.wine, 1, colors.rose, '#C8C6BE']
        : ['match', ['get', 'status'], 'mastered', statusColors.mastered, 'studied', statusColors.studied, 'seen', statusColors.seen, statusColors.unseen];

  const crumbs: { label: string; onPress?: () => void }[] = [{ label: 'World', onPress: () => setFocus({ kind: 'world' }) }];
  if (zone) crumbs.push({ label: ZONES.find((z) => z.id === zone)!.label, onPress: () => setFocus({ kind: 'zone', id: zone }) });
  if (focus.kind === 'country') crumbs.push({ label: countryName(focus.iso) ?? focus.iso });
  for (const r of chain) crumbs.push({ label: r.name, onPress: () => openRegion(r.id) });
  crumbs[crumbs.length - 1]!.onPress = undefined;

  const toggleStudied = async (id: string) => {
    const st = statuses.get(id)?.status;
    await setStudyStatus(db, id, st === 'studied' || st === 'mastered' ? 'seen' : 'studied', deps);
    await refreshStatuses();
  };

  // Memoised: a new value re-sends the region layer to the map.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const regionFill = useMemo(() => fillColor, [colouring]);
  const labels = useMemo(() => labelled.map((r) => ({ id: r.id, name: r.name, lngLat: [r.centroid[0], r.centroid[1]] as [number, number], on: region?.id === r.id })), [labelled, region?.id]);

  const onCountryPress = (hits: CountryProps[]) => {
    const { focus: f, regionLevel, openCountry: open } = live.current;
    // Countries only respond above region level, so a near-miss on a region does not jump away.
    if (f.kind === 'region' && regionLevel !== 'country') return;
    const hit = hits[0];
    if (hit?.syllabus) open(hit.iso);
  };
  const onRegionPress = (hits: RegionProps[]) => {
    // A tap on a name label can also reach the map underneath; the label wins.
    if (Date.now() - lastMarkerTap.current < 400) return;
    // Smallest polygon first: an appellation sits on top of its district.
    const hit = [...hits].sort((a, b) => rank(b.level) - rank(a.level))[0];
    if (hit) live.current.openRegion(hit.id);
  };

  return (
    <View style={styles.screen}>
      <WineMap
        ref={camera}
        mapStyle={online ? ONLINE_STYLE : OFFLINE_STYLE}
        online={online}
        initialCamera={WORLD}
        countries={countryShape as never}
        regions={regionShape as never}
        regionFill={regionFill}
        labels={labels}
        onCountryPress={onCountryPress}
        onRegionPress={onRegionPress}
        onLabelPress={(id) => {
          lastMarkerTap.current = Date.now();
          openRegion(id);
        }}
        onViewChange={(b) => setView(b)}
        onLoadError={() => {
          if (!online) return;
          setOnlineState(false);
          setOfflineNote(true);
        }}
      />

      <View style={[styles.crumbs, { top: insets.top + 12 }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', gap: 6, paddingHorizontal: 14 }}>
          {crumbs.map((c, i) => (
            <View key={`${c.label}-${i}`} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              {i > 0 ? <Text style={styles.crumbSep}>›</Text> : null}
              <Text onPress={c.onPress} style={[styles.crumb, !c.onPress && styles.crumbOn]}>
                {c.label}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={[styles.tools, { top: insets.top + 120 }]}>
        <Tool label="Climate layer" on={colouring === 'climate'} onPress={() => setColouring(colouring === 'climate' ? 'status' : 'climate')}>
          <ThermoLine color={colouring === 'climate' ? '#FFFFFF' : colors.ink} />
        </Tool>
        <Tool label="Where does a grape grow" on={colouring === 'grape'} onPress={() => setColouring(colouring === 'grape' ? 'status' : 'grape')}>
          <GrapeLine color={colouring === 'grape' ? '#FFFFFF' : colors.ink} />
        </Tool>
        <Tool label="Street map (online)" on={online} onPress={() => setOnline(!online)}>
          <LayersLine color={online ? '#FFFFFF' : colors.ink} />
        </Tool>
      </View>

      {colouring === 'grape' ? (
        <View style={[styles.grapeBar, { top: insets.top + 68 }]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, alignItems: 'center' }}>
            {allGrapes && localGrapes.length > 0 && localGrapes.length < content.grapes.length ? (
              <Pill small label="Only in view" on={false} onPress={() => setAllGrapes(false)} />
            ) : null}
            {chipIds.map((id) => (
              <Pill key={id} small label={content.grapeById.get(id)?.name ?? prettyId(id)} on={grapeId === id} onPress={() => setGrapeId(grapeId === id ? null : id)} />
            ))}
            {filtered ? <Pill small label={`All ${content.grapes.length} grapes`} on={false} onPress={() => setAllGrapes(true)} /> : null}
          </ScrollView>
        </View>
      ) : null}

      <View
        style={[styles.sheet, collapsed && { maxHeight: 64 }]}
        onLayout={(e) => {
          if (collapsed) return;
          const h = Math.round(e.nativeEvent.layout.height);
          const changed = Math.abs(h - sheetH.current) > 24;
          sheetH.current = h;
          // Re-fit only right after a focus change, never while the user is exploring.
          if (changed && fitPending.current) {
            fitPending.current = false;
            fitRef.current();
          }
        }}
      >
        <Pressable accessibilityRole="button" accessibilityLabel={collapsed ? 'Show details' : 'Hide details'} onPress={() => setCollapsed((v) => !v)} style={styles.handleHit}>
          <View style={styles.handle} />
        </Pressable>
        <ScrollView contentContainerStyle={{ gap: 12, paddingBottom: 16 }} scrollEnabled={!collapsed}>
          {offlineNote ? <Text style={styles.muted}>No connection: showing the offline map.</Text> : null}
          {colouring === 'climate' ? <ClimateLegend /> : null}
          {colouring === 'grape' && !grapeId ? (
            <Text style={styles.muted}>
              {filtered ? 'Grapes of the regions in view above; they follow the map as you move. Pick one to see where it grows.' : 'Pick a grape above to see where it grows.'}
            </Text>
          ) : null}
          {focus.kind === 'world' ? (
            <WorldSheet onZone={(id) => setFocus({ kind: 'zone', id })} />
          ) : focus.kind === 'zone' ? (
            <ZoneSheet zone={focus.id} hasContent={hasContent} onCountry={openCountry} />
          ) : focus.kind === 'country' ? (
            <ComingSheet iso={focus.iso} />
          ) : region ? (
            <RegionSheet region={region} onRegion={openRegion} onStudied={() => toggleStudied(region.id)} />
          ) : null}
          <Text style={styles.credit}>
            {online ? '© OpenFreeMap © OpenStreetMap contributors · ' : ''}Outlines: Candiago et al. 2022, UC Davis AVA project, Wine Australia, IPONZ, geoBoundaries · Countries: Natural Earth
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}

function rank(level: string): number {
  return { country: 0, region: 1, district: 2, appellation: 3 }[level] ?? 0;
}

function Tool({ label, on, onPress, children }: { label: string; on: boolean; onPress: () => void; children: ReactNode }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ selected: on }} onPress={onPress} style={[styles.tool, on && styles.toolOn]}>
      {children}
    </Pressable>
  );
}

function ClimateLegend() {
  return (
    <View style={styles.legend}>
      <Text style={styles.legendTitle}>Climate</Text>
      {(Object.keys(CLIMATE_COLOURS) as (keyof typeof CLIMATE_COLOURS)[]).map((k) => (
        <View key={k} style={styles.legendItem}>
          <View style={[styles.swatch, { backgroundColor: CLIMATE_COLOURS[k] }]} />
          <Text style={styles.legendText}>{k.charAt(0).toUpperCase() + k.slice(1)}</Text>
        </View>
      ))}
    </View>
  );
}

function WorldSheet({ onZone }: { onZone: (z: ZoneId) => void }) {
  return (
    <>
      <H1 size={24}>Where wine grows</H1>
      <Text style={styles.body}>
        Most of the syllabus sits between 30° and 50° latitude. Nearer the poles grapes struggle to ripen; nearer the equator vines get no winter rest.
      </Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <View style={styles.stat}>
          <Text style={styles.statNum}>{OLD_WORLD.length}</Text>
          <Text style={styles.statLabel}>Old World countries</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNum}>{NEW_WORLD.length}</Text>
          <Text style={styles.statLabel}>New World countries</Text>
        </View>
      </View>
      <View style={styles.wrap}>
        {ZONES.map((z) => (
          <Pill key={z.id} label={z.label} on={false} onPress={() => onZone(z.id)} />
        ))}
      </View>
    </>
  );
}

function ZoneSheet({ zone, hasContent, onCountry }: { zone: ZoneId; hasContent: (iso: string) => boolean; onCountry: (iso: string) => void }) {
  const list = COUNTRIES.filter(([c]) => ZONE_OF[c] === zone);
  return (
    <>
      <View style={styles.titleRow}>
        <H1 size={24}>{ZONES.find((z) => z.id === zone)!.label}</H1>
        <Text style={styles.muted}>
          {list.length} {list.length === 1 ? 'country' : 'countries'}
        </Text>
      </View>
      {list.map(([code, name]) => {
        const ready = hasContent(code);
        return (
          <Pressable key={code} accessibilityRole="button" onPress={() => onCountry(code)} style={[styles.countryRow, !ready && { opacity: 0.6 }]}>
            <View style={{ flex: 1, gap: 2 }}>
              <Text style={styles.countryName}>{name}</Text>
              <Text style={styles.muted}>{COUNTRY_AREAS[code] ?? ''}</Text>
            </View>
            <Text style={ready ? styles.chev : styles.soon}>{ready ? '›' : 'SOON'}</Text>
          </Pressable>
        );
      })}
    </>
  );
}

function ComingSheet({ iso }: { iso: string }) {
  return (
    <>
      <H1 size={24}>{countryName(iso) ?? iso}</H1>
      <Text style={styles.muted}>{COUNTRY_AREAS[iso] ?? ''}</Text>
      <Text style={styles.body}>Not in the study content yet. Its regions arrive with the chapter that covers them.</Text>
    </>
  );
}

function RegionSheet({ region, onRegion, onStudied }: { region: Region; onRegion: (id: string) => void; onStudied: () => void }) {
  const { content, statuses } = useData();
  const chain = ancestry(region.id, content.regionById);
  const parent = chain.length > 1 ? chain[chain.length - 2] : undefined;
  const climate = [...chain].reverse().find((r) => r.climate)?.climate;
  const kids = content.childrenOf.get(region.id) ?? [];
  const grapes = [...region.principalGrapes, ...region.otherGrapes];
  const reds = grapes.filter((g) => content.grapeById.get(g)?.colour === 'red');
  const whites = grapes.filter((g) => content.grapeById.get(g)?.colour === 'white');
  const unknown = grapes.filter((g) => !content.grapeById.has(g));
  const st = statuses.get(region.id)?.status;
  const studied = st === 'studied' || st === 'mastered';
  const subtitle = [
    region.level === 'country' ? null : (parent?.name ?? null),
    climate ? `${climate.type} ${climate.influence}` : null,
    region.labelTerms.length && region.level !== 'country' ? region.labelTerms.slice(0, 3).join(', ') : null,
  ]
    .filter(Boolean)
    .join(' · ');

  const grapeLinks = (ids: string[]) => (
    <Text style={styles.body}>
      {ids.map((g, i) => {
        const grape = content.grapeById.get(g);
        return (
          <Text key={g}>
            {i > 0 ? ', ' : ''}
            {grape ? (
              <Text style={{ color: colors.wine, fontWeight: '600' }} onPress={() => router.push({ pathname: '/grape/[id]', params: { id: g } })}>
                {grape.name}
              </Text>
            ) : (
              prettyId(g)
            )}
          </Text>
        );
      })}
    </Text>
  );

  return (
    <>
      <View style={{ gap: 2 }}>
        <H1 size={24}>{region.name}</H1>
        {subtitle ? <Text style={styles.muted}>{subtitle}</Text> : null}
        {APPROXIMATE.has(region.id) ? <Text style={styles.muted}>Approximate outline (nearest municipality); the official boundary differs.</Text> : null}
      </View>

      {region.level === 'country' ? (
        kids.map((k) => (
          <Pressable key={k.id} accessibilityRole="button" onPress={() => onRegion(k.id)} style={styles.countryRow}>
            <View style={{ flex: 1, gap: 2 }}>
              <Text style={styles.countryName}>{k.name}</Text>
              <Text style={styles.muted}>
                {[k.climate ? `${k.climate.type} ${k.climate.influence}` : null, k.principalGrapes.slice(0, 3).map((g) => content.grapeById.get(g)?.name ?? prettyId(g)).join(', ')]
                  .filter(Boolean)
                  .join(' · ')}
              </Text>
            </View>
            <Text style={styles.chev}>›</Text>
          </Pressable>
        ))
      ) : (
        <>
          {region.why.length ? (
            <View style={styles.why}>
              <Kicker color={colors.wine}>WHY IT WORKS</Kicker>
              {region.why.map((w) => (
                <Text key={w.factor} style={styles.body}>
                  <Text style={{ fontWeight: '600' }}>{w.factor}</Text> → {w.effect}
                  {w.result ? ` → ${w.result}` : ''}
                </Text>
              ))}
            </View>
          ) : null}
          <View style={{ gap: 6 }}>
            {reds.length ? <Row label="Reds">{grapeLinks(reds)}</Row> : null}
            {whites.length ? <Row label="Whites">{grapeLinks(whites)}</Row> : null}
            {unknown.length ? <Row label="Also">{grapeLinks(unknown)}</Row> : null}
            {region.soils ? <Row label="Soils">{<Text style={styles.body}>{region.soils}</Text>}</Row> : null}
            {region.labelTerms.length ? <Row label="Labels">{<Text style={styles.body}>{region.labelTerms.join(', ')}</Text>}</Row> : null}
            {region.producers.length ? <Row label="Iconic">{<Text style={styles.body}>{region.producers.join(', ')}</Text>}</Row> : null}
          </View>
          {kids.length ? (
            <View style={{ gap: 6 }}>
              <Text style={styles.muted}>Inside {region.name}</Text>
              <View style={styles.wrap}>
                {kids.map((k) => (
                  <Pill key={k.id} small label={k.name} on={false} onPress={() => onRegion(k.id)} />
                ))}
              </View>
            </View>
          ) : null}
        </>
      )}

      <View style={{ flexDirection: 'row', gap: 8, paddingTop: 4 }}>
        <PrimaryButton secondary title={studied ? '✓ Studied' : 'Mark studied'} onPress={onStudied} />
        <PrimaryButton title="Full page" onPress={() => router.push({ pathname: '/region/[id]', params: { id: region.id } })} />
      </View>
    </>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      <Text style={[styles.muted, { width: 60 }]}>{label}</Text>
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: WATER },
  crumbs: { position: 'absolute', left: 16, right: 16, height: 44, borderRadius: 12, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, justifyContent: 'center' },
  crumb: { fontSize: 14, color: colors.muted },
  crumbOn: { color: colors.ink, fontWeight: '600' },
  crumbSep: { fontSize: 14, color: colors.muted },
  tools: { position: 'absolute', right: 16, gap: 8 },
  tool: { width: 44, height: 44, borderRadius: 12, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  toolOn: { backgroundColor: colors.wine, borderColor: colors.wine },
  grapeBar: { position: 'absolute', left: 16, right: 68, height: 44, justifyContent: 'center' },
  credit: { fontSize: 10, color: colors.muted },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: '48%',
    backgroundColor: colors.surface,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderTopWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  handleHit: { alignSelf: 'stretch', alignItems: 'center', paddingVertical: 10 },
  handle: { width: 40, height: 5, borderRadius: 3, backgroundColor: colors.line },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  body: { fontSize: 14, lineHeight: 20, color: colors.ink },
  muted: { fontSize: 13, lineHeight: 18, color: colors.muted },
  stat: { flex: 1, borderRadius: 14, backgroundColor: colors.paper, padding: 12, gap: 2 },
  statNum: { fontFamily: fonts.display, fontSize: 26, color: colors.ink },
  statLabel: { fontSize: 13, color: colors.muted },
  countryRow: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: 12, backgroundColor: colors.paper },
  countryName: { fontSize: 15, fontWeight: '600', color: colors.ink },
  chev: { fontSize: 22, color: colors.wine },
  soon: { fontFamily: fonts.mono, fontSize: 10, color: colors.muted },
  why: { borderRadius: 14, backgroundColor: colors.wineTint, paddingVertical: 12, paddingHorizontal: 14, gap: 6 },
  legend: { flexDirection: 'row', alignItems: 'center', gap: 12, flexWrap: 'wrap' },
  legendTitle: { fontSize: 13, fontWeight: '600', color: colors.ink },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  swatch: { width: 12, height: 12, borderRadius: 3 },
  legendText: { fontSize: 13, color: colors.muted },
});
