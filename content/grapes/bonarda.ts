import type { Grape } from '../../core/src/content.ts';

// Drafted from the user's southern-hemisphere notes, in our own words. Check against your book, then set verified: true.
export default {
  id: 'grape:bonarda',
  name: 'Bonarda',
  colour: 'red',
  berryColour: '#2C1236',
  synonyms: ['Douce Noir', 'Charbono'],
  traits: ['Late ripening', 'Deep colour', 'High acidity and tannin', 'Argentina’s second grape'],
  structure: {
    cool: { appearanceIntensity: [2, 2], acidity: [3, 4], tannin: [3, 3], body: [2, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [3, 3], tannin: [3, 4], body: [3, 3], alcohol: [2, 2], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:raspberry', ripeness: 'ripe' },
    { aromaId: 'aroma:blackberry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-plum', ripeness: 'very' },
    { aromaId: 'aroma:violet' },
  ],
  why: [
    { factor: 'High yields', effect: 'medium to deep colour, fruity', result: 'easy-drinking raspberry and blackberry reds' },
    { factor: 'Controlled yields, full ripeness', effect: 'more concentration', result: 'structured wines; old vines in eastern Maipú' },
  ],
  lookAlikes: [{ grapeId: 'grape:malbec', tell: 'Malbec is fuller with smoother tannin and more floral, plummy fruit.' }],
  regions: [
    { regionId: 'region:ar-mendoza', styleLevel: 2, style: 'Easy-drinking at high yields; concentrated from old vines.', producers: [] },
    { regionId: 'region:ar-san-juan', styleLevel: 3, style: 'Grown widely alongside Syrah and Malbec.', producers: [] },
    { regionId: 'region:ar-maipu', styleLevel: 3, style: 'Old-vine Bonarda in the lower east.', producers: [] },
  ],
  verified: false,
} satisfies Grape;
