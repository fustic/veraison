import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:sangiovese',
  name: 'Sangiovese',
  colour: 'red',
  berryColour: '#4E1C3A',
  synonyms: ['Brunello', 'Prugnolo Gentile', 'Morellino', 'Nielluccio'],
  traits: ['Early budding, late ripening', 'High acidity, high tannin', 'Thin skins (rot risk)', 'Many clones'],
  structure: {
    cool: { appearanceIntensity: [1, 1], acidity: [4, 4], tannin: [3, 4], body: [2, 3], alcohol: [1, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [1, 2], acidity: [3, 4], tannin: [3, 4], body: [3, 4], alcohol: [2, 2], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:sour-cherry', ripeness: 'less' },
    { aromaId: 'aroma:red-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:red-plum', ripeness: 'ripe' },
    { aromaId: 'aroma:black-cherry', ripeness: 'very' },
    { aromaId: 'aroma:tomato-leaf' },
    { aromaId: 'aroma:dried-herbs' },
    { aromaId: 'aroma:vanilla' },
    { aromaId: 'aroma:cloves' },
    { aromaId: 'aroma:leather' },
    { aromaId: 'aroma:earth' },
    { aromaId: 'aroma:game' },
    { aromaId: 'aroma:dried-cranberry' },
    { aromaId: 'aroma:meaty' },
  ],
  why: [
    { factor: 'Late ripening', effect: 'needs warm, sunny slopes', result: 'cool sites and vintages give lean, very acidic wines' },
    { factor: 'Thin skins', effect: 'rot risk in wet harvests', result: 'vintage variation' },
    { factor: 'Chianti Classico: altitude, poor galestro and alberese soils', effect: 'slow ripening, fresh acidity', result: 'elegant, savoury, sour cherry' },
    { factor: 'Montalcino: warmer and drier', effect: 'riper grapes', result: 'Brunello: fuller, more powerful, 100% Sangiovese, released after 5 years' },
    { factor: 'Large old botti or small new barriques', effect: 'little oak flavour, or vanilla and spice', result: 'traditional and modern styles' },
    { factor: 'Blended with Cabernet and Merlot (Super Tuscans)', effect: 'more colour, body and black fruit', result: 'international-style IGT Toscana' },
    { factor: 'Bottle age', effect: 'primary fruit fades', result: 'meaty, gamey notes' },
  ],
  lookAlikes: [
    { grapeId: 'grape:nebbiolo', tell: 'Nebbiolo is paler, more tannic and more perfumed (rose, tar).' },
    { grapeId: 'grape:tempranillo', tell: 'Tempranillo has softer acidity and often vanilla–coconut from American oak.' },
    { grapeId: 'grape:pinot-noir', tell: 'Pinot Noir has much less tannin and no tomato-leaf note.' },
  ],
  regions: [
    { regionId: 'region:it-tuscany-chianti', styleLevel: 2, style: 'Light to medium body, sour cherry, high acidity; drink young.', producers: [] },
    { regionId: 'region:it-tuscany-chianti-classico', styleLevel: 3, style: 'At least 80% Sangiovese; savoury, elegant; Riserva and Gran Selezione at the top.', producers: ['Castello di Ama', 'Fontodi'] },
    { regionId: 'region:it-tuscany-vino-nobile-di-montepulciano', styleLevel: 3, style: 'As Prugnolo Gentile: between Chianti Classico and Brunello in weight.', producers: [] },
    { regionId: 'region:it-tuscany-maremma', styleLevel: 4, style: 'Coastal warmth: riper, softer; Morellino di Scansano.', producers: [] },
    { regionId: 'region:it-tuscany-brunello-di-montalcino', styleLevel: 5, style: 'Full, powerful, firm; long oak ageing; Rosso di Montalcino is the younger version.', producers: ['Biondi-Santi', 'Case Basse (Soldera)'] },
    { regionId: 'region:au-heathcote', styleLevel: 3, style: 'Shows promise; suits heat and little water.', producers: [] },
  ],
  alsoGrownIn: ['Umbria (Montefalco)', 'Romagna', 'Corsica (Nielluccio)', 'California', 'Australia'],
  verified: false,
} satisfies Grape;
