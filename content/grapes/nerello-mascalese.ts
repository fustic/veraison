import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:nerello-mascalese',
  name: 'Nerello Mascalese',
  colour: 'red',
  berryColour: '#6A2443',
  traits: ['Late ripening', 'Pale colour', 'High acidity and tannin', 'Old bush vines on Etna'],
  structure: {
    cool: { appearanceIntensity: [0, 1], acidity: [4, 4], tannin: [3, 4], body: [2, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [0, 1], acidity: [3, 4], tannin: [3, 4], body: [2, 3], alcohol: [2, 2], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:sour-cherry', ripeness: 'less' },
    { aromaId: 'aroma:red-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:raspberry', ripeness: 'ripe' },
    { aromaId: 'aroma:rose' },
    { aromaId: 'aroma:dried-herbs' },
    { aromaId: 'aroma:earth' },
  ],
  why: [
    { factor: 'Vineyards up to about 1,000 m on Mount Etna', effect: 'cool nights, long ripening', result: 'pale, fragrant, high-acid reds compared with Pinot Noir and Nebbiolo' },
    { factor: 'Volcanic soils, old ungrafted bush vines', effect: 'low yields', result: 'concentrated, mineral wines' },
  ],
  lookAlikes: [
    { grapeId: 'grape:nebbiolo', tell: 'Nebbiolo is even more tannic, with tar and rose.' },
    { grapeId: 'grape:pinot-noir', tell: 'Pinot Noir is softer in tannin.' },
  ],
  regions: [{ regionId: 'region:it-sicily-etna', styleLevel: 4, style: 'Etna Rosso: pale, red cherry, herbs, firm tannin, fresh acidity.', producers: [] }],
  verified: false,
} satisfies Grape;
