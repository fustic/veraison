// Side-by-side comparison of two grapes: where their structure differs, which aromas
// they share, and the one-line "tell" from the look-alike notes.

import type { Grape } from './content.ts';
import { FIELD_LABELS, SCALES, type StructureField } from './sat.ts';

export type Climate = 'cool' | 'warm';

export interface CompareRow {
  field: StructureField;
  /** Typical position on the field's own scale (middle of the range, rounded down). */
  a: number | null;
  b: number | null;
  /** Steps between the two ranges; 0 when they overlap. */
  gap: number;
}

export interface GrapeComparison {
  rows: CompareRow[];
  summary: string;
  both: string[];
  onlyA: string[];
  onlyB: string[];
  tells: string[];
}

const FIELDS: readonly StructureField[] = ['acidity', 'tannin', 'body', 'alcohol', 'noseIntensity'];
const STEP_WORDS = ['no steps', 'one step', 'two steps', 'three steps', 'four steps'];

function mid(r: readonly [number, number] | undefined): number | null {
  return r ? Math.floor((r[0] + r[1]) / 2) : null;
}

function gapBetween(a: readonly [number, number] | undefined, b: readonly [number, number] | undefined): number {
  if (!a || !b) return 0;
  if (a[1] < b[0]) return b[0] - a[1];
  if (b[1] < a[0]) return a[0] - b[1];
  return 0;
}

function list(words: string[]): string {
  return words.length <= 1 ? (words[0] ?? '') : `${words.slice(0, -1).join(', ')} and ${words[words.length - 1]}`;
}

export function compareGrapes(a: Grape, b: Grape, climateA: Climate, climateB: Climate): GrapeComparison {
  const ra = a.structure[climateA];
  const rb = b.structure[climateB];
  const red = a.colour === 'red' && b.colour === 'red';
  const rows: CompareRow[] = FIELDS.filter((f) => red || f !== 'tannin').map((field) => ({
    field,
    a: mid(ra[field]),
    b: mid(rb[field]),
    gap: gapBetween(ra[field], rb[field]),
  }));

  const differing = rows.filter((r) => r.gap > 0);
  const total = differing.reduce((n, r) => n + r.gap, 0);
  let summary: string;
  if (!differing.length) {
    summary = 'Structure does not separate them: the typical ranges overlap everywhere. Go to the aromas.';
  } else if (total <= 2 && differing.every((r) => r.gap === 1)) {
    summary = `Structure barely separates them: one step on ${list(differing.map((r) => FIELD_LABELS[r.field]))}. Go to the aromas.`;
  } else {
    const parts = differing
      .sort((x, y) => y.gap - x.gap)
      .map((r) => {
        const higher = (r.a ?? 0) > (r.b ?? 0) ? a.name : b.name;
        return `${higher} is ${STEP_WORDS[Math.min(4, r.gap)]} higher in ${FIELD_LABELS[r.field]}`;
      });
    summary = `Structure helps: ${list(parts)}.`;
  }

  const idsA = new Set(a.aromas.map((x) => x.aromaId));
  const idsB = new Set(b.aromas.map((x) => x.aromaId));
  const both = [...idsA].filter((id) => idsB.has(id));
  const onlyA = [...idsA].filter((id) => !idsB.has(id));
  const onlyB = [...idsB].filter((id) => !idsA.has(id));

  const tells = [a.lookAlikes.find((l) => l.grapeId === b.id)?.tell, b.lookAlikes.find((l) => l.grapeId === a.id)?.tell].filter(
    (t): t is string => !!t,
  );
  return { rows, summary, both, onlyA, onlyB, tells };
}

/** Column (0–4) on a five-wide grid for a value on a field's own scale (alcohol has 3 steps). */
export function gridColumn(field: StructureField, value: number): number {
  const n = SCALES[field].length;
  return n === 5 ? value : Math.round((value * 4) / (n - 1));
}

/** The default pair: the first grape with a look-alike that exists in the content. */
export function defaultPair(grapes: readonly Grape[]): [Grape, Grape] | null {
  const byId = new Map(grapes.map((g) => [g.id, g]));
  for (const g of grapes) {
    const other = g.lookAlikes.map((l) => byId.get(l.grapeId)).find((x) => x !== undefined);
    if (other) return [g, other];
  }
  return grapes.length >= 2 ? [grapes[0]!, grapes[1]!] : null;
}
