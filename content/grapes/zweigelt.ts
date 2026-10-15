import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:zweigelt',
  name: 'Zweigelt',
  colour: 'red',
  berryColour: '#4A1C3E',
  traits: ['Crossing of Blaufränkisch and St. Laurent', 'Austria’s most planted red', 'Soft, fruity'],
  structure: {
    cool: { appearanceIntensity: [1, 2], acidity: [3, 3], tannin: [1, 2], body: [1, 2], alcohol: [1, 1], noseIntensity: [2, 2] },
    warm: { appearanceIntensity: [2, 2], acidity: [2, 3], tannin: [2, 2], body: [2, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:red-cherry', ripeness: 'less' },
    { aromaId: 'aroma:sour-cherry', ripeness: 'less' },
    { aromaId: 'aroma:black-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-pepper' },
  ],
  why: [{ factor: 'Ripens earlier than Blaufränkisch, soft tannin', effect: 'fruity, easy reds', result: 'from light and juicy to oaked and fuller' }],
  lookAlikes: [{ grapeId: 'grape:blaufrankisch', tell: 'Blaufränkisch is deeper, spicier and more structured.' }],
  regions: [{ regionId: 'region:at-neusiedlersee', styleLevel: 2, style: 'Warm lakeside: ripe, fruity Zweigelt.', producers: [] }],
  verified: false,
} satisfies Grape;
