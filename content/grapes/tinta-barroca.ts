import type { Grape } from '../../core/src/content.ts';

// Drafted from the user's Spain and Portugal notes, in our own words. Check against your book, then set verified: true.
export default {
  id: 'grape:tinta-barroca',
  name: 'Tinta Barroca',
  colour: 'red',
  berryColour: '#2C1430',
  traits: ['Early ripening', 'High sugar', 'Soft, fruity', 'Douro blending grape'],
  structure: {
    cool: { appearanceIntensity: [2, 2], acidity: [2, 2], tannin: [2, 3], body: [3, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [1, 2], tannin: [2, 3], body: [3, 4], alcohol: [2, 2], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:blackberry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:jammy', ripeness: 'very' },
  ],
  why: [{ factor: 'Ripens early with high sugar', effect: 'soft, rich, fruity wine', result: 'adds flesh to Port and Douro blends; best on cooler, north-facing sites' }],
  lookAlikes: [{ grapeId: 'grape:touriga-franca', tell: 'Touriga Franca is more floral and structured.' }],
  regions: [
    { regionId: 'region:pt-douro', styleLevel: 3, style: 'One of the five main Port and Douro grapes: soft, sweet black fruit.', producers: [] },
    { regionId: 'region:pt-douro-baixo-corgo', styleLevel: 2, style: 'Lighter wines from the coolest sub-region.', producers: [] },
  ],
  verified: false,
} satisfies Grape;
