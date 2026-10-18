import type { Grape } from '../../core/src/content.ts';

// Drafted from the user's Italy notes, in our own words. Check against your book, then set verified: true.
export default {
  id: 'grape:friulano',
  name: 'Friulano',
  colour: 'white',
  berryColour: '#CFC77E',
  synonyms: ['Sauvignonasse', 'Tocai Friulano'],
  traits: ['Medium(+) to high acidity', 'Medium body', 'Pear, red apple, herbs'],
  structure: {
    cool: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [3, 4], body: [2, 2], alcohol: [1, 1], noseIntensity: [2, 2] },
    warm: { appearanceIntensity: [1, 1], sweetness: [0, 0], acidity: [3, 3], body: [2, 3], alcohol: [1, 1], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:pear', ripeness: 'ripe' },
    { aromaId: 'aroma:apple', ripeness: 'ripe' },
    { aromaId: 'aroma:dried-herbs' },
    { aromaId: 'aroma:almond' },
  ],
  why: [{ factor: 'Native to Friuli, grown on both the hills and the plain', effect: 'keeps fresh acidity', result: 'medium-bodied whites of pear, red apple and herbs' }],
  lookAlikes: [{ grapeId: 'grape:pinot-gris', tell: 'Friuli Pinot Grigio is richer, with peach and tropical fruit.' }],
  regions: [
    { regionId: 'region:it-friuli-grave', styleLevel: 2, style: 'Simple, fruity.', producers: [] },
    { regionId: 'region:it-friuli-collio', styleLevel: 3, style: 'More concentrated: pear, apple, herbs, almond finish.', producers: [] },
  ],
  verified: false,
} satisfies Grape;
