import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:roussanne',
  name: 'Roussanne',
  colour: 'white',
  berryColour: '#C9A65A',
  traits: ['Aromatic (herbal, floral)', 'Fresher acidity than Marsanne', 'Irregular yields, prone to mildew'],
  structure: {
    cool: { appearanceIntensity: [1, 1], sweetness: [0, 0], acidity: [2, 3], body: [2, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [1, 2], sweetness: [0, 0], acidity: [2, 2], body: [3, 4], alcohol: [2, 2], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:pear', ripeness: 'less' },
    { aromaId: 'aroma:peach', ripeness: 'ripe' },
    { aromaId: 'aroma:apricot', ripeness: 'very' },
    { aromaId: 'aroma:blossom' },
    { aromaId: 'aroma:dried-herbs' },
    { aromaId: 'aroma:honey' },
    { aromaId: 'aroma:hazelnut' },
  ],
  why: [{ factor: 'Blended with Marsanne', effect: 'adds aroma and acidity to Marsanne’s body', result: 'balanced Rhône whites that age well' }],
  lookAlikes: [{ grapeId: 'grape:marsanne', tell: 'Marsanne is broader with lower acidity; Roussanne more herbal and perfumed.' }],
  regions: [
    { regionId: 'region:fr-rhone-hermitage', styleLevel: 4, style: 'Blending partner in white Hermitage.', producers: [] },
    { regionId: 'region:fr-rhone-chateauneuf-du-pape', styleLevel: 4, style: 'Part of rich white Châteauneuf blends.', producers: [] },
    { regionId: 'region:za-swartland', styleLevel: 3, style: 'In Chenin-based white blends.', producers: [] },
  ],
  alsoGrownIn: ['Savoie (Bergeron)', 'California'],
  verified: false,
} satisfies Grape;
