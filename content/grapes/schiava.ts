import type { Grape } from '../../core/src/content.ts';

// Drafted from the user's Italy notes, in our own words. Check against your book, then set verified: true.
export default {
  id: 'grape:schiava',
  name: 'Schiava',
  colour: 'red',
  berryColour: '#7A2A3A',
  synonyms: ['Vernatsch', 'Trollinger'],
  traits: ['Light, fruity reds', 'Low to medium tannin', 'Alto Adige'],
  structure: {
    cool: { appearanceIntensity: [0, 0], acidity: [2, 3], tannin: [1, 1], body: [1, 1], alcohol: [1, 1], noseIntensity: [2, 2] },
    warm: { appearanceIntensity: [0, 1], acidity: [2, 2], tannin: [1, 2], body: [1, 2], alcohol: [1, 1], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:raspberry', ripeness: 'ripe' },
    { aromaId: 'aroma:red-plum', ripeness: 'ripe' },
    { aromaId: 'aroma:red-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:almond' },
  ],
  why: [{ factor: 'Thin-skinned, grown at altitude in Alpine valleys', effect: 'little colour or tannin, fresh fruit', result: 'pale, light, fruity reds of raspberry and plum' }],
  lookAlikes: [{ grapeId: 'grape:gamay', tell: 'Gamay has more acidity and banana or bubblegum from carbonic maceration.' }],
  regions: [{ regionId: 'region:it-alto-adige', styleLevel: 2, style: 'Leads red production: light, fruity, raspberry and plum, low to medium tannin.', producers: [] }],
  alsoGrownIn: ['Württemberg (as Trollinger)'],
  verified: false,
} satisfies Grape;
