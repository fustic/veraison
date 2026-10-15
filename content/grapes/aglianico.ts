import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:aglianico',
  name: 'Aglianico',
  colour: 'red',
  berryColour: '#2A1430',
  traits: ['Early budding, very late ripening', 'High acidity, high tannin', 'Deep colour', 'Volcanic hillsides'],
  structure: {
    cool: { appearanceIntensity: [2, 2], acidity: [4, 4], tannin: [4, 4], body: [3, 4], alcohol: [1, 2], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [3, 4], tannin: [4, 4], body: [3, 4], alcohol: [2, 2], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:sour-cherry', ripeness: 'less' },
    { aromaId: 'aroma:black-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:blackberry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-plum', ripeness: 'very' },
    { aromaId: 'aroma:dried-herbs' },
    { aromaId: 'aroma:smoke' },
    { aromaId: 'aroma:leather' },
    { aromaId: 'aroma:earth' },
    { aromaId: 'aroma:tar' },
  ],
  why: [
    { factor: 'Very late ripening (picked as late as November)', effect: 'needs the warm south', result: 'Campania and Basilicata' },
    { factor: 'High-altitude volcanic sites', effect: 'cool nights keep acidity', result: 'structured, long-lived reds' },
    { factor: 'Very high tannin and acidity', effect: 'tough when young', result: 'needs years in oak and bottle' },
  ],
  lookAlikes: [{ grapeId: 'grape:nebbiolo', tell: 'Nebbiolo is pale with red fruit and rose; Aglianico is deep with black fruit.' }],
  regions: [
    { regionId: 'region:it-campania-taurasi', styleLevel: 4, style: 'Full, tannic, high acid; black cherry, smoke, earth; long-lived.', producers: ['Mastroberardino'] },
    { regionId: 'region:it-basilicata-aglianico-del-vulture', styleLevel: 4, style: 'Slopes of an extinct volcano: firm, fresh, dark.', producers: [] },
  ],
  verified: false,
} satisfies Grape;
