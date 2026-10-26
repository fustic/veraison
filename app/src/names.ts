// Display names shared by several screens.
import { countryName } from '../../core/src/reveal.ts';
import { SCALES, type StructureField } from '../../core/src/sat.ts';

/** A readable name for a content id that is not written yet: region:de-baden → Baden. */
export function prettyId(id: string): string {
  const slug = id.split(':')[1] ?? id;
  if (/^[a-z]{2}$/.test(slug)) return countryName(slug) ?? slug.toUpperCase();
  return slug
    .replace(/^[a-z]{2}-/, '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

const WORD: Record<string, string> = { 'medium-': 'Med−', 'medium+': 'Med+', medium: 'Medium' };

/** Short label for one step on a structural scale: Med+, High, Light… */
export function stepWord(field: StructureField, i: number): string {
  const w = SCALES[field][i] ?? '';
  return WORD[w] ?? w.charAt(0).toUpperCase() + w.slice(1);
}

export function rangeWord(field: StructureField, r: readonly [number, number] | undefined): string {
  return !r ? '—' : r[0] === r[1] ? stepWord(field, r[0]) : `${stepWord(field, r[0])} – ${stepWord(field, r[1])}`;
}

/** Column headings for a five-step scale grid. */
export const FIVE_HEAD = ['LOW', 'MED−', 'MED', 'MED+', 'HIGH'];

/** "Synced 5 min ago", "Syncing…", for the account screen and the Today header. */
export function syncLine(status: 'signed-out' | 'syncing' | 'synced' | 'error', lastSyncedAt: string | null, now = Date.now()): string {
  if (status === 'signed-out') return 'Not signed in';
  if (status === 'syncing') return 'Syncing…';
  if (status === 'error') return lastSyncedAt ? `Could not sync. Last synced ${ago(lastSyncedAt, now)}` : 'Could not sync';
  return lastSyncedAt ? `Synced ${ago(lastSyncedAt, now)}` : 'Synced';
}

function ago(iso: string, now: number): string {
  const s = Math.max(0, Math.round((now - Date.parse(iso)) / 1000));
  if (s < 45) return 'just now';
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} h ago`;
  return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
}
