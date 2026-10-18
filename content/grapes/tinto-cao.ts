import type { Grape } from '../../core/src/content.ts';

// Drafted from the user's Spain and Portugal notes, in our own words. Check against your book, then set verified: true.
export default {
  id: 'grape:tinto-cao',
  name: 'Tinto Cão',
  colour: 'red',
  berryColour: '#2A1530',
  traits: ['Low yields', 'Fresh acidity', 'Firm, fine tannin', 'Douro blending grape'],
  structure: {
    cool: { appearanceIntensity: [1, 2], acidity: [3, 3], tannin: [3, 3], body: [2, 3], alcohol: [1, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [3, 3], tannin: [3, 4], body: [3, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:red-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:raspberry', ripeness: 'ripe' },
    { aromaId: 'aroma:blossom' },
    { aromaId: 'aroma:cloves' },
  ],
  why: [{ factor: 'Small yields, keeps acidity in Douro heat', effect: 'fine structure', result: 'adds freshness and ageing ability to Port and Douro blends' }],
  lookAlikes: [{ grapeId: 'grape:touriga-nacional', tell: 'Touriga Nacional is deeper, more tannic and more floral.' }],
  regions: [{ regionId: 'region:pt-douro', styleLevel: 3, style: 'One of the five main Port and Douro grapes: freshness and finesse.', producers: [] }],
  verified: false,
} satisfies Grape;
