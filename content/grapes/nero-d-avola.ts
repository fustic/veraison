import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:nero-d-avola',
  name: 'Nero d’Avola',
  colour: 'red',
  berryColour: '#3A1A3A',
  synonyms: ['Calabrese'],
  traits: ['Thrives in heat', 'Deep colour', 'Fresh acidity for a hot-climate grape'],
  structure: {
    cool: { appearanceIntensity: [2, 2], acidity: [3, 3], tannin: [2, 3], body: [2, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [2, 3], tannin: [3, 3], body: [3, 4], alcohol: [2, 2], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:red-cherry', ripeness: 'less' },
    { aromaId: 'aroma:black-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-plum', ripeness: 'ripe' },
    { aromaId: 'aroma:jammy', ripeness: 'very' },
    { aromaId: 'aroma:black-pepper' },
    { aromaId: 'aroma:chocolate-oak' },
  ],
  why: [
    { factor: 'Keeps reasonable acidity in Sicilian heat', effect: 'ripe fruit with freshness', result: 'from inexpensive Terre Siciliane to oaked premium reds' },
    { factor: 'Grown all over Sicily: Terre Siciliane IGT and Sicilia DOC', effect: 'medium to full body, medium acid and tannin', result: 'fruity early-drinking style; more concentrated from top producers' },
  ],
  lookAlikes: [{ grapeId: 'grape:syrah', tell: 'Syrah is more peppery and savoury.' }],
  regions: [{ regionId: 'region:it-sicily', styleLevel: 3, style: 'Plush black cherry and plum; in Cerasuolo di Vittoria blended with Frappato.', producers: [] }],
  verified: false,
} satisfies Grape;
