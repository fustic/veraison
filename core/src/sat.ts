// Level 3 tasting scales. Every scale is stored as a 0-based index into these arrays,
// so the database holds small integers and the wording can change without a migration.
// These labels follow the Level 3 SAT for a private build; swap them for your own
// wording before any public release unless WSET grants permission.

export const WINE_TYPES = ['white', 'rose', 'red'] as const;
export type WineType = (typeof WINE_TYPES)[number];

export const SCALES = {
  clarity: ['clear', 'hazy'],
  appearanceIntensity: ['pale', 'medium', 'deep'],
  noseCondition: ['clean', 'unclean'],
  noseIntensity: ['light', 'medium-', 'medium', 'medium+', 'pronounced'],
  development: ['youthful', 'developing', 'fully developed', 'tired/past its best'],
  sweetness: ['dry', 'off-dry', 'medium-dry', 'medium-sweet', 'sweet', 'luscious'],
  acidity: ['low', 'medium-', 'medium', 'medium+', 'high'],
  tannin: ['low', 'medium-', 'medium', 'medium+', 'high'],
  alcohol: ['low', 'medium', 'high'],
  body: ['light', 'medium-', 'medium', 'medium+', 'full'],
  flavourIntensity: ['light', 'medium-', 'medium', 'medium+', 'pronounced'],
  finish: ['short', 'medium-', 'medium', 'medium+', 'long'],
  quality: ['faulty', 'poor', 'acceptable', 'good', 'very good', 'outstanding'],
  readiness: [
    'too young',
    'can drink now, but has potential for ageing',
    'drink now: not suitable for ageing or further ageing',
    'too old',
  ],
} as const satisfies Record<string, readonly string[]>;

export type ScaleName = keyof typeof SCALES;

export const COLOURS: Record<WineType, readonly string[]> = {
  white: ['lemon-green', 'lemon', 'gold', 'amber', 'brown'],
  rose: ['pink', 'salmon', 'orange'],
  red: ['purple', 'ruby', 'garnet', 'tawny', 'brown'],
};

export const OBSERVATIONS = ['legs', 'deposit', 'petillance', 'bubbles'] as const;
export type Observation = (typeof OBSERVATIONS)[number];

/** Structural fields the wine-profile scorer compares. */
export const STRUCTURE_FIELDS = [
  'appearanceIntensity',
  'noseIntensity',
  'sweetness',
  'acidity',
  'tannin',
  'alcohol',
  'body',
  'flavourIntensity',
  'finish',
] as const;
export type StructureField = (typeof STRUCTURE_FIELDS)[number];

/** Number of steps on a scale minus one, used to normalise distances. */
export function scaleSpan(field: ScaleName): number {
  return SCALES[field].length - 1;
}

export function label(field: ScaleName, index: number | null | undefined): string | null {
  if (index === null || index === undefined) return null;
  return SCALES[field][index] ?? null;
}

export interface Appearance {
  clarity: number | null;
  intensity: number | null;
  colour: string | null;
  observations: Observation[];
}

export interface Nose {
  condition: number | null;
  intensity: number | null;
  development: number | null;
  aromaIds: string[];
}

export interface Palate {
  sweetness: number | null;
  acidity: number | null;
  tannin: number | null;
  alcohol: number | null;
  body: number | null;
  flavourIntensity: number | null;
  finish: number | null;
  /** null means "same as the nose". */
  aromaIds: string[] | null;
}

export interface Conclusions {
  quality: number | null;
  readiness: number | null;
}

export interface TastingNote {
  id: string;
  createdAt: string;
  updatedAt: string;
  mode: 'practice' | 'exam';
  wineType: WineType;
  appearance: Appearance;
  nose: Nose;
  palate: Palate;
  conclusions: Conclusions;
  revealedProfileId: string | null;
  labelText: string | null;
  photoPath: string | null;
  freeNotes: string | null;
}

export type TastingNoteInput = Omit<TastingNote, 'id' | 'createdAt' | 'updatedAt'> & { id?: string };

/** Pulls the structural values out of a note in one flat record. */
export function structureOf(note: Pick<TastingNote, 'appearance' | 'nose' | 'palate'>): Record<StructureField, number | null> {
  return {
    appearanceIntensity: note.appearance.intensity,
    noseIntensity: note.nose.intensity,
    sweetness: note.palate.sweetness,
    acidity: note.palate.acidity,
    tannin: note.palate.tannin,
    alcohol: note.palate.alcohol,
    body: note.palate.body,
    flavourIntensity: note.palate.flavourIntensity,
    finish: note.palate.finish,
  };
}

export function emptyNote(wineType: WineType = 'red'): TastingNoteInput {
  return {
    mode: 'practice',
    wineType,
    appearance: { clarity: null, intensity: null, colour: null, observations: [] },
    nose: { condition: null, intensity: null, development: null, aromaIds: [] },
    palate: {
      sweetness: null,
      acidity: null,
      tannin: null,
      alcohol: null,
      body: null,
      flavourIntensity: null,
      finish: null,
      aromaIds: null,
    },
    conclusions: { quality: null, readiness: null },
    revealedProfileId: null,
    labelText: null,
    photoPath: null,
    freeNotes: null,
  };
}
