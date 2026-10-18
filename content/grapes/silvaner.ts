import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:silvaner',
  name: 'Silvaner',
  colour: 'white',
  berryColour: '#C8D08A',
  synonyms: ['Sylvaner'],
  traits: ['Neutral, earthy', 'Fresh acidity', 'Franken speciality'],
  structure: {
    cool: { appearanceIntensity: [0, 0], sweetness: [0, 0], acidity: [3, 3], body: [1, 2], alcohol: [1, 1], noseIntensity: [1, 2] },
    warm: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [2, 3], body: [2, 2], alcohol: [1, 1], noseIntensity: [1, 2] },
  },
  aromas: [
    { aromaId: 'aroma:apple', ripeness: 'less' },
    { aromaId: 'aroma:pear', ripeness: 'ripe' },
    { aromaId: 'aroma:dried-herbs' },
    { aromaId: 'aroma:wet-stones' },
  ],
  why: [
    { factor: 'Continental Franken, limestone and marl soils', effect: 'subtle fruit, firm acidity', result: 'dry, earthy, mineral wines, traditionally in the flat Bocksbeutel bottle' },
    { factor: 'Replaced by the noble varieties in Alsace', effect: 'fewer plantings', result: 'delicately perfumed wines, best drunk young' },
    { factor: 'Early flowering and ripening, so frost-prone', effect: 'planted on the warmest sites in Franken', result: 'rare concentration: dry, rich, earthy' },
    { factor: 'Less acidic and less fruity than Riesling', effect: 'subtle, sometimes earthy', result: 'dry and sweet styles; high quality on the right site' },
  ],
  lookAlikes: [{ grapeId: 'grape:riesling', tell: 'Riesling is far more aromatic and acidic.' }],
  regions: [
    { regionId: 'region:de-franken', styleLevel: 3, style: 'Dry, earthy, mineral.', producers: [] },
    { regionId: 'region:de-rheinhessen', styleLevel: 2, style: 'Widely planted; fresh, simple.', producers: [] },
    { regionId: 'region:fr-alsace', styleLevel: 2, style: 'As Sylvaner: light and fresh.', producers: [] },
  ],
  verified: false,
} satisfies Grape;
