// Shapes of the study content in /content. Everything here is authored by hand,
// checked against the course book, and compiled into content.db by tools/build-content.ts.

import type { StructureField, WineType } from './sat.ts';

/** A closed range of indices on a SAT scale, e.g. acidity [3, 4] = medium+ to high. */
export type Range = readonly [min: number, max: number];
export type StructureRanges = Partial<Record<StructureField, Range>>;

export type AromaLevel = 'primary' | 'secondary' | 'tertiary';
export type AppliesTo = 'white' | 'red' | 'both';

/** How an aroma is drawn: one of the shared icon shapes plus one or two colours. */
export interface AromaIcon {
  shape: string;
  c1: string;
  c2?: string;
}

export interface Aroma {
  id: string; // aroma:red-cherry
  label: string;
  level: AromaLevel;
  cluster: string; // "Red fruit"
  appliesTo: AppliesTo;
  icon: AromaIcon;
}

export type Ripeness = 'less' | 'ripe' | 'very';

export interface GrapeAroma {
  aromaId: string;
  /** Only for fruit aromas: where it sits on the ripeness slider. */
  ripeness?: Ripeness;
}

/** factor → effect → result, the shape every short written answer needs. */
export interface CauseCard {
  factor: string;
  effect: string;
  result?: string;
}

export interface GrapeRegion {
  regionId: string;
  /** 1 = lightest / most savoury … 5 = ripest / fullest expression of this grape. */
  styleLevel: 1 | 2 | 3 | 4 | 5;
  style: string;
  producers: string[];
}

export interface LookAlike {
  grapeId: string;
  tell: string;
}

export interface Grape {
  id: string; // grape:pinot-noir
  name: string;
  colour: Exclude<WineType, 'rose'>;
  /** Skin colour of ripe berries (hex), for the grape picture. */
  berryColour: string;
  synonyms?: string[];
  traits: string[];
  structure: { cool: StructureRanges; warm: StructureRanges };
  aromas: GrapeAroma[];
  why: CauseCard[];
  lookAlikes: LookAlike[];
  regions: GrapeRegion[];
  alsoGrownIn?: string[];
  /** Flip to true once you have checked the entry against the course book. */
  verified: boolean;
}

export type RegionLevel = 'country' | 'region' | 'district' | 'appellation';
export type ClimateType = 'cool' | 'moderate' | 'warm' | 'hot';
export type ClimateInfluence = 'maritime' | 'continental' | 'mediterranean';

export interface Region {
  id: string; // region:fr-bordeaux-pauillac
  name: string;
  parentId: string | null;
  level: RegionLevel;
  /** [longitude, latitude]. Placeholder geometry until real boundaries are imported. */
  centroid: readonly [number, number];
  /** Rough size for the placeholder polygon, in kilometres. */
  radiusKm: number;
  climate?: { type: ClimateType; influence: ClimateInfluence };
  why: CauseCard[];
  soils?: string;
  principalGrapes: string[];
  otherGrapes: string[];
  labelTerms: string[];
  producers: string[];
  verified: boolean;
}

/** A wine you could be poured in the exam, used by the "what is this?" scorer. */
export interface WineProfile {
  id: string; // profile:chablis-premier-cru
  name: string;
  wineType: WineType;
  grapeIds: string[];
  regionId: string;
  structure: StructureRanges;
  /** aroma id → importance 1 (sometimes) … 3 (signature). */
  aromas: Record<string, 1 | 2 | 3>;
  verified: boolean;
}

export interface ContentBundle {
  version: string;
  aromas: Aroma[];
  grapes: Grape[];
  regions: Region[];
  profiles: WineProfile[];
}
