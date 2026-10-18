import type { Grape } from '../../core/src/content.ts';

// Drafted from the user's Spain and Portugal notes, in our own words. Check against your book, then set verified: true.
export default {
  id: 'grape:arinto',
  name: 'Arinto',
  colour: 'white',
  berryColour: '#C9C77A',
  synonyms: ['Pedernã'],
  traits: ['Keeps high acidity in heat', 'Citrus', 'Widely grown in Portugal'],
  structure: {
    cool: { appearanceIntensity: [0, 0], sweetness: [0, 0], acidity: [4, 4], body: [1, 2], alcohol: [1, 1], noseIntensity: [2, 2] },
    warm: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [3, 4], body: [2, 2], alcohol: [1, 1], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:lime', ripeness: 'less' },
    { aromaId: 'aroma:apple', ripeness: 'ripe' },
    { aromaId: 'aroma:wet-stones' },
  ],
  why: [{ factor: 'Holds its acidity even in hot regions', effect: 'freshness', result: 'used from cool Vinho Verde to hot Alentejo, often in blends' }],
  lookAlikes: [{ grapeId: 'grape:loureiro', tell: 'Loureiro is more floral and lighter.' }],
  regions: [
    { regionId: 'region:pt-vinho-verde', styleLevel: 2, style: 'Crisp, citrus.', producers: [] },
    { regionId: 'region:pt-lisboa', styleLevel: 2, style: 'Bucelas: lemony, high acid.', producers: [] },
    { regionId: 'region:pt-alentejo', styleLevel: 3, style: 'With Antão Vaz and Roupeiro: fruity, floral, medium to high acid; some oaked.', producers: [] },
  ],
  verified: false,
} satisfies Grape;
