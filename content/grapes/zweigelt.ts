import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:zweigelt',
  name: 'Zweigelt',
  colour: 'red',
  berryColour: '#4A1C3E',
  traits: ['Crossing of Blaufränkisch and St. Laurent', 'Austria’s most planted red', 'Soft, fruity'],
  structure: {
    cool: { appearanceIntensity: [2, 2], acidity: [3, 3], tannin: [1, 2], body: [1, 2], alcohol: [1, 1], noseIntensity: [2, 2] },
    warm: { appearanceIntensity: [2, 2], acidity: [2, 3], tannin: [2, 2], body: [2, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:red-cherry', ripeness: 'less' },
    { aromaId: 'aroma:sour-cherry', ripeness: 'less' },
    { aromaId: 'aroma:black-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-pepper' },
    { aromaId: 'aroma:bramble' },
  ],
  why: [
    { factor: 'Ripens earlier than Blaufränkisch, soft tannin', effect: 'fruity, easy reds', result: 'from light and juicy to oaked and fuller' },
    { factor: 'Austria’s most planted black grape', effect: 'very deep colour, soft tannin', result: 'bramble fruit; Neusiedlersee DAC' },
  ],
  lookAlikes: [{ grapeId: 'grape:blaufrankisch', tell: 'Blaufränkisch has higher acidity, more pepper and sour cherry, and firmer structure; Zweigelt is softer and brambly.' }],
  regions: [{ regionId: 'region:at-neusiedlersee', styleLevel: 2, style: 'Warm lakeside: ripe, fruity Zweigelt.', producers: [] }],
  verified: false,
} satisfies Grape;
