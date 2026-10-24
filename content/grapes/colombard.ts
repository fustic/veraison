import type { Grape } from '../../core/src/content.ts';

// Drafted from the user's southern-hemisphere notes, in our own words. Check against your book, then set verified: true.
export default {
  id: 'grape:colombard',
  name: 'Colombard',
  colour: 'white',
  berryColour: '#D0CB82',
  traits: ['High acidity', 'High yields', 'Brandy base', 'Fruity, simple'],
  structure: {
    cool: { appearanceIntensity: [0, 0], sweetness: [0, 1], acidity: [3, 4], body: [1, 1], alcohol: [1, 1], noseIntensity: [2, 2] },
    warm: { appearanceIntensity: [0, 1], sweetness: [0, 1], acidity: [3, 3], body: [1, 2], alcohol: [1, 1], noseIntensity: [2, 2] },
  },
  aromas: [
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:apple', ripeness: 'less' },
    { aromaId: 'aroma:peach', ripeness: 'ripe' },
    { aromaId: 'aroma:passion-fruit', ripeness: 'very' },
  ],
  why: [{ factor: 'Keeps high acidity in hot, irrigated regions', effect: 'fresh, neutral to fruity juice', result: 'brandy base and inexpensive whites (South Africa, California, Gascony)' }],
  lookAlikes: [{ grapeId: 'grape:chenin-blanc', tell: 'Chenin has more body and apple-quince depth.' }],
  regions: [
    { regionId: 'region:za-worcester', styleLevel: 1, style: 'Large volumes, much distilled.', producers: [] },
    { regionId: 'region:za-breede-river-valley', styleLevel: 1, style: 'Second most planted white in South Africa; brandy base.', producers: [] },
    { regionId: 'region:za-orange-river', styleLevel: 1, style: 'Inexpensive whites.', producers: [] },
  ],
  alsoGrownIn: ['California Central Valley', 'Gascony (IGP Côtes de Gascogne)'],
  verified: false,
} satisfies Grape;
