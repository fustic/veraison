import type { Grape } from '../../core/src/content.ts';

// Drafted from the user's Spain and Portugal notes, in our own words. Check against your book, then set verified: true.
export default {
  id: 'grape:alfrocheiro',
  name: 'Alfrocheiro',
  colour: 'red',
  berryColour: '#2E1A35',
  traits: ['Deep colour', 'Intense blackberry and strawberry', 'Dão and Bairrada'],
  structure: {
    cool: { appearanceIntensity: [2, 2], acidity: [3, 3], tannin: [2, 3], body: [2, 3], alcohol: [1, 1], noseIntensity: [3, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [2, 3], tannin: [2, 3], body: [3, 3], alcohol: [1, 2], noseIntensity: [3, 4] },
  },
  aromas: [
    { aromaId: 'aroma:blackberry', ripeness: 'ripe' },
    { aromaId: 'aroma:strawberry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:dried-herbs' },
  ],
  why: [{ factor: 'Planted in the Dão replanting schemes', effect: 'deep colour, intense fruit', result: 'adds colour and aroma to blends' }],
  lookAlikes: [{ grapeId: 'grape:touriga-nacional', tell: 'Touriga Nacional is more tannic and floral (violet).' }],
  regions: [
    { regionId: 'region:pt-dao', styleLevel: 3, style: 'Deep colour, intense blackberry and strawberry.', producers: [] },
    { regionId: 'region:pt-bairrada', styleLevel: 3, style: 'Blended with Baga and Touriga Nacional.', producers: [] },
  ],
  verified: false,
} satisfies Grape;
