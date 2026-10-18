import type { Grape } from '../../core/src/content.ts';

// Drafted from the user's Spain and Portugal notes, in our own words. Check against your book, then set verified: true.
export default {
  id: 'grape:encruzado',
  name: 'Encruzado',
  colour: 'white',
  berryColour: '#CDC27C',
  traits: ['Dão’s best white grape', 'Suits barrel fermentation', 'Ages well'],
  structure: {
    cool: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [3, 3], body: [2, 2], alcohol: [1, 1], noseIntensity: [2, 2] },
    warm: { appearanceIntensity: [1, 1], sweetness: [0, 0], acidity: [2, 3], body: [2, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:peach', ripeness: 'ripe' },
    { aromaId: 'aroma:wet-stones' },
    { aromaId: 'aroma:toast-oak' },
    { aromaId: 'aroma:nutty' },
  ],
  why: [{ factor: 'Good acidity and structure', effect: 'takes oak and lees well', result: 'from light and fresh to rich, barrel-fermented whites' }],
  lookAlikes: [{ grapeId: 'grape:chardonnay', tell: 'Oaked Chardonnay is usually broader, with more butter and tropical fruit.' }],
  regions: [{ regionId: 'region:pt-dao', styleLevel: 3, style: 'The best Dão whites: light and fresh, or richer and barrel-fermented.', producers: [] }],
  verified: false,
} satisfies Grape;
