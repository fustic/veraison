import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:melon-blanc',
  name: 'Melon Blanc',
  colour: 'white',
  berryColour: '#D0D49A',
  synonyms: ['Melon de Bourgogne', 'Muscadet'],
  traits: ['Early budding and ripening (frost risk)', 'Neutral', 'High acidity'],
  structure: {
    cool: { appearanceIntensity: [0, 0], sweetness: [0, 0], acidity: [3, 4], body: [0, 1], alcohol: [1, 1], noseIntensity: [0, 1] },
    warm: { appearanceIntensity: [0, 0], sweetness: [0, 0], acidity: [3, 3], body: [1, 2], alcohol: [1, 1], noseIntensity: [1, 2] },
  },
  aromas: [
    { aromaId: 'aroma:apple', ripeness: 'less' },
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:pear', ripeness: 'ripe' },
    { aromaId: 'aroma:bread' },
    { aromaId: 'aroma:wet-stones' },
  ],
  why: [
    { factor: 'Cool, wet maritime Pays Nantais', effect: 'early-ripening grape picked before autumn rain', result: 'light, high-acid, neutral wine' },
    { factor: 'Sur lie: kept on the lees over winter until bottling', effect: 'texture, yeasty notes, a little CO₂', result: 'more character from a neutral grape' },
  ],
  lookAlikes: [{ grapeId: 'grape:trebbiano', tell: 'Trebbiano is just as neutral but without lees character.' }],
  regions: [{ regionId: 'region:fr-loire-muscadet-sevre-et-maine', styleLevel: 3, style: 'Light, high acid, citrus, saline; sur lie adds texture and bread notes.', producers: [] }],
  verified: false,
} satisfies Grape;
