import type { Grape } from '../../core/src/content.ts';

// Drafted from the user's Italy notes, in our own words. Check against your book, then set verified: true.
export default {
  id: 'grape:teroldego',
  name: 'Teroldego',
  colour: 'red',
  berryColour: '#2A1530',
  traits: ['Deep colour', 'High acidity', 'Medium(+) to high tannin', 'Trentino'],
  structure: {
    cool: { appearanceIntensity: [2, 2], acidity: [4, 4], tannin: [3, 3], body: [2, 3], alcohol: [1, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [3, 4], tannin: [3, 4], body: [3, 4], alcohol: [1, 2], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:blackberry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-plum', ripeness: 'very' },
    { aromaId: 'aroma:violet' },
    { aromaId: 'aroma:vanilla' },
  ],
  why: [
    { factor: 'Grown on Trentino’s mid-slopes and valley floor', effect: 'ripens fully in the warmer sites', result: 'deep, medium to full body, black fruit' },
    { factor: 'High acidity and firm tannin, usually oak-aged', effect: 'structure for the cellar', result: 'the best examples age' },
  ],
  lookAlikes: [{ grapeId: 'grape:dolcetto', tell: 'Dolcetto is also deep and purple but has only medium acidity.' }],
  regions: [{ regionId: 'region:it-trentino', styleLevel: 3, style: 'Deep colour, high acid, firm tannin, black fruit; oak-matured; best age.', producers: [] }],
  verified: false,
} satisfies Grape;
