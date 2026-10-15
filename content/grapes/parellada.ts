import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:parellada',
  name: 'Parellada',
  colour: 'white',
  berryColour: '#D3D2A0',
  traits: ['Delicate, floral', 'Fresh acidity', 'Planted at higher altitude'],
  structure: {
    cool: { appearanceIntensity: [0, 0], sweetness: [0, 0], acidity: [3, 3], body: [0, 1], alcohol: [0, 1], noseIntensity: [1, 2] },
    warm: { appearanceIntensity: [0, 0], sweetness: [0, 0], acidity: [2, 3], body: [1, 2], alcohol: [1, 1], noseIntensity: [1, 2] },
  },
  aromas: [
    { aromaId: 'aroma:apple', ripeness: 'less' },
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:blossom' },
  ],
  why: [{ factor: 'Delicate and fresh', effect: 'adds finesse and floral notes', result: 'the lightest of the three Cava grapes' }],
  lookAlikes: [{ grapeId: 'grape:xarello', tell: 'Xarel·lo is fuller and earthier.' }],
  regions: [{ regionId: 'region:es-penedes', styleLevel: 2, style: 'In Cava blends, from higher, cooler sites.', producers: [] }],
  verified: false,
} satisfies Grape;
