import type { Grape } from '../../core/src/content.ts';

// Drafted from the user's Italy notes, in our own words. Check against your book, then set verified: true.
export default {
  id: 'grape:grechetto',
  name: 'Grechetto',
  colour: 'white',
  berryColour: '#D0C27A',
  traits: ['Medium(+) acidity', 'Grapefruit, peach', 'Orvieto'],
  structure: {
    cool: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [3, 3], body: [1, 2], alcohol: [1, 1], noseIntensity: [2, 2] },
    warm: { appearanceIntensity: [1, 1], sweetness: [0, 0], acidity: [2, 3], body: [2, 2], alcohol: [1, 1], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:grapefruit', ripeness: 'ripe' },
    { aromaId: 'aroma:peach', ripeness: 'ripe' },
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:almond' },
  ],
  why: [{ factor: 'More flavour than Trebbiano in the Orvieto blend', effect: 'riper fruit and texture', result: 'the best Orvieto has the most Grechetto' }],
  lookAlikes: [{ grapeId: 'grape:trebbiano', tell: 'Trebbiano is more neutral and lighter.' }],
  regions: [{ regionId: 'region:it-umbria-orvieto', styleLevel: 2, style: 'With Trebbiano: light, medium to high acid, ripe grapefruit and peach; cool-fermented in steel.', producers: [] }],
  verified: false,
} satisfies Grape;
