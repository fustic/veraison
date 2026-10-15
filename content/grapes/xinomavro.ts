import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:xinomavro',
  name: 'Xinomavro',
  colour: 'red',
  berryColour: '#5E2240',
  traits: ['High acidity, high tannin', 'Pale colour', 'Long-lived', 'Often compared with Nebbiolo'],
  structure: {
    cool: { appearanceIntensity: [0, 1], acidity: [4, 4], tannin: [4, 4], body: [2, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [1, 1], acidity: [3, 4], tannin: [3, 4], body: [3, 3], alcohol: [2, 2], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:sour-cherry', ripeness: 'less' },
    { aromaId: 'aroma:raspberry', ripeness: 'ripe' },
    { aromaId: 'aroma:red-plum', ripeness: 'ripe' },
    { aromaId: 'aroma:tomato-leaf' },
    { aromaId: 'aroma:dried-herbs' },
    { aromaId: 'aroma:dried-cranberry' },
    { aromaId: 'aroma:leather' },
    { aromaId: 'aroma:earth' },
  ],
  why: [{ factor: 'Moderate, continental, hillside Naoussa', effect: 'slow ripening, firm structure', result: 'pale, savoury, tannic reds that age into dried fruit and leather' }],
  lookAlikes: [{ grapeId: 'grape:nebbiolo', tell: 'Very similar structure; Nebbiolo is more floral (rose) with tar.' }],
  regions: [{ regionId: 'region:gr-naoussa', styleLevel: 3, style: 'Red fruit, tomato, olive and herbs; high acid and tannin.', producers: [] }],
  verified: false,
} satisfies Grape;
