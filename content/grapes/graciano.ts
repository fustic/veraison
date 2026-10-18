import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:graciano',
  name: 'Graciano',
  colour: 'red',
  berryColour: '#2A1530',
  traits: ['Low yields', 'Late ripening', 'High acidity', 'Deep colour, aromatic'],
  structure: {
    cool: { appearanceIntensity: [2, 2], acidity: [3, 4], tannin: [3, 3], body: [2, 3], alcohol: [1, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [3, 3], tannin: [3, 3], body: [3, 3], alcohol: [1, 2], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:blackberry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:violet' },
    { aromaId: 'aroma:dried-herbs' },
  ],
  why: [
    { factor: 'High acidity, colour and aroma', effect: 'lifts and freshens Tempranillo', result: 'a small but valued part of Rioja blends' },
    { factor: 'Highly valued but hard to grow', effect: 'small amounts add black fruit, acidity and tannin', result: 'helps many of the finest Riojas age' },
  ],
  lookAlikes: [{ grapeId: 'grape:tempranillo', tell: 'Tempranillo is softer in acidity and redder in fruit.' }],
  regions: [{ regionId: 'region:es-rioja', styleLevel: 3, style: 'Blending partner for freshness, colour and perfume.', producers: [] }],
  verified: false,
} satisfies Grape;
