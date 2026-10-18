import type { Grape } from '../../core/src/content.ts';

// Drafted from the user's France notes and general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:aligote',
  name: 'Aligoté',
  colour: 'white',
  berryColour: '#CDD39A',
  traits: ['Neutral', 'High acidity', 'Burgundy’s second white grape'],
  structure: {
    cool: { appearanceIntensity: [0, 0], sweetness: [0, 0], acidity: [4, 4], body: [0, 1], alcohol: [1, 1], noseIntensity: [1, 1] },
    warm: { appearanceIntensity: [0, 0], sweetness: [0, 0], acidity: [3, 4], body: [1, 2], alcohol: [1, 1], noseIntensity: [1, 2] },
  },
  aromas: [
    { aromaId: 'aroma:apple', ripeness: 'less' },
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:pear', ripeness: 'ripe' },
    { aromaId: 'aroma:blossom' },
  ],
  why: [
    { factor: 'The best ripening sites go to Chardonnay and Pinot Noir', effect: 'Aligoté is planted on lesser sites', result: 'mostly neutral, very acidic wines; quality ones are rare' },
    { factor: 'Fully ripe on a good site', effect: 'more fruit and body', result: 'fresh, citrus whites of real quality' },
  ],
  lookAlikes: [{ grapeId: 'grape:chardonnay', tell: 'Unoaked Chablis has more fruit and body; Aligoté is sharper and leaner.' }],
  regions: [
    { regionId: 'region:fr-burgundy-cote-chalonnaise', styleLevel: 2, style: 'Bourgogne Aligoté; Bouzeron is its own village appellation.', producers: [] },
  ],
  verified: false,
} satisfies Grape;
