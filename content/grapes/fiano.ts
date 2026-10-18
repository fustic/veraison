import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:fiano',
  name: 'Fiano',
  colour: 'white',
  berryColour: '#C9B86A',
  traits: ['Thick skins', 'Low yields', 'Waxy texture', 'Ages to honey and nuts'],
  structure: {
    cool: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [2, 3], body: [2, 3], alcohol: [1, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [1, 1], sweetness: [0, 0], acidity: [2, 2], body: [3, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:pear', ripeness: 'less' },
    { aromaId: 'aroma:peach', ripeness: 'ripe' },
    { aromaId: 'aroma:melon', ripeness: 'ripe' },
    { aromaId: 'aroma:acacia' },
    { aromaId: 'aroma:honey' },
    { aromaId: 'aroma:nutty' },
    { aromaId: 'aroma:mango' },
  ],
  why: [
    { factor: 'Thick skins, low yields', effect: 'concentrated flavour', result: 'waxy, medium to full body' },
    { factor: 'Hills around Avellino', effect: 'cool nights keep acidity', result: 'fresh but textured; gains honey and nuts with age' },
    { factor: 'Often made for early drinking; better examples oak-matured', effect: 'more texture and age-worthiness', result: 'stone fruit, melon and mango young; wax and honey with age' },
  ],
  lookAlikes: [{ grapeId: 'grape:greco', tell: 'Greco is leaner and more acidic; Fiano rounder and waxier.' }],
  regions: [{ regionId: 'region:it-campania-fiano-di-avellino', styleLevel: 3, style: 'Stone fruit, blossom, waxy texture; ages well.', producers: ['Mastroberardino'] }],
  alsoGrownIn: ['Sicily', 'Puglia', 'Australia'],
  verified: false,
} satisfies Grape;
