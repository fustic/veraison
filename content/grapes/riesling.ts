import type { Grape } from '../../core/src/content.ts';

// Drafted from the user's notes on white winemaking. Check against your book, then set verified: true.
export default {
  id: 'grape:riesling',
  name: 'Riesling',
  colour: 'white',
  berryColour: '#C3CF6A',
  traits: ['Aromatic', 'Very winter-hardy', 'Late budding', 'Keeps high acidity', 'Ages for decades'],
  structure: {
    // Sweetness spans dry to luscious in cool regions; warm-region styles are mostly dry.
    cool: { appearanceIntensity: [0, 0], sweetness: [0, 5], acidity: [4, 4], body: [0, 1], alcohol: [0, 1], noseIntensity: [2, 4] },
    warm: { appearanceIntensity: [0, 1], sweetness: [0, 1], acidity: [3, 4], body: [1, 2], alcohol: [1, 1], noseIntensity: [3, 4] },
  },
  aromas: [
    { aromaId: 'aroma:apple', ripeness: 'less' },
    { aromaId: 'aroma:pear', ripeness: 'less' },
    { aromaId: 'aroma:lime', ripeness: 'ripe' },
    { aromaId: 'aroma:lemon', ripeness: 'ripe' },
    { aromaId: 'aroma:peach', ripeness: 'very' },
    { aromaId: 'aroma:apricot', ripeness: 'very' },
    { aromaId: 'aroma:blossom' },
    { aromaId: 'aroma:honey' },
    { aromaId: 'aroma:toast-bottle' },
    { aromaId: 'aroma:petrol' },
    { aromaId: 'aroma:dried-apricot' },
    { aromaId: 'aroma:marmalade' },
  ],
  why: [
    { factor: 'Very tolerant of winter cold, buds late', effect: 'escapes spring frost', result: 'thrives in cool climates' },
    { factor: 'Cool climate', effect: 'slow ripening', result: 'green fruit and floral notes; warmer sites give citrus and stone fruit but less delicacy' },
    { factor: 'Keeps its high acidity while sugar builds', effect: 'balanced at any sweetness', result: 'dry to luscious and botrytised styles' },
    { factor: 'Inert vessels or old foudres, no MLC, no new oak', effect: 'nothing masks the fruit', result: 'pure, aromatic wine' },
    { factor: 'Bottle age', effect: 'honey, toast and petrol-like notes', result: 'still fresh after years thanks to the acidity' },
  ],
  lookAlikes: [
    { grapeId: 'grape:sauvignon-blanc', tell: 'Sauvignon Blanc is grassy and herbaceous; Riesling is floral with lime and stone fruit, and develops petrol and honey with age.' },
    { grapeId: 'grape:chardonnay', tell: 'Unoaked Chablis is far less aromatic, with no floral lift, and never shows petrol.' },
  ],
  regions: [
    {
      regionId: 'region:de',
      styleLevel: 1,
      style: 'Germany is Riesling’s home: every sweetness level, the sweetest from botrytised grapes, always balanced by high acidity.',
      producers: [],
    },
    {
      regionId: 'region:us-finger-lakes',
      styleLevel: 2,
      style: 'Fruity, off-dry style.',
      producers: [],
    },
    {
      regionId: 'region:au-clare-valley',
      styleLevel: 2,
      style: 'Bone dry, high acidity, lime.',
      producers: [],
    },
    {
      regionId: 'region:au-eden-valley',
      styleLevel: 2,
      style: 'Bone dry, high acidity, lime.',
      producers: [],
    },
    {
      regionId: 'region:at',
      styleLevel: 3,
      style: 'Austria makes the full range, but most wines are either dry or very sweet.',
      producers: [],
    },
    {
      regionId: 'region:fr-alsace',
      styleLevel: 4,
      style: 'Mainly dry; late-harvest and botrytised sweet wines in suitable vintages. Old foudres common.',
      producers: [],
    },
  ],
  alsoGrownIn: ['Washington State (dry)', 'New Zealand (off-dry)'],
  verified: false,
} satisfies Grape;
