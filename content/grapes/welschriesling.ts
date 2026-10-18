import type { Grape } from '../../core/src/content.ts';

// Drafted from the user's Austria notes and general WSET Level 3 knowledge. Check against your book, then set verified: true.
// Not related to Riesling.
export default {
  id: 'grape:welschriesling',
  name: 'Welschriesling',
  colour: 'white',
  berryColour: '#C9CF8A',
  synonyms: ['Olaszrizling', 'Graševina', 'Riesling Italico'],
  traits: ['Not related to Riesling', 'High acidity', 'Prone to noble rot', 'Austria’s second white grape'],
  structure: {
    cool: { appearanceIntensity: [0, 0], sweetness: [0, 0], acidity: [4, 4], body: [1, 1], alcohol: [1, 1], noseIntensity: [1, 2] },
    warm: { appearanceIntensity: [1, 2], sweetness: [4, 5], acidity: [3, 4], body: [3, 4], alcohol: [1, 1], noseIntensity: [3, 4] },
  },
  aromas: [
    { aromaId: 'aroma:apple', ripeness: 'less' },
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:apricot', ripeness: 'very' },
    { aromaId: 'aroma:honey' },
    { aromaId: 'aroma:dried-apricot' },
    { aromaId: 'aroma:marmalade' },
  ],
  why: [
    { factor: 'Dry wines', effect: 'high acid, citrus and green apple', result: 'fresh but simple' },
    { factor: 'Susceptible to botrytis by Lake Neusiedl', effect: 'noble rot almost every year', result: 'high-quality BA, TBA and Ausbruch' },
  ],
  lookAlikes: [{ grapeId: 'grape:riesling', tell: 'Riesling is far more aromatic and intense; Welschriesling is neutral when dry.' }],
  regions: [{ regionId: 'region:at-neusiedlersee', styleLevel: 5, style: 'Botrytised sweet wines: honey, apricot, marmalade, high acidity.', producers: ['Kracher'] }],
  alsoGrownIn: ['Burgenland (dry)', 'Steiermark', 'Hungary', 'Croatia'],
  verified: false,
} satisfies Grape;
