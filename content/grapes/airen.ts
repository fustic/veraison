import type { Grape } from '../../core/src/content.ts';

// Drafted from the user's Spain and Portugal notes, in our own words. Check against your book, then set verified: true.
export default {
  id: 'grape:airen',
  name: 'Airén',
  colour: 'white',
  berryColour: '#D3C98A',
  traits: ['Spain’s most planted grape', 'Copes with extreme heat and drought', 'Neutral'],
  structure: {
    cool: { appearanceIntensity: [0, 0], sweetness: [0, 0], acidity: [2, 2], body: [1, 2], alcohol: [1, 1], noseIntensity: [0, 1] },
    warm: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [1, 2], body: [2, 2], alcohol: [1, 1], noseIntensity: [1, 1] },
  },
  aromas: [
    { aromaId: 'aroma:apple', ripeness: 'less' },
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:melon', ripeness: 'ripe' },
  ],
  why: [
    { factor: 'Survives the heat and drought of the Meseta Central', effect: 'planted in huge areas of La Mancha', result: 'Spain’s most widely planted grape' },
    { factor: 'Neutral flavour', effect: 'acceptable fresh dry whites', result: 'much still goes into Brandy de Jerez; plantings falling as Tempranillo replaces it' },
  ],
  lookAlikes: [{ grapeId: 'grape:trebbiano', tell: 'Both neutral; Trebbiano usually has higher acidity.' }],
  regions: [
    { regionId: 'region:es-la-mancha', styleLevel: 1, style: 'Neutral, fresh, inexpensive dry white; also brandy base.', producers: [] },
    { regionId: 'region:es-valdepenas', styleLevel: 1, style: 'Most planted grape; simple whites.', producers: [] },
  ],
  verified: false,
} satisfies Grape;
