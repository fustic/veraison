// "What is this?" — ranks wine profiles against a tasting note.
// Deliberately simple and explainable: every point of the score can be traced
// back to a field in range, a field out of range, or a shared aroma.

import type { WineProfile } from './content.ts';
import { scaleSpan, STRUCTURE_FIELDS, structureOf, type StructureField, type TastingNote } from './sat.ts';

const WEIGHTS: Record<StructureField, number> = {
  sweetness: 1.5,
  acidity: 1.2,
  tannin: 1.2,
  body: 1.0,
  alcohol: 1.0,
  appearanceIntensity: 0.6,
  noseIntensity: 0.5,
  flavourIntensity: 0.5,
  finish: 0.3,
};

export interface FieldConflict {
  field: StructureField;
  /** Positive: the note is above the profile's range; negative: below. In scale steps. */
  steps: number;
}

export interface ProfileMatch {
  profileId: string;
  score: number; // 0..1
  structureFit: number; // 0..1
  aromaFit: number; // 0..1
  inRange: StructureField[];
  conflicts: FieldConflict[];
  sharedAromas: string[];
  missedSignatureAromas: string[];
}

type NoteForScoring = Pick<TastingNote, 'wineType' | 'appearance' | 'nose' | 'palate'>;

function noteAromas(note: NoteForScoring): Set<string> {
  return new Set([...note.nose.aromaIds, ...(note.palate.aromaIds ?? [])]);
}

export function scoreProfile(note: NoteForScoring, profile: WineProfile): ProfileMatch | null {
  if (profile.wineType !== note.wineType) return null;

  const values = structureOf(note);
  const inRange: StructureField[] = [];
  const conflicts: FieldConflict[] = [];
  let penalty = 0;
  let weightUsed = 0;

  for (const field of STRUCTURE_FIELDS) {
    const value = values[field];
    const range = profile.structure[field];
    if (value === null || range === undefined) continue;
    const [min, max] = range;
    const steps = value < min ? value - min : value > max ? value - max : 0;
    weightUsed += WEIGHTS[field];
    if (steps === 0) {
      inRange.push(field);
    } else {
      conflicts.push({ field, steps });
      penalty += (WEIGHTS[field] * Math.abs(steps)) / scaleSpan(field);
    }
  }

  // No structure filled in yet: stay neutral rather than rewarding an empty note.
  const structureFit = weightUsed === 0 ? 0.5 : 1 / (1 + 3 * penalty);

  const picked = noteAromas(note);
  const profileAromas = Object.entries(profile.aromas);
  const totalWeight = profileAromas.reduce((sum, [, w]) => sum + w, 0);
  const sharedAromas = profileAromas.filter(([id]) => picked.has(id)).map(([id]) => id);
  const sharedWeight = profileAromas.filter(([id]) => picked.has(id)).reduce((sum, [, w]) => sum + w, 0);
  const missedSignatureAromas = profileAromas.filter(([id, w]) => w === 3 && !picked.has(id)).map(([id]) => id);

  let aromaFit = 0.5;
  if (picked.size > 0 && totalWeight > 0) {
    const recall = sharedWeight / totalWeight;
    const precision = sharedAromas.length / picked.size;
    aromaFit = 0.7 * recall + 0.3 * precision;
  }

  const score = 0.6 * structureFit + 0.4 * aromaFit;
  return {
    profileId: profile.id,
    score: Math.round(score * 1000) / 1000,
    structureFit,
    aromaFit,
    inRange,
    conflicts,
    sharedAromas,
    missedSignatureAromas,
  };
}

export function rankProfiles(note: NoteForScoring, profiles: readonly WineProfile[], limit = 3): ProfileMatch[] {
  return profiles
    .map((p) => scoreProfile(note, p))
    .filter((m): m is ProfileMatch => m !== null)
    .sort((a, b) => b.score - a.score || a.profileId.localeCompare(b.profileId))
    .slice(0, limit);
}

export interface FieldBias {
  field: StructureField;
  /** Average signed miss in scale steps across notes where the field was out of range. */
  meanSteps: number;
  misses: number;
  notes: number;
}

/**
 * Personal calibration: compares revealed notes with their profiles and reports
 * which fields you systematically rate too high or too low.
 */
export function tastingBias(
  notes: readonly (NoteForScoring & { revealedProfileId: string | null })[],
  profilesById: ReadonlyMap<string, WineProfile>,
): FieldBias[] {
  const acc = new Map<StructureField, { sum: number; misses: number; notes: number }>();
  for (const note of notes) {
    if (!note.revealedProfileId) continue;
    const profile = profilesById.get(note.revealedProfileId);
    if (!profile) continue;
    const match = scoreProfile(note, profile);
    if (!match) continue;
    for (const field of [...match.inRange, ...match.conflicts.map((c) => c.field)]) {
      const entry = acc.get(field) ?? { sum: 0, misses: 0, notes: 0 };
      entry.notes += 1;
      const conflict = match.conflicts.find((c) => c.field === field);
      if (conflict) {
        entry.sum += conflict.steps;
        entry.misses += 1;
      }
      acc.set(field, entry);
    }
  }
  return [...acc.entries()]
    .map(([field, e]) => ({ field, meanSteps: e.misses ? e.sum / e.misses : 0, misses: e.misses, notes: e.notes }))
    .sort((a, b) => b.misses / b.notes - a.misses / a.notes);
}
