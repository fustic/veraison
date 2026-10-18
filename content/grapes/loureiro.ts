import type { Grape } from '../../core/src/content.ts';

// Drafted from the user's Spain and Portugal notes, in our own words. Check against your book, then set verified: true.
export default {
  id: 'grape:loureiro',
  name: 'Loureiro',
  colour: 'white',
  berryColour: '#CFCB8A',
  traits: ['Aromatic, floral', 'High acidity', 'Vinho Verde'],
  structure: {
    cool: { appearanceIntensity: [0, 0], sweetness: [0, 1], acidity: [4, 4], body: [0, 1], alcohol: [0, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [0, 0], sweetness: [0, 1], acidity: [3, 4], body: [1, 1], alcohol: [1, 1], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:blossom' },
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:lime', ripeness: 'less' },
    { aromaId: 'aroma:apple', ripeness: 'ripe' },
  ],
  why: [{ factor: 'Cool, very wet north-west Portugal', effect: 'high acid, low alcohol', result: 'light, floral, citrus Vinho Verde, sometimes with a slight spritz' }],
  lookAlikes: [{ grapeId: 'grape:albarino', tell: 'Alvarinho is riper, fuller and more stone-fruited.' }],
  regions: [{ regionId: 'region:pt-vinho-verde', styleLevel: 2, style: 'Pale, high acid, 8–11.5%, floral and citrus; often off-dry at the lowest alcohol.', producers: [] }],
  verified: false,
} satisfies Grape;
