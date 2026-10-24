import type { Grape } from '../../core/src/content.ts';

// Drafted from the user's southern-hemisphere notes, in our own words. Check against your book, then set verified: true.
export default {
  id: 'grape:pais',
  name: 'País',
  colour: 'red',
  berryColour: '#6E2A40',
  synonyms: ['Listán Prieto', 'Mission', 'Criolla Chica'],
  traits: ['Old bush vines', 'Light colour', 'Rustic tannin', 'Southern Chile'],
  structure: {
    cool: { appearanceIntensity: [0, 1], acidity: [2, 3], tannin: [2, 2], body: [1, 2], alcohol: [1, 1], noseIntensity: [2, 2] },
    warm: { appearanceIntensity: [1, 1], acidity: [2, 2], tannin: [2, 3], body: [2, 2], alcohol: [1, 2], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:red-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:strawberry', ripeness: 'ripe' },
    { aromaId: 'aroma:earth' },
    { aromaId: 'aroma:dried-herbs' },
  ],
  why: [
    { factor: 'Brought by Spanish settlers; dominates Itata and Bío Bío with Muscat of Alexandria', effect: 'mostly simple wine for local drinking', result: 'long ignored' },
    { factor: 'Old, dry-farmed bush vines', effect: 'concentrated fruit', result: 'some producers now make light, fresh, distinctive reds' },
  ],
  lookAlikes: [{ grapeId: 'grape:gamay', tell: 'Gamay is fresher and more floral; País is earthier with rustic tannin.' }],
  regions: [
    { regionId: 'region:cl-itata-valley', styleLevel: 2, style: 'Old bush vines: light, earthy red fruit.', producers: [] },
    { regionId: 'region:cl-bio-bio-valley', styleLevel: 2, style: 'Mostly local wine.', producers: [] },
    { regionId: 'region:cl-maule-valley', styleLevel: 2, style: 'Old dry-farmed vines in the western hills.', producers: [] },
  ],
  verified: false,
} satisfies Grape;
