import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:pinot-blanc',
  name: 'Pinot Blanc',
  colour: 'white',
  berryColour: '#C9D29A',
  synonyms: ['Pinot Bianco', 'Weissburgunder'],
  traits: ['Fairly neutral', 'Medium acidity', 'White mutation of Pinot'],
  structure: {
    cool: { appearanceIntensity: [0, 0], sweetness: [0, 0], acidity: [2, 3], body: [1, 2], alcohol: [1, 1], noseIntensity: [1, 2] },
    warm: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [2, 2], body: [2, 3], alcohol: [1, 2], noseIntensity: [1, 2] },
  },
  aromas: [
    { aromaId: 'aroma:apple', ripeness: 'less' },
    { aromaId: 'aroma:pear', ripeness: 'ripe' },
    { aromaId: 'aroma:peach', ripeness: 'very' },
    { aromaId: 'aroma:blossom' },
  ],
  why: [
    { factor: 'Gentle, neutral fruit', effect: 'soft, round, easy wines', result: 'a staple of Crémant d’Alsace and dry Alsace and Alto Adige whites' },
    { factor: 'Planted on the fertile plain rather than the slopes', effect: 'light, simple, non-aromatic', result: 'widely used for Crémant d’Alsace; Auxerrois is similar but spicier and fuller' },
  ],
  lookAlikes: [{ grapeId: 'grape:chardonnay', tell: 'Unoaked Chardonnay is very similar; Pinot Blanc is usually lighter.' }],
  regions: [
    { regionId: 'region:fr-alsace', styleLevel: 2, style: 'Soft, apple and pear; main grape of Crémant d’Alsace.', producers: [] },
    { regionId: 'region:it-alto-adige', styleLevel: 3, style: 'As Pinot Bianco: fresh, precise.', producers: [] },
    { regionId: 'region:de-baden', styleLevel: 3, style: 'As Weissburgunder: dry, fuller.', producers: [] },
  ],
  alsoGrownIn: ['Austria (Weissburgunder)'],
  verified: false,
} satisfies Grape;
