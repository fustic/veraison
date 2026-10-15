import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:garganega',
  name: 'Garganega',
  colour: 'white',
  berryColour: '#D1C985',
  traits: ['Late ripening', 'Vigorous: yields must be controlled', 'Suits drying (Recioto di Soave)'],
  structure: {
    cool: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [2, 3], body: [1, 2], alcohol: [1, 1], noseIntensity: [1, 2] },
    warm: { appearanceIntensity: [1, 1], sweetness: [0, 0], acidity: [2, 3], body: [2, 3], alcohol: [1, 1], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:apple', ripeness: 'less' },
    { aromaId: 'aroma:pear', ripeness: 'ripe' },
    { aromaId: 'aroma:peach', ripeness: 'ripe' },
    { aromaId: 'aroma:chamomile' },
    { aromaId: 'aroma:almond' },
    { aromaId: 'aroma:honey' },
  ],
  why: [
    { factor: 'High yields on the plains', effect: 'dilute fruit', result: 'light, neutral Soave' },
    { factor: 'Low yields on volcanic and limestone hills (Soave Classico)', effect: 'concentration', result: 'stone fruit, chamomile, almond; can age' },
    { factor: 'Grapes dried before fermentation', effect: 'sugar concentrated', result: 'Recioto di Soave, sweet' },
  ],
  lookAlikes: [{ grapeId: 'grape:cortese', tell: 'Gavi is crisper and leaner; Soave a little rounder, with almond.' }],
  regions: [{ regionId: 'region:it-veneto-soave', styleLevel: 3, style: 'Soave Classico: pear, stone fruit, almond; the plains give lighter wines.', producers: ['Pieropan', 'Inama'] }],
  verified: false,
} satisfies Grape;
