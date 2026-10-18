import type { Grape } from '../../core/src/content.ts';

// Drafted from the user's Italy notes, in our own words. Check against your book, then set verified: true.
export default {
  id: 'grape:sagrantino',
  name: 'Sagrantino',
  colour: 'red',
  berryColour: '#24102A',
  traits: ['Thick skins', 'Very high tannin', 'Deep colour', 'Umbria'],
  structure: {
    cool: { appearanceIntensity: [2, 2], acidity: [3, 3], tannin: [4, 4], body: [3, 4], alcohol: [1, 2], noseIntensity: [3, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [3, 3], tannin: [4, 4], body: [4, 4], alcohol: [2, 2], noseIntensity: [3, 4] },
  },
  aromas: [
    { aromaId: 'aroma:blackberry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-plum', ripeness: 'very' },
    { aromaId: 'aroma:cinnamon' },
    { aromaId: 'aroma:earth' },
    { aromaId: 'aroma:leather' },
  ],
  why: [{ factor: 'Very thick skins', effect: 'lots of colour and tannin', result: 'powerful reds that need long oak and bottle ageing' }],
  lookAlikes: [{ grapeId: 'grape:aglianico', tell: 'Aglianico has higher acidity and more earth and smoke; Sagrantino is even more tannic.' }],
  regions: [{ regionId: 'region:it-umbria-montefalco', styleLevel: 4, style: 'Sagrantino di Montefalco DOCG: Umbria’s top red; deep, very tannic, long-lived.', producers: [] }],
  verified: false,
} satisfies Grape;
