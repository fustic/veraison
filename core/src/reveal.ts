// Helpers for the reveal: which study profile a revealed wine should be compared with,
// and how to name it in lists.

import type { Grape, Region, WineProfile } from './content.ts';
import type { WineReveal, WineType } from './sat.ts';

/** Wine-producing countries offered in the reveal form, by ISO 3166 alpha-2 code. */
export const COUNTRIES: readonly (readonly [code: string, name: string])[] = [
  ['fr', 'France'],
  ['it', 'Italy'],
  ['es', 'Spain'],
  ['pt', 'Portugal'],
  ['de', 'Germany'],
  ['at', 'Austria'],
  ['ch', 'Switzerland'],
  ['hu', 'Hungary'],
  ['gr', 'Greece'],
  ['us', 'USA'],
  ['ca', 'Canada'],
  ['ar', 'Argentina'],
  ['cl', 'Chile'],
  ['au', 'Australia'],
  ['nz', 'New Zealand'],
  ['za', 'South Africa'],
];
const COUNTRY_NAME = new Map(COUNTRIES);

export function countryName(country: string | null): string | null {
  if (!country) return null;
  return COUNTRY_NAME.get(country) ?? country;
}

/** The country code a region id belongs to: region:fr-bordeaux → fr. */
export function regionCountry(regionId: string): string | null {
  const m = /^region:([a-z]{2})-/.exec(regionId);
  return m ? m[1]! : null;
}

function isWithin(regionId: string, ancestorId: string, regionById: ReadonlyMap<string, Region>): boolean {
  let cur = regionById.get(regionId);
  for (let guard = 0; cur && guard < 10; guard++) {
    if (cur.id === ancestorId) return true;
    cur = cur.parentId ? regionById.get(cur.parentId) : undefined;
  }
  return false;
}

/**
 * Picks the study profile closest to the revealed wine, or null when none fits.
 * A profile needs the same wine type and a related region (same appellation, or one
 * inside the other); when grapes from the study content are given, at least one must
 * be shared. Exact region and more shared grapes rank higher.
 */
export function matchRevealToProfile(
  reveal: WineReveal,
  wineType: WineType,
  profiles: readonly WineProfile[],
  regionById: ReadonlyMap<string, Region>,
): string | null {
  const region = reveal.region && regionById.has(reveal.region) ? reveal.region : null;
  if (!region) return null;
  const grapes = reveal.grapes.filter((g) => g.startsWith('grape:'));
  let best: { id: string; score: number } | null = null;
  for (const p of profiles) {
    if (p.wineType !== wineType) continue;
    const regionScore = p.regionId === region ? 3 : isWithin(region, p.regionId, regionById) ? 2 : isWithin(p.regionId, region, regionById) ? 1 : 0;
    if (!regionScore) continue;
    let grapeScore = 0;
    if (grapes.length) {
      const shared = grapes.filter((g) => p.grapeIds.includes(g)).length;
      if (!shared) continue;
      grapeScore = shared / new Set([...grapes, ...p.grapeIds]).size;
    }
    const score = regionScore + 2 * grapeScore;
    if (!best || score > best.score) best = { id: p.id, score };
  }
  return best?.id ?? null;
}

export interface RevealNames {
  grapeById: ReadonlyMap<string, Grape>;
  regionById: ReadonlyMap<string, Region>;
}

export function grapeName(g: string, names: RevealNames): string {
  return names.grapeById.get(g)?.name ?? g;
}

export function regionName(r: string | null, names: RevealNames): string | null {
  if (!r) return null;
  return names.regionById.get(r)?.name ?? r;
}

export function formatPrice(price: number | null, currency: string | null): string | null {
  if (price === null) return null;
  const amount = Number.isInteger(price) ? String(price) : price.toFixed(2);
  return currency ? `${currency} ${amount}` : amount;
}

/**
 * Title and subtitle for a revealed wine, e.g.
 * "Pauillac 2016" / "Château Pichon Baron · Cabernet Sauvignon, Merlot · France · CHF 95".
 */
/** `fallback` names the wine when the reveal has no place, producer or grapes (e.g. a profile name). */
export function describeReveal(reveal: WineReveal, names: RevealNames, fallback?: string | null): { title: string; subtitle: string } {
  const grapes = reveal.grapes.map((g) => grapeName(g, names));
  const place = regionName(reveal.region, names);
  const year = reveal.nonVintage ? 'NV' : reveal.vintage !== null ? String(reveal.vintage) : null;
  const head = place ?? reveal.producer ?? (grapes.length ? grapes.join(', ') : (fallback ?? 'Revealed wine'));
  const title = year ? `${head} ${year}` : head;
  const parts = [
    head === reveal.producer ? null : reveal.producer,
    head === grapes.join(', ') ? null : grapes.join(', ') || null,
    countryName(reveal.country ?? (reveal.region ? regionCountry(reveal.region) : null)),
    formatPrice(reveal.price, reveal.currency),
  ].filter((x): x is string => !!x);
  return { title, subtitle: parts.join(' · ') };
}
