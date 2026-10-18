import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:petit-verdot',
  name: 'Petit Verdot',
  colour: 'red',
  berryColour: '#24122E',
  traits: ['Very late ripening', 'Deep colour', 'High tannin', 'Blending variety in Bordeaux'],
  structure: {
    cool: { appearanceIntensity: [2, 2], acidity: [3, 4], tannin: [3, 4], body: [3, 3], alcohol: [1, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [2, 3], tannin: [3, 4], body: [3, 4], alcohol: [2, 2], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:blackcurrant', ripeness: 'less' },
    { aromaId: 'aroma:blackberry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:jammy', ripeness: 'very' },
    { aromaId: 'aroma:violet' },
    { aromaId: 'aroma:dried-herbs' },
  ],
  why: [
    { factor: 'Ripens later than Cabernet Sauvignon', effect: 'only ripens fully in warm Bordeaux vintages', result: 'used in small amounts for colour, tannin and spice' },
    { factor: 'Warm New World regions', effect: 'ripens reliably', result: 'occasional deep, tannic varietal wines' },
    { factor: 'Only ripens fully in very hot years', effect: 'very deep colour, tannic, slow-ageing wine', result: 'never more than a minor part of the blend: tannin, colour, spice' },
  ],
  lookAlikes: [{ grapeId: 'grape:cabernet-sauvignon', tell: 'Petit Verdot is even deeper and more floral, with violet; rarely met on its own.' }],
  regions: [{ regionId: 'region:fr-bordeaux-haut-medoc', styleLevel: 3, style: 'A few per cent of Left Bank blends for colour, tannin and spice.', producers: [] }],
  alsoGrownIn: ['Australia', 'Spain', 'California', 'Chile'],
  verified: false,
} satisfies Grape;
