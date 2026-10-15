import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:vermentino',
  name: 'Vermentino',
  colour: 'white',
  berryColour: '#C9CF8A',
  synonyms: ['Rolle'],
  traits: ['Aromatic: citrus and herbs', 'Drought tolerant', 'Coastal Mediterranean'],
  structure: {
    cool: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [2, 3], body: [1, 2], alcohol: [1, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [2, 2], body: [2, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:grapefruit', ripeness: 'less' },
    { aromaId: 'aroma:peach', ripeness: 'ripe' },
    { aromaId: 'aroma:dried-herbs' },
    { aromaId: 'aroma:almond' },
  ],
  why: [{ factor: 'Sea breezes on Mediterranean coasts', effect: 'temper the heat', result: 'fresh, citrusy, herbal whites' }],
  lookAlikes: [{ grapeId: 'grape:sauvignon-blanc', tell: 'Sauvignon is more pungent and grassy; Vermentino more herbal with a bitter-almond finish.' }],
  regions: [
    { regionId: 'region:it-sardinia', styleLevel: 3, style: 'Vermentino di Gallura DOCG: fuller, herbal, saline.', producers: [] },
    { regionId: 'region:fr-provence', styleLevel: 2, style: 'As Rolle: in whites and in rosé blends.', producers: [] },
  ],
  alsoGrownIn: ['Liguria', 'Tuscan coast', 'Corsica', 'Australia'],
  verified: false,
} satisfies Grape;
