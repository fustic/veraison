import type { Grape } from '../../core/src/content.ts';

// Drafted from the user's Italy notes, in our own words. Check against your book, then set verified: true.
export default {
  id: 'grape:malvasia',
  name: 'Malvasia',
  colour: 'white',
  berryColour: '#D6C27A',
  traits: ['Aromatic', 'Floral, orange blossom', 'A family of related grapes'],
  structure: {
    cool: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [2, 3], body: [2, 2], alcohol: [1, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [1, 1], sweetness: [0, 0], acidity: [2, 2], body: [2, 3], alcohol: [1, 2], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:blossom' },
    { aromaId: 'aroma:orange-peel' },
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:peach', ripeness: 'ripe' },
    { aromaId: 'aroma:apricot', ripeness: 'very' },
  ],
  why: [{ factor: 'Aromatic grape blended with neutral Trebbiano', effect: 'adds perfume', result: 'Frascati’s floral, orange-blossom lift' }],
  lookAlikes: [{ grapeId: 'grape:muscat', tell: 'Muscat is far more intensely grapey.' }],
  regions: [{ regionId: 'region:it-lazio-frascati', styleLevel: 2, style: 'With Trebbiano: fresh, unoaked, medium body, citrus and orange blossom.', producers: [] }],
  alsoGrownIn: ['Madeira (Malmsey)', 'Spain', 'Croatia'],
  verified: false,
} satisfies Grape;
