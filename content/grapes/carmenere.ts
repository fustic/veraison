import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:carmenere',
  name: 'Carmenère',
  colour: 'red',
  berryColour: '#2E1838',
  traits: ['Very late ripening', 'Herbaceous if under-ripe', 'Chile’s signature variety', 'Long mistaken for Merlot'],
  structure: {
    cool: { appearanceIntensity: [2, 2], acidity: [2, 3], tannin: [2, 3], body: [2, 3], alcohol: [1, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [2, 2], tannin: [2, 3], body: [3, 4], alcohol: [2, 2], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:red-plum', ripeness: 'less' },
    { aromaId: 'aroma:blackberry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-plum', ripeness: 'ripe' },
    { aromaId: 'aroma:jammy', ripeness: 'very' },
    { aromaId: 'aroma:green-bell-pepper' },
    { aromaId: 'aroma:black-pepper' },
    { aromaId: 'aroma:dried-herbs' },
    { aromaId: 'aroma:vanilla' },
    { aromaId: 'aroma:chocolate-oak' },
  ],
  why: [
    { factor: 'Ripens even later than Cabernet Sauvignon', effect: 'needs a long, warm season', result: 'warm Chilean valleys suit it; Bordeaux largely gave it up' },
    { factor: 'Picked before full ripeness', effect: 'methoxypyrazines remain', result: 'strong green pepper and leafy notes' },
    { factor: 'Fully ripe', effect: 'soft tannin, ripe fruit', result: 'plump black fruit with a peppery, herbal edge' },
  ],
  lookAlikes: [
    { grapeId: 'grape:merlot', tell: 'Merlot rarely has Carmenère’s green pepper and black-pepper spice.' },
    { grapeId: 'grape:cabernet-franc', tell: 'Cabernet Franc is lighter, with more red fruit and higher acidity.' },
  ],
  regions: [
    { regionId: 'region:cl-maipo-valley', styleLevel: 3, style: 'Often blended with Cabernet Sauvignon.', producers: [] },
    { regionId: 'region:cl-cachapoal-valley', styleLevel: 4, style: 'Warm Rapel sub-region; ripe, full varietal wines.', producers: [] },
    { regionId: 'region:cl-colchagua-valley', styleLevel: 4, style: 'Warm and sunny: ripe black fruit, soft tannin, spice.', producers: [] },
  ],
  alsoGrownIn: ['Bordeaux (rare)', 'North-east Italy'],
  verified: false,
} satisfies Grape;
