import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:viura',
  name: 'Viura',
  colour: 'white',
  berryColour: '#CFCB8A',
  synonyms: ['Macabeo', 'Macabeu'],
  traits: ['Late budding, late ripening', 'Fairly neutral', 'Prone to oxidation'],
  structure: {
    cool: { appearanceIntensity: [0, 0], sweetness: [0, 0], acidity: [2, 3], body: [1, 2], alcohol: [1, 1], noseIntensity: [1, 2] },
    warm: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [2, 2], body: [2, 3], alcohol: [1, 1], noseIntensity: [1, 2] },
  },
  aromas: [
    { aromaId: 'aroma:apple', ripeness: 'less' },
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:blossom' },
    { aromaId: 'aroma:vanilla' },
    { aromaId: 'aroma:hazelnut' },
  ],
  why: [
    { factor: 'Neutral grape', effect: 'takes on winemaking character', result: 'fresh unoaked white Rioja, or traditional long-oaked nutty styles' },
    { factor: 'Fresh acidity and neutrality', effect: 'a clean base wine', result: 'main grape of Cava with Xarel·lo and Parellada' },
  ],
  lookAlikes: [{ grapeId: 'grape:chardonnay', tell: 'Unoaked Chardonnay has a little more fruit and body.' }],
  regions: [
    { regionId: 'region:es-rioja', styleLevel: 2, style: 'White Rioja: fresh and unoaked, or oak-aged, nutty and oxidative.', producers: ['R. López de Heredia'] },
    { regionId: 'region:es-penedes', styleLevel: 2, style: 'As Macabeo: the base of Cava.', producers: [] },
  ],
  alsoGrownIn: ['Roussillon (Macabeu)'],
  verified: false,
} satisfies Grape;
