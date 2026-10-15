import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:xarello',
  name: 'Xarel·lo',
  colour: 'white',
  berryColour: '#C7C68A',
  traits: ['Gives body and structure', 'Herbal notes', 'Catalan variety'],
  structure: {
    cool: { appearanceIntensity: [0, 0], sweetness: [0, 0], acidity: [3, 3], body: [2, 2], alcohol: [1, 1], noseIntensity: [1, 2] },
    warm: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [2, 3], body: [2, 3], alcohol: [1, 1], noseIntensity: [2, 2] },
  },
  aromas: [
    { aromaId: 'aroma:apple', ripeness: 'less' },
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:dried-herbs' },
  ],
  why: [{ factor: 'Body and structure', effect: 'backbone of the Cava blend', result: 'helps traditional-method Cava age' }],
  lookAlikes: [{ grapeId: 'grape:viura', tell: 'Macabeo is more neutral and floral; Xarel·lo fuller and more herbal.' }],
  regions: [{ regionId: 'region:es-penedes', styleLevel: 3, style: 'Cava blends and still Penedès whites.', producers: [] }],
  verified: false,
} satisfies Grape;
