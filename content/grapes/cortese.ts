import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:cortese',
  name: 'Cortese',
  colour: 'white',
  berryColour: '#CFD39A',
  traits: ['Keeps high acidity', 'Delicate, fairly neutral'],
  structure: {
    cool: { appearanceIntensity: [0, 0], sweetness: [0, 0], acidity: [3, 4], body: [1, 2], alcohol: [1, 1], noseIntensity: [1, 2] },
    warm: { appearanceIntensity: [0, 0], sweetness: [0, 0], acidity: [3, 3], body: [2, 2], alcohol: [1, 1], noseIntensity: [1, 2] },
  },
  aromas: [
    { aromaId: 'aroma:apple', ripeness: 'less' },
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:pear', ripeness: 'ripe' },
    { aromaId: 'aroma:acacia' },
    { aromaId: 'aroma:wet-stones' },
  ],
  why: [{ factor: 'Keeps its acidity in Piemonte’s warm summers, helped by breezes from Liguria', effect: 'crisp, light wines', result: 'Gavi: lemon, green apple, blossom' }],
  lookAlikes: [{ grapeId: 'grape:chardonnay', tell: 'Unoaked Chardonnay is fuller with more fruit.' }],
  regions: [{ regionId: 'region:it-piemonte-gavi', styleLevel: 3, style: 'Light to medium body, high acidity, citrus and blossom.', producers: [] }],
  verified: false,
} satisfies Grape;
