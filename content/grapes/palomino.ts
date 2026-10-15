import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
// Structure: "cool" = Fino or Manzanilla (biological ageing), "warm" = Oloroso (oxidative ageing).
export default {
  id: 'grape:palomino',
  name: 'Palomino',
  colour: 'white',
  berryColour: '#D6D0A0',
  synonyms: ['Palomino Fino', 'Listán'],
  traits: ['Low acidity', 'Neutral', 'High yields', 'The Sherry grape'],
  structure: {
    cool: { appearanceIntensity: [0, 0], sweetness: [0, 0], acidity: [2, 3], body: [1, 2], alcohol: [2, 2], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], sweetness: [0, 0], acidity: [2, 3], body: [3, 4], alcohol: [2, 2], noseIntensity: [3, 4] },
  },
  aromas: [
    { aromaId: 'aroma:apple', ripeness: 'less' },
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:bread' },
    { aromaId: 'aroma:bread-dough' },
    { aromaId: 'aroma:almond' },
    { aromaId: 'aroma:walnut' },
    { aromaId: 'aroma:hazelnut' },
    { aromaId: 'aroma:toffee' },
    { aromaId: 'aroma:caramel' },
  ],
  why: [
    { factor: 'Neutral, low-acid grape', effect: 'a blank canvas', result: 'the style comes from the ageing, not the grape' },
    { factor: 'Chalky albariza soils', effect: 'store winter rain through the dry summer', result: 'vines survive the drought' },
    { factor: 'Biological ageing under flor', effect: 'yeast blocks oxygen and feeds on alcohol and glycerol', result: 'pale, light, dry Fino and Manzanilla with bread and almond' },
    { factor: 'Oxidative ageing (fortified to about 17%, no flor)', effect: 'oxygen browns and concentrates the wine', result: 'Oloroso: deep, full, walnut and toffee' },
  ],
  lookAlikes: [{ grapeId: 'grape:pedro-ximenez', tell: 'PX Sherry is intensely sweet and raisiny; Palomino Sherries are dry unless sweetened.' }],
  regions: [{ regionId: 'region:es-jerez', styleLevel: 3, style: 'All dry Sherry styles: Fino, Manzanilla, Amontillado, Palo Cortado, Oloroso.', producers: ['González Byass', 'Lustau', 'Hidalgo'] }],
  verified: false,
} satisfies Grape;
