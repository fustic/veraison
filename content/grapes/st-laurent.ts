import type { Grape } from '../../core/src/content.ts';

// Drafted from the user's Austria notes and general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:st-laurent',
  name: 'St. Laurent',
  colour: 'red',
  berryColour: '#3A1838',
  synonyms: ['Sankt Laurent'],
  traits: ['Austrian speciality', 'Pinot Noir-like', 'Parent of Zweigelt'],
  structure: {
    cool: { appearanceIntensity: [1, 1], acidity: [3, 3], tannin: [1, 2], body: [1, 2], alcohol: [1, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [1, 2], acidity: [2, 3], tannin: [2, 2], body: [2, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:sour-cherry', ripeness: 'less' },
    { aromaId: 'aroma:red-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:vanilla' },
    { aromaId: 'aroma:forest-floor' },
  ],
  why: [{ factor: 'Pinot-like fruit, usually oak-aged', effect: 'silky, cherry, with oak spice', result: 'used alone or blended with Pinot Noir, Cabernet or Merlot' }],
  lookAlikes: [{ grapeId: 'grape:pinot-noir', tell: 'Very similar; St. Laurent is often a little darker and softer in acidity.' }],
  regions: [{ regionId: 'region:at-burgenland', styleLevel: 3, style: 'Cherry fruit, silky texture, often oaked.', producers: [] }],
  alsoGrownIn: ['Czechia'],
  verified: false,
} satisfies Grape;
