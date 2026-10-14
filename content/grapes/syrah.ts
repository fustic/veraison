import type { Grape } from '../../core/src/content.ts';

// Drafted from the user's notes on red winemaking. Check against your book, then set verified: true.
// "Cool" stands for the Northern Rhône and cooler Australian regions, "warm" for hot regions such as Barossa.
export default {
  id: 'grape:syrah',
  name: 'Syrah',
  colour: 'red',
  berryColour: '#1F1530',
  synonyms: ['Shiraz'],
  traits: ['Small berries', 'Thick, dark skins', 'Will not ripen in very cool climates', 'Ages well'],
  structure: {
    cool: { appearanceIntensity: [2, 2], acidity: [2, 3], tannin: [2, 3], body: [2, 3], alcohol: [1, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [1, 2], tannin: [3, 4], body: [3, 4], alcohol: [2, 2], noseIntensity: [3, 4] },
  },
  aromas: [
    { aromaId: 'aroma:blackberry', ripeness: 'less' },
    { aromaId: 'aroma:blueberry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-plum', ripeness: 'ripe' },
    { aromaId: 'aroma:jammy', ripeness: 'very' },
    { aromaId: 'aroma:cooked-blackberry', ripeness: 'very' },
    { aromaId: 'aroma:black-pepper' },
    { aromaId: 'aroma:dried-herbs' },
    { aromaId: 'aroma:liquorice' },
    { aromaId: 'aroma:toast-oak' },
    { aromaId: 'aroma:meaty' },
    { aromaId: 'aroma:leather' },
    { aromaId: 'aroma:earth' },
  ],
  why: [
    { factor: 'Small berries with thick, dark skins', effect: 'deep colour, high tannin, intense fruit', result: 'the best wines age for a long time' },
    { factor: 'Northern Rhône is its cool limit', effect: 'site decides ripeness', result: 'steep south-facing slopes (Côte-Rôtie, Hermitage) give fuller, peppery wines; lesser sites light, herbaceous and grippy' },
    { factor: 'Hot climate', effect: 'very ripe grapes', result: 'full body, soft tannin, very ripe black fruit, liquorice, high alcohol' },
    { factor: 'Cooler climate', effect: 'slower ripening', result: 'leaner, medium-bodied, more peppery wines' },
    { factor: 'Vigorous cap management and new oak', effect: 'maximum extraction plus toasty flavours', result: 'powerful, concentrated style' },
    { factor: 'Earlier picking, gentle extraction, some whole bunches, long post-fermentation maceration, 300–500 L older barrels', effect: 'lower alcohol, finer tannin, less oak flavour', result: 'restrained, elegant style' },
  ],
  lookAlikes: [
    { grapeId: 'grape:grenache', tell: 'Grenache is paler with red fruit, softer tannin and higher alcohol; Syrah is deep purple with black fruit and pepper.' },
    { grapeId: 'grape:cabernet-sauvignon', tell: 'Cabernet shows blackcurrant, cedar and leafy notes with higher acidity; Syrah has pepper, blueberry and meaty notes.' },
  ],
  regions: [
    {
      regionId: 'region:fr-rhone-cote-rotie',
      styleLevel: 2,
      style: 'Northern Rhône, steep south-facing slopes: medium to full body, black and blue berries, pepper; meat and leather after a few years.',
      producers: [],
    },
    {
      regionId: 'region:fr-rhone-hermitage',
      styleLevel: 3,
      style: 'Northern Rhône hill of Hermitage: fuller and firmer, black fruit and pepper, long-lived.',
      producers: [],
    },
    {
      regionId: 'region:au-heathcote',
      styleLevel: 2,
      style: 'Cooler Australia (also Great Southern and Geelong): leaner, more peppery Shiraz.',
      producers: [],
    },
    {
      regionId: 'region:fr-languedoc',
      styleLevel: 3,
      style: 'Blended with Grenache, Mourvèdre, Carignan and Cinsault (also in Roussillon); riper fruit and tannins.',
      producers: [],
    },
    {
      regionId: 'region:au-hunter-valley',
      styleLevel: 4,
      style: 'Hot region: soft, earthy, spicy Shiraz with concentrated black fruit.',
      producers: [],
    },
    {
      regionId: 'region:au-barossa-valley',
      styleLevel: 5,
      style: 'Hot region: full body, concentrated very ripe black fruit, liquorice, soft tannins; often new oak.',
      producers: [],
    },
  ],
  alsoGrownIn: ['Chile', 'South Africa', "Hawke's Bay", 'Washington State'],
  verified: false,
} satisfies Grape;
