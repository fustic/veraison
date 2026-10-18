import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:marsanne',
  name: 'Marsanne',
  colour: 'white',
  berryColour: '#D8C26A',
  traits: ['Full body', 'Low to medium acidity', 'Ages to honey and nuts', 'Blended with Roussanne'],
  structure: {
    cool: { appearanceIntensity: [1, 1], sweetness: [0, 0], acidity: [1, 2], body: [3, 4], alcohol: [1, 2], noseIntensity: [1, 2] },
    warm: { appearanceIntensity: [1, 2], sweetness: [0, 0], acidity: [1, 1], body: [3, 4], alcohol: [2, 2], noseIntensity: [2, 2] },
  },
  aromas: [
    { aromaId: 'aroma:pear', ripeness: 'less' },
    { aromaId: 'aroma:peach', ripeness: 'ripe' },
    { aromaId: 'aroma:melon', ripeness: 'ripe' },
    { aromaId: 'aroma:honeysuckle' },
    { aromaId: 'aroma:honey' },
    { aromaId: 'aroma:nutty' },
    { aromaId: 'aroma:hazelnut' },
  ],
  why: [
    { factor: 'Low acidity, high extract', effect: 'broad, waxy texture', result: 'full-bodied whites that can turn flabby in hot sites' },
    { factor: 'Bottle age', effect: 'tertiary development', result: 'honey, nuts and beeswax after a decade' },
    { factor: 'Blended with Roussanne', effect: 'Marsanne gives weight, Roussanne acidity and perfume', result: 'whites that age to hazelnut' },
  ],
  lookAlikes: [{ grapeId: 'grape:viognier', tell: 'Viognier is far more perfumed; Marsanne is broad and quieter.' }],
  regions: [
    { regionId: 'region:fr-rhone-hermitage', styleLevel: 4, style: 'White Hermitage: full, long-lived, honeyed with age.', producers: [] },
    { regionId: 'region:fr-rhone-crozes-hermitage', styleLevel: 2, style: 'Fresher, earlier-drinking whites.', producers: [] },
    { regionId: 'region:fr-rhone-saint-joseph', styleLevel: 2, style: 'With Roussanne in whites.', producers: [] },
  ],
  alsoGrownIn: ['Victoria (Nagambie Lakes)', 'Switzerland (Ermitage)'],
  verified: false,
} satisfies Grape;
