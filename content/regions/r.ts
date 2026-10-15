import type { Region } from '../../core/src/content.ts';

/** A region entry with empty lists filled in and verified: false. */
export const r = (x: Omit<Region, 'why' | 'principalGrapes' | 'otherGrapes' | 'labelTerms' | 'producers' | 'verified'> & Partial<Region>): Region => ({
  why: [],
  principalGrapes: [],
  otherGrapes: [],
  labelTerms: [],
  producers: [],
  verified: false,
  ...x,
});
