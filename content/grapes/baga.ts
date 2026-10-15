import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:baga',
  name: 'Baga',
  colour: 'red',
  berryColour: '#3A1534',
  traits: ['Thick skins', 'Very high tannin and acidity', 'Late ripening', 'Prone to rot'],
  structure: {
    cool: { appearanceIntensity: [2, 2], acidity: [4, 4], tannin: [4, 4], body: [2, 3], alcohol: [1, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [3, 4], tannin: [4, 4], body: [3, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:sour-cherry', ripeness: 'less' },
    { aromaId: 'aroma:red-plum', ripeness: 'ripe' },
    { aromaId: 'aroma:blackberry', ripeness: 'ripe' },
    { aromaId: 'aroma:dried-herbs' },
    { aromaId: 'aroma:tar' },
    { aromaId: 'aroma:leather' },
    { aromaId: 'aroma:earth' },
  ],
  why: [
    { factor: 'Late ripening in damp, Atlantic Bairrada', effect: 'rot risk, vintage variation', result: 'harvest timing is a gamble' },
    { factor: 'Very tannic skins', effect: 'traditionally harsh and long-lived', result: 'modern destemming and gentler extraction make softer wines' },
  ],
  lookAlikes: [{ grapeId: 'grape:nebbiolo', tell: 'Both very tannic and acidic; Nebbiolo is paler and more floral.' }],
  regions: [{ regionId: 'region:pt-bairrada', styleLevel: 3, style: 'Tannic, high-acid reds that need age; also traditional-method sparkling.', producers: [] }],
  verified: false,
} satisfies Grape;
