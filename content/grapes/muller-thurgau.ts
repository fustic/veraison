import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:muller-thurgau',
  name: 'Müller-Thurgau',
  colour: 'white',
  berryColour: '#D0D58A',
  synonyms: ['Rivaner'],
  traits: ['Early ripening', 'High yields', 'Low acidity', 'Mildly floral'],
  structure: {
    cool: { appearanceIntensity: [0, 0], sweetness: [0, 2], acidity: [2, 2], body: [1, 2], alcohol: [0, 1], noseIntensity: [1, 2] },
    warm: { appearanceIntensity: [0, 0], sweetness: [0, 2], acidity: [1, 2], body: [1, 2], alcohol: [1, 1], noseIntensity: [1, 2] },
  },
  aromas: [
    { aromaId: 'aroma:apple', ripeness: 'less' },
    { aromaId: 'aroma:peach', ripeness: 'ripe' },
    { aromaId: 'aroma:blossom' },
  ],
  why: [{ factor: 'Bred for early ripening and reliable yields', effect: 'ripens anywhere in Germany', result: 'soft, mildly floral, inexpensive wine (once the base of Liebfraumilch)' }],
  lookAlikes: [{ grapeId: 'grape:riesling', tell: 'Riesling has much higher acidity and intensity.' }],
  regions: [
    { regionId: 'region:de-rheinhessen', styleLevel: 1, style: 'Volume wines, often medium-dry.', producers: [] },
    { regionId: 'region:de-baden', styleLevel: 2, style: 'As Rivaner: dry and fresh.', producers: [] },
  ],
  alsoGrownIn: ['Alto Adige', 'England', 'Luxembourg'],
  verified: false,
} satisfies Grape;
