import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:pinot-meunier',
  name: 'Meunier',
  colour: 'red',
  berryColour: '#4E2440',
  synonyms: ['Pinot Meunier', 'Schwarzriesling'],
  traits: ['Buds later and ripens earlier than Pinot Noir', 'Frost-avoiding', 'Fruity, develops quickly'],
  structure: {
    cool: { appearanceIntensity: [0, 0], acidity: [4, 4], tannin: [0, 1], body: [1, 2], alcohol: [1, 1], noseIntensity: [2, 2] },
    warm: { appearanceIntensity: [0, 0], acidity: [3, 4], tannin: [0, 1], body: [1, 2], alcohol: [1, 1], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:redcurrant', ripeness: 'less' },
    { aromaId: 'aroma:red-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:strawberry', ripeness: 'ripe' },
    { aromaId: 'aroma:raspberry', ripeness: 'ripe' },
  ],
  why: [
    { factor: 'Late budding, early ripening', effect: 'avoids spring frost and ripens reliably', result: 'suits the frost-prone Vallée de la Marne' },
    { factor: 'Fruity, early-developing', effect: 'adds fruit and roundness to young blends', result: 'important in non-vintage Champagne' },
  ],
  lookAlikes: [{ grapeId: 'grape:pinot-noir', tell: 'Pinot Noir gives more body and structure to the blend.' }],
  regions: [{ regionId: 'region:fr-champagne-vallee-de-la-marne', styleLevel: 3, style: 'Fruity, supple base wines for Champagne blends.', producers: [] }],
  alsoGrownIn: ['England', 'Germany (Schwarzriesling)', 'Australia'],
  verified: false,
} satisfies Grape;
