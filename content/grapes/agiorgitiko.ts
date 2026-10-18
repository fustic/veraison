import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:agiorgitiko',
  name: 'Agiorgitiko',
  colour: 'red',
  berryColour: '#3A1A40',
  synonyms: ['St George'],
  traits: ['Deep colour', 'Soft tannin', 'Versatile: rosé to oaked reds'],
  structure: {
    cool: { appearanceIntensity: [1, 2], acidity: [2, 3], tannin: [3, 3], body: [2, 3], alcohol: [1, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [1, 2], tannin: [3, 4], body: [3, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:raspberry', ripeness: 'less' },
    { aromaId: 'aroma:red-plum', ripeness: 'ripe' },
    { aromaId: 'aroma:black-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:jammy', ripeness: 'very' },
    { aromaId: 'aroma:cloves' },
    { aromaId: 'aroma:vanilla' },
  ],
  why: [
    { factor: 'Altitude bands in Nemea', effect: 'valley floor ripest, slopes fresher', result: 'soft, fruity wines low down; structured, oaked wines mid-slope; rosé from the highest sites' },
    { factor: 'Best wines from mid-slope Nemea', effect: 'deep ruby, high smooth tannin, low to medium acid', result: 'red fruit and spice; take new oak well and age' },
  ],
  lookAlikes: [{ grapeId: 'grape:merlot', tell: 'Similar soft, plummy fruit; Agiorgitiko is often spicier.' }],
  regions: [{ regionId: 'region:gr-nemea', styleLevel: 3, style: 'Soft, fruity, red plum and spice; premium wines oak-aged.', producers: [] }],
  verified: false,
} satisfies Grape;
