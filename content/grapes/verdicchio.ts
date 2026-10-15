import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:verdicchio',
  name: 'Verdicchio',
  colour: 'white',
  berryColour: '#C5CD8A',
  traits: ['High acidity', 'Can age', 'Bitter-almond finish'],
  structure: {
    cool: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [3, 4], body: [1, 2], alcohol: [1, 1], noseIntensity: [1, 2] },
    warm: { appearanceIntensity: [1, 1], sweetness: [0, 0], acidity: [3, 3], body: [2, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:apple', ripeness: 'less' },
    { aromaId: 'aroma:pear', ripeness: 'ripe' },
    { aromaId: 'aroma:fennel' },
    { aromaId: 'aroma:almond' },
    { aromaId: 'aroma:honey' },
  ],
  why: [
    { factor: 'Keeps its acidity', effect: 'structure for ageing', result: 'develops honey and nutty notes' },
    { factor: 'Matelica: higher, more continental', effect: 'cooler', result: 'leaner, more acidic than Castelli di Jesi' },
  ],
  lookAlikes: [{ grapeId: 'grape:garganega', tell: 'Soave is softer, with more stone fruit.' }],
  regions: [{ regionId: 'region:it-marche-verdicchio-dei-castelli-di-jesi', styleLevel: 3, style: 'Citrus, green apple, fennel, almond; Riserva ages well.', producers: [] }],
  verified: false,
} satisfies Grape;
