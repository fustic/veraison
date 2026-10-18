import type { Grape } from '../../core/src/content.ts';

// Drafted from the user's Spain and Portugal notes, in our own words. Check against your book, then set verified: true.
export default {
  id: 'grape:trincadeira',
  name: 'Trincadeira',
  colour: 'red',
  berryColour: '#3A1830',
  synonyms: ['Tinta Amarela'],
  traits: ['Drought tolerant', 'Spicy red berry', 'Medium tannin'],
  structure: {
    cool: { appearanceIntensity: [1, 2], acidity: [2, 3], tannin: [2, 2], body: [2, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [2, 2], tannin: [2, 2], body: [3, 3], alcohol: [2, 2], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:raspberry', ripeness: 'ripe' },
    { aromaId: 'aroma:red-plum', ripeness: 'ripe' },
    { aromaId: 'aroma:black-pepper' },
    { aromaId: 'aroma:dried-herbs' },
  ],
  why: [{ factor: 'Copes with drought', effect: 'suits the hot, dry Alentejo', result: 'spicy red-berry fruit and medium tannin in blends with Aragonês' }],
  lookAlikes: [{ grapeId: 'grape:tempranillo', tell: 'Tempranillo has more strawberry and takes oak notes of vanilla and leather.' }],
  regions: [
    { regionId: 'region:pt-alentejo', styleLevel: 3, style: 'With Aragonês and Alicante Bouschet: spicy red berries.', producers: [] },
    { regionId: 'region:pt-douro', styleLevel: 2, style: 'As Tinta Amarela, a minor blending grape.', producers: [] },
  ],
  verified: false,
} satisfies Grape;
