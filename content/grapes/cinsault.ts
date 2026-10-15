import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:cinsault',
  name: 'Cinsault',
  colour: 'red',
  berryColour: '#6B2A44',
  synonyms: ['Cinsaut'],
  traits: ['Drought and heat tolerant', 'High yields', 'Pale colour, low tannin', 'Parent of Pinotage'],
  structure: {
    cool: { appearanceIntensity: [0, 1], acidity: [2, 3], tannin: [1, 2], body: [1, 2], alcohol: [1, 1], noseIntensity: [2, 2] },
    warm: { appearanceIntensity: [0, 1], acidity: [2, 2], tannin: [1, 2], body: [2, 2], alcohol: [1, 2], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:raspberry', ripeness: 'less' },
    { aromaId: 'aroma:strawberry', ripeness: 'ripe' },
    { aromaId: 'aroma:red-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:jammy', ripeness: 'very' },
    { aromaId: 'aroma:blossom' },
    { aromaId: 'aroma:dried-herbs' },
  ],
  why: [
    { factor: 'Pale, soft and fruity', effect: 'little colour or tannin', result: 'a staple of rosé (Provence, Tavel) and softening blends' },
    { factor: 'Copes with heat and drought', effect: 'reliable in hot regions', result: 'widely planted in southern France, South Africa and Lebanon' },
  ],
  lookAlikes: [{ grapeId: 'grape:grenache', tell: 'Grenache is fuller and more alcoholic; Cinsault is lighter and more perfumed.' }],
  regions: [
    { regionId: 'region:fr-provence-cotes-de-provence', styleLevel: 2, style: 'Pale, delicate dry rosé blends.', producers: [] },
    { regionId: 'region:fr-rhone-tavel', styleLevel: 3, style: 'Deeper, fuller rosé with Grenache.', producers: [] },
    { regionId: 'region:fr-languedoc', styleLevel: 2, style: 'Softening partner in red blends and rosé.', producers: [] },
    { regionId: 'region:za-swartland', styleLevel: 3, style: 'Old bush vines: light, fragrant reds.', producers: [] },
  ],
  alsoGrownIn: ['Lebanon', 'Corsica'],
  verified: false,
} satisfies Grape;
