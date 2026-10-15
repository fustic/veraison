import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:malbec',
  name: 'Malbec',
  colour: 'red',
  berryColour: '#2A1533',
  synonyms: ['Côt', 'Auxerrois (Cahors)'],
  traits: ['Deep colour', 'Prone to coulure and frost', 'Needs sun and warmth', 'Ripe, velvety tannins at altitude'],
  structure: {
    cool: { appearanceIntensity: [2, 2], acidity: [3, 3], tannin: [3, 4], body: [2, 3], alcohol: [1, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [2, 3], tannin: [2, 3], body: [3, 4], alcohol: [1, 2], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:red-plum', ripeness: 'less' },
    { aromaId: 'aroma:blackberry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-plum', ripeness: 'ripe' },
    { aromaId: 'aroma:black-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:jammy', ripeness: 'very' },
    { aromaId: 'aroma:violet' },
    { aromaId: 'aroma:vanilla' },
    { aromaId: 'aroma:chocolate-oak' },
    { aromaId: 'aroma:cloves' },
    { aromaId: 'aroma:leather' },
  ],
  why: [
    { factor: 'High-altitude Mendoza: intense sunlight, cool nights', effect: 'thick skins, slow ripening', result: 'deep purple, ripe black fruit, soft ripe tannins and fresh acidity' },
    { factor: 'Cahors: cooler, more Atlantic', effect: 'less ripeness, firmer skins', result: 'deep, tannic, more savoury "black wine"' },
    { factor: 'Sensitive to coulure and frost', effect: 'unreliable crops in Bordeaux', result: 'now only a minor Bordeaux variety' },
    { factor: 'Oak maturation for premium wines', effect: 'vanilla, chocolate, sweet spice', result: 'rich, plush style' },
  ],
  lookAlikes: [
    { grapeId: 'grape:cabernet-sauvignon', tell: 'Cabernet has firmer tannin, more acidity and blackcurrant with leafy notes; Malbec is plusher, with plum and violet.' },
    { grapeId: 'grape:syrah', tell: 'Syrah shows black pepper and meaty notes; Malbec is fruitier and floral.' },
  ],
  regions: [
    { regionId: 'region:fr-south-west-cahors', styleLevel: 2, style: 'Deep colour, high tannin, black fruit and earthy notes; needs age.', producers: [] },
    { regionId: 'region:ar-uco-valley', styleLevel: 3, style: 'Highest Mendoza vineyards: intense colour, fresh acidity, floral lift.', producers: [] },
    { regionId: 'region:ar-lujan-de-cuyo', styleLevel: 4, style: 'Traditional heart of Mendoza Malbec: ripe plum and blackberry, velvety tannin, often oaked.', producers: ['Catena Zapata'] },
    { regionId: 'region:ar-salta', styleLevel: 5, style: 'Extreme altitude: very deep, concentrated, firm tannins.', producers: [] },
  ],
  alsoGrownIn: ['Chile', 'Bordeaux (minor)', 'Loire (as Côt)'],
  verified: false,
} satisfies Grape;
