import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:negroamaro',
  name: 'Negroamaro',
  colour: 'red',
  berryColour: '#2E1730',
  traits: ['Thick skins', 'Copes with heat', 'Deep colour', 'Bitter edge'],
  structure: {
    cool: { appearanceIntensity: [2, 2], acidity: [2, 3], tannin: [2, 3], body: [3, 3], alcohol: [2, 2], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [2, 2], tannin: [2, 3], body: [3, 4], alcohol: [2, 2], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:black-plum', ripeness: 'ripe' },
    { aromaId: 'aroma:blackberry', ripeness: 'ripe' },
    { aromaId: 'aroma:prune', ripeness: 'very' },
    { aromaId: 'aroma:dried-herbs' },
    { aromaId: 'aroma:earth' },
    { aromaId: 'aroma:chocolate-oak' },
  ],
  why: [{ factor: 'Hot, flat Salento peninsula', effect: 'very ripe grapes', result: 'full, rich, earthy reds with a bitter twist; also deep rosato' }],
  lookAlikes: [{ grapeId: 'grape:zinfandel', tell: 'Primitivo is jammier and more raisined.' }],
  regions: [{ regionId: 'region:it-puglia-salice-salentino', styleLevel: 3, style: 'Blended with a little Malvasia Nera: plum, earth, soft tannin.', producers: [] }],
  verified: false,
} satisfies Grape;
