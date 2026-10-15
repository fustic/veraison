import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:greco',
  name: 'Greco',
  colour: 'white',
  berryColour: '#CFC07A',
  traits: ['High acidity', 'Mineral, stone fruit'],
  structure: {
    cool: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [3, 4], body: [2, 2], alcohol: [1, 1], noseIntensity: [2, 2] },
    warm: { appearanceIntensity: [1, 1], sweetness: [0, 0], acidity: [3, 3], body: [2, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:peach', ripeness: 'ripe' },
    { aromaId: 'aroma:apricot', ripeness: 'very' },
    { aromaId: 'aroma:almond' },
    { aromaId: 'aroma:wet-stones' },
  ],
  why: [{ factor: 'Volcanic tufa soils and altitude around Tufo', effect: 'fresh acidity', result: 'crisp, mineral, stone-fruited whites' }],
  lookAlikes: [{ grapeId: 'grape:fiano', tell: 'Fiano is rounder and waxier.' }],
  regions: [{ regionId: 'region:it-campania-greco-di-tufo', styleLevel: 3, style: 'High acidity, peach, citrus, almond.', producers: [] }],
  verified: false,
} satisfies Grape;
