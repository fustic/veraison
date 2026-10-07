import type { Grape } from '../../core/src/content.ts';

export default {
  id: 'grape:semillon',
  name: 'Sémillon',
  colour: 'white',
  traits: ['Thin skins', 'Susceptible to noble rot', 'Ages well'],
  structure: {
    cool: { appearanceIntensity: [0, 0], acidity: [3, 4], body: [0, 1], alcohol: [0, 0], noseIntensity: [0, 1] },
    warm: { appearanceIntensity: [1, 2], acidity: [2, 2], body: [2, 3], alcohol: [1, 1], noseIntensity: [2, 2] },
  },
  aromas: [
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:lime', ripeness: 'less' },
    { aromaId: 'aroma:apple', ripeness: 'less' },
    { aromaId: 'aroma:peach', ripeness: 'ripe' },
    { aromaId: 'aroma:apricot', ripeness: 'very' },
    { aromaId: 'aroma:grass' },
    { aromaId: 'aroma:honey' },
    { aromaId: 'aroma:toast-bottle' },
    { aromaId: 'aroma:nutty' },
    { aromaId: 'aroma:dried-apricot' },
    { aromaId: 'aroma:marmalade' },
  ],
  why: [
    { factor: 'Thin skins', effect: 'susceptible to noble rot', result: 'the backbone of Sauternes and Barsac' },
    { factor: 'Early picking (Hunter Valley)', effect: 'low alcohol, high acid, neutral when young', result: 'develops toast and honey after years in bottle' },
    { factor: 'Blended with Sauvignon Blanc', effect: 'adds body to Sauvignon’s acid and aroma', result: 'classic white Bordeaux' },
  ],
  lookAlikes: [
    { grapeId: 'grape:sauvignon-blanc', tell: 'Sauvignon Blanc is far more aromatic and herbaceous.' },
    { grapeId: 'grape:chardonnay', tell: 'Chardonnay is usually fuller and higher in alcohol at the same age.' },
  ],
  regions: [
    {
      regionId: 'region:fr-bordeaux-pessac-leognan',
      styleLevel: 3,
      style: 'Adds body to Sauvignon Blanc in oak-aged dry whites.',
      producers: ['Château Haut-Brion'],
    },
    {
      regionId: 'region:fr-bordeaux-sauternes',
      styleLevel: 5,
      style: 'Noble rot: luscious, with apricot, marmalade and honey.',
      producers: ["Château d'Yquem"],
    },
  ],
  alsoGrownIn: ['Hunter Valley', 'Barossa', 'Margaret River'],
  verified: false,
} satisfies Grape;
