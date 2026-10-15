import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:verdejo',
  name: 'Verdejo',
  colour: 'white',
  berryColour: '#C7CF7A',
  traits: ['Aromatic, herbaceous', 'Prone to oxidation', 'Often harvested at night'],
  structure: {
    cool: { appearanceIntensity: [0, 0], sweetness: [0, 0], acidity: [3, 3], body: [2, 2], alcohol: [1, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [2, 3], body: [2, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:apple', ripeness: 'less' },
    { aromaId: 'aroma:peach', ripeness: 'ripe' },
    { aromaId: 'aroma:grass' },
    { aromaId: 'aroma:fennel' },
    { aromaId: 'aroma:almond' },
  ],
  why: [
    { factor: 'Prone to oxidation', effect: 'protective handling: night picking, inert gas, cool ferment', result: 'fresh, aromatic style' },
    { factor: 'High plateau of Rueda: hot days, cold nights', effect: 'keeps acidity', result: 'fresh, herbal whites with a bitter-almond finish' },
  ],
  lookAlikes: [{ grapeId: 'grape:sauvignon-blanc', tell: 'Often blended in Rueda; Sauvignon is more pungent, Verdejo has fennel and a bitter-almond finish.' }],
  regions: [{ regionId: 'region:es-rueda', styleLevel: 3, style: 'Fresh, citrus and herbal; some lees- or oak-aged premium examples.', producers: [] }],
  verified: false,
} satisfies Grape;
