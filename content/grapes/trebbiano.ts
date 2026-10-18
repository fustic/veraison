import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:trebbiano',
  name: 'Trebbiano',
  colour: 'white',
  berryColour: '#D2D29A',
  synonyms: ['Ugni Blanc', 'Trebbiano Toscano'],
  traits: ['Very high yields', 'High acidity', 'Neutral', 'Distilled for Cognac and Armagnac'],
  structure: {
    cool: { appearanceIntensity: [0, 0], sweetness: [0, 0], acidity: [3, 4], body: [1, 1], alcohol: [1, 1], noseIntensity: [0, 1] },
    warm: { appearanceIntensity: [0, 0], sweetness: [0, 0], acidity: [2, 3], body: [1, 2], alcohol: [1, 1], noseIntensity: [0, 1] },
  },
  aromas: [
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:apple', ripeness: 'less' },
    { aromaId: 'aroma:pear', ripeness: 'ripe' },
  ],
  why: [
    { factor: 'High yields, neutral flavour, high acidity', effect: 'light, crisp, simple wine', result: 'inexpensive Italian whites and IGP Côtes de Gascogne' },
    { factor: 'Low alcohol, high acidity base wine', effect: 'ideal for distilling', result: 'main grape of Cognac and Armagnac' },
  ],
  lookAlikes: [{ grapeId: 'grape:melon-blanc', tell: 'Muscadet is similarly neutral but often has bready lees notes.' }],
  regions: [
    { regionId: 'region:fr-south-west-cotes-de-gascogne', styleLevel: 1, style: 'As Ugni Blanc, often with Colombard: crisp, fruity, inexpensive.', producers: [] },
    { regionId: 'region:it-umbria-orvieto', styleLevel: 2, style: 'As Procanico, blended with Grechetto.', producers: [] },
    { regionId: 'region:it-lazio-frascati', styleLevel: 2, style: 'Blended with Malvasia: fresh, unoaked, citrus.', producers: [] },
  ],
  alsoGrownIn: ['Tuscany (Vin Santo with Malvasia)', 'Abruzzo', 'Cognac'],
  verified: false,
} satisfies Grape;
