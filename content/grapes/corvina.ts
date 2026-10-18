import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
// Structure: "cool" = Valpolicella / Bardolino, "warm" = Amarone (from dried grapes).
export default {
  id: 'grape:corvina',
  name: 'Corvina',
  colour: 'red',
  berryColour: '#5A1E36',
  synonyms: ['Corvina Veronese'],
  traits: ['Thick skins (suits drying)', 'High acidity', 'Low tannin and colour', 'Late ripening'],
  structure: {
    cool: { appearanceIntensity: [0, 1], acidity: [3, 4], tannin: [1, 2], body: [1, 2], alcohol: [1, 1], noseIntensity: [2, 2] },
    warm: { appearanceIntensity: [1, 2], sweetness: [0, 1], acidity: [3, 4], tannin: [3, 3], body: [4, 4], alcohol: [2, 2], noseIntensity: [3, 4] },
  },
  aromas: [
    { aromaId: 'aroma:sour-cherry', ripeness: 'less' },
    { aromaId: 'aroma:red-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:kirsch', ripeness: 'very' },
    { aromaId: 'aroma:raisin' },
    { aromaId: 'aroma:prune' },
    { aromaId: 'aroma:almond' },
    { aromaId: 'aroma:cloves' },
    { aromaId: 'aroma:chocolate-oxidative' },
  ],
  why: [
    { factor: 'Thick skins', effect: 'resist rot while drying for months after picking (appassimento)', result: 'Amarone (dry, 15%+) and Recioto (sweet)' },
    { factor: 'Valpolicella: fresh, light', effect: 'high acidity, little tannin', result: 'sour cherry and a bitter-almond finish' },
    { factor: 'Ripasso: Valpolicella refermented on Amarone skins', effect: 'more extract, alcohol and flavour', result: 'between Valpolicella and Amarone in weight' },
    { factor: 'Moderate colour, low to medium tannin, high acidity', effect: 'other local grapes are added to the blend', result: 'more colour and tannin in Valpolicella' },
  ],
  lookAlikes: [
    { grapeId: 'grape:pinot-noir', tell: 'Pinot Noir is earthier, without the bitter-almond finish.' },
    { grapeId: 'grape:gamay', tell: 'Gamay is juicier, often with banana from carbonic maceration.' },
  ],
  regions: [
    { regionId: 'region:it-veneto-bardolino', styleLevel: 1, style: 'Light, fresh, red cherry; also Chiaretto rosé.', producers: [] },
    { regionId: 'region:it-veneto-valpolicella', styleLevel: 2, style: 'Light to medium body, sour cherry, high acidity; Ripasso is fuller.', producers: [] },
    { regionId: 'region:it-veneto-amarone-della-valpolicella', styleLevel: 5, style: 'Dried grapes fermented dry: full, high alcohol, raisin, kirsch, chocolate.', producers: ['Allegrini', 'Dal Forno', 'Quintarelli'] },
  ],
  verified: false,
} satisfies Grape;
