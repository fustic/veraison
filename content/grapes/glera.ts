import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:glera',
  name: 'Glera',
  colour: 'white',
  berryColour: '#D7D7A8',
  traits: ['High yields', 'Delicate, fruity and floral', 'The Prosecco grape'],
  structure: {
    cool: { appearanceIntensity: [0, 0], sweetness: [0, 2], acidity: [2, 3], body: [0, 1], alcohol: [1, 1], noseIntensity: [2, 2] },
    warm: { appearanceIntensity: [0, 0], sweetness: [0, 2], acidity: [2, 2], body: [1, 1], alcohol: [1, 1], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:apple', ripeness: 'less' },
    { aromaId: 'aroma:pear', ripeness: 'ripe' },
    { aromaId: 'aroma:melon', ripeness: 'ripe' },
    { aromaId: 'aroma:blossom' },
    { aromaId: 'aroma:pear-drop' },
  ],
  why: [
    { factor: 'Delicate fruit', effect: 'second fermentation in tank, no long lees ageing', result: 'fresh pear, apple and blossom; no bready notes' },
    { factor: 'Steep hills of Conegliano Valdobbiadene', effect: 'lower yields, slower ripening', result: 'more intense, finer DOCG Prosecco' },
    { factor: 'Formerly called Prosecco', effect: 'renamed so that Prosecco is a protected place', result: 'only Prosecco DOC/DOCG may use the name' },
    { factor: 'Tank method, fermentation often stopped by chilling', effect: 'medium acid, green apple and melon, a touch of sweetness', result: 'drink young; rosé allowed since 2020 with up to 15% Pinot Noir' },
  ],
  lookAlikes: [{ grapeId: 'grape:muscat', tell: 'Moscato is sweeter and intensely grapey.' }],
  regions: [{ regionId: 'region:it-veneto-prosecco', styleLevel: 3, style: 'Tank-method sparkling: light, fruity; usually Brut or Extra Dry.', producers: [] }],
  verified: false,
} satisfies Grape;
