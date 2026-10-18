import type { Grape } from '../../core/src/content.ts';

// Drafted from the user's Spain and Portugal notes, in our own words. Check against your book, then set verified: true.
export default {
  id: 'grape:alicante-bouschet',
  name: 'Alicante Bouschet',
  colour: 'red',
  berryColour: '#1A0A1C',
  synonyms: ['Garnacha Tintorera'],
  traits: ['Red flesh (teinturier)', 'Very deep colour', 'High tannin'],
  structure: {
    cool: { appearanceIntensity: [2, 2], acidity: [2, 3], tannin: [3, 4], body: [3, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [2, 2], tannin: [3, 4], body: [3, 4], alcohol: [2, 2], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:blackberry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-plum', ripeness: 'very' },
    { aromaId: 'aroma:black-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:chocolate-oak' },
  ],
  why: [{ factor: 'Red flesh as well as red skin', effect: 'a lot of colour and tannin', result: 'adds depth and structure to Alentejo blends' }],
  lookAlikes: [{ grapeId: 'grape:syrah', tell: 'Syrah is more peppery and savoury.' }],
  regions: [{ regionId: 'region:pt-alentejo', styleLevel: 4, style: 'Blended for colour and tannin; also some varietal wines.', producers: [] }],
  verified: false,
} satisfies Grape;
