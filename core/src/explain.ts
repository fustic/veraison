// One-line explanations for the reveal screen: why a suggested wine fits the note, or
// what it would have shown instead; and the label-alcohol check.

import type { WineProfile } from './content.ts';
import { alcoholStep, FIELD_LABELS, SCALES, type TastingNote } from './sat.ts';
import { scoreProfile } from './scorer.ts';

type Note = Pick<TastingNote, 'wineType' | 'appearance' | 'nose' | 'palate'>;

function list(words: string[], joiner = 'and'): string {
  return words.length <= 1 ? (words[0] ?? '') : `${words.slice(0, -1).join(', ')} ${joiner} ${words[words.length - 1]}`;
}

export function explainGuess(note: Note, profile: WineProfile, aromaLabel: (id: string) => string): string {
  const m = scoreProfile(note, profile);
  if (!m) return '';
  const missed = m.missedSignatureAromas.slice(0, 2).map(aromaLabel);
  if (!m.conflicts.length) {
    const found = m.sharedAromas.slice(0, 3).map(aromaLabel);
    if (found.length) return `Fits your structure, and you found ${list(found)}.`;
    return missed.length ? `Fits your structure; look for ${list(missed, 'or')}.` : 'Fits your structure.';
  }
  const parts = [...m.conflicts]
    .sort((a, b) => Math.abs(b.steps) - Math.abs(a.steps))
    .slice(0, 2)
    .map((c) => `${c.steps > 0 ? 'lower' : 'higher'} ${FIELD_LABELS[c.field]}`);
  return `Would show ${list(parts)}${missed.length ? `, with ${list(missed, 'or')}` : ''}.`;
}

export interface AlcoholCheck {
  labelStep: 0 | 1 | 2;
  labelWord: string;
  saidWord: string | null;
  match: boolean | null;
}

/** Compares the alcohol you called with the % on the label (still wines). */
export function checkAlcohol(said: number | null, abv: number): AlcoholCheck {
  const labelStep = alcoholStep(abv);
  return {
    labelStep,
    labelWord: SCALES.alcohol[labelStep],
    saidWord: said === null ? null : (SCALES.alcohol[said] ?? null),
    match: said === null ? null : said === labelStep,
  };
}
