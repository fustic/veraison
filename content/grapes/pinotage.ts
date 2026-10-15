import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:pinotage',
  name: 'Pinotage',
  colour: 'red',
  berryColour: '#3E1A3A',
  traits: ['Pinot Noir × Cinsault, bred in South Africa', 'Early ripening', 'High sugar, deep colour'],
  structure: {
    cool: { appearanceIntensity: [1, 2], acidity: [3, 3], tannin: [2, 3], body: [2, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [2, 3], tannin: [2, 3], body: [3, 3], alcohol: [2, 2], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:red-plum', ripeness: 'less' },
    { aromaId: 'aroma:black-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:blackberry', ripeness: 'ripe' },
    { aromaId: 'aroma:jammy', ripeness: 'very' },
    { aromaId: 'aroma:smoke' },
    { aromaId: 'aroma:coffee-oak' },
    { aromaId: 'aroma:vanilla' },
    { aromaId: 'aroma:earth' },
  ],
  why: [
    { factor: 'Bred to join Pinot Noir’s quality with Cinsault’s hardiness', effect: 'easy to grow, ripens early', result: 'deep, fruity reds' },
    { factor: 'Range of winemaking', effect: 'light and fruity to heavily oaked', result: 'from fruity rosé to "coffee" Pinotage and Cape Blends' },
  ],
  lookAlikes: [{ grapeId: 'grape:pinot-noir', tell: 'Pinot Noir is paler and more delicate.' }],
  regions: [{ regionId: 'region:za-stellenbosch', styleLevel: 3, style: 'Premium oaked Pinotage and Cape Blends.', producers: ['Kanonkop'] }],
  verified: false,
} satisfies Grape;
