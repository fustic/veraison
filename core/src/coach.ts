// Quality coach: turns balance, length, intensity and complexity into a suggested
// quality level and flags conclusions that contradict the rest of the note.
// The thresholds are a study heuristic, not an official marking scheme.

import { SCALES, type TastingNote } from './sat.ts';
import type { Aroma } from './content.ts';

export const QUALITY = {
  faulty: 0,
  poor: 1,
  acceptable: 2,
  good: 3,
  veryGood: 4,
  outstanding: 5,
} as const;

export interface CoachInput {
  finish: number | null; // 0..4
  flavourIntensity: number | null; // 0..4
  /** Number of distinct aroma clusters picked (red fruit, oak, earth…). */
  complexity: number;
  /** null when the taster has not judged balance. */
  balanced: boolean | null;
  faulty?: boolean;
}

export interface CoachAdvice {
  suggested: number | null;
  reasons: string[];
  warnings: string[];
}

export function complexityFromAromas(aromaIds: readonly string[], aromasById: ReadonlyMap<string, Aroma>): number {
  const clusters = new Set<string>();
  for (const id of aromaIds) {
    const aroma = aromasById.get(id);
    if (aroma) clusters.add(`${aroma.level}:${aroma.cluster}`);
  }
  return clusters.size;
}

export function suggestQuality(input: CoachInput): CoachAdvice {
  const reasons: string[] = [];
  if (input.faulty) {
    return { suggested: QUALITY.faulty, reasons: ['A fault on the nose or in appearance makes the wine faulty.'], warnings: [] };
  }
  if (input.finish === null || input.flavourIntensity === null) {
    return { suggested: null, reasons: ['Set flavour intensity and finish to get a suggestion.'], warnings: [] };
  }

  // Each factor on a 0..4 scale.
  const length = input.finish;
  const intensity = input.flavourIntensity;
  const complexity = Math.max(0, Math.min(4, input.complexity - 1));
  const average = (length + intensity + complexity) / 3;

  let suggested: number = average < 1 ? QUALITY.acceptable : average < 2 ? QUALITY.good : average < 3 ? QUALITY.veryGood : QUALITY.outstanding;
  reasons.push(
    `Length ${SCALES.finish[length]}, intensity ${SCALES.flavourIntensity[intensity]}, ${input.complexity} aroma group${input.complexity === 1 ? '' : 's'}.`,
  );

  if (input.balanced === false) {
    suggested -= 1;
    reasons.push('Out of balance: one quality level lower.');
  }
  if (length <= 1 && suggested > QUALITY.good) {
    suggested = QUALITY.good;
    reasons.push('A short finish caps quality at good.');
  }
  if (input.complexity <= 1 && suggested > QUALITY.good) {
    suggested = QUALITY.good;
    reasons.push('Only one aroma group: hard to argue for very good without more complexity.');
  }

  return { suggested: Math.max(QUALITY.poor, suggested), reasons, warnings: [] };
}

/** Compares the taster's own conclusions with the rest of the note. */
export function checkConclusions(
  note: Pick<TastingNote, 'nose' | 'palate' | 'conclusions'>,
  advice: CoachAdvice,
): string[] {
  const warnings: string[] = [];
  const { quality, readiness } = note.conclusions;
  if (quality !== null && advice.suggested !== null && Math.abs(quality - advice.suggested) >= 2) {
    warnings.push(
      `You chose ${SCALES.quality[quality]}, but length, intensity and complexity point to ${SCALES.quality[advice.suggested]}. Check your palate notes.`,
    );
  }
  if (quality !== null && quality >= QUALITY.veryGood && note.palate.finish !== null && note.palate.finish <= 1) {
    warnings.push('A short finish rarely goes with very good or outstanding.');
  }
  if (note.nose.condition === 1 && quality !== null && quality > QUALITY.faulty) {
    warnings.push('You marked the nose unclean: the quality level should usually be faulty.');
  }
  const tired = note.nose.development === 3;
  const youthful = note.nose.development === 0;
  if (tired && readiness !== null && readiness <= 1) {
    warnings.push('A tired nose does not fit "too young" or "has potential for ageing".');
  }
  if (youthful && readiness === 3) {
    warnings.push('A youthful nose does not fit "too old".');
  }
  return warnings;
}
